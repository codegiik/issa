/* lib */
import strapi, { unwrap, getFileUrl } from 'lib/strapi';

/* comp */
import { Heading } from 'components';

/* hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/* style */
import style from 'styles/components/hero.module.css';
import clsx from 'clsx';

/* @types */
import type { NewsItem, Record } from 'lib/interfaces';
import { titleToSlug } from 'lib/utils';

export type HeroProps = {
    className?: string;
};

export function Hero({ className }: HeroProps) {
    const router = useRouter();
    const [news, setNews] = useState<NewsItem[] | undefined>(undefined);

    useEffect(() => {
        strapi
            .find<Record<NewsItem>[]>('posts', {
                sort: 'createdAt:desc',
                populate: 'cover',
            })
            .then(({ data }: { data: any }) =>
                setNews(
                    (unwrap(data) as NewsItem[]).filter(
                        (el) => el.title !== 'Statuto'
                    )
                )
            );
    }, []);

    const pushLink = (post: NewsItem) => {
        router.push(
            {
                pathname: '/articolo/[slug]',
                query: {
                    slug: titleToSlug(post.title),
                },
            },
            undefined,
            { shallow: true }
        );
    };

    const getTitle = (newsItem: NewsItem) => newsItem.title;

    const getCover = (newsItem: NewsItem) => getFileUrl(newsItem, 'cover');

    return news ? (
        <section className={clsx(className, style.hero)} id="hero">
            <div
                onClick={() => pushLink(news[0])}
                style={
                    {
                        '--bg-image': `url(${
                            getCover(news[0]) || '/img/default-cover.png'
                        }) no-repeat center center / cover`,
                    } as React.CSSProperties
                }
                className={style.bigTile}
            >
                <div className={style.overlay} />
                <h3>{getTitle(news[0])}</h3>
            </div>
            <div className={style.otherNews}>
                <Heading>Ultime Notizie</Heading>
                {news?.slice(1).map((newsItem) => (
                    <a
                        className={style.articleTitle}
                        href={newsItem.href}
                        onClick={(evt) => {
                            evt.preventDefault();
                            pushLink(newsItem);
                        }}
                        key={newsItem.id}
                    >
                        <h4>{getTitle(newsItem)}</h4>
                    </a>
                ))}
            </div>
        </section>
    ) : (
        <div>Loading</div>
    );
}

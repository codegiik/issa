import { Heading, Loader } from 'components';
import supabase from 'lib/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from 'styles/components/hero.module.css';

export function Hero({ className }) {
    const router = useRouter();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('news')
                .select()
                .limit(5)
                .order('created_at', { ascending: false });
            if (error) return message.error(error.message);
            setNews(data);
        };

        fetchData();
    }, []);

    const openNews = (i) => {
        router.push(news[i].href, undefined, { shallow: true });
    };

    return news ? (
        <section
            className={[
                Array.isArray(className) ? className.join(' ') : className,
                style.hero,
            ].join(' ')}
            id="hero"
        >
            <div
                onClick={() => openNews(0)}
                style={{
                    '--bg-image': `url(${news[0].preview}) no-repeat center center / cover`,
                }}
                className={style.bigTile}
            >
                <div className={style.overlay} />
                <h3>{news[0].title}</h3>
            </div>
            <div className={style.otherNews}>
                <Heading>Ultime Notizie</Heading>
                {news.slice(1).map((v, i) => (
                    <h4
                        className={style.articleTitle}
                        key={i}
                        onClick={() => openNews(i)}
                    >
                        {v.title}
                    </h4>
                ))}
            </div>
        </section>
    ) : (
        <Loader space />
    );
}

import Main from 'layouts/Main';
import { Post } from 'lib/interfaces';
import strapi from 'lib/strapi';
import { NextPageContext } from 'next';

import style from 'styles/pages/article.module.css';

export async function getServerSideProps(ctx: NextPageContext) {
    const { res, query } = ctx;

    res?.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    const errorResponse = {
        notFound: true,
    };

    const slug = query.slug as string;
    const r = await strapi
        .find<Post>('posts', {
            filters: {
                slug: {
                    $eqi: slug,
                },
            },
            pagination: {
                page: 1,
                pageSize: 1,
            },
        })
        .catch((err) => console.error(err));

    if (!r) return errorResponse;
    else {
        const data = r.data as unknown as any[];
        if (data.length === 0) return errorResponse;

        const post = {
            id: data[0].id,
            ...data[0].attributes,
        };

        return {
            props: {
                post,
            },
        };
    }
}

export default function ArticlePage({ post }: { post: Post }) {
    return (
        <div className={style.wrapper}>
            <h2>{post.title}</h2>
            <div
                className="prose prose-zinc min-w-full"
                dangerouslySetInnerHTML={{
                    __html: post.body,
                }}
            />
        </div>
    );
}

ArticlePage.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

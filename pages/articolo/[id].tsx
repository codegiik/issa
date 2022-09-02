import Main from 'layouts/Main';
import strapi from 'lib/strapi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import style from 'styles/pages/article.module.css';

export default function ArticlePage() {
    const [page, setPage] = useState<any>(undefined);
    const router = useRouter();

    useEffect(() => {
        if (typeof router.query.id === 'string')
            strapi.findOne('posts', router.query.id).then(
                ({ data }: any) =>
                    setPage({
                        ...data.attributes,
                        id: data.id,
                    }),
                (err) => err
            );
    }, [router]);

    return (
        <div className={style.wrapper}>
            <h2>{page?.title}</h2>
            <div
                className="prose prose-zinc"
                dangerouslySetInnerHTML={{
                    __html: page?.body,
                }}
            />
        </div>
    );
}

ArticlePage.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

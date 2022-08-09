import Main from 'layouts/Main';
import supabase from 'lib/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import style from 'styles/pages/post.module.css';

export default function Post() {
    const router = useRouter();
    const [post, setPost] = useState(undefined);
    const { uuid } = router.query;

    useEffect(() => {
        const fetchPost = async () => {
            const data = await supabase
                .from('posts')
                .select()
                .or(`uuid.eq.${uuid},slug.eq.${uuid}`)
                .single();
            console.log(data);
            setPost(data.data);
        };

        if (uuid) fetchPost();
    }, [uuid]);

    return post ? (
        <article
            className={style.wrapper}
            dangerouslySetInnerHTML={{
                __html: post.body,
            }}
        ></article>
    ) : null;
}

Post.getLayout = (page) => <Main>{page}</Main>;

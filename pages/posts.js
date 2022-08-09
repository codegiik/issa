import { Heading, Link } from 'components';
import Main from 'layouts/Main';
import supabase from 'lib/supabase';
import { useEffect, useState } from 'react';

import style from 'styles/pages/posts.module.css';

export function PostCard({ post }) {
    return (
        <Link
            href={{
                pathname: '/post/[uuid]',
                query: {
                    uuid: post.uuid,
                },
            }}
        >
            <div className={style.postCard}>
                <h3>{post.title}</h3>
                <span className={style.author}>di {post.author}</span>
                <p>{post.description}</p>
                <span className={style.created_at}>
                    Creato il {post.created_at}
                </span>
            </div>
        </Link>
    );
}

export default function Posts() {
    const [posts, setPosts] = useState(undefined);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await supabase.from('posts').select().limit(10);

            setPosts(data.data);
        };

        fetchPosts();
    }, []);

    return (
        <div className={style.wrapper}>
            <Heading className={style.title}>I nostri post</Heading>
            {Array.isArray(posts) &&
                posts.map((post) => <PostCard post={post} key={post.uuid} />)}
        </div>
    );
}

Posts.getLayout = (page) => <Main>{page}</Main>;

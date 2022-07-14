/* deps */
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

/* comp */
import { AdminLayout } from 'layouts/Admin';

/* lib */
import supabase from 'lib/supabase';
import { Editor } from '@tinymce/tinymce-react';

export default function AdminPost() {
    const editorRef = useRef(null);
    const router = useRouter();

    /* init */
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    /* saving */
    const [saveError, setSaveError] = useState(false);
    const [saveTimeout, setSaveTimeout] = useState(null);

    useEffect(() => {
        const fetchData = async (uuid) => {
            const { data, error } = await supabase
                .from('posts')
                .select()
                .eq('uuid', uuid)
                .single();

            setLoading(false);
            if (error) {
                setError(error);
                return;
            }

            setPost(data);
        };

        const { uuid } = router.query;
        if (!uuid) return;
        fetchData(uuid);
    }, [router.query]);

    const errors = {
        '22P02': 'Sintassi UUID invalida',
    };

    if (loading) return 'Loading...';
    else if (!post) {
        console.log(error);
        return `Errore: ${errors[error.code] || error.message}`;
    }

    const savePost = async (newPost) => {
        const { uuid } = router.query;
        if (!uuid) return;

        const { title, description, body } = newPost;
        const { error } = await supabase
            .from('posts')
            .update({
                title,
                description,
                body,
            })
            .eq('uuid', uuid);

        if (error) {
            console.log(error);
            setSaveError(true);
            return;
        }
    };

    const setField = (key, value) => {
        const newPost = {
            ...post,
            [key]: value,
        };
        setPost(newPost);

        if (saveError) setSaveError(false);
        if (saveTimeout) clearTimeout(saveTimeout);
        setSaveTimeout(
            setTimeout(() => {
                savePost(newPost);
                setSaveTimeout(null);
            }, 3000)
        );
    };

    return (
        <div>
            <h1>Modifica il Post</h1>
            <input
                value={post.title}
                placeholder={post.title}
                onChange={(e) => setField('title', e.target.value)}
            />
            <input
                value={post.description || ''}
                placeholder={post.description || ''}
                onChange={(e) => setField('description', e.target.value)}
            />
            <Editor
                value={post.body}
                onInit={(_, editor) => (editorRef.current = editor)}
                onEditorChange={(text) => setField('body', text)}
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            />
            {!saveTimeout
                ? 'Salvato'
                : !saveError
                ? 'Salvataggio...'
                : 'Errore'}
        </div>
    );
}

AdminPost.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

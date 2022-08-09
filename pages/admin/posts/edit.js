/* deps */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

/* comp */
import { AdminLayout } from 'layouts/Admin';

/* lib */
import supabase from 'lib/supabase';
import { Editor } from '@tinymce/tinymce-react';

function EditPreview({ preview, uuid, setPreviewId }) {
    const inputRef = useRef(null);
    const [temp, setTemp] = useState(preview);

    const savePreview = async () => {
        if (temp === preview || inputRef.current.files.length === 0) return;

        const file = inputRef.current.files[0];
        const body = new FormData();
        body.append('file', file);

        const q = new URLSearchParams();
        q.append('uuid', uuid);
        q.append('type', 'preview');

        const { access_token } = supabase.auth.currentSession;
        const res = await fetch(`/api/upload?${q}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'X-Supabase-Auth': access_token,
            },
            body,
        });

        if (res.status !== 200) {
            alert(await res.text());
            return;
        }

        const { id } = await res.json();
        setPreviewId(id);
    };

    const uploadPreview = (e) => {
        const { files } = e.target;
        if (files.length === 0) return;

        setTemp(URL.createObjectURL(files[0]));
    };

    const confirmDeletion = () => {
        const c = confirm("Sei sicuro di voler eliminare l'anteprima?");
        if (!c) return;
        if (preview) {
            setPreviewId(null);
            // DELETE POST LOGIC
        }
        setTemp(null);
    };

    return (
        <div>
            {temp ? (
                <Image src={temp} width={600} height={400} />
            ) : (
                "Nessuna immagine d'anteprima"
            )}
            <input type="file" ref={inputRef} onChange={uploadPreview} hidden />
            {temp && (
                <>
                    <button onClick={confirmDeletion}>Elimina Anteprima</button>
                    <button onClick={savePreview} disabled={temp === preview}>
                        Salva Anteprima
                    </button>
                </>
            )}
            <button onClick={() => inputRef.current.click()}>
                Carica Anteprima
            </button>
        </div>
    );
}

export default function AdminPost() {
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

    // Confirm leaving the page when saving
    useEffect(() => {
        if (saveTimeout)
            onbeforeunload = (e) => {
                e.preventDefault();
                return 'Ci sono dei cambiamenti non salvati. Sei sicuro di voler lasciare la pagina?';
            };
    }, [saveTimeout]);

    const errors = {
        '22P02': 'Sintassi UUID invalida',
    };

    if (loading) return 'Loading...';
    else if (!post) {
        console.error(error);
        return `Errore: ${errors[error.code] || error.message}`;
    }

    const savePost = async (data) => {
        const { uuid } = router.query;
        if (!uuid) return;

        const { title, description, body, previewId, isPrivate } = data;
        const { error } = await supabase
            .from('posts')
            .update({
                title,
                description,
                body,
                previewId,
                isPrivate,
            })
            .eq('uuid', uuid);

        if (error) {
            console.error(error);
            setSaveError(true);
            return;
        }

        setSaveTimeout(null);
    };

    const setField = (key, value, saveDelay = 3000) => {
        const newPost = {
            ...post,
            [key]: value,
        };
        setPost(newPost);

        if (saveError) setSaveError(false);
        if (saveTimeout) clearTimeout(saveTimeout);
        setSaveTimeout(setTimeout(() => savePost(newPost), saveDelay));
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
            <div onClick={() => setField('isPrivate', !post.isPrivate)}>
                <input type="checkbox" checked={post.isPrivate} readOnly />
                <label>Privato</label>
            </div>
            <EditPreview
                uuid={router.query.uuid}
                setPreviewId={(id) => setField('previewId', id, 0)}
                preview={
                    post.previewId
                        ? `${process.env.NEXT_PUBLIC_GDRIVE_VIEW_URL}?id=${
                              post.previewId
                          }&t=${new Date().getTime()}` // We use getTime() to avoid image caching on reload
                        : null
                }
            />
            <Editor
                init={{
                    language: 'it',
                    plugins: 'tinydrive lists code',
                    tinydrive_google_drive_key:
                        process.env.NEXT_PUBLIC_GAPI_TINYMCE_KEY,
                    tinydrive_google_drive_client_id:
                        process.env.NEXT_PUBLIC_GAPI_CLIENT_ID,
                }}
                value={post.body}
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

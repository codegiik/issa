import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { AdminLayout } from 'layouts/Admin';
import { CreatePopup } from 'components/Admin/CreatePopup';
import { TableEditor } from 'components';
import { getUiSchema } from 'lib/utils';

import supabase from 'lib/supabase';

const SCHEMA = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            label: 'Titolo',
            readonly: true,
            minLength: 3,
        },
        author: {
            type: 'string',
            label: 'Autore',
            minLength: 5,
        },
        created_at: {
            type: 'string',
            label: 'Creato Il',
            format: 'date',
        },
    },
};

export default function AdminPosts() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [oldUUID, setOldUUID] = useState(null);
    const [initialPopupData, setInitialPopupData] = useState(null);
    const [updateIndex, setUpdateIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () =>
            await supabase
                .from('posts')
                .select('uuid, title, author, created_at')
                .limit(10);

        fetchData().then(({ data }) => {
            setData(data);
            setLoading(false);
        });
    }, []);

    const insertData = async (incData) => {
        let errors;
        const validate = (await import('jsonschema')).validate;
        if ((errors = validate(incData, SCHEMA).errors).length > 0)
            return errors.forEach((v) => message.error(v.stack));

        const res = await supabase.from('posts').insert(incData);
        if (res.error) message.error(res.error.message);
        else {
            message.success('Post creato con successo');
            setData([...data, ...res.data]);
            setInitialPopupData(null);
        }
    };

    const updateData = async (incData) => {
        let errors;
        const validate = (await import('jsonschema')).validate;
        if ((errors = validate(incData, SCHEMA).errors).length > 0)
            return errors.forEach((v) => message.error(v.stack));

        const res = await supabase.from('posts').update(incData).match(oldUUID);
        if (res.error) message.error(res.error.message);
        else {
            message.success('Post modificato con successo');
            const newData = data;
            newData[updateIndex] = incData[0];

            setData(newData);
            setOldUUID(null);
            setUpdateIndex(null);
            setInitialPopupData(null);
        }
    };

    const removePost = async ({ uuid }) => {
        const { error } = await supabase.from('posts').delete().match({ uuid });
        setData(data.filter((post) => post.uuid != uuid));
        if (error) message.error(error.message);
        else message.success('Post rimosso con successo.');
    };

    return (
        <div>
            <h1>Admin Posts</h1>
            <CreatePopup
                visible={initialPopupData != null}
                close={() => {
                    setInitialPopupData(null);
                    setOldUUID(null);
                }}
                initialData={initialPopupData}
                name={oldUUID ? 'Modifica Post' : 'Nuovo Post'}
                schema={SCHEMA}
                uischema={getUiSchema(SCHEMA)}
                insert={oldUUID ? updateData : insertData}
            />
            {!loading && (
                <TableEditor
                    data={data}
                    tablename="posts"
                    schema={SCHEMA}
                    remove={removePost}
                    edit={({ uuid }) =>
                        router.push(router.pathname + `/edit?uuid=${uuid}`)
                    }
                    getId={({ uuid }) => ({
                        uuid,
                    })}
                    finder={(v, _, match) => v.uuid == match.uuid}
                    buttons={() => (
                        <button
                            onClick={() => setInitialPopupData({})}
                            className="button"
                        >
                            Crea Post
                        </button>
                    )}
                />
            )}
        </div>
    );
}

AdminPosts.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

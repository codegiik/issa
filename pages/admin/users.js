import supabase from 'lib/supabase';
import { TableEditor, AdminHeading } from 'components';
import { AdminLayout } from 'layouts/Admin';

import style from 'styles/pages/admin.users.module.css';
import { CreatePopup } from 'components/Admin/CreatePopup';
import { useState, useEffect } from 'react';
import { message } from 'react-message-popup';
import { getUiSchema } from 'lib/utils';

const SCHEMA = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            label: 'Nome',
            minLength: 3,
        },
        surname: {
            type: 'string',
            label: 'Cognome',
            minLength: 3,
        },
        email: {
            type: 'string',
            label: 'Email',
            minLength: 5,
        },
        role: {
            type: 'string',
            label: 'Ruolo',
            enum: ['Developer', 'Founder'],
        },
        joined_in: {
            type: 'string',
            label: 'Membro Dal',
            format: 'date',
        },
    },
};

export default function AdminPanel() {
    const [data, setData] = useState(null);
    const [oldId, setOldId] = useState(null);
    const [initialPopupData, setInitialPopupData] = useState(null);
    const [updateIndex, setUpdateIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('name, surname, email, role, joined_in');
            if (error) throw error.message;
            return data;
        };

        fetchData().then((d) => setData(d));
    }, []);

    const insertData = async (incData) => {
        let errors;
        const validate = (await import('jsonschema')).validate;
        if ((errors = validate(incData, SCHEMA).errors).length > 0)
            return errors.forEach((v) => message.error(v.stack));

        const res = await supabase.from('users').insert(incData);
        if (res.error) message.error(res.error.message);
        else {
            message.success('Utente creato con successo');
            setData([...data, ...res.data]);
            setInitialPopupData(null);
        }
    };

    const updateData = async (incData) => {
        let errors;
        const validate = (await import('jsonschema')).validate;
        if ((errors = validate(incData, SCHEMA).errors).length > 0)
            return errors.forEach((v) => message.error(v.stack));

        const res = await supabase.from('users').update(incData).match(oldId);
        if (res.error) message.error(res.error.message);
        else {
            message.success('Utente modificato con successo');
            const newData = data;
            newData[updateIndex] = incData[0];

            setData(newData);
            setOldId(null);
            setUpdateIndex(null);
            setInitialPopupData(null);
        }
    };

    return (
        <div className={style.wrapper}>
            <AdminHeading desc="Qui potrai visualizzare e modificare le informazioni degli utenti iscritti sulla piattaforma">
                Utenti
            </AdminHeading>
            <CreatePopup
                visible={initialPopupData != null}
                close={() => {
                    setInitialPopupData(null);
                    setOldId(null);
                }}
                initialData={initialPopupData}
                name={oldId ? 'Modifica Utente' : 'Nuovo Utente'}
                schema={SCHEMA}
                uischema={getUiSchema(SCHEMA)}
                insert={oldId ? updateData : insertData}
            />
            <TableEditor
                data={data}
                tablename="users"
                schema={SCHEMA}
                remove={async ({ email }) => {
                    const { error } = await supabase
                        .from('users')
                        .delete()
                        .match({ email });
                    setData(data.filter((user) => user.email != email));
                    if (error) message.error(error.message);
                    else message.success('Utente rimosso con successo.');
                }}
                // edit={(data, id, index) => {
                //     setInitialPopupData(data);
                //     setOldId(id);
                //     setUpdateIndex(index);
                // }}
                getId={(data) => ({
                    email: data.email,
                })}
                finder={(v, _, match) => v.email == match.email}
                buttons={() => (
                    <button
                        onClick={() => setInitialPopupData({})}
                        className="button"
                    >
                        Nuovo Utente
                    </button>
                )}
            />
        </div>
    );
}

AdminPanel.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

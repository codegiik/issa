import supabase from 'lib/supabase';
import { TableEditor, AdminHeading } from 'components';
import { AdminLayout } from 'layouts/Admin';

import style from 'styles/pages/admin.users.module.css';
import { CreatePopup } from 'components/Admin/CreatePopup';
import { useState, useEffect } from 'react';
import { message } from 'react-message-popup';

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

const UISCHEMA = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            scope: '#/properties/name',
            label: SCHEMA.properties.name.label,
        },
        {
            type: 'Control',
            label: 'Cognome',
            scope: '#/properties/surname',
            label: SCHEMA.properties.surname.label,
        },
        {
            type: 'Control',
            label: 'Email',
            scope: '#/properties/email',
            label: SCHEMA.properties.email.label,
        },
        {
            type: 'Control',
            label: 'Ruolo',
            scope: '#/properties/role',
            label: SCHEMA.properties.role.label,
        },
        {
            type: 'Control',
            label: 'Membro Dal',
            scope: '#/properties/joined_in',
            label: SCHEMA.properties.joined_in.label,
        },
    ],
};

export default function AdminPanel() {
    const [data, setData] = useState(null);
    const [initialPopupData, setInitialPopupData] = useState(null);

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
        const res = await supabase.from('users').insert(incData);
        if (res.error) message.error(res.error.message);
        else {
            message.success('Utente creato con successo');
            setData([...data, ...res.data]);
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
                close={() => setInitialPopupData(null)}
                initialData={initialPopupData}
                name="Nuovo Utente"
                schema={SCHEMA}
                uischema={UISCHEMA}
                insert={insertData}
            />
            <TableEditor
                data={data}
                tablename="users"
                schema={SCHEMA}
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

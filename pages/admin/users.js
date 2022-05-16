import supabase from 'lib/supabase';
import { TableEditor, AdminHeading } from 'components';
import { AdminLayout } from 'layouts/Admin';

import style from 'styles/pages/admin.users.module.css';
import { CreatePopup } from 'components/Admin/CreatePopup';
import { useState } from 'react';
import { message } from 'react-message-popup';

const SCHEMA = [
    {
        id: 'name',
        name: 'Nome',
    },
    {
        id: 'surname',
        name: 'Cognome',
    },
    {
        id: 'email',
        name: 'Email',
    },
    {
        id: 'role',
        name: 'Ruolo',
    },
    {
        id: 'joined_in',
        name: 'Membro dal',
        type: 'date',
    },
];

export default function AdminPanel() {
    const [initialPopupData, setInitialPopupData] = useState(null);

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('name, surname, email, role, joined_in');
        if (error) throw error.message;
        return data;
    };

    const insertData = async (incData) => {
        const { data, error } = await supabase.from('users').insert(incData);
        if (error) message.error(error.message);
        else {
            message.success('Utente creato con successo');
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
                insert={insertData}
            />
            <TableEditor
                fetchData={fetchData}
                tablename="users"
                schema={SCHEMA}
                getId={(data) => ({
                    email: data.email,
                })}
                finder={(v, i, match) => v.email == match.email}
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

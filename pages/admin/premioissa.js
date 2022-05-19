import supabase from 'lib/supabase';
import { AdminHeading, CreatePopup, Loader, TableEditor } from 'components';
import { AdminLayout } from 'layouts/Admin';

import style from 'styles/pages/admin.premioissa.module.css';
import { useState, useEffect } from 'react';
import { getUiSchema } from 'lib/utils';

const ENTRY_SCHEMA = {
    competition: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                label: 'Codice',
            },
            school_name: {
                type: 'string',
                label: 'Scuola',
            },
            class_name: {
                type: 'string',
                label: 'Classe',
            },
            author: {
                type: 'string',
                label: 'Autori',
            },
            category: {
                type: 'string',
                label: 'Categoria',
            },
            score: {
                type: 'number',
                label: 'Voto',
                maximum: 100,
                minimum: 0,
            },
            referee: {
                type: 'string',
                label: 'Referente',
            },
        },
    },
    gallery: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                label: 'Codice',
            },
            school_name: {
                type: 'string',
                label: 'Scuola',
            },
            class_name: {
                type: 'string',
                label: 'Classe',
            },
            author: {
                type: 'string',
                label: 'Autori',
            },
            category: {
                type: 'string',
                label: 'Categoria',
            },
            score: {
                type: 'number',
                label: 'Voto',
                maximum: 100,
                minimum: 0,
            },
            referee: {
                type: 'string',
                label: 'Referente',
            },
            data: {
                type: 'object',
                label: 'Info Progetto',
                properties: {
                    desc: {
                        label: 'Descrizione',
                        type: 'string',
                    },
                    title: {
                        label: 'Titolo',
                        type: 'string',
                    },
                    embed: {
                        label: 'Link Risorsa',
                        type: 'string',
                    },
                    preview: {
                        label: 'Link Copertina',
                        type: 'string',
                    },
                },
            },
        },
    },
};

function Entries({ competition, type }) {
    const [newPopup, setNewPopup] = useState(null);
    const [entries, setEntries] = useState(null);

    useEffect(() => {
        const fetchEntries = async () => {
            const { data, error } = await supabase
                .from('competition_entries')
                .select()
                .eq('competition', competition);
            if (error) message.error('[PG]: ' + error.message);
            else return data;
        };

        if (competition) fetchEntries().then((d) => setEntries(d));
    }, [competition]);

    const insertEntry = async (incData) => {
        let errors;
        const validate = (await import('jsonschema')).validate;
        if ((errors = validate(incData, ENTRY_SCHEMA[type]).errors).length > 0)
            return errors.forEach((v) => message.error(v.stack));

        const res = await supabase.from('competition_entries').insert({
            competition,
            ...incData,
        });
        if (res.error) message.error(res.error.message);
        else {
            message.success('Partecipante creato con successo');
            setEntries([...entries, ...res.data]);
            setNewPopup(false);
        }
    };

    return type && competition ? (
        <>
            <CreatePopup
                visible={newPopup}
                close={() => setNewPopup(false)}
                name={'Nuovo Partecipante'}
                schema={ENTRY_SCHEMA[type]}
                uischema={getUiSchema(ENTRY_SCHEMA[type])}
                insert={insertEntry}
            />
            <TableEditor
                data={entries}
                tablename="competition_entries"
                schema={ENTRY_SCHEMA[type]}
                uischema={getUiSchema(ENTRY_SCHEMA[type])}
                finder={(v, _, match) =>
                    v.id === match.id || v.competition === match.competition
                }
                remove={async ({ id, competition }) => {
                    const { error } = await supabase
                        .from('competition_entries')
                        .delete()
                        .match({ id, competition });

                    if (error) message.error(error.message);
                    else {
                        setEntries(entries.filter((entry) => entry.id != id));
                        message.success('Partecipante rimosso con successo!');
                    }
                }}
                // edit={(data, id, index) => {
                //     setInitialPopupData(data);
                //     setOldId(id);
                //     setUpdateIndex(index);
                // }}
                buttons={() => (
                    <button
                        className="button"
                        onClick={() => setNewPopup(true)}
                    >
                        Nuovo Partecipante
                    </button>
                )}
                getId={(data) => ({
                    competition: data.competition,
                    id: data.id,
                })}
            />
        </>
    ) : (
        <Loader space />
    );
}

const COMPETITION_SCHEMA = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            label: 'Edizione',
            default: new Date().getFullYear() - 2009,
            minimum: new Date().getFullYear() - 2009,
        },
        name: {
            type: 'string',
            label: 'Nome',
        },
        slug: {
            type: 'string',
            label: 'Url Corto',
        },
        type: {
            type: 'string',
            enum: ['gallery', 'competition'],
            label: 'Tipo',
        },
    },
};

export default function PremioIssa() {
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [competitions, setCompetitions] = useState(null);
    const [newPopup, setNewPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('competitions')
                .select()
                .order('id', { ascending: false });
            if (error) throw error.message;
            return data;
        };

        fetchData().then((d) => {
            setCompetitions(d);
            d.length > 0 ? setSelectedCompetition(d[0]) : null;
        });
    }, []);

    const insertComp = async (incData) => {
        let errors;
        const validate = (await import('jsonschema')).validate;
        if ((errors = validate(incData, COMPETITION_SCHEMA).errors).length > 0)
            return errors.forEach((v) => message.error(v.stack));

        const res = await supabase.from('competitions').insert(incData);
        if (res.error) message.error(res.error.message);
        else {
            message.success('Competizione creata con successo');
            setCompetitions([...competitions, ...res.data]);
            setNewPopup(false);
        }
    };

    return (
        <div className={style.wrapper}>
            <AdminHeading desc="Qui potrai visualizzare e modificare le informazioni sulle competizioni PremioISSA sulla piattaforma">
                Premio Issa
            </AdminHeading>
            <div className={style.compSelector}>
                <select
                    onChange={(e) => {
                        setSelectedCompetition(competitions[e.target.value]);
                    }}
                >
                    {competitions &&
                        competitions.map((v, i) => (
                            <option key={i} value={i}>
                                {v.name}
                            </option>
                        ))}
                </select>
                <button
                    className="button"
                    onClick={() => setNewPopup(!newPopup)}
                >
                    Nuova Competizione
                </button>
            </div>
            <CreatePopup
                visible={newPopup}
                close={() => setNewPopup(false)}
                name={'Nuova Competizione'}
                schema={COMPETITION_SCHEMA}
                uischema={getUiSchema(COMPETITION_SCHEMA)}
                insert={insertComp}
            />
            <hr className={style.divider} />
            <Entries
                competition={selectedCompetition?.id}
                type={selectedCompetition?.type}
            />
        </div>
    );
}

PremioIssa.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

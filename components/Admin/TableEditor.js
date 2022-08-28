// import { Loader } from '../Loader';
import supabase from 'lib/supabase';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import { message } from 'react-message-popup';

import style from 'styles/components/admin.tableeditor.module.css';

// eslint-disable-next-line react/display-name
const Input = React.forwardRef((props, ref) => {
    switch (props.as) {
        case 'textarea':
            return <textarea {...props} ref={ref} />;
        default:
            return <input {...props} ref={ref} />;
    }
});

export function DataPopup({ insert }) {
    return <div className={style.dataPopup}></div>;
}

export function TableRow({ data, edit, remove, update, schema, getId, index }) {
    const [editing, setEditing] = useState(null);
    const inputEl = useRef(null);
    const editingRef = useRef(null);

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (
                editingRef.current &&
                inputEl.current != e.target &&
                e.target.getAttribute('data-ignore-click') != 'true'
            )
                setEditing(null);
        };

        if (document) document.addEventListener('click', checkOutsideClick);

        return () => {
            document.removeEventListener('click', checkOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (!editing) inputEl.current = null;
        editingRef.current = editing;
    }, [editing]);

    const renderValue = (id, v) => (v.render ? v.render(data) : data[id]);

    const changeValue = (id, v) => update(getId(data), { [id]: v });

    return (
        <div className={[style.row, editing && style.editing].join(' ')}>
            {Object.entries(schema.properties).map(([id, v]) =>
                v.type != 'object' ? (
                    <div
                        key={id}
                        onClick={() => setEditing(id)}
                        className={editing == id ? style.editing : null}
                        data-ignore-click="true"
                    >
                        {editing == id && !v.uneditable ? (
                            <Input
                                type={v.type || 'string'}
                                placeholder={v.name}
                                value={renderValue(id, v)}
                                onChange={(e) =>
                                    changeValue(id, e.target.value)
                                }
                                as={v.as}
                                ref={inputEl}
                            />
                        ) : (
                            renderValue(id, v) || 'No Data'
                        )}
                    </div>
                ) : null
            )}
            {edit && (
                <div
                    onClick={() => edit(data, getId(data), index)}
                    className={style.buttonCell}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </div>
            )}
            {remove && (
                <div
                    onClick={() => remove(getId(data))}
                    className={style.buttonCell}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}

export function TableEditor({
    data,
    schema,
    getId,
    finder,
    tablename,
    buttons,
    edit,
    remove,
}) {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState(null);
    const [changeTimeout, setChangeTimeout] = useState(null);

    useEffect(() => {
        if (!data) return;
        setFiltered(data);
    }, [data]);

    useEffect(() => {
        updateSelected();
    }, [filtered, query]);

    const search = async (query) => {
        if (!data) return;
        const Fuse = (await import('fuse.js')).default;
        const fuse = new Fuse(data, {
            keys: Object.keys(schema.properties),
            findAllMatches: true,
        });
        setFiltered(fuse.search(query).map((v) => v.item));
    };

    const updateSelected = async () => {
        if (!query || query == '') return setFiltered(data);
        // if (searchTimeout.current) clearTimeout(searchTimeout.current);
        // searchTimeout.current = setTimeout(async () => {
        //   await searchTrailhead(query);
        // }, 0);
        await search(query);
    };

    const updateCourse = async (match, value) => {
        const courseIndex = filtered.findIndex((v, i) => finder(v, i, match));
        filtered[courseIndex] = {
            ...filtered[courseIndex],
            ...value,
        };
        updateSelected();

        if (changeTimeout) clearTimeout(changeTimeout);

        setChangeTimeout(
            setTimeout(async () => {
                const { data, error } = await supabase
                    .from(tablename)
                    .update(value)
                    .match(match);

                if (error) return message.error(error.message);
                message.success('Cambiamento effettuato');
            }, 3000)
        );
    };

    const { properties } = schema;
    return (
        filtered && (
            <>
                <div className={style.topButtons}>
                    {buttons && (
                        <div className={style.buttons}>{buttons()}</div>
                    )}
                    <div className={style.searchBox}>
                        <input
                            type="string"
                            className={style.searchInput}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className={style.searchIcon}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div className={style.tableWrapper}>
                    <div className={style.table}>
                        <div className={style.header}>
                            {Object.entries(properties).map(
                                ([key, { label, type }]) =>
                                    type != 'object' ? (
                                        <p key={key}>{label}</p>
                                    ) : null
                            )}
                            {edit && <p className={style.buttonCell}>Mod.</p>}
                            {remove && (
                                <p className={style.buttonCell}>Elim.</p>
                            )}
                        </div>
                        {filtered.map((v, i) => (
                            <TableRow
                                data={v}
                                key={i}
                                index={i}
                                update={updateCourse}
                                schema={schema}
                                getId={getId}
                                edit={edit}
                                remove={remove}
                            />
                        ))}
                        <div className={style.footer}>
                            {Object.values(properties).map((_v, i) => (
                                <p key={i}>{i == 0 ? 'Total' : ''}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

import { useState } from 'react';

import style from 'styles/components/admin.createpopup.module.css';

export function CreatePopup({
    initialData,
    insert,
    visible,
    close,
    schema,
    name,
}) {
    const [data, setData] = useState(initialData);

    const changeData = (id, value) => {
        setData({
            ...data,
            [id]: value,
        });
    };

    const getValue = (id) => (data ? (id in data ? data[id] : null) : null);

    return (
        visible && (
            <div className={style.wrapper}>
                <div className={style.closer} onClick={close} />
                <div className={style.popup}>
                    <h3>{name}</h3>
                    {schema.map((v, i) => (
                        <div className={style.input} key={i}>
                            <label htmlFor={v.id}>{v.name}</label>
                            <input
                                type={v.type || 'string'}
                                name={v.id}
                                id={v.id}
                                onChange={(e) =>
                                    changeData(v.id, e.target.value)
                                }
                                value={getValue(v.id)}
                            />
                        </div>
                    ))}
                    <button onClick={() => insert(data)} className="button">
                        Aggiungi
                    </button>
                </div>
            </div>
        )
    );
}

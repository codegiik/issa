import { useEffect, useState } from 'react';
import { JsonForms } from '@jsonforms/react';

// import { vanillaRenderers, vanillaCells } from '@jsonforms/vanilla-renderers';
import {
    materialRenderers,
    materialCells,
} from '@jsonforms/material-renderers';

import style from 'styles/components/admin.createpopup.module.css';

export function CreatePopup({
    initialData,
    insert,
    visible,
    close,
    schema,
    uischema,
    renderers,
    cells,
    name,
}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    if (!visible) return;
    return (
        <div className={style.wrapper}>
            <div className={style.closer} onClick={close} />
            <div className={style.popup}>
                <h3>{name}</h3>
                <JsonForms
                    schema={schema}
                    renderers={renderers || materialRenderers}
                    cells={cells || materialCells}
                    uischema={uischema}
                    data={data}
                    onChange={({ data, _errors }) => setData(data)}
                />
                <button onClick={() => insert(data)} className="button">
                    Aggiungi
                </button>
            </div>
        </div>
    );
}

import { JsonForms } from '@jsonforms/react';
import { useEffect, useState } from 'react';

import {
    materialRenderers,
    materialCells,
} from '@jsonforms/material-renderers';

export type QuickFormProps = {
    initialData?: any;
    schema: any;
    uischema?: any;
    renderers?: any;
    name: string;
    cells?: any;
    onChange?: (data: any) => void;
    onError?: (err: any) => void;
};

export function QuickForm({
    initialData,
    schema,
    uischema,
    renderers,
    cells,
    name,
    onChange,
    onError,
}: QuickFormProps) {
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState<Partial<Error>[] | undefined>(
        undefined
    );

    useEffect(() => {
        if (onChange) onChange(data);
    }, [onChange, data]);

    useEffect(() => {
        if (onError) onError(errors);
    }, [onError, errors]);

    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    return (
        <div>
            <h3>{name}</h3>
            <JsonForms
                schema={schema}
                renderers={renderers}
                cells={cells}
                uischema={uischema}
                data={data}
                onChange={({ data, errors }) => {
                    setData(data);
                    setErrors(errors);
                }}
            />
        </div>
    );
}

QuickForm.defaultProps = {
    renderers: materialRenderers,
    cells: materialCells,
};

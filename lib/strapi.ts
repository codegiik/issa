import Strapi from 'strapi-sdk-js';
import { Record } from 'lib/interfaces';

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://issa-strapi.test.codegiik.com';

const strapi = new Strapi({
    url: BASE_URL,
    prefix: '/api',
    store: {
        key: process.env.NEXT_PUBLIC_STRAPI_TOKEN || '',
        useLocalStorage: true,
    },
});

export const getCompleteUrl = (uri: string) =>
    uri ? new URL(uri, BASE_URL).toString() : null;

export const getFileUrl = (
    record: any,
    param: string,
    index: number = 0,
    format: undefined | string = undefined
) => {
    const data = record[param]?.data;
    let url;

    if (Array.isArray(data)) {
        if (format) url = data[index]?.attributes?.formats?.[format]?.url;
        else url = data[index]?.attributes?.url;
    } else {
        if (format) url = data?.attributes?.formats?.[format]?.url;
        else url = data?.attributes?.url;
    }

    return getCompleteUrl(url);
};

function unwrapRecursive(data: Record<any>, recursive: string[]): void {
    recursive.forEach((key) => {
        if (!data.attributes[key]) return;
        data.attributes[key] = unwrap(data.attributes[key].data);
    });
}

export function unwrap<StrapiElement>(
    data?: Record<StrapiElement> | Record<StrapiElement>[],
    recursive?: string[]
): StrapiElement | StrapiElement[] | undefined {
    if (!data) return;

    if (!Array.isArray(data)) {
        if (recursive) unwrapRecursive(data, recursive);
        return {
            ...data.attributes,
            id: data.id,
        };
    }

    return data.map((el) => {
        if (recursive) unwrapRecursive(el, recursive);

        return {
            ...el.attributes,
            id: el.id,
        };
    });
}

export default strapi;

import PocketBase, { Record } from 'pocketbase';

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || 'https://issa-pocketbase.codegiik.com';

// @ts-ignore
const pocketbase = new PocketBase(BASE_URL, 'it-IT');

export const getFileUrl = (record: Record, param: string, thumb?: string) => {
    if (!record || !param) return;
    const endpoint = new URL(
        `/api/files/${record['@collectionName']}/${record.id}/${record[param]}`,
        BASE_URL
    );

    if (thumb) endpoint.searchParams.append('thumb', thumb);

    return endpoint;
};

export default pocketbase;

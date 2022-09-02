import Strapi from 'strapi-sdk-js';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:1337';

const strapi = new Strapi({
    url: BASE_URL,
    prefix: '/api',
    store: {
        key: '6660f4fdaf7e94d0dc69b2b2c6c63bbc1d7a0e4621f80bc788465f045430caea411a74c8e3c69ada468a9cfba9757ad549c93b1edbec95b6f22cf49c3a5bc819ca154d9c59b4c0fe7fdaf768662204037f512f208328fb47967686e687c58f3ef49933b1955439a2a3eb4284544a2069c2625ea0e19c7bf9091abb5a04916239',
        useLocalStorage: true,
    },
});

export const getCompleteUrl = (uri: string) =>
    uri ? new URL(uri, BASE_URL).toString() : null;

export const getFileUrl = (
    record: any,
    param: string,
    format: undefined | string = undefined
) => {
    let url;

    if (format) url = record[param]?.data?.attributes?.formats?.[format]?.url;
    else url = record[param]?.data?.attributes?.url;

    return getCompleteUrl(url);
};

export default strapi;

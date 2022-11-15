// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import md5 from 'md5';

interface Data {
    content: string;
}

const STRAPI_MEMBERS_TOKEN = process.env.STRAPI_MEMBERS_TOKEN;
const NEXT_PUBLIC_STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const pass = req.query.pass;
    if (!pass) return res.status(400).json({ content: 'No password provided' });

    const data = await axios
        .get(`${NEXT_PUBLIC_STRAPI_BASE_URL}/api/members-area`, {
            headers: {
                Authorization: `Bearer ${STRAPI_MEMBERS_TOKEN}`,
            },
        })
        .then((r) => r.data)
        .then((r) => r.data.attributes);

    if (pass == md5(data.password)) {
        return res.status(200).json({ content: data.content });
    } else {
        return res.status(401).json({ content: 'Unauthorized' });
    }
}

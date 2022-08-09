import path from 'path';
import { createReadStream, unlinkSync } from 'fs';

import nextConnect from 'next-connect';
import formMiddleware from 'middleware/forms';
import authMiddleware from 'middleware/auth';

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

const ALLOWED_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const initDrive = () => {
    const keyFile = path.join(process.cwd(), 'service.json');
    const scopes = ['https://www.googleapis.com/auth/drive'];

    const auth = new GoogleAuth({
        keyFile,
        scopes,
    });
    return google.drive({ version: 'v3', auth });
};

const handler = nextConnect();
handler.use(authMiddleware, formMiddleware);

handler.post(async (req, res) => {
    const { uuid, type } = req.query;
    if (!req.files || !uuid) {
        res.status(400).send('No file and/or UUID specified');
        return;
    }

    if (!type) {
        res.status(400).send('No destination specified');
        return;
    }

    const preview = req.files.file;
    if (!ALLOWED_TYPES.includes(preview.mimetype)) {
        res.status(400).send('Wrong file type');
        return;
    }

    const drive = initDrive();
    let parents;
    switch (type) {
        case 'post':
        case 'posts':
            parents = [process.env.GDRIVE_POSTS_FOLDER_ID];
            break;
        case 'preview':
        case 'previews':
            parents = [process.env.GDRIVE_PREVIEWS_FOLDER_ID];
            break;
        default:
            return res.status(400).send('Not a valid destination');
    }

    try {
        // Check if the file already exists
        const { data } = await drive.files.list({
            q: `name = '${uuid}'`,
            parents,
        });

        const media = {
            mimeType: preview.mimetype,
            body: createReadStream(preview.filepath),
        };

        let file;
        // Update or create new file depending on the previous check
        if (data.files.length > 0) {
            file = await drive.files.update({
                fileId: data.files[0].id,
                media,
                fields: 'id',
            });
        } else {
            const metadata = {
                name: uuid,
                parents,
            };

            file = await drive.files.create({
                resource: metadata,
                media,
                fields: 'id',
            });
            unlinkSync(preview.filepath);
        }
        return res.status(200).json({ id: file.data.id });
    } catch (err) {
        return res.status(500).send(String(err));
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;

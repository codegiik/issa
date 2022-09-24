import Main from 'layouts/Main';
import { Gallery } from 'components';
import { useEffect, useState } from 'react';
import strapi, { unwrap } from 'lib/strapi';
import { Competition, Record } from 'lib/interfaces';

export default function GalleryPage() {
    const [latestComp, setLatestComp] = useState<Competition | null>(null);

    useEffect(() => {
        const populateKeys = ['sponsors', 'attachments'];
        strapi
            .find<Record<Competition>[]>('competitions', {
                sort: 'createdAt:desc',
                populate: populateKeys.join(', '),
            })
            .then((response) => {
                const record = response.data.find(
                    (comp) => comp.attributes.type === 'gallery'
                );
                const comp = unwrap<Competition>(
                    record,
                    populateKeys
                ) as Competition;
                if (comp) setLatestComp(comp);
            });
    }, []);
    if (!latestComp) return 'Loading...';
    return <Gallery comp={latestComp} />;
}

GalleryPage.getLayout = (page: any) => <Main navbarTheme="light">{page}</Main>;

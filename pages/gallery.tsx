import Main from 'layouts/Main';
import { Gallery } from 'components';
import { useEffect, useState } from 'react';
import strapi, { unwrap } from 'lib/strapi';

export default function GalleryPage() {
    const [latestComp, setLatestComp] = useState(null);

    useEffect(() => {
        strapi
            .find('competitions', {
                sort: 'createdAt:desc',
                populate: 'cover',
            })
            .then(({ data }: { data: any }) => setLatestComp(unwrap(data)));
        //            .then(({ data }: { data: any }) => console.log(unwrap(data).find((competition: CompetitionEntriesRecord) => competition.status === CompetitionStatus.ENDED)));
    }, []);
    return <Gallery comp={latestComp} />;
}

GalleryPage.getLayout = (page: any) => <Main>{page}</Main>;

import Main from 'layouts/Main';
import supabase from 'lib/supabase';
import { Gallery } from 'components';
import { useEffect, useState } from 'react';

export default function GalleryPage() {
    const [latestComp, setLatestComp] = useState(null);

    useEffect(() => {
        const fetchLastComp = async () => {
            const { data, error } = await supabase
                .from('competitions')
                .select()
                .order('id', { ascending: false })
                .limit(1)
                .single();
            if (error) return message.error(error.message);
            return setLatestComp(data);
        };

        fetchLastComp();
    }, []);
    return <Gallery comp={latestComp} />;
}

GalleryPage.getLayout = (page) => (
    <Main navbarInitialTheme="light">{page}</Main>
);

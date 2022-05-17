import { Gallery, Heading, Podium } from 'components';
import Main from 'layouts/Main';
import supabase from 'lib/supabase';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { message } from 'react-message-popup';

import style from 'styles/pages/competitions.shower.module.css';
import Embed from 'react-embed';

export function PodiumShower({ id }) {
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.rpc('get_categories', {
                edition: id,
            });
            if (error) return message.error(error.message);
            return setCategories(data);
        };

        if (id) fetchData();
    }, [id]);

    return (
        categories &&
        categories.map((v, i) => (
            <div key={i} className={style.podiumWrapper}>
                <h3>
                    Graduatoria Categoria{' '}
                    <span className={style.type}>{v}</span>
                </h3>
                <Podium
                    data={{
                        id,
                        category: v,
                    }}
                />
            </div>
        ))
    );
}

export default function CompetitionShower() {
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('competitions')
                .select()
                .eq('id', router.query.id);
            if (error) return message.error(error.message);
            else if (data.length <= 0)
                return message.error('Competizione non trovata');
            return setData(data[0]);
        };

        if (router.query.id) fetchData();
    }, [router]);

    const getButtons = () => (
        <>
            <button className="button" onClick={() => setSelected('bando')}>
                Bando
            </button>
            <button className="button" onClick={() => setSelected('podium')}>
                Podio
            </button>
            {data.type == 'gallery' && (
                <button
                    onClick={() => setSelected('gallery')}
                    className="button"
                >
                    Museo Virtuale
                </button>
            )}
        </>
    );

    const getSelected = () => {
        switch (selected) {
            case 'gallery':
                return <Gallery className={style.gallery} />;
            case 'podium':
                return <PodiumShower id={data.id} />;
            default:
                return (
                    <div className={style.bandi}>
                        {data.info &&
                            Array.isArray(data.info) &&
                            data.info.map((v, i) => (
                                <Embed url={v.href} key={i} />
                            ))}
                    </div>
                );
        }
    };

    return data ? (
        <>
            <Heading className={style.heading}>{data.name}</Heading>
            <div className={style.wrapper}>
                <div className={style.selector}>{getButtons()}</div>
                {getSelected()}
            </div>
        </>
    ) : null;
}

CompetitionShower.getLayout = (page) => <Main>{page}</Main>;

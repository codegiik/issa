import { Heading, CompetitionTile } from 'components';
import Main from 'layouts/Main';
import supabase from 'lib/supabase';
import { useEffect, useState } from 'react';
import { message } from 'react-message-popup';

/* Style */
import style from 'styles/pages/competitions.module.css';

export default function Competitions() {
    const [competitions, setCompetitions] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('competitions')
                .select()
                .order('id', {
                    ascending: false,
                });
            if (error) return message.error(error.message);

            setCompetitions(data);
        };

        fetchData();
    }, []);
    console.log(competitions);

    return (
        <>
            <Heading className={style.heading}>Competizioni</Heading>
            <div className={style.wrapper}>
                {competitions &&
                    Array.isArray(competitions) &&
                    competitions.map((v, i) => (
                        <CompetitionTile
                            data={v}
                            key={i}
                            className={style.tile}
                        />
                    ))}
            </div>
        </>
    );
}

Competitions.getLayout = (page) => <Main>{page}</Main>;

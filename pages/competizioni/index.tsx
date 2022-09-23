import { CompetitionTile, Heading } from 'components';
import Main from 'layouts/Main';
import { Competition } from 'lib/interfaces';
import strapi from 'lib/strapi';
import { useEffect, useState } from 'react';
import style from 'styles/pages/competitions.module.css';

export default function CompetitionsPage() {
    const [competitions, setCompetitions] = useState<Competition[] | undefined>(
        undefined
    );

    useEffect(() => {
        strapi
            .find('competitions', {
                sort: 'createdAt:desc',
                populate: '*',
            })
            .then(
                ({ data }: { data: any }) =>
                    setCompetitions(
                        data.map((comp: any) => ({
                            ...comp.attributes,
                            id: comp.id,
                        }))
                    ),
                ({ error }) => error
            );
    }, []);

    return (
        <section className={style.wrapper}>
            <Heading>Tutte le Competizioni</Heading>
            {competitions &&
                competitions.map((comp: any) => (
                    <CompetitionTile
                        competition={comp}
                        key={comp.id}
                        className={style.tile}
                    />
                ))}
        </section>
    );
}

CompetitionsPage.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

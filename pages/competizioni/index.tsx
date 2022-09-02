import { CompetitionTile } from 'components';
import Main from 'layouts/Main';
import { CompetitionsRecord } from 'lib/interfaces';
import strapi from 'lib/strapi';
import { useEffect, useState } from 'react';
import style from 'styles/pages/competitions.module.css';

export default function CompetitionsPage() {
    const [competitions, setCompetitions] = useState<
        CompetitionsRecord[] | undefined
    >(undefined);

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
            {competitions &&
                competitions.map((comp: any) => (
                    <CompetitionTile competition={comp} key={comp.id} />
                ))}
        </section>
    );
}

CompetitionsPage.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

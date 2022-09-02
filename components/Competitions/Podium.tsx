import { CompetitionEntriesRecord, CompetitionsRecord } from 'lib/interfaces';
import strapi from 'lib/strapi';
import { useEffect, useState } from 'react';
import style from 'styles/components/competitions.podium.module.css';

export function Podium({ competition }: { competition: CompetitionsRecord }) {
    const [placements, setPlacements] = useState<
        CompetitionEntriesRecord[] | undefined
    >(undefined);

    useEffect(() => {
        strapi
            .find('competition-entries', {
                filters: {
                    competition: {
                        id: {
                            $eq: competition.id,
                        },
                    },
                },
                populate: '*',
            })
            .then(({ data }: { data: any }) =>
                setPlacements(
                    data.map((entry: any) => ({
                        ...entry.attributes,
                        id: entry.id,
                    }))
                )
            );
    }, [competition]);

    const getSchoolName = (school: any) => school?.data?.attributes?.name;

    return placements ? (
        <div className={style.wrapper}>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Scuola</th>
                        <th>Classe</th>
                        <th>Autore/i</th>
                        <th>Referente</th>
                        <th>Codice</th>
                        <th>Voto</th>
                    </tr>
                </thead>
                <tbody>
                    {placements.map((v, i) => (
                        <tr key={i}>
                            <td>{getSchoolName(v.school)}</td>
                            <td className={style.class}>{v.class}</td>
                            <td>{v.students}</td>
                            <td>{v.referee}</td>
                            <td
                                className={[
                                    style.smCell,
                                    'uppercase font-bold',
                                ].join(' ')}
                            >
                                {v.id}
                            </td>
                            <td className={style.smCell}>{v.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : null;
}

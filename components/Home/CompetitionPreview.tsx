import { Competition, Record } from 'lib/interfaces';
import { useEffect, useState } from 'react';
import strapi, { getFileUrl, unwrap } from 'lib/strapi';
import style from 'styles/components/competitionpreview.module.css';
import Link from 'next/link';

export function CompetitionPreview() {
    const [competition, setCompetition] = useState<Competition | undefined>(
        undefined
    );

    useEffect(() => {
        strapi
            .find<Record<Competition>[]>('competitions', {
                sort: 'edition:desc',
                populate: '*',
            })
            .then((response) => {
                const record = response.data.find(
                    (comp) => comp.attributes.type === 'gallery'
                );
                const comp = unwrap<Competition>(record, [
                    'attachments',
                    'cover',
                ]) as Competition;
                if (comp) setCompetition(comp);
            });
    }, []);

    return competition ? (
        <section id="premio_issa" className={style.wrapper}>
            <div className={style.details}>
                <h2>{competition.name}</h2>
                <div className={style.descWrapper}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: competition.description,
                        }}
                        className={style.desc}
                    />
                    <div className={style.descOverlay} />
                </div>
                <Link
                    href={{
                        pathname: '/competizioni/[...id]',
                        query: {
                            id: [competition.id],
                        },
                    }}
                >
                    <span className={style.continue}>Continua</span>
                </Link>
                <div className={style.buttons}>
                    {competition.status !== 'ended' ? (
                        <Link
                            href={{
                                pathname: '/competizioni/[...id]',
                                query: {
                                    id: [competition.id],
                                },
                            }}
                        >
                            <div className={style.button}>Vai al Bando</div>
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={{
                                    pathname: '/competizioni/[...id]',
                                    query: {
                                        // @ts-ignore
                                        id: [competition.id, 'gallery'],
                                    },
                                }}
                            >
                                <div className={style.button}>Gallery</div>
                            </Link>
                            <Link
                                href={{
                                    pathname: '/competizioni/[...id]',
                                    query: {
                                        // @ts-ignore
                                        id: [competition.id, 'classifica'],
                                    },
                                }}
                            >
                                <div className={style.button}>Classifica</div>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {competition?.cover && (
                <div className={style.cover}>
                    <img
                        src={getFileUrl(competition, 'cover')}
                        alt={competition.name}
                    />
                    <div className={style.overlay} />
                </div>
            )}
        </section>
    ) : null;
}

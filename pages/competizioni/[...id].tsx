import clsx from 'clsx';
import { Gallery, Collapse } from 'components';
import { Podium } from 'components/Competitions/Podium';
import Main from 'layouts/Main';
import type { Competition, Record } from 'lib/interfaces';
import strapi, { getFileUrl, unwrap } from 'lib/strapi';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from 'styles/pages/competition.id.module.css';

export function ScoreboardTab({
    competition,
}: {
    competition: Competition | undefined;
}) {
    return competition ? (
        <div className={style.details}>
            <Podium competition={competition} />
        </div>
    ) : null;
}

export function GalleryTab({
    competition,
    baseUri,
    router,
}: {
    competition: Competition | undefined;
    baseUri: string;
    router: NextRouter;
}) {
    return (
        <Link href={`${baseUri}/`}>
            <div>Gallery</div>
        </Link>
    );
}

export function DescriptionTab({
    competition,
}: {
    competition: Competition | undefined;
}) {
    const [urlActive, setUrlActive] = useState<boolean>(true);

    return competition ? (
        <div className={style.details}>
            {competition?.url && (
                <Collapse
                    isHidden={false}
                    callback={() => setUrlActive(!urlActive)}
                    className="max-h-[85vh]"
                    titleClassname="hover:bg-primary hover:text-base-200"
                    wrapperClassname={[
                        urlActive ? 'max-w-full h-[85vh]' : 'max-w-[250px]',
                        style.collapse,
                    ].join(' ')}
                    title="Visualizza il Vecchio Portale"
                >
                    <iframe src={competition?.url} />
                </Collapse>
            )}
            <div
                className={style.desc}
                dangerouslySetInnerHTML={{ __html: competition?.description }}
            />
            <div className={style.attachments}>
                {competition?.attachments?.map((attach: any, index: number) => {
                    const attachUrl = getFileUrl(
                        competition,
                        'attachments',
                        index
                    );

                    return (
                        attachUrl && (
                            <a href={attachUrl}>
                                <div className={style.download} key={index}>
                                    <div className={style.name}>
                                        <p>{attach.name}</p>
                                        <span>{attach.caption}</span>
                                    </div>
                                    <span className="material-symbols-sharp">
                                        file_download
                                    </span>
                                </div>
                            </a>
                        )
                    );
                })}
            </div>
        </div>
    ) : null;
}

export default function CompetitionDetailsPage() {
    const router = useRouter();
    const [competition, setCompetition] = useState<Competition | undefined>(
        undefined
    );

    useEffect(() => {
        if (router.query.id && router.query.id.length > 0)
            strapi
                .findOne<Record<Competition>>(
                    'competitions',
                    router.query.id[0],
                    {
                        populate: {
                            attachments: '*',
                            cover: '*',
                            sponsors: {
                                populate: ['logo'],
                            },
                        },
                    }
                )
                .then(
                    ({ data }) =>
                        setCompetition(
                            unwrap(data, [
                                'attachments',
                                'sponsors',
                            ]) as Competition
                        ),
                    ({ error }) => error
                );
    }, [router]);

    const getCurrentTab = () => {
        if (!router.query.id) return null;
        const tab = router?.query?.id[1];

        switch (tab) {
            case 'scoreboard':
            case 'classifica':
                return <ScoreboardTab competition={competition} />;
            case 'galleria':
            case 'gallery':
                return (
                    competition && (
                        <Gallery
                            baseUri={`/competizioni/${competition.id}/gallery`}
                            comp={competition}
                        />
                    )
                );
            default:
                return <DescriptionTab competition={competition} />;
        }
    };

    const getCurrentTabName = () => {
        if (!router.query.id) return null;
        return router?.query?.id[1];
    };

    return competition ? (
        <section className={style.wrapper}>
            <div className={style.topBar}>
                {competition?.cover?.data && (
                    <div className={style.previewImage}>
                        <img
                            src={getFileUrl(competition, 'cover')}
                            alt="preview"
                        />
                        <div className={style.overlay} />
                    </div>
                )}
                <h1 className={style.title}>{competition.name}</h1>
                <nav className={style.tabSelector}>
                    <Link href={`/competizioni/${competition.id}/`}>
                        <div
                            className={clsx(
                                style.tab,
                                getCurrentTabName() == null && style.selected
                            )}
                        >
                            Bando
                        </div>
                    </Link>
                    {competition.status === 'ended' && (
                        <Link
                            href={`/competizioni/${competition.id}/classifica`}
                        >
                            <div
                                className={clsx(
                                    style.tab,
                                    getCurrentTabName() === 'classifica' &&
                                        style.selected
                                )}
                            >
                                Classifica
                            </div>
                        </Link>
                    )}
                    {competition.type === 'gallery' && (
                        <Link href={`/competizioni/${competition.id}/gallery`}>
                            <div
                                className={clsx(
                                    style.tab,
                                    getCurrentTabName() === 'gallery' &&
                                        style.selected
                                )}
                            >
                                Galleria Virtuale
                            </div>
                        </Link>
                    )}
                </nav>
            </div>
            <div className={style.tabSelected}>{getCurrentTab()}</div>
        </section>
    ) : null;
}

CompetitionDetailsPage.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

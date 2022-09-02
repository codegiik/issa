import clsx from 'clsx';
import { Embed } from 'components';
import { Podium } from 'components/Competitions/Podium';
import Main from 'layouts/Main';
import { CompetitionsRecord } from 'lib/interfaces';
import strapi, { getFileUrl } from 'lib/strapi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from 'styles/pages/competition.id.module.css';

export function ScoreboardTab({
    competition,
}: {
    competition: CompetitionsRecord | undefined;
}) {
    return (
        <div className={style.details}>
            <Podium competition={competition} />
        </div>
    );
}

export function GalleryTab({
    competition,
}: {
    competition: CompetitionsRecord | undefined;
}) {
    return <div>Gallery</div>;
}

export function DescriptionTab({
    competition,
}: {
    competition: CompetitionsRecord | undefined;
}) {
    return (
        <div className={style.details}>
            <p className={style.desc}>{competition?.description}</p>
            <div className={style.attachments}>
                {competition?.attachments?.data.map(
                    (attach: any, index: number) => {
                        const attachUrl = getFileUrl(
                            competition,
                            'attachments',
                            index
                        );

                        console.log(attach);

                        return (
                            attachUrl && (
                                <div className={style.download} key={index}>
                                    <div className={style.name}>
                                        <p>{attach.attributes.name}</p>
                                        <span>{attach.attributes.caption}</span>
                                    </div>
                                    <span className="material-symbols-sharp">
                                        file_download
                                    </span>
                                </div>
                            )
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default function CompetitionDetailsPage() {
    const router = useRouter();
    const [competition, setCompetition] = useState<
        CompetitionsRecord | undefined
    >(undefined);

    useEffect(() => {
        if (router.query.id && router.query.id.length > 0)
            strapi
                .findOne('competitions', router.query.id[0], {
                    populate: '*',
                })
                .then(
                    ({ data }: { data: any }) =>
                        setCompetition({
                            ...data.attributes,
                            id: data.id,
                        }),
                    ({ error }) => error
                );
    }, [router]);

    console.log(competition);

    const getCurrentTab = () => {
        if (!router.query.id) return null;
        const tab = router?.query?.id[1];

        switch (tab) {
            case 'scoreboard':
            case 'classifica':
                return <ScoreboardTab competition={competition} />;
            case 'galleria':
            case 'gallery':
                return <GalleryTab competition={competition} />;
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

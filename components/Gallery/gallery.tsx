/* Components */
import { MainCanvas } from './MainCanvas';
import { Loader, WorkInfoBox, WorkSelector } from 'components';

import { CompetitionEntry, Competition, Record, Sponsor } from 'lib/interfaces';

import strapi, { getFileUrl, unwrap } from 'lib/strapi';

/* Hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/* Gallery */
import style from 'styles/pages/gallery.module.css';

type HelpBoxProps = {
    competition: Competition;
    active: boolean;
};

export function HelpBox({ competition, active }: HelpBoxProps) {
    return (
        <div
            className={[
                style.helpBox,
                'animate__animated animate__slower animate__delay-2s',
                active ? 'animate__fadeIn' : 'hidden',
            ].join(' ')}
        >
            <p
                className={[
                    style.helpBoxTip,
                    'animate__animated animate__delay-5s animate__pulse',
                ].join(' ')}
            >
                Clicca su uno dei quadri per visionarlo
            </p>
            {competition?.sponsors && competition?.sponsors?.length > 0 && (
                <div className={style.patronsWrapper}>
                    <p>Patrocinio di</p>
                    <div className={style.patrons}>
                        {competition?.sponsors.map((v: Sponsor, i: number) => (
                            <div key={`sponsor-${i}`}>
                                <img
                                    className={style.patron}
                                    src={getFileUrl(v, 'logo')}
                                    alt={v.name}
                                    title={v.name}
                                    key={i}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function Gallery({
    className,
    comp,
    baseUri = '/gallery',
}: {
    className?: string;
    comp: Competition;
    baseUri?: string;
}) {
    const [clicked, setClicked] = useState<CompetitionEntry | undefined>(
        undefined
    );
    const [entries, setEntries] = useState<CompetitionEntry[]>([]);
    const [listOpen, setListOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const populateKeys: string[] = [
            'school',
            'competition',
            'attachment',
            'attachment_url',
        ];
        strapi
            .find<Record<CompetitionEntry>[]>('competition-entries', {
                sort: 'createdAt:desc',
                populate: populateKeys.join(', '),
            })
            .then(({ data }) => {
                const result = unwrap(data, populateKeys) as CompetitionEntry[];
                console.log(result);
                setEntries(
                    result.filter((e) => e.competition?.name === comp.name)
                );
            });
    }, [comp]);

    useEffect(() => {
        if (entries && entries.length > 0) {
            const id = router.query?.gallery_id;
            if (id && !Array.isArray(id))
                setClicked(entries.find((v) => v.id === parseInt(id)));
            else setClicked(undefined);
        }

        console.log(comp);
    }, [router.query, entries]);

    const switchByIndexDiff = (diff: any) => {
        if (!diff) return;
        let index =
            (entries.findIndex((v) => v.id == clicked?.id) + diff) %
            entries.length;
        if (index == -1) index = entries.length - 1;

        router.push(
            {
                pathname: '/gallery',
                query: {
                    id: entries[index]?.id,
                },
            },
            undefined,
            { shallow: true }
        );
    };

    const switchTo = (id: number) => {
        if (!id) return;
        router.push(`${baseUri}?gallery_id=${id}`, undefined, {
            shallow: true,
        });
        setListOpen(false);
    };

    return comp ? (
        <section className={[style.main, className].join(' ')} id="gallery">
            <MainCanvas
                comp={comp}
                entries={entries}
                baseUri={baseUri}
                className={style.mainCanvas}
            />
            {clicked && (
                <WorkInfoBox
                    entry={clicked}
                    className={[
                        style.workInfoBox,
                        clicked ? style.active : null,
                        listOpen ? style.listOpen : null,
                    ].join(' ')}
                />
            )}
            <HelpBox active={clicked === undefined} competition={comp} />
            <WorkSelector
                active={listOpen}
                entries={entries}
                onNext={() => switchByIndexDiff(+1)}
                onPrev={() => switchByIndexDiff(-1)}
                switchTo={switchTo}
            />
            <div
                className={[
                    style.listButton,
                    listOpen ? style.close : null,
                ].join(' ')}
                onClick={() => setListOpen(!listOpen)}
            >
                <span className="material-symbols-sharp">
                    {listOpen ? 'close' : 'list'}
                </span>
            </div>
            {!clicked && <div className={style.scrollLine} />}
        </section>
    ) : (
        <Loader space />
    );
}

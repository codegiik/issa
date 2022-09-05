/* Components */
import { MainCanvas } from './MainCanvas';
import { Loader, WorkInfoBox, WorkSelector } from 'components';

import { CompetitionsRecord } from 'lib/interfaces';

import strapi, { unwrap } from 'lib/strapi';

/* Hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/* Gallery */
import style from 'styles/pages/gallery.module.css';

type HelpBoxProps = {
    competition: CompetitionsRecord;
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
            {competition?.sponsors && (
                <div className={style.patronsWrapper}>
                    <p>Patrocinio di</p>
                    <div className={style.patrons}>
                        {competition?.sponsors.map((v: any, i: number) => (
                            <img
                                className={style.patron}
                                src={v.image}
                                alt={v.name}
                                title={v.name}
                                key={i}
                            />
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
}: {
    className?: string;
    comp: CompetitionsRecord;
}) {
    const [clicked, setClicked] = useState<number | null>(null);
    const [entries, setEntries] = useState<CompetitionsRecord[]>([]);
    const [listOpen, setListOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        //         const fetchData = async () => {
        //             const { data, error } = await supabase
        //                 .from('competition_entries')
        //                 .select()
        //                 .eq('competition', comp.id);
        //             if (error) return message.error(error.message);
        //             return setEntries(data);
        //         };

        strapi
            .find('competition-entries', {
                sort: 'createdAt:desc',
                populate: '*',
            })
            .then(({ data }: { data: any }) => setEntries(unwrap(data)));
    }, [comp]);

    useEffect(() => {
        if (entries && entries.length > 0) {
            const id = router.query?.gallery_id;
            if (id && !Array.isArray(id)) setClicked(parseInt(id));
            else setClicked(null);
        }

        console.log(comp);
    }, [router.query, entries]);

    const switchByIndexDiff = (diff: any) => {
        if (!diff) return;
        let index =
            (entries.findIndex((v) => v.id == clicked) + diff) % entries.length;
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
        router.push(`/gallery?gallery_id=${id}`, undefined, { shallow: true });
        setListOpen(false);
    };

    return comp ? (
        <section className={[style.main, className].join(' ')} id="gallery">
            <MainCanvas
                className={style.mainCanvas}
                data={entries}
                comp={comp}
            />
            <WorkInfoBox
                entry={clicked}
                className={[
                    style.workInfoBox,
                    clicked ? style.active : null,
                    listOpen ? style.listOpen : null,
                ].join(' ')}
            />
            <HelpBox active={clicked === null} competition={comp} />
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
                <span className="material-icons">
                    {listOpen ? 'close' : 'list'}
                </span>
            </div>
            {!clicked && <div className={style.scrollLine} />}
        </section>
    ) : (
        <Loader space />
    );
}

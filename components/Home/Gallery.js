/* Components */
import { Loader, MainCanvas, WorkInfoBox, WorkSelector } from 'components';
import supabase from 'lib/supabase';

/* Hooks */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/* Gallery */
import style from 'styles/pages/gallery.module.css';

export function HelpBox({ edition, active }) {
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
            {edition?.patrons && (
                <div className={style.patronsWrapper}>
                    <p>Patrocinio di</p>
                    <div className={style.patrons}>
                        {edition?.patrons.map((v, i) => (
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

export function Gallery({ className, comp }) {
    const [clicked, setClicked] = useState(null);
    const [entries, setEntries] = useState(null);
    const [listOpen, setListOpen] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('competition_entries')
                .select()
                .eq('competition', comp.id);
            if (error) return message.error(error.message);
            return setEntries(data);
        };

        if (comp) fetchData();
    }, [comp]);

    useEffect(() => {
        if (entries) {
            const id = router.query?.gallery_id;
            if (id) setClicked(entries.find((v) => v.id == id));
            else setClicked(null);
        }
    }, [router.query, entries]);

    const switchByIndexDiff = (diff) => {
        if (!diff) return;
        let index =
            (entries.findIndex((v) => v.id == clicked.id) + diff) %
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

    const switchTo = (id) => {
        if (!id) return;
        router.push(`/?gallery_id=${id}#gallery`, undefined, { shallow: true });
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
            <HelpBox active={!clicked} edition={comp} />
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

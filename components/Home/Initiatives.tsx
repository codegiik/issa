import strapi, { unwrap } from 'lib/strapi';

/* assets */
import Divider from 'assets/svg/Divider';

/* comp */
import { Heading } from '../Heading';

/* hooks */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/* style */
import style from 'styles/components/initiatives.module.css';

/* @types */
import type { Initiatives as InitiativesType, Record } from 'lib/interfaces';

const INITIATIVES_DATA = [
    {
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        href: '/corsi',
        title: 'Corsi',
    },
    {
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        href: '/seminars',
        title: 'Seminari',
    },
    {
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        href: '/competizioni',
        title: 'Premio Issa',
    },
];

export function Initiatives() {
    const [initiatives, setInitiatives] = useState<
        InitiativesType[] | undefined
    >(undefined);
    const router = useRouter();

    useEffect(() => {
        strapi
            .find<Record<InitiativesType>[]>('initiatives')
            .then(({ data }) =>
                setInitiatives(unwrap(data) as InitiativesType[])
            );
    }, []);

    return initiatives ? (
        <section id="initiatives" className={style.wrapper}>
            <Heading className={style.heading}>Iniziative</Heading>
            <div className={style.boxes}>
                {initiatives.map((v, i) => (
                    <div
                        className={style.box}
                        key={i}
                        onClick={() => router.push(v.href)}
                    >
                        <h5>{v.title}</h5>
                        <Divider className={style.divider} />
                        <p>{v.description}</p>
                        <svg
                            width="53"
                            height="53"
                            viewBox="0 0 53 53"
                            xmlns="http://www.w3.org/2000/svg"
                            className={style.triangle}
                        >
                            <path d="M25 27.5L53 0V53H0L25 27.5Z" />
                        </svg>
                    </div>
                ))}
            </div>
        </section>
    ) : null;
}

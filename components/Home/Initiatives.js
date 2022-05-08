import Divider from 'assets/svgs/Divider';
import { Heading } from '../Heading';
import style from 'styles/components/initiatives.module.css';
import { useRouter } from 'next/router';

const INITIATIVES = [
    {
        title: 'Corsi',
        href: '/courses',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        title: 'Seminari',
        href: '/seminars',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        title: 'Premio Issa',
        href: '/premioissa',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
];

export function Initiatives() {
    const router = useRouter();

    return (
        <section id="initiatives" className={style.main}>
            <Heading className={style.heading}>Iniziative</Heading>
            <div className={style.initiativesContainer}>
                {INITIATIVES.map((v, i) => (
                    <div
                        className={style.initiativeBox}
                        key={i}
                        onClick={() => router.push(v.href)}
                    >
                        <h5>{v.title}</h5>
                        <Divider className={style.divider} />
                        <p>{v.desc}</p>
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
    );
}

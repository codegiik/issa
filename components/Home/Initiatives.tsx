/* assets */
import Divider from 'assets/svg/Divider';

/* comp */
import { Heading } from '../Heading';

/* hooks */
import { useRouter } from 'next/router';

/* style */
import style from 'styles/components/initiatives.module.css';

const INITIATIVES_DATA = [
    {
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        href: '/courses',
        title: 'Corsi',
    },
    {
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        href: '/seminars',
        title: 'Seminari',
    },
    {
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        href: '/competitions',
        title: 'Premio Issa',
    },
];

export function Initiatives() {
    const router = useRouter();

    return (
        <section id="initiatives" className={style.wrapper}>
            <Heading className={style.heading}>Iniziative</Heading>
            <div className={style.boxes}>
                {INITIATIVES_DATA.map((v, i) => (
                    <div
                        className={style.box}
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

import Divider from 'assets/svgs/Divider';
import { Heading } from '../Heading';
import style from 'styles/components/initiatives.module.css';
import { useRouter } from 'next/router';
import { Loader } from 'components';

export function Initiatives({ data }) {
    const router = useRouter();

    return data ? (
        <section id="initiatives" className={style.main}>
            <Heading className={style.heading}>Iniziative</Heading>
            <div className={style.initiativesContainer}>
                {data.map((v, i) => (
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
    ) : (
        <Loader space />
    );
}

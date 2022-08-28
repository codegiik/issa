import { Heading } from 'components/Heading';
import Veliero from 'assets/svgs/Veliero';

import style from 'styles/components/about.module.css';

export function About({ data }) {
    return (
        <>
            <Heading className={style.aboutTitle}>Chi siamo?</Heading>
            <section id="about" className={style.aboutSection}>
                <div className={style.aboutTextContainer}>
                    {data.split(/\n/).map((v, i) => (
                        <p className={style.aboutText} key={i}>
                            {v}
                        </p>
                    ))}
                </div>
                <Veliero className={style.veliero} />
            </section>
        </>
    );
}

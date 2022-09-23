import { useEffect, useState } from 'react';
import strapi, { unwrap } from 'lib/strapi';

/* comp */
import { Heading } from 'components/Heading';

/* assets */
import LogoIcon from 'assets/svg/LogoIcon';

/* style */
import style from 'styles/components/about.module.css';

export type AboutInfo = {
    about_content: string;
};

export function About() {
    const [content, setContent] = useState<
        AboutInfo['about_content'] | undefined
    >(undefined);

    useEffect(() => {
        strapi
            .find<AboutInfo>('about-info')
            .then(({ data }) => setContent(unwrap(data)['about_content']));
    }, []);

    return (
        <section id="about" className={style.wrapper}>
            <Heading className={style.heading}>Chi siamo?</Heading>
            <div className={style.content}>
                {content && <p className={style.text}>{content}</p>}
                <LogoIcon className={style.veliero} />
            </div>
        </section>
    );
}

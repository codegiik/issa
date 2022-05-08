import Main from 'layouts/Main';

import { About, Hero, Gallery, Initiatives } from 'components';

/* Style */
import style from 'styles/pages/index.module.css';
import { useEffect, useRef } from 'react';

export default function Home({ switchTheme }) {
    const changed = useRef(null);

    const handleScroll = (e) => {
        if (!window) return;

        if (window.scrollY > 1000) {
            switchTheme('light');
            changed.current = true;
        } else if (changed.current) {
            console.log('ciao');
            switchTheme('dark');
            changed.current = false;
        }
    };

    useEffect(() => {
        if (window) window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Hero className={style.hero} />
            <About />
            <Gallery />
            <Initiatives />
        </>
    );
}

Home.getLayout = (page) => <Main>{page}</Main>;

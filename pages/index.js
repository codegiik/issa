import Main from 'layouts/Main';

import { About, Hero } from 'components';

/* Style */
import style from 'styles/pages/index.module.css';

export default function Home() {
    return (
        <>
            <Hero className={style.hero} />
            <About />
        </>
    );
}

Home.getLayout = (page) => <Main>{page}</Main>;

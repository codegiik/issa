import { About, Hero, Initiatives } from 'components';
import Main from 'layouts/Main';

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Initiatives />
        </>
    );
}

Home.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

import { About, CompetitionPreview, Hero, Initiatives } from 'components';
import Main from 'layouts/Main';

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <CompetitionPreview />
            <Initiatives />
        </>
    );
}

Home.getLayout = (page: JSX.Element) => <Main navbarTheme="dark">{page}</Main>;

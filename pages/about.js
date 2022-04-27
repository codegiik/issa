import Main from 'layouts/Main';

/* Style */

export default function Home() {
    return <h1>Ciao</h1>;
}

Home.getLayout = (page) => <Main>{page}</Main>;

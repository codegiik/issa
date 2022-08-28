import Main from 'layouts/Main';
import type { ReactElement } from 'react';

export default function Home() {
    return 'Home';
}

Home.getLayout = (page: ReactElement) => <Main>{page}</Main>;

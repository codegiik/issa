import Main from 'layouts/Main';
import { Heading, CourseTile } from 'components';

/* Style */
import style from 'styles/pages/courses.module.css';

export default function Home() {
    return (
        <>
            <Heading className={style.heading}>Corsi</Heading>
            <CourseTile />
        </>
    );
}

Home.getLayout = (page) => <Main>{page}</Main>;

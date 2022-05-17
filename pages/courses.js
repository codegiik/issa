import Main from 'layouts/Main';
import { Heading, CourseTile, Loader } from 'components';

/* Style */
import style from 'styles/pages/courses.module.css';
import { useEffect, useState } from 'react';
import supabase from 'lib/supabase';
import { message } from 'react-message-popup';

export default function Home() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await supabase.rpc('get_last_year_courses');
            if (error) return message.error(error.message);
            return setCourses(data);
        };

        fetchCourses();
    });
    return (
        <>
            <Heading className={style.heading}>Corsi</Heading>
            <div className={style.wrapper}>
                {courses && Array.isArray(courses) ? (
                    courses.map((v, i) => <CourseTile key={i} data={v} />)
                ) : (
                    <Loader space />
                )}
            </div>
        </>
    );
}

Home.getLayout = (page) => <Main>{page}</Main>;

/* lib */
import strapi, { unwrap } from 'lib/strapi';

/* comp */
import { CourseTile, Heading } from 'components';

/* layout */
import Main from 'layouts/Main';
import { useEffect, useState } from 'react';

/* style */
import style from 'styles/pages/courses.module.css';

/* @types */
import type { Course, Record } from 'lib/interfaces';

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        strapi
            .find<Record<Course>[]>('courses', {
                sort: 'createdAt:desc',
                populate: '*',
            })
            .then(({ data }) =>
                setCourses(unwrap(data, ['attachment']) as Course[])
            );
    }, []);

    return (
        <section className={style.wrapper}>
            <Heading type="h1" className={style.heading}>
                Corsi
            </Heading>
            <div className={style.tiles}>
                {courses.map((course) => (
                    <CourseTile course={course} key={course.id} />
                ))}
            </div>
        </section>
    );
}

Courses.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

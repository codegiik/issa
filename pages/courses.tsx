/* lib */
import strapi from 'lib/strapi';

/* comp */
import { CourseTile, Heading } from 'components';

/* layout */
import Main from 'layouts/Main';
import { useEffect, useState } from 'react';

/* style */
import style from 'styles/pages/courses.module.css';

/* @types */
import type { Course } from 'lib/interfaces';

export default function Courses() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        strapi
            .find('courses', {
                sort: 'createdAt:desc',
                populate: '*',
            })
            .then(({ data }: { data: any }) =>
                setCourses(
                    data.map((course: any) => ({
                        ...course.attributes,
                        id: course.id,
                    }))
                )
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

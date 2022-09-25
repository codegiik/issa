/* lib */
import strapi, { getFileUrl, unwrap } from 'lib/strapi';

/* comp */
import { CourseTile, Heading } from 'components';

/* layout */
import Main from 'layouts/Main';
import { useEffect, useState } from 'react';

/* style */
import style from 'styles/pages/courses.module.css';

/* @types */
import type { Course, CoursesInfo, Record } from 'lib/interfaces';

export default function Courses() {
    const [coursesInfo, setCoursesInfo] = useState<CoursesInfo | undefined>();
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        strapi
            .find<Record<Course>[]>('courses', {
                sort: 'createdAt:desc',
                populate: '*',
            })
            .then(({ data }) =>
                setCourses(unwrap(data, ['attachment', 'author']) as Course[])
            );

        strapi
            .find<Record<CoursesInfo>>('courses-info', {
                populate: ['attachments'],
            })
            .then(({ data }) =>
                setCoursesInfo(unwrap(data, ['attachments']) as CoursesInfo)
            );
    }, []);

    return (
        <section className={style.wrapper}>
            <Heading type="h1" className={style.heading}>
                Corsi
            </Heading>
            {coursesInfo && (
                <div className={style.coursesInfo}>
                    <div
                        className={style.desc}
                        dangerouslySetInnerHTML={{
                            __html: coursesInfo.description,
                        }}
                    ></div>
                    <div className={style.attachments}>
                        {coursesInfo?.attachments?.map(
                            (attach: any, index: number) => {
                                const attachUrl = getFileUrl(
                                    coursesInfo,
                                    'attachments',
                                    index
                                );

                                return (
                                    attachUrl && (
                                        <a href={attachUrl}>
                                            <div
                                                className={style.download}
                                                key={index}
                                            >
                                                <div className={style.name}>
                                                    <p>{attach.name}</p>
                                                    <span>
                                                        {attach.caption}
                                                    </span>
                                                </div>
                                                <span className="material-symbols-sharp">
                                                    file_download
                                                </span>
                                            </div>
                                        </a>
                                    )
                                );
                            }
                        )}
                    </div>
                </div>
            )}
            <div className={style.tiles}>
                {courses.map((course) => (
                    <CourseTile course={course} key={course.id} />
                ))}
            </div>
        </section>
    );
}

Courses.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

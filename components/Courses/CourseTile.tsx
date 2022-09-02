/* style */
import style from 'styles/components/courses.coursetile.module.css';
import { getFileUrl } from 'lib/strapi';

/* @types */
import { CoursesRecord } from 'lib/interfaces';
import { useRouter } from 'next/router';

export type CourseTileProps = {
    course: CoursesRecord;
};

export function CourseTile({ course }: CourseTileProps) {
    const router = useRouter();

    const getProfName = (course: CoursesRecord) =>
        course['@expand']?.prof?.name || 'Nome non Registrato';

    return (
        <div className={style.wrapper}>
            <div className={style.text}>
                <p className={style.name}>{course.name}</p>
                <div
                    className={style.desc}
                    dangerouslySetInnerHTML={{
                        __html: course.description,
                    }}
                />
                <p className={style.org}>A cura di: {getProfName(course)}</p>
            </div>
            <div className={style.icons}>
                <div className={style.typology}>{course.type}</div>
                {course.attachment && (
                    <div
                        className={style.goTo}
                        onClick={() => {
                            router.push(
                                getFileUrl(course, 'attachment') || '#',
                                undefined,
                                { shallow: true }
                            );
                        }}
                    >
                        <span className="material-symbols-sharp">
                            file_download
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

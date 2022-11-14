/* lib */
import strapi, { getFileUrl, unwrap } from 'lib/strapi';

/* comp */
import { CourseTile, Heading, SeminarTile } from 'components';

/* layout */
import Main from 'layouts/Main';
import { useEffect, useState } from 'react';

/* style */
import style from 'styles/pages/seminars.module.css';

/* @types */
import type { Record, Seminar, SeminarsInfo } from 'lib/interfaces';

export default function Courses() {
    const [seminarsInfo, setSeminarsInfo] = useState<
        SeminarsInfo | undefined
    >();
    const [seminars, setSeminars] = useState<Seminar[]>([]);

    useEffect(() => {
        strapi
            .find<Record<Seminar>[]>('seminars', {
                sort: 'createdAt:desc',
                populate: '*',
            })
            .then(({ data }) =>
                setSeminars(unwrap(data, ['attachments']) as Seminar[])
            );

        strapi
            .find<Record<SeminarsInfo>>('seminars-info', {
                populate: ['attachments'],
            })
            .then(({ data }) => setSeminarsInfo(unwrap(data) as SeminarsInfo));
    }, []);

    return (
        <section className={style.wrapper}>
            <Heading type="h1" className={style.heading}>
                Seminari e Conferenze
            </Heading>
            {seminarsInfo && (
                <div className={style.seminarsInfo}>
                    <div
                        className={style.desc}
                        dangerouslySetInnerHTML={{
                            __html: seminarsInfo.description,
                        }}
                    ></div>
                </div>
            )}
            <div className={style.tiles}>
                {seminars.map((seminar) => (
                    <SeminarTile seminar={seminar} key={seminar.id} />
                ))}
            </div>
        </section>
    );
}

Courses.getLayout = (page: JSX.Element) => <Main>{page}</Main>;

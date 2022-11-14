/* style */
import style from 'styles/components/seminars.seminartile.module.css';
import { getFileUrl } from 'lib/strapi';

/* @types */
import { Seminar } from 'lib/interfaces';
import { useRouter } from 'next/router';

export type SeminarTileProps = {
    seminar: Seminar;
};

export function SeminarTile({ seminar }: SeminarTileProps) {
    const router = useRouter();

    return (
        <div className={style.wrapper}>
            <div className={style.text}>
                <p className={style.name}>{seminar.title}</p>
                <div
                    className={style.desc}
                    dangerouslySetInnerHTML={{
                        __html: seminar.description,
                    }}
                />
                <p className={style.org}>In data: {seminar.date}</p>
            </div>
            <div className={style.attachments}>
                {seminar?.attachments?.map((attach: any, index: number) => {
                    const attachUrl = getFileUrl(seminar, 'attachments', index);

                    return (
                        attachUrl && (
                            <a href={attachUrl}>
                                <div className={style.download} key={index}>
                                    <div className={style.name}>
                                        <p>{attach.name}</p>
                                        <span>{attach.caption}</span>
                                    </div>
                                    <span className="material-symbols-sharp">
                                        file_download
                                    </span>
                                </div>
                            </a>
                        )
                    );
                })}
            </div>
        </div>
    );
}

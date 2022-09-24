import { CompetitionEntry } from 'lib/interfaces';
import { getFileUrl } from 'lib/strapi';
import style from 'styles/components/workinfobox.module.css';

export type EmbedProps = {
    className?: string;
    url: string;
    width: string;
    height: string;
};

export function Embed({ url, className, width, height }: EmbedProps) {
    const getSrc = () => {
        let value: any;
        if (
            (value =
                /https?:\/\/(www\.)?youtube.(it|com)\/watch\?v\=(.*)&?/.exec(
                    url
                ))
        )
            return `https://www.youtube.com/embed/${value[3]}?autoplay=0&origin=${window.location.origin}&controls=0&rel=1`;
        else if (
            (value =
                /https?:\/\/(www\.)?docs\.google\.com\/(.+)\/(view|edit)/gi.exec(
                    url
                ))
        ) {
            return `https://docs.google.com/${value[2]}/embed`;
        } else if (
            (value =
                /https?:\/\/(www\.)?drive\.google\.com\/file\/(.+)(\/view)/gi.exec(
                    url
                ))
        ) {
            return `https://drive.google.com/file/${value[2]}/preview`;
        } else return url;
    };

    return (
        <iframe
            className={className}
            width={width}
            height={height}
            src={getSrc()}
        />
    );
}

export function WorkInfoBox({
    entry,
    className,
}: {
    entry: CompetitionEntry;
    className?: string;
}) {
    return (
        <div className={[style.workInfoBox, className].join(' ')}>
            <>
                {(entry.attachment_url || entry.attachment) && (
                    <div className={style.reactPlayerWrapper}>
                        <Embed
                            className={style.reactPlayer}
                            url={
                                entry.attachment
                                    ? (getFileUrl(
                                          entry,
                                          'attachment'
                                      ) as string)
                                    : (entry.attachment_url as string)
                            }
                            width="100%"
                            height="100%"
                        />
                    </div>
                )}
                <div className={style.infoWrapper}>
                    <h2 className={style.workTitle}>{entry.name}</h2>
                    <p className={style.workAuthor}>
                        Lavoro di {entry.students} (Referente: {entry.referee})
                    </p>
                    {/* <p className={style.workDesc}>{entry?.}</p> */}
                </div>
            </>
        </div>
    );
}

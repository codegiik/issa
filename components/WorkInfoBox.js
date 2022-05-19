import style from 'styles/components/workinfobox.module.css';

export function Embed({ url, className, width, height }) {
    const getSrc = () => {
        let value;
        if (
            (value =
                /https?:\/\/(www\.)?youtube.(it|com)\/watch\?v\=(.*)&?/.exec(
                    url
                ))
        )
            return `https://www.youtube.com/embed/${value[3]}?autoplay=0&origin=${window.location.origin}&controls=0&rel=1`;
        else if (
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

export function WorkInfoBox({ entry, className }) {
    console.log(entry?.data.embed);
    return (
        <div className={[style.workInfoBox, className].join(' ')}>
            {entry && (
                <>
                    <div className={style.reactPlayerWrapper}>
                        <Embed
                            className={style.reactPlayer}
                            url={entry.data.embed}
                            width="100%"
                            height="100%"
                        />
                    </div>
                    <div className={style.infoWrapper}>
                        <h2 className={style.workTitle}>{entry.data.title}</h2>
                        <p className={style.workAuthor}>
                            Lavoro di {entry?.author} (Referente: Prof{' '}
                            {entry?.referee})
                        </p>
                        <p className={style.workDesc}>{entry.data?.desc}</p>
                    </div>
                </>
            )}
        </div>
    );
}

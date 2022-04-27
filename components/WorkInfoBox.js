import style from 'styles/components/workinfobox.module.css'
import ReactPlayer from 'react-player'

export function WorkInfoBox({ work, className }) {
  return (
    <div className={[style.workInfoBox, className].join(' ')}>
      {work && (
        <>
          <div className={style.reactPlayerWrapper}>
            <ReactPlayer
              className={style.reactPlayer}
              url={work.embed}
              width='100%'
              height='100%'
            />
          </div>
          <div className={style.infoWrapper}>
            <h2 className={style.workTitle}>{work?.title}</h2>
            <p className={style.workAuthor}>Lavoro di {work?.author} (Referente: Prof {work?.ref})</p>
            <p className={style.workDesc}>{work?.description}</p>
          </div>
        </>
      )}
    </div>
  )
}

import style from 'styles/components/workinfobox.module.css'

export function WorkInfoBox({ work, className }) {
  return (
    <div className={[style.workInfoBox, className].join(' ')}>
      {work && (
        <>
          <h2 className={style.workTitle}>{work?.title}</h2>
          <p className={style.workAuthor}>Lavoro di {work?.author} (Referente: Prof {work?.ref})</p>
          <p className={style.workDesc}>{work?.description}</p>
        </>
      )}
    </div>
  )
}

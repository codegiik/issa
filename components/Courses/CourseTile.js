import style from 'styles/components/courses.coursetile.module.css';

export function CourseTile() {
    return (
        <div className={style.wrapper}>
            <div className={style.text}>
                <p className={style.nomeCorso}>Nome Corso</p>
                <p className={style.desc}>
                    Descrizione corso molto lunga veramente bella ed esaustiva
                    con il giusto appporto di informazioni, necessarie e
                    pragmatiche
                </p>
                <p className={style.org}>A cura di: Nome Professore</p>
            </div>
            <div className={style.icons}>
                <div className={style.typology}>A</div>
                <div className={style.goTo}>+</div>
            </div>
        </div>
    );
}

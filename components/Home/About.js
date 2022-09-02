/* comp */
import { Heading } from 'components/Heading';

/* assets */
import LogoIcon from 'assets/svg/LogoIcon';

/* style */
import style from 'styles/components/about.module.css';

export function About() {
    return (
        <>
            <section id="about" className={style.wrapper}>
                <Heading className={style.heading}>Chi siamo?</Heading>
                <div className={style.content}>
                    <p className={style.text}>
                        ISSA è un'associazione di docenti, studenti e altre
                        persone interessate al mondo della scuola e del
                        territorio, con sede in Pozzuoli (NA). Ha per fini la
                        promozione della cultura scientifica come benessere
                        individuale, valore sociale e parte integrante del
                        sapere. L'Associazione promuove ed organizza, senza
                        alcuna finalità lucrativa, manifestazioni culturali,
                        laboratoriali, e partecipa con propri soci a quelle
                        promosse ed organizzate da altre Associazioni, Enti
                        Pubblici e Privati; organizza convegni, dibattiti,
                        conferenze, concorsi; svolge ricerca e sperimentazione
                        didattica.
                    </p>
                    <LogoIcon className={style.veliero} />
                </div>
            </section>
        </>
    );
}

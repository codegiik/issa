import { Heading } from 'components/Heading';

import style from 'styles/components/about.module.css';

export function About({}) {
    return (
        <>
            <Heading className={style.aboutTitle}>Chi siamo?</Heading>
            <section id="about" className={style.aboutSection}>
                <div className={style.aboutTextContainer}>
                    <div className={style.aboutText}>
                        ISSA è un`&apos;`associazione di docenti, studenti e
                        altre persone interessate al mondo della scuola e del
                        territorio, con sede in Pozzuoli (NA). Ha per fini la
                        promozione della cultura scientifica come benessere
                        individuale, valore sociale e parte integrante del
                        sapere.
                    </div>
                    <div className={style.aboutText}>
                        L`&apos;`Associazione promuove ed organizza, senza
                        alcuna finalità lucrativa, manifestazioni culturali,
                        laboratoriali, e partecipa con propri soci a quelle
                        promosse ed organizzate da altre Associazioni, Enti
                        Pubblici e Privati; organizza convegni, dibattiti,
                        conferenze, concorsi; svolge ricerca e sperimentazione
                        didattica.
                    </div>
                </div>
            </section>
        </>
    );
}

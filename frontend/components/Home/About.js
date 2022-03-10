import {Heading} from "components/Heading";

import style from 'styles/components/about.module.css'

export function About ({}) {
  return (
    <>
      <Heading className={style.aboutTitle}>
        Chi siamo?
      </Heading>
      <section id="about" className={style.aboutSection}>
      </section>
    </>
  )
}

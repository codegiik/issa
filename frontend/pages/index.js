import Main from 'layouts/Main'

import { Hero } from 'components'

/* Style */
import style from 'styles/pages/index.module.css'


export default function Home() {
  return (
    <>
      <Hero className={style.hero} />
    </>
  )
};


Home.getLayout = (page) => (
  <Main>
    {page}
  </Main>
)

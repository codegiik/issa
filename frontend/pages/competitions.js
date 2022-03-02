import Main from 'layouts/Main';

/* Style */
import style from 'styles/pages/index.module.css'

export default function Home() {
  return (
    <h1>Ciao</h1>
  )
};


Home.getLayout = (page) => (
  <Main>
    {page}
  </Main>
)

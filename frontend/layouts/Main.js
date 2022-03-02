import {Navbar} from 'components'
import Head from 'next/head'
import style from 'styles/layouts/main.module.css'

export default function Main({ children }) {
  return (
    <main id="mainWrapper" className={style.mainWrapper}>
      <Head>
        <title>ReteISSA</title>
      </Head>
      <Navbar />
      {children}
    </main>
  )
}

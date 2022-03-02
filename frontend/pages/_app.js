import Head from 'next/head'
import 'styles/globals.css'

function Issa({ Component, pageProps }) {
  const getLayout = Component.getLayout || (v => v)

  return getLayout(
      <Component {...pageProps} />
  )
}

export default Issa

import style from 'styles/components/hero.module.css'

const NEWS = Array(5).fill({
    title: 'Lorem Ipsum Kinda Cosa',
    slug: 'lorem-ipsum-kinda-cosa',
    image: 'https://source.unsplash.com/random?landscape,fantasy,city,relax,story'
  })

export function Hero({ className }) {
  return (
    <section className={[Array.isArray(className) ? className.join(' ') : className, style.hero].join(' ')}>
      <h2 className={style.heroTitle}>Ultimi Articoli</h2>
    </section>
  )
}

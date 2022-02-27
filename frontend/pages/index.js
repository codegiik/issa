import { MainCanvas, Ground } from 'components'
import style from 'styles/pages/index.module.css'


export default function Home() {
  return (
    <MainCanvas className={style.main}>
      <Ground />
    </MainCanvas>
  )
}

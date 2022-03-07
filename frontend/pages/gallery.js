import { MainCanvas } from 'components'
import { useMemo } from 'react'
import { lorempics } from 'lib/utils'
import style from 'styles/pages/index.module.css'

export default function Gallery() {
  const images = useMemo(() =>
    Array.from({ length: 10 },
      (v, k) => ({ 
        url: lorempics(k, 500, 500),
        position: [(-10 + k * 2), 0, -2],
        rotation: [0, 0, 0]
      })
    ));
  
  return (
    <MainCanvas className={style.main} images={images} />
  )
}

// Components
import { MainCanvas, WorkInfoBox } from 'components'
import Main from 'layouts/Main'

// Hooks
import {useRouter} from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'

// Lib
import useSWR from 'swr'
import axios from 'axios'

// Style
import style from 'styles/pages/gallery.module.css'

const useWorks = query => {
  const edition = query?.edition || (new Date()).getFullYear()
  const { data } = useSWR(`/api/gallery?edition=${edition}`, url => axios.get(url).then(r => r.data))
 
  return {
    works: data?.works || [],
    edition: data?.edition
  }
}

export function HelpBox({ edition, active }) {
  return (
    <div className={[style.helpBox, 'animate__animated animate__slower animate__delay-2s', active ? 'animate__fadeIn' : 'hidden'].join(' ')}>
      <p className={style.helpBoxTip}>Scegli uno dei quadri per visionare un lavoro</p>
      {edition?.patrons && (
        <div className={style.patronsWrapper}>
          <p>Patrocinato da:</p>
          <div className={style.patrons}>
            {edition?.patrons.map((v, i) => (
              <img className={style.patron} src={v.image} alt={v.name} title={v.name} key={i}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Gallery() {
  const [clicked, setClicked] = useState(null)
  const router = useRouter()
  const {works, edition} = useWorks(router.query)

  useEffect(() => {
    if(works) {
      const id = router.query?.id
      if(id) setClicked(works.find(v => v.id == id))
      else setClicked(null)
    }
  }, [router.query, works])

  const getCroppedTitle = title => title?.length > 20 ? title.substr(0, 15) + "..." : title

  const switchByIndexDiff = diff => {
    if(!diff) return
    let index = (works.findIndex(v => v.id == clicked.id) + diff) % (works.length)
    if (index == -1) index = (works.length) - 1

    router.push({
      pathname: '/gallery',
      query: {
        id: works[index]?.id
      }
    }, undefined, { shallow: true })
  }
  
  return (
    <main className={style.main}>
      <MainCanvas className={style.mainCanvas} data={works} edition={edition} />
      <WorkInfoBox work={clicked} className={[style.workInfoBox, clicked ? style.active : null].join(' ')} />
      <HelpBox active={!clicked} edition={edition} />
      {clicked && (
        <div className={[style.workSelector, clicked ? style.active : null].join(' ')}>
          <span className={["material-icons", style.workSelectorButton].join(' ')} onClick={() => switchByIndexDiff(-1)}> 
            chevron_left
          </span>
          <div className={style.workSelectorTitle}>
            {getCroppedTitle(clicked?.title)}
          </div>
          <span className={["material-icons", style.workSelectorButton].join(' ')} onClick={() => switchByIndexDiff(+1)}> 
            chevron_right
          </span>
        </div>
      )}
    </main>
  )
}

// Defining the layout - See _app.js
Gallery.getLayout = (page) => {
  return (
    <Main className={style.mainWrapper} navbarProps={{ theme: 'light' }}>
      {page}
    </Main>
  )
}

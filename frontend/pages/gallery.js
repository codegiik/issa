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
 
  return data
}

export default function Gallery() {
  const [clicked, setClicked] = useState(null)
  const router = useRouter()
  const works = useWorks(router.query)

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
      <MainCanvas className={style.mainCanvas} data={works} />
      <WorkInfoBox work={clicked} className={[style.workInfoBox, clicked ? style.active : null].join(' ')} />
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
    <Main className={style.mainWrapper}>
      {page}
    </Main>
  )
}

import { useState } from 'react'

import { Heading } from 'components'

import style from 'styles/components/workselector.module.css'

export function WorkSelector ({ onNext, onPrev, clicked, works, switchTo }) {
  const [showList, setShowList] = useState(false)

  const getCroppedTitle = title => title?.length > 20 ? title.substr(0, 15) + "..." : title

  const getSchoolsList = () => {
    if(!works) return []
    const schools = []
    works.forEach(v => schools.includes(v.school) ? null : schools.push(v.school))
    return schools
  }
  
  const getWorksBySchool = school => {
    return works.filter(v => v.school == school)
  }

  return clicked ? (
    <div className={[style.workSelector, showList ? style.showList : null].join(' ')}>
      {!showList ? (
        <>
          <span className={["material-icons", style.workSelectorButton].join(' ')} onClick={onPrev}> 
            chevron_left
          </span>
          <div className={style.workSelectorTitle} onClick={() => setShowList(!showList)}>
            {getCroppedTitle(clicked?.title)}
          </div>
          <span className={["material-icons", style.workSelectorButton].join(' ')} onClick={onNext}> 
            chevron_right
          </span>
        </>
      ) : (
        <div onClick={() => setShowList(!showList)}>
          {getSchoolsList().map((v, i) => {
            return (
              <div key={i} className={style.schoolWrapper}>
                <Heading type="h4" className={style.schoolHeading}>{v}</Heading>
                {getWorksBySchool(v).map((va, ix) => (
                  <p className={style.schoolProject} onClick={() => (switchTo(va.id))} key={ix}>
                    <span>⎔</span> {va.title}
                  </p>
                ))}
              </div>
            )
          })} 
        </div>
      )}
    </div>
  ) : null
}

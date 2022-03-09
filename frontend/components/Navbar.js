import Image from 'next/image'
import Link from 'next/link'

import LogoText from 'assets/svgs/LogoText'
import veliero from 'public/imgs/veliero.png'

import style from 'styles/components/navbar.module.css'
import { useRouter } from 'next/router'
import {useEffect, useState} from 'react'

const LINKS = [
  {
    href: '/',
    label: 'Home'
  },
  {
    href: '/#about',
    label: 'Chi Siamo'
  },
  {
    href: '/courses',
    label: 'Corsi'
  },
  {
    href: '/competitions',
    label: 'Competizioni'
  }
]

export function Navbar({ className, theme }) {
  const router = useRouter()

  return (
    <nav id="mainNavbar" className={[style.mainNavbar, theme == "dark" ? style.dark : style.light, className].join(' ')}>
      <div className={style.logo}>
        <Image src={veliero} alt="Veliero" width={50} height={50} className={style.logoVeliero} />
        <LogoText className={style.logoText} />
      </div>
      <div className={style.links}>
        {LINKS.map((v, i) => (
          <Link href={v.href} key={i} passHref>
            <p className={[style.link, router.asPath == v.href ? style.selected : null].join(' ')}>
              {v.label}
            </p>
          </Link>
        ))}
      </div>
    </nav>
  )
}

import Image from 'next/image';

import LogoText from 'assets/svgs/LogoText';
import veliero from 'public/imgs/veliero.png';
import velieroDark from 'public/imgs/velierodark.png';
import { Link } from './Link';

import style from 'styles/components/navbar.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export type CustomLink = {
    href: string;
    label: string;
};

export type NavbarProps = {
    className?: string;
    links?: CustomLink[];
};

export function Navbar({ className, links }: NavbarProps) {
    const [menuActive, setMenuActive]: [false, Function] = useState(false);
    const router = useRouter();

    return (
        <>
            <nav
                id="mainNavbar"
                className={[
                    style.mainNavbar,
                    //theme == 'dark' ? style.dark : style.light,
                    className,
                ].join(' ')}
            >
                <div className={style.logo} onClick={() => router.push('/')}>
                    <Image
                        src={veliero}
                        alt="Veliero"
                        width={50}
                        height={50}
                        className={style.logoVeliero}
                    />
                    <LogoText className={style.logoText} />
                </div>
                <div className={style.links}>
                    {links &&
                        links.map((v, i) => (
                            <Link href={v.href} {...v} key={i} passHref>
                                <p
                                    className={[
                                        style.link,
                                        router.asPath == v.href
                                            ? style.selected
                                            : null,
                                    ].join(' ')}
                                >
                                    {v.label}
                                </p>
                            </Link>
                        ))}
                    <span
                        className={['material-icons', style.hamburgerIcon].join(
                            ' '
                        )}
                        onClick={() => setMenuActive(!menuActive)}
                    >
                        {menuActive ? 'close' : 'menu'}
                    </span>
                </div>
            </nav>
            <div
                className={[
                    style.hamburgerMenu,
                    menuActive ? style.open : null,
                ].join(' ')}
            >
                {links &&
                    links.map((v, i) => (
                        <Link href={v.href} {...v} key={i} passHref>
                            <p
                                className={[
                                    style.link,
                                    router.asPath == v.href
                                        ? style.selected
                                        : null,
                                ].join(' ')}
                                onClick={() => setMenuActive(false)}
                            >
                                {v.label}
                            </p>
                        </Link>
                    ))}
            </div>
        </>
    );
}

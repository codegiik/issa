import Image from 'next/image';

import LogoText from 'assets/svgs/LogoText';
import veliero from 'public/imgs/veliero.png';
import velieroDark from 'public/imgs/velierodark.png';

import style from 'styles/components/navbar.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function Link({ href, block, children }) {
    const router = useRouter();

    return (
        <a
            onClick={() => {
                try {
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth',
                        block,
                    });
                } catch (e) {
                    console.log(e);
                }
                window.history.pushState(href, '', href);
            }}
        >
            {children}
        </a>
    );
}

const LINKS = [
    {
        href: '#hero',
        label: 'Home',
        block: 'end',
    },
    {
        href: '#about',
        label: 'Chi Siamo',
        block: 'center',
    },
    {
        href: '#courses',
        label: 'Corsi',
        block: 'center',
    },
    {
        href: '#gallery',
        label: 'Premio ISSA',
        block: 'end',
    },
];

export function Navbar({ className, theme }) {
    const [menuActive, setMenuActive] = useState(false);
    const router = useRouter();

    return (
        <>
            <nav
                id="mainNavbar"
                className={[
                    style.mainNavbar,
                    theme == 'dark' ? style.dark : style.light,
                    className,
                ].join(' ')}
            >
                <div className={style.logo}>
                    <Image
                        src={theme == 'dark' ? veliero : velieroDark}
                        alt="Veliero"
                        width={50}
                        height={50}
                        className={style.logoVeliero}
                    />
                    <LogoText className={style.logoText} />
                </div>
                <div className={style.links}>
                    {LINKS.map((v, i) => (
                        <Link href={v.href} block={v.block} key={i} passHref>
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
                        onClick={() => setMenuActive(true)}
                    >
                        menu
                    </span>
                </div>
            </nav>
            <div
                className={[
                    style.hamburgerMenu,
                    menuActive ? style.open : null,
                ].join(' ')}
            >
                <span
                    className={['material-icons', style.closeIcon].join(' ')}
                    onClick={() => setMenuActive(false)}
                >
                    close
                </span>
                {LINKS.map((v, i) => (
                    <Link href={v.href} key={i} passHref>
                        <p
                            className={[
                                style.link,
                                router.asPath == v.href ? style.selected : null,
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

Navbar.defaultProps = {
    theme: 'dark',
};

/* assets */
import LogoText from 'assets/svg/LogoText';
import LogoIcon from 'assets/svg/LogoIcon';

/* hooks */
import { useRouter } from 'next/router';
import { useState } from 'react';

/* style */
import style from 'styles/components/navbar.module.css';
import clsx from 'clsx';

/* @types */
import { CustomLink, CustomLinkProps } from './CustomLink';

export type NavbarProps = {
    className?: string;
    links?: (CustomLinkProps & {
        label: string;
    })[];
    theme?: 'light' | 'dark';
};

export function Navbar({ className, links, theme = 'dark' }: NavbarProps) {
    const [menuActive, setMenuActive] = useState<boolean>(false);
    const router = useRouter();

    return (
        <>
            <nav
                id="mainNavbar"
                className={clsx(className, style.navbar, style[theme])}
            >
                <div className={style.logo} onClick={() => router.push('/')}>
                    <LogoIcon
                        width={50}
                        height={50}
                        className={style.logoVeliero}
                    />
                    <LogoText className={style.logoText} />
                </div>
                <div className={style.links}>
                    {links?.map((link) => (
                        <CustomLink {...link} key={link.label}>
                            <p
                                className={clsx(
                                    style.link,
                                    typeof window != 'undefined' &&
                                        window?.location.href ===
                                            new URL(
                                                link.href,
                                                window?.location.origin
                                            ).href &&
                                        style.selected
                                )}
                            >
                                {link.label}
                            </p>
                        </CustomLink>
                    ))}
                    <span
                        className={clsx(
                            'material-symbols-sharp',
                            style.hamburgerIcon
                        )}
                        onClick={() => setMenuActive((prev) => !prev)}
                    >
                        {menuActive ? 'close' : 'menu'}
                    </span>
                </div>
            </nav>
            <div
                className={clsx(style.hamburgerMenu, menuActive && style.open)}
            >
                {links &&
                    links.map((link) => (
                        <CustomLink {...link} key={link.label}>
                            <p
                                className={clsx(
                                    style.link,
                                    typeof window != 'undefined' &&
                                        window?.location.href ===
                                            new URL(
                                                link.href,
                                                window?.location.origin
                                            ).href &&
                                        style.selected
                                )}
                                onClick={() => setMenuActive(false)}
                            >
                                {link.label}
                            </p>
                        </CustomLink>
                    ))}
            </div>
        </>
    );
}

Navbar.defaultProps = {
    links: [
        {
            href: '/#hero',
            label: 'Home',
            scrollTo: true,
        },
        {
            href: '/#about',
            label: 'Chi Siamo',
            scrollTo: true,
        },
        {
            href: '/#premio_issa',
            label: 'Premio ISSA',
            scrollTo: true,
        },
        {
            href: '/#initiatives',
            label: 'Iniziative',
            scrollTo: true,
        },
    ],
    theme: 'dark',
};

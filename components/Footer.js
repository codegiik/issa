/* comp */
import Link from 'next/link';

/* style */
import style from 'styles/components/footer.module.css';

const FOOTER_LINKS = [
    {
        title: 'Social',
        links: [
            {
                href: 'https://facebook.com',
                name: 'Facebook',
            },
            {
                href: 'emailto:info@reteissa.it',
                name: 'Email',
            },
        ],
    },
    {
        title: 'Info Associazione',
        links: [
            {
                href: '/statuto',
                name: 'Statuto',
            },
            {
                href: '/soci',
                name: 'Soci',
            },
        ],
    },
    {
        title: 'Info Sito',
        links: [
            {
                href: '/old',
                name: 'Vecchio Sito',
            },
            {
                href: '/sitemap.xml',
                name: 'Sitemap',
            },
        ],
    },
];

export function FooterNavbar() {
    return (
        <div className={style.navbar}>
            {FOOTER_LINKS.map((linkSection) => (
                <div className={style.linksSection} key={linkSection.title}>
                    <h5 className={style.title}>{linkSection.title}</h5>
                    {linkSection.links.map((link) => (
                        <Link href={link.href} key={link.href}>
                            <p className={style.link}>{link.name}</p>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
}

export function Footer() {
    return (
        <>
            <div className={style.wrapper}>
                <FooterNavbar />
                <p className={style.copy}>
                    Associazione Issa - Pozzuoli (NA){' '}
                    <span>&copy; Copyright 2022 codegiik</span>
                </p>
            </div>
        </>
    );
}

import Link from 'next/link';

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
        <div className={style.footerNavbar}>
            {FOOTER_LINKS.map((v, i) => (
                <div className={style.linksSection} key={i}>
                    <h5>{v.title}</h5>
                    {v.links.map((v, i) => (
                        <Link href={v.href} key={i} passHref>
                            <p className={style.link}>{v.name}</p>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
}

export function Footer({}) {
    return (
        <>
            <FooterNavbar />
            <div className={style.footer}>
                <p>
                    Associazione Issa - Pozzuoli (NA) -{' '}
                    <span>&copy; Copyright 2022 codegiik</span>
                </p>
            </div>
        </>
    );
}

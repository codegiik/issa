import strapi, { unwrap } from 'lib/strapi';

/* comp */
import { useEffect, useState } from 'react';

/* style */
import style from 'styles/components/footer.module.css';

export type FooterLink = {
    text: string;
    href: string;
    section?: string;
};

export type FooterSection = {
    title: string;
    links: FooterLink[];
};

export function FooterNavbar() {
    const [links, setLinks] = useState<FooterLink[] | undefined>(undefined);

    useEffect(() => {
        strapi
            .find<FooterLink[]>('footer-links')
            .then(({ data }) => setLinks(unwrap(data)));
    }, []);

    const getSections = (): FooterSection[] | undefined => {
        if (!links) return;
        const sections: {
            [key: string]: FooterLink[];
        } = {};

        links.forEach((value) => {
            if (!value.section) return;

            if (sections[value.section])
                sections[value.section].push({
                    text: value.text,
                    href: value.href,
                });
            else
                sections[value.section] = [
                    {
                        text: value.text,
                        href: value.href,
                    },
                ];
        });

        return Object.entries(sections).map(([section, links]) => ({
            title: section,
            links,
        }));
    };

    return (
        <div className={style.navbar}>
            {getSections()?.map((linkSection) => (
                <div className={style.linksSection} key={linkSection.title}>
                    <h5 className={style.title}>{linkSection.title}</h5>
                    {linkSection?.links.map((link) => (
                        <a href={link.href} key={link.href}>
                            <p className={style.link}>{link.text}</p>
                        </a>
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

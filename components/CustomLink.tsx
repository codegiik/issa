/* libs */
import clsx from 'clsx';

/* hooks */
import { useRouter } from 'next/router';

// @ts-ignore /* style */
import style from 'styles/components/link.module.css';

/* @types */
import type { ComponentProps } from 'react';

export type CustomLinkProps = {
    href: string;
    scrollTo: boolean;
    children: JSX.Element | JSX.Element[];
    scrollParams?: ScrollIntoViewOptions;
} & ComponentProps<'a'>;

export function CustomLink({
    href,
    scrollTo,
    scrollParams,
    children,
    className,
    ...props
}: CustomLinkProps) {
    const router = useRouter();

    const getHash = (link: string) =>
        new URL(link, window.location.origin)?.hash;

    const samePage = (link: string) =>
        router.pathname === new URL(link, window.location.origin).pathname;

    const goTo = () => {
        if (scrollTo && scrollParams && samePage(href)) {
            document.querySelector(getHash(href))?.scrollIntoView(scrollParams);
            window.history.pushState(href, '', href);
        } else router.push(href);
    };

    return (
        <a
            href={href}
            onClick={(evt) => {
                evt.preventDefault();
                goTo();
            }}
            className={clsx(style.link, className)}
            {...props}
        >
            {children}
        </a>
    );
}

CustomLink.defaultProps = {
    scrollParams: {
        block: 'center',
        behavior: 'smooth',
    },
};

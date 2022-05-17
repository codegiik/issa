import { useRouter } from 'next/router';

import style from 'styles/components/link.module.css';

export function Link({
    href,
    scrollTo,
    children,
    as,
    block,
    behavior,
    className,
    ...props
}) {
    const router = useRouter();
    const Element = as;

    const getHash = () => /\#(.*)/g.exec(href)[0];

    const getPathname = () => /\/?(.*)[#/]?/.exec(href)[0];

    const checkSamePage = () => router.pathname == getPathname();

    const goTo = () => {
        if (scrollTo && checkSamePage()) {
            try {
                document.querySelector(getHash()).scrollIntoView({
                    behavior,
                    block,
                });
            } catch (e) {
                console.log(e);
            }
            window.history.pushState(href, '', href);
        } else router.push(href);
    };

    return (
        <Element
            onClick={goTo}
            className={[style.link, className].join(' ')}
            {...props}
        >
            {children}
        </Element>
    );
}

Link.defaultProps = {
    block: 'center',
    behavior: 'smooth',
    as: 'a',
};

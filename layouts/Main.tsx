import { Navbar, Footer, Loader } from 'components';
import Head from 'next/head';
import type { Component, ComponentProps } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from 'styles/layouts/main.module.css';

export type MainInfo = {};

export type MainProps = {
    children: Component;
    className: string;
    navbarProps: ComponentProps<HTMLDivElement>;
    navbarInitialTheme: string;
};

export default function Main({
    children,
    className,
    navbarProps,
    navbarInitialTheme,
}: MainProps) {
    const [navbarTheme, setNavbarTheme] = useState(navbarInitialTheme);
    const [info, setInfo]: [null | MainInfo, Function] = useState(null);

    useEffect(() => {
        //         const fetchInfo = async () => {
        //             const { data, error } = await supabase.from('info').select();
        //             if (error) return message.error(error.message);
        //             const incInfo = {};
        //             data.forEach((v) => (incInfo[v.id] = v.value));
        //             return setInfo(incInfo);
        //         };
    }, []);

    const switchTheme = (theme: any) => {
        setNavbarTheme(theme);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { switchTheme, info });
        }
        return child;
    });

    return info ? (
        <main
            id="mainWrapper"
            className={[
                style.mainWrapper,
                Array.isArray(className) ? className.join(' ') : className,
            ].join(' ')}
        >
            <Head>
                <title>ReteISSA</title>
            </Head>
            <Navbar
                theme={navbarTheme}
                links={info.NAVBAR_LINKS}
                {...navbarProps}
            />
            {childrenWithProps}
            <Footer />
        </main>
    ) : (
        <Loader />
    );
}

Main.defaultProps = {
    navbarInitialTheme: 'dark',
};

import { Navbar, Footer } from 'components';
import Head from 'next/head';
import React, { useState } from 'react';
import style from 'styles/layouts/main.module.css';

export default function Main({ children, className, navbarProps }) {
    const [navbarTheme, setNavbarTheme] = useState('dark');

    const switchTheme = (theme) => {
        setNavbarTheme(theme);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { switchTheme });
        }
        return child;
    });

    return (
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
            <Navbar theme={navbarTheme} {...navbarProps} />
            {childrenWithProps}
            <Footer />
        </main>
    );
}

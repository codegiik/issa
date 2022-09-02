/* libs */
import React from 'react';

/* components */
import { Navbar, Footer } from 'components';
import Head from 'next/head';

/* style */
import style from 'styles/layouts/main.module.css';
import clsx from 'clsx';

/* @types */
import type { NavbarProps } from 'components/types';

export type MainProps = {
    children: JSX.Element | JSX.Element[];
    className?: string;
    navbarProps?: NavbarProps;
};

export default function Main({ children, className, navbarProps }: MainProps) {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child);
        }
        return child;
    });

    return (
        <main id="mainWrapper" className={clsx(style.mainWrapper, className)}>
            <Head>
                <title>ReteISSA</title>
            </Head>
            <Navbar {...navbarProps} />
            {childrenWithProps}
            <Footer />
        </main>
    );
}

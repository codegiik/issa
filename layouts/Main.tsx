/* libs */
import React, { useState } from 'react';

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
    navbarTheme?: 'light' | 'dark';
};

export default function Main({
    children,
    className,
    navbarProps,
    navbarTheme,
}: MainProps) {
    return (
        <main id="mainWrapper" className={clsx(style.mainWrapper, className)}>
            <Head>
                <title>ReteISSA</title>
            </Head>
            <Navbar {...navbarProps} theme={navbarTheme} />
            {children}
            <Footer />
        </main>
    );
}

Main.defaultProps = {
    navbarTheme: 'dark',
};

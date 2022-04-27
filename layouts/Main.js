import { Navbar, Footer } from 'components';
import Head from 'next/head';
import style from 'styles/layouts/main.module.css';

export default function Main({ children, className, navbarProps }) {
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
            <Navbar {...navbarProps} />
            {children}
            <Footer />
        </main>
    );
}

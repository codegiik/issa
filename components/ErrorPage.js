import style from 'styles/components/errorpage.module.css';
import Veliero from 'assets/svgs/Veliero';
import Head from 'next/head';
import { Link } from './Link';

// error.code || "400"
/* 
    const error = {
        message: "Pagina non trovata",
        code: 404
    }
*/

export function ErrorPage({ error, logout, home }) {
    return (
        <div className={style.wrapper}>
            <Head>
                <title>ReteISSA - Errore {error.code}</title>
            </Head>
            <div className={style.error}>
                <h2>Errore {error?.code || '400'}</h2>
                <p>{error.message || 'Some error occurred'}</p>
                {home && (
                    <Link href="/" as="p" className={style.backHome}>
                        Torna alla home
                    </Link>
                )}
                {logout && (
                    <button className="button" onClick={logout}>
                        Logout
                    </button>
                )}
            </div>
            <div className={style.box}>
                <Veliero className={style.veliero} />
            </div>
            <style jsx global>{`
                html {
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

ErrorPage.defaultProps = {
    home: true,
};

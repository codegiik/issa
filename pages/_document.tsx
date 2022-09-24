import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Libre+Baskerville:ital,wght@0,400;0,500;0,700;1,400;1,500&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/icons/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/icons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/icons/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/icons/safari-pinned-tab.svg"
                        color="#47151b"
                    />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta name="apple-mobile-web-app-title" content="ISSA" />
                    <meta name="application-name" content="ISSA" />
                    <meta name="msapplication-TileColor" content="#ebdece" />
                    <meta
                        name="msapplication-config"
                        content="/browserconfig.xml"
                    />
                    <meta name="theme-color" content="#ebdece" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script
                        async
                        defer
                        data-website-id="d64bb639-aef0-4f53-859a-b149f22e69be"
                        src="http://umami.dev.reteissa.it/umami.js"
                    ></script>
                </body>
            </Html>
        );
    }
}

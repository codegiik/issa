import 'styles/globals.css';
import 'animate.css';

function Issa({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((v) => v);

    return getLayout(<Component {...pageProps} />);
}

export default Issa;

import { ErrorPage } from 'components';

function Error({ statusCode }) {
    return (
        <ErrorPage
            error={{
                message:
                    "Ti sei perso nel mare di ReteISSA? Non c'è problema, torna a casa cliccando qui sotto.",
                code: statusCode,
            }}
        />
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;

/* @types */
import { ComponentProps, useContext, useEffect, useState } from 'react';

/* style */
import style from 'styles/components/admin.login.module.css';
import clsx from 'clsx';
import pocketbase from 'lib/pocketbase';
import { AuthProvider } from 'lib/interfaces';
import {
    FacebookLoginButton,
    GithubLoginButton,
    GoogleLoginButton,
} from 'react-social-login-buttons';
import { AdminContext } from 'layouts/Admin';

export type LoginProps = {
    className?: string;
} & ComponentProps<'div'>;

export function Login({ className }: LoginProps) {
    const [providers, setProviders] = useState<AuthProvider[] | undefined>(
        undefined
    );
    const [emailPass, setEmailPass] = useState<boolean>(false);

    useEffect(() => {
        pocketbase.users.listAuthMethods().then(
            ({ emailPassword, authProviders }) => {
                setProviders(authProviders);
                setEmailPass(emailPassword);
            },
            (err) => (!err.isAbort ? console.log(err) : null)
        );
    }, []);

    const getProviderButton = (provider: AuthProvider) => {
        switch (provider.name) {
            case 'google':
                return <GoogleLoginButton />;
            case 'facebook':
                return <FacebookLoginButton />;
            case 'github':
                return <GithubLoginButton />;
            default:
                return null;
        }
    };

    const loginWithEmailAndPass = (email: string, pass: string) => {
        pocketbase.users.authViaEmail(email, pass).then(
            () => null,
            (err) => (!err.isAbort ? console.log(err) : null)
        );
    };

    return (
        <div className={clsx(style.wrapper, className)}>
            <img
                src="https://picsum.photos/1920/1080"
                className={style.cover}
            />
            <div className={style.form}>
                {providers &&
                    providers?.map((provider) => (
                        <a className={style.providerLink} key={provider.name}>
                            {getProviderButton(provider)}
                        </a>
                    ))}
                {emailPass && (
                    <>
                        <span className={style.or}>oppure</span>
                        <form
                            onSubmit={(evt) => {
                                evt.preventDefault();
                                loginWithEmailAndPass(
                                    (evt.target as any)[0].value,
                                    (evt.target as any)[1].value
                                );
                            }}
                        >
                            <input
                                type="username"
                                placeholder="Email"
                                name="username"
                                id="username"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                id="password"
                            />
                            <input
                                type="submit"
                                name="submit"
                                id="submit"
                                value="Accedi"
                            />
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

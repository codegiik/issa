import Main from 'layouts/Main';
import { useState } from 'react';
import md5 from 'md5';

import style from 'styles/pages/membri.module.css';
import { Heading } from 'components';

export default function Membri() {
    const [membersContent, setMembersContent] = useState<string>('');

    const login = () => {
        const pass = document.getElementById('pass') as HTMLInputElement;
        const hashedPass = md5(pass.value);
        fetch('/api/members?' + new URLSearchParams({ pass: hashedPass }))
            .then((res) => res.json())
            .then((data) => setMembersContent(data.content));
    };

    return (
        <div className={style.wrapper}>
            {membersContent && membersContent != 'Unauthorized' ? (
                <div className={style.restricted}>
                    <Heading>Area Riservata</Heading>
                    <div
                        className={style.restrictedContent}
                        dangerouslySetInnerHTML={{
                            __html: membersContent,
                        }}
                    />
                </div>
            ) : (
                <div className={style.login}>
                    <h1>Area Riservata</h1>
                    {membersContent == 'Unauthorized' && (
                        <p className={style.error}>
                            <span class="material-symbols-sharp">error</span> La
                            password inserita non è valida
                        </p>
                    )}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        <input
                            type="password"
                            id="pass"
                            className={style.pass}
                            placeholder="Inserisci la password"
                        />
                        <input
                            type="submit"
                            onClick={login}
                            value="Accedi"
                            className={style.submit}
                        />
                    </form>
                </div>
            )}
        </div>
    );
}

Membri.getLayout = (page: JSX.Element) => (
    <Main navbarTheme="dark">{page}</Main>
);

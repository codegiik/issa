/* lib */
import pocketbase from 'lib/pocketbase';
import React, { useEffect } from 'react';

/* hooks */
import { useState } from 'react';

/* @types */
import { UserRecord } from 'lib/interfaces';
import { Login, Sidebar } from 'components';
import { Admin, User } from 'pocketbase';

/* style */
import style from 'styles/layouts/admin.module.css';

export type AdminContectValue = {
    user: User | Admin | UserRecord | null | 'loading';
    setUser: any;
};

export type AdminLayoutProps = {
    children: JSX.Element | JSX.Element[];
};

export const AdminContext = React.createContext<AdminContectValue>({
    user: null,
    setUser: () => null,
});

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [user, setUser] = useState<
        UserRecord | User | Admin | null | 'loading'
    >('loading');

    useEffect(() => {
        setUser(pocketbase.authStore.model);

        pocketbase.authStore.onChange(() => {
            setUser(pocketbase.authStore.model);
        });
    }, []);

    return (
        <AdminContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {user ? (
                <main className={style.wrapper}>
                    <Sidebar
                        links={[
                            {
                                label: 'Home',
                                icon: (
                                    <span className="material-symbols-sharp">
                                        home
                                    </span>
                                ),
                                href: '/admin/',
                            },
                            {
                                label: 'Competizioni',
                                icon: (
                                    <span className="material-symbols-sharp">
                                        sports_score
                                    </span>
                                ),
                                href: '/admin/competitions',
                            },
                            {
                                label: 'Blog',
                                icon: (
                                    <span className="material-symbols-sharp">
                                        auto_stories
                                    </span>
                                ),
                                href: '/admin/posts',
                            },
                        ]}
                    />
                    <div className={style.content}>{children}</div>
                </main>
            ) : user != 'loading' ? (
                <Login className={style.login} />
            ) : null}
        </AdminContext.Provider>
    );
}

import Link from 'next/link';
import style from 'styles/components/sidebar.module.css';

export type SidebarProps = {
    links: {
        href: string;
        label: string;
        icon?: JSX.Element;
    }[];
};

export function Sidebar({ links }: SidebarProps) {
    return (
        <div className={style.wrapper}>
            {links.map((link) => (
                <Link href={link.href} key={link.href}>
                    <div className={style.link}>
                        {link.icon && (
                            <span className={style.icon}>{link.icon}</span>
                        )}
                        <p>{link.label}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

import { useState, PropsWithChildren } from 'react';
import style from 'styles/components/collapse.module.css';

interface CollapseProps {
    title: string;
    isHidden?: boolean;
    className?: string;
    wrapperClassname?: string;
    titleClassname?: string;
    callback?: Function;
}

export function Collapse({
    children,
    title,
    className,
    wrapperClassname,
    titleClassname,
    isHidden = true,
    callback,
}: PropsWithChildren<CollapseProps>) {
    const [hidden, setHidden] = useState<boolean>(isHidden);

    const handleClick = () => {
        setHidden(!hidden);
        if (callback) callback();
    };

    return (
        <div className={[style.wrapper, wrapperClassname].join(' ')}>
            <div
                className={[style.title, titleClassname].join(' ')}
                onClick={handleClick}
            >
                {title}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={['w-6 h-6', !hidden && 'rotate-90'].join(' ')}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                </svg>
            </div>
            <div
                className={[
                    className,
                    style.children,
                    hidden && style.collapsed,
                ].join(' ')}
            >
                {children}
            </div>
        </div>
    );
}

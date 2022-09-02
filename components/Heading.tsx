/* lib */
import React from 'react';

/* style */
import style from 'styles/components/heading.module.css';
import clsx from 'clsx';

export type HeadingProps = {
    children: JSX.Element | JSX.Element[] | string;
    type?: string;
    className?: string;
    lineBefore?: boolean;
};

export function Heading({
    children,
    type,
    className,
    lineBefore,
}: HeadingProps) {
    return React.createElement(
        type,
        {
            className: clsx(
                className,
                style.heading,
                lineBefore && style.lineBefore
            ),
        },
        children
    );
}

Heading.defaultProps = {
    type: 'h2',
    lineBefore: true,
};

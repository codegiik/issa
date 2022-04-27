import style from 'styles/components/heading.module.css';

export function Heading({ children, type, className, lineBefore }) {
    const HeadingType = type;

    return (
        <HeadingType
            className={[
                Array.isArray(className) ? className.join(' ') : className,
                style.heading,
                lineBefore ? style.lineBefore : null,
            ].join(' ')}
        >
            {children}
        </HeadingType>
    );
}

Heading.defaultProps = {
    type: 'h2',
    lineBefore: true,
};

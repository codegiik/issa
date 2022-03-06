import style from 'styles/components/heading.module.css'

export function Heading({ children, type, className }) {
  const HeadingType = type

  return (
    <HeadingType className={[Array.isArray(className) ? className.join(' ') : className, style.heading].join(' ')}>
      {children}
    </HeadingType>
  )
}

Heading.defaultProps = {
  type: 'h2'
}

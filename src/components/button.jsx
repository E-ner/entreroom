const variants = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  ...props
}) {
  const Component = href ? 'a' : 'button'

  return (
    <Component
      href={href}
      className={`${variants[variant]} ${className}`.trim()}
      type={href ? undefined : 'button'}
      {...props}
    >
      {children}
    </Component>
  )
}

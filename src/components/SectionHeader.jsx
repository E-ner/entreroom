export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'section-header center' : 'section-header'

  return (
    <div className={alignment}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  )
}

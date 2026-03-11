const columns = [
  {
    title: 'Product',
    links: ['Community', 'Roadmap', 'Guidelines'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms'],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <div className="brand-badge">E</div>
            <div>
              <p className="brand-title">Entr-Room</p>
              <p className="brand-sub">Business ideas, shared</p>
            </div>
          </div>
          <p className="footer-text" style={{ marginTop: '1rem', maxWidth: '320px' }}>
            A new community for founders and builders to share ideas, ask for help, and find
            collaborators.
          </p>
        </div>
        <div className="footer-columns">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="footer-title">{column.title}</p>
              <ul className="footer-links" style={{ marginTop: '0.75rem' }}>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>2026 Entr-Room. All rights reserved.</p>
          <div className="footer-meta">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const threads = [
  {
    title: 'Finding co-founders for a fintech idea',
    owner: 'Amina',
    summary: 'Looking for product + engineering partners to validate the MVP.',
    status: 'Open',
  },
  {
    title: 'How to price a B2B AI service',
    owner: 'Jordan',
    summary: 'Collecting feedback on usage-based vs seat-based pricing.',
    status: 'Trending',
  },
  {
    title: 'Customer support playbook review',
    owner: 'Priya',
    summary: 'Need critique on onboarding and escalation flows.',
    status: 'Resolved',
  },
]

const statusStyles = {
  Open: 'status status--open',
  Trending: 'status status--trending',
  Resolved: 'status status--resolved',
}

export default function ThreadPreview() {
  return (
    <div className="thread-preview" id="community">
      <div className="orb orb--small animate-float" style={{ left: '-2.5rem', top: '-2.5rem' }} />
      <div
        className="orb orb--small-teal animate-float"
        style={{ right: '-1rem', bottom: '-3rem' }}
      />
      <div className="thread-shell shimmer-card">
        <div className="thread-list">
          {threads.map((thread, index) => (
            <div
              key={thread.title}
              className="thread-item reveal"
              style={{ '--delay': `${0.12 + index * 0.08}s` }}
            >
              <div className="thread-header">
                <h4 className="thread-title">{thread.title}</h4>
                <span className={statusStyles[thread.status]}>{thread.status}</span>
              </div>
              <p className="thread-summary">{thread.summary}</p>
              <div className="thread-meta">
                <span className="thread-avatar">{thread.owner[0]}</span>
                <span>Posted by {thread.owner}</span>
                <span className="thread-dot" />
                <span>Updated 20m ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

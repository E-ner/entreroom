import Button from '../components/Button'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import SectionHeader from '../components/SectionHeader'
import ThreadPreview from '../components/ThreadPreview'
import useScrollReveal from '../hooks/UseScrollReveal'

const features = [
  {
    title: 'Share a business idea',
    description: 'Start a thread, outline the idea, and ask for feedback or partners.',
  },
  {
    title: 'Get practical help',
    description: 'Request input on pricing, growth, or product direction from peers.',
  },
  {
    title: 'Build connections',
    description: 'Find collaborators, mentors, and early customers in one place.',
  },
]

const roadmap = [
  'Founder profiles + credibility badges',
  'Pitch threads with structured templates',
  'Private idea rooms for teams',
]

const tags = [
  'Pricing feedback',
  'Co-founder search',
  'Go-to-market help',
  'Prototype review',
  'Customer discovery',
  'Pitch practice',
  'Product critique',
  'Investor prep',
  'Landing page teardown',
  'MVP direction',
]

export default function LandingPage() {
  useScrollReveal()

  return (
    <div className="page">
      <div className="hero-wrap">
        <div className="bg-dots" />
        <div className="orb orb--amber animate-float" />
        <div className="orb orb--teal animate-float" />
        <Navbar />

        <main className="container main">
          <section className="hero">
            <div className="hero-copy">
              <span className="hero-pill reveal" style={{ '--delay': '0.05s' }}>
                Community beta
                <span className="thread-dot" />
                Work in progress
              </span>
              <h1 className="hero-title reveal text-balance" style={{ '--delay': '0.12s' }}>
                Where business builders connect, trade ideas, and get help.
              </h1>
              <p className="hero-text reveal" style={{ '--delay': '0.18s' }}>
                Threadline is a community-first space for business threads. Share ideas, get feedback,
                and find collaborators without the noise.
              </p>
              <div className="hero-actions reveal" style={{ '--delay': '0.24s' }}>
                <Button href="#register">Join the beta</Button>
                <Button href="#product" variant="secondary">
                  See how it works
                </Button>
              </div>
            </div>
            <div className="reveal-scale" style={{ '--delay': '0.35s' }}>
              <ThreadPreview />
            </div>
          </section>

          <section className="section section--tight">
            <div className="ticker reveal" style={{ '--delay': '0.15s' }}>
              <div className="ticker-track">
                {[...tags, ...tags].map((tag, index) => (
                  <span key={`${tag}-${index}`} className="ticker-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id="product" className="section">
            <div className="section-reveal" data-reveal>
              <SectionHeader
                eyebrow="How it works"
                title="Post. Discuss. Build together."
                subtitle="A few simple actions to keep every idea moving."
              />
            </div>
            <div className="feature-grid">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="feature-card reveal"
                  style={{ '--delay': `${0.1 + index * 0.1}s` }}
                >
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-text">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="roadmap" className="section">
            <div className="section-reveal" data-reveal>
              <SectionHeader
                eyebrow="Roadmap"
                title="Shipping in small, useful steps"
                subtitle="We are keeping the public view lightweight while the core is built."
              />
            </div>
            <div className="wip-card reveal" style={{ '--delay': '0.1s' }}>
              <div className="wip-head">
                <span className="wip-badge pulse">In progress</span>
                <p className="wip-title">Roadmap preview</p>
              </div>
              <p className="wip-text">
                Here is what is next:
              </p>
              <ul className="roadmap">
                {roadmap.map((item) => (
                  <li key={item} className="roadmap-item">
                    <span className="roadmap-dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="cta" className="section cta">
            <div className="section-reveal" data-reveal>
              <SectionHeader
                eyebrow="Early access"
                title="Be part of the first cohort"
                subtitle="We are opening invites in waves. Join the list to get notified."
              />
            </div>
            <div className="cta-card">
              <div className="cta-inner">
                <div>
                  <h2 className="cta-title">Join the builders list.</h2>
                  <p className="cta-text">
                    Get updates and be first in line when accounts open.
                  </p>
                </div>
                <div className="hero-actions">
                  <Button href="#login" variant="secondary" className="btn-inverse">
                    Login
                  </Button>
                  <Button href="#register">Register</Button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}

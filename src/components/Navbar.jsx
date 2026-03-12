import Button from "./button";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div className="brand-badge">E</div>
          <div>
            <p className="brand-title">Entr-Room</p>
            <p className="brand-sub">Business ideas, shared</p>
          </div>
        </div>
        <nav className="nav-links">
          <a className="nav-link" href="#community">
            Community
          </a>
          <a className="nav-link" href="#product">
            How it works
          </a>
          <a className="nav-link" href="#roadmap">
            Roadmap
          </a>
        </nav>
        <div className="nav-actions">
          <Button href="#login" variant="secondary" className="hide-sm">
            Login
          </Button>
          <Button href="#register">Register</Button>
        </div>
      </div>
    </header>
  );
}

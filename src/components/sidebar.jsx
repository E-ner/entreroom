import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Home, Search, Bell, User, LogOut, Send, Settings } from "lucide-react";

// ── Design tokens — matches EntreRoom system ──────────────────────────────────
const INK = "#1f1c17";
const SAND = "#f6f1e9";
const PINE = "#0b3d3a";
const CLAY = "#e7d7c4";

const items = [
  { icon: Home, label: "Home", path: "/user" },
  { icon: Search, label: "Search", path: "/user/search" },
  { icon: Bell, label: "Notifications", path: "/user/notifications", badge: 5 },
  { icon: Send, label: "Messages", path: "/user/messages", badge: 2 },
  { icon: User, label: "Profile", path: "/user/profile" },
];

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <style>{`
        .er-sidebar {
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          width: 72px;
          background: ${INK};
          border-right: 1px solid rgba(231,215,196,0.10);
          flex-direction: column;
          align-items: stretch;
          z-index: 50;
          transition: width 280ms cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
        }
        .er-sidebar:hover,
        .er-sidebar.expanded {
          width: 240px;
        }
        .er-sidebar-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px 10px;
          gap: 4px;
        }
        /* Logo area */
        .er-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 6px 6px 20px 6px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .er-logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: ${PINE};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .er-logo-text {
          font-family: 'Space Grotesk', 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: ${SAND};
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 200ms 60ms ease, transform 200ms 60ms ease;
          letter-spacing: 0.01em;
        }
        .er-sidebar:hover .er-logo-text {
          opacity: 1;
          transform: translateX(0);
        }
        /* Nav item */
        .er-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 10px;
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          transition: background 160ms ease;
          overflow: hidden;
          flex-shrink: 0;
          min-height: 46px;
          border: 1px solid transparent;
        }
        .er-item:hover {
          background: rgba(246,241,233,0.07);
          border-color: rgba(246,241,233,0.06);
        }
        .er-item.active {
          background: rgba(11,61,58,0.40);
          border-color: rgba(11,61,58,0.55);
        }
        .er-item.active .er-icon {
          color: #6ee7b7;
        }
        .er-icon {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: rgba(246,241,233,0.65);
          transition: color 160ms ease, transform 160ms ease;
        }
        .er-item:hover .er-icon {
          color: ${SAND};
          transform: scale(1.08);
        }
        .er-item.active .er-icon {
          transform: scale(1.1);
        }
        /* Active left bar */
        .er-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 25%; bottom: 25%;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: #6ee7b7;
        }
        .er-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(246,241,233,0.75);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 180ms 50ms ease, transform 180ms 50ms ease;
          letter-spacing: 0.01em;
        }
        .er-sidebar:hover .er-label {
          opacity: 1;
          transform: translateX(0);
        }
        .er-item.active .er-label {
          color: ${SAND};
          font-weight: 600;
        }
        /* Badge */
        .er-badge {
          position: absolute;
          top: 8px;
          left: 28px;
          min-width: 16px;
          height: 16px;
          border-radius: 99px;
          background: #0b3d3a;
          border: 1.5px solid ${INK};
          color: #6ee7b7;
          font-size: 9px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          font-family: 'Space Grotesk', sans-serif;
          transition: left 280ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease;
        }
        .er-sidebar:hover .er-badge {
          left: auto;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        /* Spacer */
        .er-spacer { flex: 1; }
        /* Divider */
        .er-divider {
          height: 1px;
          background: rgba(231,215,196,0.10);
          margin: 8px 6px;
          flex-shrink: 0;
        }
        /* Avatar row at bottom */
        .er-avatar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 10px;
          border-radius: 12px;
          cursor: pointer;
          flex-shrink: 0;
          overflow: hidden;
          transition: background 160ms ease;
          border: 1px solid transparent;
        }
        .er-avatar-row:hover {
          background: rgba(246,241,233,0.07);
          border-color: rgba(246,241,233,0.06);
        }
        .er-avatar {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: ${PINE};
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          color: #6ee7b7;
          flex-shrink: 0;
          letter-spacing: 0.05em;
          border: 1.5px solid rgba(110,231,183,0.25);
        }
        .er-avatar-info {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 200ms 60ms ease, transform 200ms 60ms ease;
          overflow: hidden;
          min-width: 0;
        }
        .er-sidebar:hover .er-avatar-info {
          opacity: 1;
          transform: translateX(0);
        }
        .er-avatar-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: ${SAND};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .er-avatar-role {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          color: rgba(246,241,233,0.45);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }
        /* Logout */
        .er-logout {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 9px 10px;
          border-radius: 12px;
          cursor: pointer;
          flex-shrink: 0;
          overflow: hidden;
          text-decoration: none;
          border: 1px solid transparent;
          transition: background 160ms ease;
        }
        .er-logout:hover {
          background: rgba(220,38,38,0.12);
          border-color: rgba(220,38,38,0.15);
        }
        .er-logout:hover .er-logout-icon,
        .er-logout:hover .er-logout-label {
          color: #f87171;
        }
        .er-logout-icon {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: rgba(246,241,233,0.35);
          transition: color 160ms ease;
        }
        .er-logout-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          color: rgba(246,241,233,0.35);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 180ms 50ms ease, transform 180ms 50ms ease, color 160ms ease;
        }
        .er-sidebar:hover .er-logout-label {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Mobile bottom bar ───────────────────────────── */
        .er-mobile-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          height: 60px;
          background: ${INK};
          border-top: 1px solid rgba(231,215,196,0.12);
          align-items: center;
          justify-content: space-around;
          z-index: 50;
          padding: 0 8px;
        }
        .er-mobile-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6px 12px;
          border-radius: 10px;
          text-decoration: none;
          position: relative;
          transition: background 160ms ease;
          flex: 1;
        }
        .er-mobile-item.active {
          background: rgba(11,61,58,0.45);
        }
        .er-mobile-icon {
          color: rgba(246,241,233,0.5);
          transition: color 160ms ease, transform 160ms ease;
        }
        .er-mobile-item.active .er-mobile-icon {
          color: #6ee7b7;
          transform: translateY(-1px);
        }
        .er-mobile-item:hover .er-mobile-icon {
          color: ${SAND};
        }
        .er-mobile-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          color: rgba(246,241,233,0.4);
          letter-spacing: 0.02em;
        }
        .er-mobile-item.active .er-mobile-label {
          color: #6ee7b7;
          font-weight: 600;
        }
        .er-mobile-badge {
          position: absolute;
          top: 4px;
          right: calc(50% - 20px);
          min-width: 15px;
          height: 15px;
          background: ${PINE};
          border: 1.5px solid ${INK};
          border-radius: 99px;
          color: #6ee7b7;
          font-size: 8px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          padding: 0 2px;
        }
      `}</style>

      {/* ── DESKTOP SIDEBAR ─────────────────────────────────────────── */}
      <nav className="er-sidebar hidden md:flex">
        <div className="er-sidebar-inner">
          {/* Logo */}
          <div className="er-logo">
            <div className="er-logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="#6ee7b7"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="er-logo-text">
              Entre<span style={{ color: "#6ee7b7" }}>Room</span>
            </span>
          </div>

          {/* Nav items */}
          {items.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`er-item ${active ? "active" : ""}`}
              >
                <span className="er-icon">
                  <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                </span>
                <span className="er-label">{item.label}</span>
                {item.badge && <span className="er-badge">{item.badge}</span>}
              </Link>
            );
          })}

          <div className="er-spacer" />
          <div className="er-divider" />

          {/* Avatar / profile row */}
          <Link to="/user/profile" className="er-avatar-row">
            <div className="er-avatar">YO</div>
            <div className="er-avatar-info">
              <p className="er-avatar-name">Your Name</p>
              <p className="er-avatar-role">EntreRoom Member</p>
            </div>
          </Link>

          {/* Logout */}
          <Link to="/logout" className="er-logout">
            <span className="er-logout-icon">
              <LogOut size={18} strokeWidth={1.8} />
            </span>
            <span className="er-logout-label">Log out</span>
          </Link>
        </div>
      </nav>

      {/* ── MOBILE BOTTOM BAR ───────────────────────────────────────── */}
      <nav className="er-mobile-bar flex md:hidden">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`er-mobile-item ${active ? "active" : ""}`}
            >
              {item.badge && (
                <span className="er-mobile-badge">{item.badge}</span>
              )}
              <span className="er-mobile-icon">
                <Icon size={20} strokeWidth={active ? 2.2 : 1.7} />
              </span>
              <span className="er-mobile-label">{item.label}</span>
            </Link>
          );
        })}
        <Link to="/logout" className="er-mobile-item">
          <span
            className="er-mobile-icon"
            style={{ color: "rgba(248,113,113,0.6)" }}
          >
            <LogOut size={20} strokeWidth={1.7} />
          </span>
          <span
            className="er-mobile-label"
            style={{ color: "rgba(248,113,113,0.5)" }}
          >
            Logout
          </span>
        </Link>
      </nav>
    </>
  );
};

export default Sidebar;

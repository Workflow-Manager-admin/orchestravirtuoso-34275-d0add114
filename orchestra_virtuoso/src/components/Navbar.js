import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Navbar component for OrchestraVirtuoso.
 * Fixed, elegant, orchestral-themed navbar with dropdowns and full page navigation.
 */
function Navbar() {
  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(null);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.navbar-dropdown, .navbar-btn-dropdown')) {
        setDropdownOpen(null);
      }
    }
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);

  // Highlight active link
  const location = useLocation();
  // Handles opening dropdowns on mobile/touch and hover
  const handleDropdown = (key) => {
    setDropdownOpen(dropdownOpen === key ? null : key);
  };

  return (
    <nav className="navbar shadow" style={{ backdropFilter: "blur(7px)" }}>
      <div className="container" style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
        {/* Logo Section */}
        <Link to="/" className="logo" style={{display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit"}}>
          {/* SVG Violin Icon */}
          <span className="logo-symbol" aria-label="Violin" title="OrchestraVirtuoso" style={{display: "inline-flex", alignItems: "center"}}>
            <svg width="26" height="26" viewBox="0 0 40 40" aria-hidden="true">
              <g>
                <ellipse cx="20" cy="29" rx="12" ry="8" fill="none" stroke="#BFA14A" strokeWidth="2"/>
                <rect x="18.2" y="7" width="3.6" height="15" rx="1.4" fill="#BFA14A"/>
                <ellipse cx="20" cy="9.5" rx="2.8" ry="2.7" fill="none" stroke="#BFA14A" strokeWidth="2"/>
                <ellipse cx="20" cy="29" rx="5.1" ry="3.5" fill="none" stroke="#BFA14A" strokeWidth="2"/>
              </g>
            </svg>
          </span>
          <span style={{
            fontFamily: "'Georgia', 'Times New Roman', Times, serif",
            fontWeight: 700,
            fontSize: "1.34rem",
            color: "var(--text-color)"
          }}>
            OrchestraVirtuoso
          </span>
        </Link>
        {/* Nav Links */}
        <div className="navbar-links" style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          {/* Home */}
          <NavLink to="/" label="Home" active={location.pathname === "/"} />
          {/* Lessons */}
          <NavLink to="/lessons" label="Lessons" active={location.pathname.startsWith("/lessons")} />
          {/* Practice */}
          <NavLink to="/practice" label="Practice" active={location.pathname.startsWith("/practice")} />
          {/* Library */}
          <NavLink to="/library" label="Library" active={location.pathname.startsWith("/library")} />
          {/* Dashboard */}
          <NavLink to="/dashboard" label="Dashboard" active={location.pathname.startsWith("/dashboard")} />
          {/* Community */}
          <NavLink to="/community" label="Community" active={location.pathname.startsWith("/community")} />
          {/* Resources Dropdown */}
          <div className="navbar-dropdown"
            style={{ position: "relative"}}
            onMouseEnter={() => setDropdownOpen("resources")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button
              className="btn btn-dropdown navbar-btn-dropdown"
              style={{
                background: "none",
                color: "var(--text-color)",
                border: 0,
                padding: "10px 18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer"
              }}
              onClick={() => handleDropdown("resources")}
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "resources"}
            >
                Resources
                <span style={{fontSize:14, marginLeft:4, opacity:0.7}} aria-hidden>▼</span>
            </button>
            {dropdownOpen === "resources" && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  background: "var(--card-bg, #1A2236)",
                  minWidth: 150,
                  boxShadow: "0 4px 18px 0 rgba(40,48,77,0.14)",
                  borderRadius: 7,
                  zIndex: 30,
                  border: "1.5px solid var(--border-color)"
                }}
                tabIndex={-1}
              >
                <Link
                  to="/library"
                  className="dropdown-item"
                  style={dropdownStyleItem}
                  onClick={() => setDropdownOpen(null)}
                  tabIndex={0}
                >
                  Sheet Music
                </Link>
                <a
                  href="https://imslp.org/wiki/Main_Page"
                  className="dropdown-item"
                  style={dropdownStyleItem}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                >
                  IMSLP Database
                </a>
                <a
                  href="https://www.youtube.com/results?search_query=violin+tutorials"
                  className="dropdown-item"
                  style={dropdownStyleItem}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                >
                  Video Tutorials
                </a>
              </div>
            )}
          </div>
          {/* Profile Dropdown */}
          <div className="navbar-dropdown"
            style={{ position: "relative"}}
            onMouseEnter={() => setDropdownOpen("profile")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button
              className="btn btn-dropdown navbar-btn-dropdown"
              style={{
                background: "none",
                color: "var(--text-color)",
                border: 0,
                padding: "10px 18px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer"
              }}
              onClick={() => handleDropdown("profile")}
              aria-haspopup="true"
              aria-expanded={dropdownOpen === "profile"}
            >
              <span role="img" aria-label="Profile" style={{fontSize:20, verticalAlign: "text-bottom"}}>🎻</span>
              <span style={{marginLeft: 0}}>Profile</span>
              <span style={{fontSize:14, marginLeft:2, opacity:0.7}} aria-hidden>▼</span>
            </button>
            {dropdownOpen === "profile" && (
              <div
                className="dropdown-menu"
                style={{
                  position: "absolute",
                  top: 40,
                  right: 0,
                  background: "var(--card-bg, #1A2236)",
                  minWidth: 150,
                  boxShadow: "0 4px 18px 0 rgba(40,48,77,0.14)",
                  borderRadius: 7,
                  zIndex: 30,
                  border: "1.5px solid var(--border-color)"
                }}
                tabIndex={-1}
              >
                <Link
                  to="/dashboard"
                  className="dropdown-item"
                  style={dropdownStyleItem}
                  onClick={() => setDropdownOpen(null)}
                  tabIndex={0}
                >
                  My Dashboard
                </Link>
                <a
                  href="#profile"
                  className="dropdown-item"
                  style={dropdownStyleItem}
                  tabIndex={0}
                >
                  Settings
                </a>
                <a
                  href="#logout"
                  className="dropdown-item"
                  style={dropdownStyleItem}
                  tabIndex={0}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Responsive: sticky padding at top for content */}
      <style>
        {`
          @media (max-width: 880px) {
            .navbar .container { flex-direction: column; align-items: stretch; }
            .navbar-links { flex-wrap: wrap; gap: 4px; justify-content: flex-end;}
          }
          @media (max-width:650px) {
            .navbar .container { flex-direction: column; gap: 2px; }
            .navbar-links { flex-direction: column; gap: 2px; }
            .navbar { padding: 10px 2vw; }
          }
          .navbar .btn, .navbar .btn-dropdown {
            box-shadow: none;
            border-radius: 5px;
            margin: 0 2px;
            background: none;
            color: var(--base-light);
            transition: background 0.14s;
            position: relative;
          }
          .navbar .btn.active,
          .navbar .btn:hover,
          .btn-dropdown:focus, .btn-dropdown:active {
            background: linear-gradient(90deg, rgba(191,161,74,0.13) 12%, rgba(46,64,87,0.13) 100%);
            color: var(--secondary);
            outline: none;
          }
          .dropdown-menu .dropdown-item {
            border: none;
            color: var(--text-color);
            background: none;
            text-align: left;
            font-size: 1rem;
            padding-left: 21px;
            width: 100%;
            display: block;
            cursor: pointer;
          }
          .dropdown-menu .dropdown-item:hover,
          .dropdown-menu .dropdown-item:focus {
            background: linear-gradient(90deg, rgba(191,161,74,0.22) 0%, rgba(46,64,87,0.10) 100%);
            color: var(--secondary);
          }
        `}
      </style>
    </nav>
  );
}

// PUBLIC_INTERFACE
function NavLink({ to, label, active }) {
  return (
    <Link
      className={`btn${active ? " active" : ""}`}
      to={to}
      style={{
        margin: "0 2px",
        fontWeight: 600,
        letterSpacing: "0.012em",
        background: "none"
      }}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

// Common dropdown menu item style
const dropdownStyleItem = {
  padding: "11px 16px",
  display: "block",
  fontWeight: 500,
  color: "var(--text-color)", // #D2B48C
  background: "none",
  border: "none",
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: 4,
  transition: "background 0.13s, color 0.13s",
  outline: "none"
};

export default Navbar;

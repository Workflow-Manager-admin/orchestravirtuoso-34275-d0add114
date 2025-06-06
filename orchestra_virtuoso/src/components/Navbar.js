import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

// PUBLIC_INTERFACE
function Navbar() {
  /**
   * Navbar component for main navigation.
   * Routes to all core pages as per app requirements.
   */
  return (
    <nav className="navbar">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div className="logo">
          <span className="logo-symbol" aria-label="Violin" title="OrchestraVirtuoso">*</span>
          OrchestraVirtuoso
        </div>
        <div>
          <Link className="btn" to="/dashboard">Dashboard</Link>
          <Link className="btn" to="/lessons" style={{ marginLeft: 8 }}>Lessons</Link>
          <Link className="btn" to="/practice" style={{ marginLeft: 8 }}>Practice</Link>
          <Link className="btn" to="/library" style={{ marginLeft: 8 }}>Library</Link>
          <Link className="btn" to="/community" style={{ marginLeft: 8 }}>Community</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

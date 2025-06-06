import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";
import Library from "./pages/Library";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Card from "./components/Card";

// Home page Hero, CTA, and Feature Cards
function HomePage() {
  const navigate = useNavigate();

  // SVG and asset icons for each feature card
  const icons = {
    lessons: (
      <span aria-label="Lessons">
        <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden="true">
          <ellipse cx="22" cy="22" rx="19" ry="18"
            fill="#2E4057" stroke="#BFA14A" strokeWidth="2.2" />
          <rect x="18.2" y="9" width="7.2" height="24" rx="2.5"
            fill="#BFA14A" />
          <ellipse cx="22" cy="14" rx="4.5" ry="4.0"
            fill="none" stroke="#BFA14A" strokeWidth="2" />
          <ellipse cx="22" cy="31" rx="7.9" ry="5.8"
            fill="none" stroke="#BFA14A" strokeWidth="2" />
          <rect x="20.2" y="9" width="1.6" height="24" rx="0.82"
            fill="#2E4057" />
        </svg>
      </span>
    ),
    practice: (
      <span aria-label="Practice">
        <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden="true">
          <ellipse cx="22" cy="22.3" rx="17" ry="12"
            fill="none" stroke="#BFA14A" strokeWidth="2"/>
          <rect x="19" y="10.5" width="6" height="18" rx="1.9"
            fill="#BFA14A" />
          <ellipse cx="22" cy="15.6" rx="3.7" ry="3"
            fill="none" stroke="#BFA14A" strokeWidth="2" />
          <rect x="21.2" y="13.6" width="1.5" height="8.3" rx="0.7" fill="#2E4057" />
        </svg>
      </span>
    ),
    library: (
      <span aria-label="Sheet Music">
        <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden="true">
          <rect x="7" y="8" width="30" height="28" rx="5.8"
            fill="#232946" stroke="#BFA14A" strokeWidth="2"/>
          <ellipse cx="14.5" cy="19.5" rx="3.1" ry="2.3"
            fill="#BFA14A" /><ellipse cx="29.6" cy="25.8" rx="2.5" ry="1.9"
            fill="#BFA14A" />
          <rect x="11.3" y="30.1" width="17.5" height="2.8"
            fill="#BFA14A" />
        </svg>
      </span>
    ),
    dashboard: (
      <span aria-label="Progress">
        <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden="true">
          <rect x="8" y="10" width="28" height="24" rx="6"
            fill="#232946" stroke="#BFA14A" strokeWidth="2"/>
          <rect x="13" y="26" width="4" height="6" rx="2" fill="#BFA14A"/>
          <rect x="20" y="21" width="4" height="11" rx="2" fill="#BFA14A"/>
          <rect x="27" y="17" width="4" height="15" rx="2" fill="#BFA14A"/>
        </svg>
      </span>
    ),
    community: (
      <span aria-label="Community">
        <svg width={44} height={44} viewBox="0 0 44 44" aria-hidden="true">
          <ellipse cx="13.5" cy="26" rx="7" ry="7" fill="#BFA14A" opacity="0.19"/>
          <ellipse cx="30.5" cy="26" rx="7" ry="7" fill="#BFA14A" opacity="0.16"/>
          <ellipse cx="22" cy="18.5" rx="8.6" ry="8.4" fill="#BFA14A"/>
          <ellipse cx="22" cy="18.5" rx="4.9" ry="4.6" fill="#2E4057"/>
        </svg>
      </span>
    )
  };

  // Feature cards config
  const featureCards = [
    {
      icon: icons.lessons,
      title: "Structured Lessons",
      description: "Step-by-step violin lessons from beginner to advanced, with video tutorials and guides.",
      link: "/lessons",
      cta: "Start Learning"
    },
    {
      icon: icons.practice,
      title: "Practice Tools",
      description: "Interactive tools: tuners, metronome, and practice logs to enhance your daily routine.",
      link: "/practice",
      cta: "Explore Tools"
    },
    {
      icon: icons.library,
      title: "Sheet Music Library",
      description: "A curated selection of sheet music from classical to orchestral, for all skill levels.",
      link: "/library",
      cta: "Browse Library"
    },
    {
      icon: icons.dashboard,
      title: "Progress Dashboard",
      description: "Visualize your learning journey and achievements on your personalized dashboard.",
      link: "/dashboard",
      cta: "View Progress"
    },
    {
      icon: icons.community,
      title: "Community Forum",
      description: "Discuss technique and music with peers and teachers in a friendly, moderated forum.",
      link: "/community",
      cta: "Join the Forum"
    }
  ];

  // Main return
  return (
    <div className="container">
      <section className="hero"
               style={{
                paddingBottom: "42px",
                paddingTop: "134px",
                position: "relative",
                textAlign: "center"
               }}>
        {/* Hero Violin Image, headline, sub, CTA */}
        <img
          src={require("./assets/violin.png")}
          alt="Orchestral Violin"
          style={{
            width: 106,
            height: 106,
            objectFit: "contain",
            marginBottom: 10,
            filter: "drop-shadow(0 5px 22px #201f24ba)",
            borderRadius: "14px"
          }}
          loading="lazy"
        />
        <div className="subtitle" style={{
          color: "var(--base-light)",
          fontWeight: 600,
          fontSize: "1.15rem",
          letterSpacing: 0.01
        }}>Immerse Yourself in the World of Violin</div>
        <h1 className="title"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', Times, serif",
              fontWeight: 800,
              fontSize: "3.3rem",
              color: "var(--base-light)",
              margin: "4px 0"
            }}>
          Orchestra<span style={{color: "var(--secondary)", letterSpacing: "0.018em"}}>Virtuoso</span>
        </h1>
        <div className="description"
             style={{fontSize: "1.17rem", color: "var(--text-secondary)", marginBottom: 14}}>
          Learn, practice, and connect in a refined, orchestral environment.
        </div>
        <button
          className="btn btn-large"
          style={{
            fontWeight: 700,
            fontSize: "1.13rem",
            background: "var(--secondary)",
            color: "#1A2236",
            borderRadius: 5,
            boxShadow: "0 2px 11px 0 rgba(42, 50, 90, 0.12)",
            marginTop: 12,
            padding: "14px 38px"
          }}
          onClick={() => navigate("/lessons")}
        >
          Get Started
        </button>
      </section>
      {/* Section: Feature cards */}
      <section
        className="feature-cards"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "18px",
          maxWidth: 710,
          margin: "0 auto 36px",
          marginTop: -8,
        }}
      >
        {featureCards.map((feature, idx) => (
          <Card key={feature.title} {...feature} />
        ))}
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/library" element={<Library />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
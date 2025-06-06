import React from "react";

// PUBLIC_INTERFACE
/**
 * Library page – Orchestral Sheet Music Library
 * A curated, browsable library of sheet music cards. Each card includes:
 * - Title
 * - Composer
 * - Difficulty
 * - Download/Preview buttons
 * Fully responsive, orchestral theme, placeholder/demo data.
 */
function Library() {
  // Placeholder sheet music data
  const sheetMusicList = [
    {
      title: "Meditation from Thaïs",
      composer: "J. Massenet",
      difficulty: "Intermediate",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    },
    {
      title: "Violin Concerto in D major, Op. 35",
      composer: "P. Tchaikovsky",
      difficulty: "Advanced",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    },
    {
      title: "Canon in D",
      composer: "J. Pachelbel",
      difficulty: "Beginner",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    },
    {
      title: "Introduction & Rondo Capriccioso",
      composer: "C. Saint-Saëns",
      difficulty: "Advanced",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    },
    {
      title: "Violin Concerto in E minor, Op. 64",
      composer: "F. Mendelssohn",
      difficulty: "Intermediate",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    },
    {
      title: "Concerto for Two Violins in D minor",
      composer: "J.S. Bach",
      difficulty: "Intermediate",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    },
    {
      title: "Air on the G String",
      composer: "J.S. Bach",
      difficulty: "Beginner",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    },
    {
      title: "The Swan (Le Cygne)",
      composer: "C. Saint-Saëns",
      difficulty: "Intermediate",
      asset: require("../assets/violin.png"),
      demoFile: "#",
      pdfFile: "#",
    }
  ];

  // For gold effect on buttons
  const btnStyle = {
    fontFamily: "'Great Vibes', cursive",
    fontWeight: 400,
    padding: "7px 24px",
    fontSize: "1.01rem",
    background: "var(--secondary)",
    color: "#1A2236",
    borderRadius: 5,
    margin: "0 8px 0 0",
    border: "2px solid var(--secondary)",
    boxShadow: "0 2px 11px 0 rgba(42, 50, 90, 0.08)",
    letterSpacing: "0.025em",
    transition: "background 0.14s, color 0.16s"
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "calc(100vh - 90px)",
        paddingTop: "116px",
        paddingBottom: "56px",
        width: "100vw",
        maxWidth: "100vw"
      }}
    >
      {/* Header */}
      <section
        style={{
          textAlign: "center",
          marginBottom: "2vw",
          width: "100%"
        }}
      >
        <h1
          className="title"
          style={{
            color: "var(--secondary)",
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            margin: 0,
            marginBottom: 6,
            fontWeight: 400,
            textShadow: "0 2px 22px rgba(191,161,74,0.13)",
            letterSpacing: "0.04em"
          }}
        >
          Sheet Music Library
        </h1>
        <p
          className="description"
          style={{ margin: "0 auto", marginTop: 8, marginBottom: 18, maxWidth: 610 }}
        >
          Explore a curated selection of classical and orchestral sheet music for violin.
          Filter by difficulty, browse, download PDFs, or preview each piece &mdash; all in one orchestral-inspired gallery.
        </p>
      </section>

      {/* Main Library Grid */}
      <section
        aria-label="Sheet Music Gallery"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2.5vw",
          maxWidth: 1200,
          margin: "0 auto",
          marginBottom: 10,
          width: "100%"
        }}
      >
        {sheetMusicList.map((m, i) => (
          <article
            className="card"
            key={m.title + m.composer}
            tabIndex={0}
            aria-label={`Sheet music: ${m.title} by ${m.composer}`}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "2vw",
              minHeight: 156,
              padding: "2.4vw 2vw",
              margin: 0,
              boxShadow: "0 2px 11px 0 rgba(45,45,53,0.09)"
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                minWidth: 90,
                minHeight: 90,
                width: 90,
                height: 90,
                borderRadius: 13,
                overflow: "hidden",
                marginRight: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(114deg, #1A2236 85%, #BFA14A2a 100%)",
                boxShadow: "0 3px 22px 0 rgba(70,52,14,0.11)"
              }}
            >
              {/* Use violin as generic icon, or .svg in production */}
              <img
                src={m.asset}
                alt={m.title + " cover"}
                style={{
                  width: 68,
                  height: 68,
                  objectFit: "contain",
                  borderRadius: 10,
                  background: "rgba(191,161,74,0.045)"
                }}
                loading="lazy"
              />
            </div>
            {/* Details */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "var(--text-color)",
                  fontWeight: 400,
                  margin: "0 0 7px 0",
                  fontSize: "clamp(1.15rem, 2.3vw, 1.7rem)",
                  lineHeight: 1.15,
                  letterSpacing: "0.03em"
                }}
              >
                {m.title}
              </h2>
              <div style={{ fontSize: "1.04rem", marginBottom: 3, color: "var(--secondary)", fontFamily: "'Great Vibes', cursive" }}>
                {m.composer}
              </div>
              <div
                className="description"
                style={{ color: "var(--text-secondary)", fontSize: "0.98rem", marginBottom: 8, marginLeft: 1 }}
              >
                <span style={{ color: "var(--secondary)", marginRight: 9 }}>Difficulty:</span>
                <span style={{
                  background: "rgba(191,161,74,0.11)",
                  padding: "2px 13px",
                  borderRadius: 11,
                  fontSize: "0.97rem",
                  marginLeft: 0,
                  color: (m.difficulty === "Advanced"
                          ? "#dfb812"
                          : m.difficulty === "Beginner"
                          ? "#a9d89e"
                          : "#BFA14A")
                }}>
                  {m.difficulty}
                </span>
              </div>
              {/* Action Buttons */}
              <div style={{ marginTop: 7, display: "flex", alignItems: "center", gap: "8px" }}>
                <a
                  href={m.pdfFile}
                  download={m.title.replace(/\s/g, "_") + ".pdf"}
                  className="btn"
                  style={{ ...btnStyle, marginRight: 7, background: "var(--secondary)" }}
                  tabIndex={0}
                >
                  Download
                </a>
                <a
                  href={m.demoFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    ...btnStyle,
                    background: "rgba(191,161,74,0.10)",
                    color: "var(--text-color)",
                    border: "1.5px solid var(--secondary)",
                  }}
                  tabIndex={0}
                >
                  Preview
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Inline responsive style for grid layout */}
      <style>{`
        @media (min-width: 650px) {
          [aria-label="Sheet Music Gallery"] {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1060px) {
          [aria-label="Sheet Music Gallery"] {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media (max-width: 650px) {
          [aria-label="Sheet Music Gallery"] .card {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 1.2rem 1vw;
          }
          [aria-label="Sheet Music Gallery"] .card > div:first-child {
            margin-right: 0;
            margin-bottom: 14px;
          }
        }
      `}
      </style>
    </div>
  );
}

export default Library;

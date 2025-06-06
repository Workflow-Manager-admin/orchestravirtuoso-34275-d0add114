import React from "react";

// PUBLIC_INTERFACE
/**
 * Progress Tracking Dashboard page for OrchestraVirtuoso.
 * Displays polished orchestral-themed charts/indicators (using SVG/CSS, not chart libs)
 * to show mock learning stats, milestones, and a progress log/history list.
 */
function Dashboard() {
  // Demo stats and activity logs
  const stats = [
    {
      label: "Lessons Completed",
      value: 16,
      max: 24,
      color: "#BFA14A",
      subtitle: "of 24",
      icon: (
        <svg width={42} height={42} aria-label="Lessons Completed">
          <ellipse cx="21" cy="21" rx="18" ry="17" fill="#2E4057" stroke="#BFA14A" strokeWidth="2.1"/>
          <rect x="19.3" y="10" width="6" height="22" rx="2.2" fill="#BFA14A"/>
          <ellipse cx="21.9" cy="15.4" rx="3.9" ry="3.7" fill="none" stroke="#BFA14A" strokeWidth="2"/>
        </svg>
      )
    },
    {
      label: "Practice Minutes",
      value: 1280,
      max: 1800,
      color: "#BFA14A",
      subtitle: "this month",
      icon: (
        <svg width={42} height={42} aria-label="Practice Minutes">
          <ellipse cx="21" cy="21" rx="17" ry="13" fill="none" stroke="#BFA14A" strokeWidth="2"/>
          <rect x="18.7" y="9.2" width="6.7" height="13.8" rx="2.2" fill="#BFA14A"/>
          <ellipse cx="21" cy="23" rx="7.7" ry="4.3" fill="none" stroke="#BFA14A" strokeWidth="2"/>
        </svg>
      )
    },
    {
      label: "Repertoire Pieces",
      value: 5,
      max: 12,
      color: "#BFA14A",
      subtitle: "learned",
      icon: (
        <svg width={42} height={42} aria-label="Repertoire Learned">
          <rect x="7.2" y="8.5" width="28" height="26.2" rx="6.2" fill="#232946" stroke="#BFA14A" strokeWidth="2"/>
          <ellipse cx="14.6" cy="17.6" rx="2.7" ry="2" fill="#BFA14A"/>
          <ellipse cx="27.1" cy="25.3" rx="2.2" ry="1.6" fill="#BFA14A"/>
          <rect x="12.8" y="28.9" width="14.1" height="2.5" fill="#BFA14A"/>
        </svg>
      )
    },
  ];

  const achievements = [
    {
      milestone: "Completed Beginner Course",
      date: "2024-03-11",
      icon: "🏅"
    },
    {
      milestone: "Played First Ensemble",
      date: "2024-02-22",
      icon: "🎶"
    },
    {
      milestone: "Daily Practice streak: 7 days",
      date: "2024-03-06",
      icon: "🔥"
    },
    {
      milestone: "Uploaded First Practice Log",
      date: "2024-01-28",
      icon: "📒"
    }
  ];

  const progressLogs = [
    {
      ts: "2024-03-13T19:55:00",
      entry: "Practiced scales (G, D, A major), worked on shifting positions.",
    },
    {
      ts: "2024-03-12T16:22:00",
      entry: "Completed video lesson: 'Vibrato Basics'.",
    },
    {
      ts: "2024-03-11T14:07:00",
      entry: "Logged 45 minutes practice, refined Saint-Saëns—Introduction & Rondo Capriccioso.",
    },
    {
      ts: "2024-03-10T18:31:00",
      entry: "Joined virtual community ensemble session.",
    },
    {
      ts: "2024-03-09T12:14:00",
      entry: "Finished 'Canon in D' sheet music review.",
    },
  ];

  /** Helper: Circular progress SVG (piano roll/orchestral color accent) */
  function CircularStat({ value, max, label, subtitle, color, icon }) {
    const pct = Math.min(100, Math.round((value / max) * 100));
    // Circle math
    const r = 29; // radius
    const c = 2 * Math.PI * r;
    const strokeDash = (pct * c) / 100;
    return (
      <div
        className="card"
        style={{
          minWidth: 180,
          maxWidth: 250,
          minHeight: 190,
          background: "linear-gradient(114deg, #232946 87%, #BFA14A21 100%)",
          border: "1.3px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 8,
          margin: 0,
          padding: "2.1vw 1vw",
          boxShadow: "0 2px 11px 0 rgba(60,52,24,0.12)",
        }}
        tabIndex={0}
        aria-label={label}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 75,
            height: 75,
            marginBottom: 2,
            position: "relative"
          }}
        >
          {/* Background Circle */}
          <svg width={75} height={75}>
            <circle
              cx={37.5}
              cy={37.5}
              r={r}
              fill="none"
              stroke="#2E4057"
              strokeWidth="8.1"
            />
            {/* Primary Progress */}
            <circle
              cx={37.5}
              cy={37.5}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth="8.1"
              strokeDasharray={c}
              strokeDashoffset={c - strokeDash}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 3px 13px var(--secondary, #BFA14A33))",
                transition: "stroke-dashoffset 0.7s"
              }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              width: 42,
              height: 42,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              filter: "drop-shadow(0 2px 8px #BFA14A11)",
            }}
            aria-hidden
          >
            {icon}
          </div>
        </div>
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          color: "var(--text-color)",
          fontSize: "2.03rem",
          fontWeight: 400,
          margin: "7px 0 2px 0"
        }}>
          {value}
          <span style={{
            color: "var(--text-secondary)",
            fontSize: "1.01rem",
            fontWeight: 400,
            marginLeft: 7
          }}>{subtitle}</span>
        </div>
        <div style={{
          fontFamily: "'Great Vibes', cursive",
          fontWeight: 400,
          fontSize: "1.08rem",
          color: "var(--secondary)",
          margin: 0,
          letterSpacing: "0.012em"
        }}>
          {label}
        </div>
        <div
          aria-label="Progress percent"
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.01rem"
          }}
        >{pct}%</div>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        minHeight: "calc(100vh - 90px)",
        paddingTop: "120px",
        paddingBottom: "50px",
        width: "100vw",
        maxWidth: "100vw"
      }}
    >
      <section
        style={{
          textAlign: "center",
          marginBottom: "2vw",
          width: "100%"
        }}
      >
        <h1 className="title"
          style={{
            color: "var(--secondary)",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            margin: 0,
            fontWeight: 400,
            textShadow: "0 2px 18px rgba(191,161,74,0.19)",
            letterSpacing: "0.045em"
          }}
        >
          Progress Dashboard
        </h1>
        <p className="description"
          style={{
            margin: "0 auto",
            marginTop: 10,
            marginBottom: 22,
            maxWidth: 560,
            fontSize: "1.13rem",
            color: "var(--text-secondary)"
          }}>
          Visualize your journey as a virtuoso—track your violin studies, see milestones, and celebrate achievements,
          all orchestrated in an elegant, music-inspired layout.
        </p>
      </section>

      {/* Main progress stats: circular indicators, orchestral theme */}
      <section
        aria-label="Progress indicators"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2.8vw",
          justifyContent: "center",
          alignItems: "stretch",
          marginBottom: "2.7vw"
        }}
      >
        {stats.map((s, i) => (
          <CircularStat
            key={s.label}
            value={s.value}
            max={s.max}
            label={s.label}
            subtitle={s.subtitle}
            color={s.color}
            icon={s.icon}
          />
        ))}
      </section>

      {/* Achievements / Milestones grid */}
      <section
        aria-label="Achievements"
        style={{
          marginBottom: "2.3vw",
          maxWidth: 820,
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--secondary)",
            fontWeight: 400,
            fontSize: "1.31rem",
            margin: 0,
            marginBottom: 10,
            letterSpacing: "0.039em"
          }}
        >
          Milestones & Achievements
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 30px",
          width: "100%"
        }}>
          {achievements.map((a, idx) => (
            <div
              key={a.milestone}
              className="card"
              tabIndex={0}
              aria-label={a.milestone}
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: "var(--text-color)",
                background: "rgba(46,64,87,0.17)",
                border: "1.4px solid var(--border-color)",
                borderRadius: 11,
                minWidth: 0,
                padding: "1.1vw 1vw",
                margin: 0,
                boxShadow: "0 2px 9px 0 rgba(65,52,14,0.09)",
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: "1.11rem"
              }}
            >
              <span
                aria-hidden
                style={{ fontSize: 26, marginRight: 8 }}
              >{a.icon}</span>
              <span>{a.milestone}</span>
              <span
                style={{
                  marginLeft: "auto",
                  color: "var(--text-secondary)",
                  fontSize: "0.93rem"
                }}
              >
                {formatAchievementDate(a.date)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Progress log list: recent tracking log/history */}
      <section
        aria-label="Progress Log"
        style={{
          background: "rgba(46,64,87,0.09)",
          border: "1px solid var(--border-color)",
          borderRadius: 10,
          padding: "18px 20px",
          maxWidth: 640,
          minHeight: 140,
          margin: "0 auto"
        }}
      >
        <h2
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--secondary)",
            fontWeight: 400,
            fontSize: "1.15rem",
            margin: "0 0 8px 0",
            letterSpacing: "0.032em"
          }}
        >
          Progress Log
        </h2>
        <ul style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          fontFamily: "'Great Vibes', cursive",
        }}>
          {progressLogs.map((l, i) => (
            <li key={i}
              style={{
                fontSize: "1.04rem",
                color: "var(--text-secondary)",
                padding: "7px 0",
                borderBottom: i === progressLogs.length - 1 ? "none" : "1px solid var(--border-color)"
              }}>
              <span role="img" aria-label="progress event" style={{ marginRight: 8 }}>🎻</span>
              <span style={{
                color: "var(--text-color)"
              }}>{l.entry}</span>
              <span
                style={{
                  float: "right",
                  color: "var(--text-secondary)",
                  fontSize: "0.91em",
                  marginLeft: 11
                }}
              >{formatShortDate(l.ts)}</span>
            </li>
          ))}
        </ul>
      </section>
      {/* Inline responsive CSS */}
      <style>
        {`
        @media (max-width: 820px) {
          [aria-label="Achievements"] > div {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 700px) {
          [aria-label="Progress indicators"] {
            flex-direction: column !important;
            gap: 5vw !important;
          }
          .card {
            min-width: unset !important;
            max-width: 99vw !important;
            padding: 2.6vw 2vw !important;
          }
        }
        `}
      </style>
    </div>
  );
}

/** Helper: Format ISO date (YYYY-MM-DD) to readable */
function formatAchievementDate(date) {
  // e.g. "Mar 11, 2024"
  const d = new Date(date);
  return d.toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric"
  });
}

/** Helper: Format date-time string to readable short time/date */
function formatShortDate(ts) {
  const d = new Date(ts);
  const opts = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return d.toLocaleString(undefined, opts).replace(",", "");
}

export default Dashboard;

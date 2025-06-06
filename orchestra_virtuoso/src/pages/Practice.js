import React, { useState, useRef } from "react";

// PUBLIC_INTERFACE
/**
 * Practice Tools page — provides orchestral-themed interactive sections for Tuner,
 * Metronome, and Practice Log. Each section is visually detailed and aligned with
 * the app's classical motif for a refined musician experience.
 */
function Practice() {
  // --- Tuner State (simple, not real audio, but interactive UI) ---
  const [selectedNote, setSelectedNote] = useState("A4");
  const notes = [
    { name: "G3", freq: 196 },
    { name: "D4", freq: 293.66 },
    { name: "A4", freq: 440 },
    { name: "E5", freq: 659.25 }
  ];
  const playTone = (freq) => {
    // Simple sine wave oscillator (Web Audio API)
    if (!window.AudioContext) return;
    const ctx = new window.AudioContext();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(ctx.destination);
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 900);
  };

  // --- Metronome State ---
  const [bpm, setBpm] = useState(80);
  const [isMetronomeOn, setIsMetronomeOn] = useState(false);
  const metronomeInterval = useRef(null);

  const startMetronome = () => {
    if (isMetronomeOn) return;
    setIsMetronomeOn(true);

    let click = () => {
      // Play click sound with different pitch for strong beat
      if (!window.AudioContext) return;
      const ctx = new window.AudioContext();
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = 1200;
      osc.connect(ctx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
        ctx.close();
      }, 80);
    };

    click(); // first beat immediately
    metronomeInterval.current = setInterval(() => click(), 60000 / bpm);
  };

  const stopMetronome = () => {
    setIsMetronomeOn(false);
    if (metronomeInterval.current) clearInterval(metronomeInterval.current);
    metronomeInterval.current = null;
  };

  const handleBpmChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 40;
    if (value < 30) value = 30;
    if (value > 210) value = 210;
    setBpm(value);
    if (isMetronomeOn) {
      stopMetronome();
      setTimeout(() => startMetronome(), 130);
    }
  };

  // --- Practice Log State ---
  const [logs, setLogs] = useState([]);
  const [logInput, setLogInput] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);

  const addLog = (e) => {
    e.preventDefault();
    if (logInput.trim() === "") return;
    setLogs([
      { text: logInput, ts: new Date().toISOString().slice(0, 16) },
      ...logs,
    ]);
    setLogInput("");
    setShowLogForm(false);
  };

  // ========== RENDER ==========
  return (
    <div
      className="container"
      style={{
        minHeight: "calc(100vh - 90px)",
        paddingTop: "120px",
        paddingBottom: "40px",
        width: "100vw",
        maxWidth: "100vw"
      }}
    >
      <section
        style={{
          textAlign: "center",
          marginBottom: "2vw",
          width: "100%",
        }}
      >
        <h1 className="title"
            style={{
              color: "var(--secondary)",
              fontSize: "clamp(2.1rem, 6vw, 3.4rem)",
              letterSpacing: "0.045em",
              fontWeight: 400,
              textShadow: "0 2px 22px rgba(191,161,74,0.12)"
            }}>
          Practice Tools
        </h1>
        <p className="description"
          style={{ margin: "0 auto", marginTop: 7, marginBottom: 18, maxWidth: 590 }}>
          Refine your daily practice with the essentials: a <b>Tuner</b> to perfect your pitch,
          a <b>Metronome</b> for timing and rhythm, and an elegant <b>Practice Log</b> for progress tracking.<br />
          All crafted with orchestral sophistication for violinists of every level.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2.6vw",
          maxWidth: 1200,
          margin: "0 auto"
        }}
      >

        {/* --- TUNER CARD --- */}
        <article
          className="card"
          tabIndex={0}
          aria-label="Violin Tuner Tool"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "3vw",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          {/* Tuner Icon (Violin scroll & pegs) */}
          <div style={{
            flex: "0 0 102px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 5,
            minWidth: 88
          }}>
            <svg width={62} height={97} viewBox="0 0 62 97" aria-label="Violin Tuner" style={{ filter: "drop-shadow(0 3px 18px #baa0601a)" }}>
              <ellipse cx="32" cy="60" rx="26" ry="28" fill="#232946" stroke="#BFA14A" strokeWidth="2"/>
              <rect x="24.5" y="17" width="13.2" height="62" rx="6.1" fill="#BFA14A"/>
              <ellipse cx="30.5" cy="28" rx="3.7" ry="3.7" fill="#2E4057" stroke="#BFA14A" strokeWidth="1"/>
              <ellipse cx="37.5" cy="28" rx="3.7" ry="3.7" fill="#2E4057" stroke="#BFA14A" strokeWidth="1"/>
              <rect x="24.6" y="40" width="12.8" height="6.6" rx="2.4" fill="#232946" />
            </svg>
          </div>
          {/* Tuner Controls */}
          <div
            style={{
              flex: "1 1 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h2 style={{
              color: "var(--secondary)",
              fontWeight: 400,
              fontSize: "clamp(1.16rem, 2.3vw, 1.6rem)",
              fontFamily: "'Great Vibes', cursive",
              margin: "0 0 10px 0",
              letterSpacing: "0.04em"
            }}>
              Violin Tuner
            </h2>
            <div className="description"
              style={{ color: "var(--text-secondary)", fontSize: "1.03rem", marginBottom: 9 }}>
              Select a string note and click to hear a tuning reference. Tune your violin or practice ear-training with orchestral clarity!
            </div>
            <div
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                marginTop: 7,
                marginBottom: 11
              }}>
              {notes.map((n) => (
                <button
                  key={n.name}
                  className="btn"
                  style={{
                    background: n.name === selectedNote
                      ? "var(--secondary)"
                      : "rgba(191,161,74,0.12)",
                    color: n.name === selectedNote
                      ? "var(--base-dark)"
                      : "var(--text-color)",
                    border: n.name === selectedNote
                      ? "2.5px solid var(--secondary)"
                      : "1.5px solid var(--border-color)",
                    fontFamily: "'Great Vibes', cursive",
                    fontWeight: 400,
                    fontSize: "1.14rem",
                    minWidth: 48,
                    transition: "background 0.16s, color 0.16s"
                  }}
                  onClick={() => {
                    setSelectedNote(n.name);
                    playTone(n.freq);
                  }}
                  aria-pressed={n.name === selectedNote}
                >
                  {n.name}
                </button>
              ))}
            </div>
            <div
              className="description"
              style={{
                fontSize: "0.99rem",
                marginTop: "8px",
                color: "var(--text-secondary)",
                letterSpacing: "0.025em"
              }}>
              Standard tuning: G3, D4, A4, E5 &mdash; Hover or tap note for sound.
            </div>
          </div>
        </article>

        {/* --- METRONOME CARD --- */}
        <article
          className="card"
          tabIndex={0}
          aria-label="Metronome Tool"
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: "3vw",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          {/* Metronome Icon (Pendulum style) */}
          <div style={{
            flex: "0 0 90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 78
          }}>
            <svg width={62} height={87} viewBox="0 0 62 87" aria-label="Metronome" style={{ filter: "drop-shadow(0 3px 14px #baa06022)" }}>
              <rect x="17" y="12" width="28" height="66" rx="13" fill="#2E4057" stroke="#BFA14A" strokeWidth="2"/>
              <polygon points="21,77 41,77 31,13" fill="#BFA14A" />
              <rect x="28" y="35" width="6" height="30" rx="3" fill="#232946"/>
            </svg>
          </div>
          {/* Metronome Controls */}
          <div
            style={{
              flex: "1 1 0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h2 style={{
              color: "var(--secondary)",
              fontWeight: 400,
              fontSize: "clamp(1.09rem, 2.1vw, 1.5rem)",
              fontFamily: "'Great Vibes', cursive",
              margin: "0 0 10px 0",
              letterSpacing: "0.03em"
            }}>
              Metronome
            </h2>
            <div className="description"
              style={{ color: "var(--text-secondary)", fontSize: "1.055rem", marginBottom: 11 }}>
              Keep perfect time with a classical pendulum-inspired metronome. <br />
              Adjust BPM and tap "Start" to hear audible beats.
            </div>
            <form style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center", marginTop: 0 }}
              onSubmit={e => e.preventDefault()}>
              <label htmlFor="bpm" style={{ fontSize: "1.01rem" }}>Tempo (BPM):</label>
              <input
                id="bpm"
                type="number"
                min={30}
                max={210}
                step={1}
                value={bpm}
                onChange={handleBpmChange}
                style={{
                  padding: "7px 10px",
                  fontSize: "1.08rem",
                  fontFamily: "'Great Vibes', cursive",
                  borderRadius: 5,
                  border: "1px solid var(--border-color)",
                  background: "rgba(46,64,87,0.09)",
                  color: "var(--text-color)",
                  width: 70
                }}
                aria-label="Beats per minute"
              />
              <button
                type="button"
                className="btn"
                onClick={isMetronomeOn ? stopMetronome : startMetronome}
                aria-pressed={isMetronomeOn}
                style={{
                  background: isMetronomeOn ? "var(--secondary)" : "rgba(191,161,74,0.12)",
                  color: isMetronomeOn ? "var(--base-dark)" : "var(--text-color)",
                  border: isMetronomeOn
                    ? "2.2px solid var(--secondary)"
                    : "1.5px solid var(--border-color)",
                  minWidth: 78
                }}
              >
                {isMetronomeOn ? "Stop" : "Start"}
              </button>
            </form>
            <div style={{
              fontSize: "0.97rem",
              marginTop: 7,
              color: "var(--text-secondary)"
            }}>
              Range: 30–210 BPM &middot; Use for scales, etudes, or rhythmic passages.
            </div>
          </div>
        </article>

        {/* --- PRACTICE LOG CARD --- */}
        <article
          className="card"
          tabIndex={0}
          aria-label="Practice Log"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "3vw",
            alignItems: "center",
            flexWrap: "wrap",
            minHeight: 210
          }}
        >
          {/* Log Icon (notebook with music notes) */}
          <div style={{
            flex: "0 0 96px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 85
          }}>
            <svg width={60} height={60} viewBox="0 0 50 50" aria-label="Practice Log" style={{ filter: "drop-shadow(0 3px 12px #baa06027)" }}>
              <rect x="7" y="6" width="36" height="38" rx="5" fill="#232946" stroke="#BFA14A" strokeWidth="2"/>
              <rect x="12" y="12" width="26" height="3" fill="#BFA14A"/>
              <rect x="12" y="20" width="26" height="3" fill="#BFA14A"/>
              <rect x="12" y="28" width="16" height="3" fill="#BFA14A"/>
              <ellipse cx="36" cy="30.5" rx="3" ry="2" fill="#BFA14A"/>
              <path d="M39 13 q4 3 1 9" stroke="#BFA14A" strokeWidth="1.2" fill="none"/>
              <ellipse cx="16" cy="35.5" rx="2.1" ry="1.2" fill="#BFA14A"/>
            </svg>
          </div>
          {/* Log controls and latest logs */}
          <div style={{
            flex: "1 1 0px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}>
            <h2 style={{
              color: "var(--secondary)",
              fontWeight: 400,
              fontSize: "clamp(1.09rem, 2vw, 1.49rem)",
              fontFamily: "'Great Vibes', cursive",
              margin: "0 0 8px 0",
              letterSpacing: "0.033em"
            }}>
              Practice Log
            </h2>
            <div className="description"
              style={{ color: "var(--text-secondary)", fontSize: "1.04rem", marginBottom: 13 }}>
              Track your sessions, accomplishments, or set goals. A well-kept practice log is key to orchestral mastery.<br />
              Record a new entry below and see your most recent history.
            </div>
            <div style={{display: "flex", alignItems: "center", gap: 20, marginBottom: 10}}>
              <button
                className="btn"
                onClick={() => setShowLogForm((x) => !x)}
                style={{
                  background: showLogForm ? "var(--secondary)" : "rgba(191,161,74,0.09)",
                  color: showLogForm ? "var(--base-dark)" : "var(--text-color)",
                  border: showLogForm
                    ? "2.2px solid var(--secondary)"
                    : "1.2px solid var(--border-color)",
                  minWidth: 64
                }}>
                {showLogForm ? "Cancel" : "Add Entry"}
              </button>
            </div>
            {showLogForm && (
              <form
                aria-label="Practice Log Entry"
                onSubmit={addLog}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 12
                }}
              >
                <textarea
                  autoFocus
                  required
                  maxLength={160}
                  rows={2}
                  value={logInput}
                  onChange={e => setLogInput(e.target.value)}
                  placeholder="E.g., 45 min scales & arpeggios, Bach Gavotte—focus: intonation, bow control…"
                  style={{
                    flex: "1 1 0",
                    borderRadius: 6,
                    fontSize: "1.05rem",
                    fontFamily: "'Great Vibes', cursive",
                    padding: "11px 12px",
                    border: "1px solid var(--border-color)",
                    resize: "vertical",
                    background: "rgba(46,64,87,0.13)",
                    color: "var(--text-color)",
                    minWidth: 0,
                    maxWidth: 380
                  }}
                  aria-label="Practice entry details"
                />
                <button
                  type="submit"
                  className="btn"
                  style={{
                    minWidth: 74,
                    background: "var(--secondary)",
                    color: "var(--base-dark)",
                    border: "2.2px solid var(--secondary)"
                  }}>
                  Save
                </button>
              </form>
            )}
            {logs.length > 0 && (
              <section aria-label="Practice Log History"
                style={{
                  background: "rgba(46,64,87,0.08)",
                  borderRadius: 7,
                  border: "1px solid var(--border-color)",
                  marginTop: 0,
                  padding: "10px 13px",
                  maxHeight: 150,
                  overflowY: "auto",
                  boxShadow: "0 2px 10px 0 rgba(42,50,90,0.04)"
                }}>
                <h3 style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "1.01rem",
                  color: "var(--secondary)",
                  margin: "0 0 7px 0",
                  fontWeight: 400,
                  letterSpacing: "0.021em"
                }}>
                  Recent Entries
                </h3>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {logs.map((l, i) => (
                    <li key={i}
                        style={{ fontSize: "0.97rem", padding: "3px 0", color: "var(--text-secondary)" }}>
                      <span role="img" aria-label="music" style={{marginRight: 6}}>🎶</span>
                      <span style={{color:"var(--text-color)"}}>{l.text}</span>
                      <span style={{
                        float:'right', fontSize:'0.83em', color:'var(--text-secondary)', marginLeft:12
                        }}>({formatShortDate(l.ts)})</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </article>
      </section>

      {/* Inline CSS for page-wide responsive grid */}
      <style>{`
        @media (min-width: 800px) {
          .container > section[style*="grid"] {
            grid-template-columns: 1fr 1fr;
          }
          .container > section[style*="grid"] > article {
            min-height: 230px;
          }
        }
        @media (min-width: 1200px) {
          .container > section[style*="grid"] {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2vw !important;
          }
        }
        @media (max-width: 700px) {
          .container > section[style*="grid"] {
            grid-template-columns: 1fr !important;
            gap: 5vw !important;
          }
          .card {
            flex-direction: column !important;
            align-items: flex-start !important;
            min-height: unset !important;
            padding: 1.1rem 1vw !important;
          }
          .card > div:first-child {
            min-width: 48px !important;
            padding-bottom: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
}

// Format TS string to readable short time/date
function formatShortDate(ts) {
  const d = new Date(ts);
  const opts = { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return d.toLocaleString(undefined, opts).replace(',', '');
}

export default Practice;


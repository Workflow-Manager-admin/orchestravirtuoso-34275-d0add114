import React, { useState, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * Community Forum Page: displays a list of forum threads/posts, a thread-view area, and a composer for new threads.
 * All design is consistent with the orchestral theme, using card layouts, cursive fonts, and gold/blue accents.
 * Placeholder/mock data is used for threads and posts, with key ARIA and responsive behaviors in place.
 */
function Community() {
  // ---- Mock Data ----
  const mockThreads = [
    {
      id: 1,
      title: "Vibrato technique for beginners",
      author: "Clara",
      authorAvatar: "🎻",
      time: "2024-03-12T14:29:00Z",
      replies: 4,
      views: 102,
      excerpt: "Struggling with vibrato—my wrist gets tense. Any exercises or advice on how to get a smooth sound?",
      posts: [
        {id: 11, author: "Clara", authorAvatar: "🎻", ts: "2024-03-12T14:29:00Z", text: "Struggling with vibrato—my wrist gets tense. Any exercises or advice on how to get a smooth sound?"},
        {id: 12, author: "MaestroAlban", authorAvatar: "🪈", ts: "2024-03-12T17:48:00Z", text: "Try slow oscillations with just the left hand, no bow! Keep thumb loose. Practice over open strings for relaxation."},
        {id: 13, author: "Freya", authorAvatar: "🎼", ts: "2024-03-13T12:18:00Z", text: "Also watch Itzhak Perlman's vibrato demo (YouTube). Wrist not arm—patience is key!"},
        {id: 14, author: "Clara", authorAvatar: "🎻", ts: "2024-03-14T09:01:00Z", text: "Thank you both! I'll update after some practice."},
      ]
    },
    {
      id: 2,
      title: "Best etudes for shifting (Position changes)?",
      author: "Yannis",
      authorAvatar: "🪕",
      time: "2024-03-08T10:01:00Z",
      replies: 3,
      views: 66,
      excerpt: "Shifting feels like leaping! Any favorite etudes for smoother position changes?",
      posts: [
        {id:21, author:"Yannis",authorAvatar:"🪕", ts:"2024-03-08T10:01:00Z", text:"Shifting feels like leaping! Any favorite etudes for smoother position changes?"},
        {id:22, author:"Mina",authorAvatar:"🎶", ts:"2024-03-08T12:44:00Z", text:"Try Sevcik Op.8 and Wohlfahrt—lots of helpful shifting drills."},
        {id:23, author:"Joachim",authorAvatar:"🎸", ts:"2024-03-09T17:28:00Z", text:"Also practice position-change on one string—slow slides!"},
      ]
    },
    {
      id:3,
      title: "Sheet music request: Sarasate's Zigeunerweisen",
      author: "Vera",
      authorAvatar: "🎤",
      time: "2024-03-15T16:50:00Z",
      replies: 1,
      views: 49,
      excerpt: "Anyone has a high-quality scan of Sarasate's Zigeunerweisen piano-violin sheet? IMSLP version looks fuzzy.",
      posts: [
        {id:31, author:"Vera",authorAvatar:"🎤", ts:"2024-03-15T16:50:00Z", text:"Anyone has a high-quality scan of Sarasate's Zigeunerweisen piano-violin sheet? IMSLP version looks fuzzy."},
        {id:32, author:"Admin",authorAvatar:"🎺", ts:"2024-03-15T18:34:00Z", text:"You can find an improved version on Petrucci Library (IMSLP, link posted above)."},
      ]
    },
    {
      id: 4,
      title: "Orchestral auditions: What to expect?",
      author: "Antoine",
      authorAvatar: "🎷",
      time: "2024-03-07T08:12:00Z",
      replies: 2,
      views: 30,
      excerpt: "About to audition for a local youth orchestra! What pieces or scales are commonly asked?",
      posts: [
        {id:41, author:"Antoine",authorAvatar:"🎷", ts:"2024-03-07T08:12:00Z", text:"About to audition for a local youth orchestra! What pieces or scales are commonly asked?"},
        {id:42, author:"MaestroAlban",authorAvatar:"🪈", ts:"2024-03-07T13:53:00Z", text:"Major/minor scales & sight-reading—have a prepared solo too! Good luck!"},
      ]
    }
  ];

  // ---- State ----
  const [threads, setThreads] = useState(mockThreads);
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerTitle, setComposerTitle] = useState("");
  const [composerBody, setComposerBody] = useState("");
  const composerRef = useRef();

  // Set focus to composer on opening
  React.useEffect(() => {
    if (composerOpen && composerRef.current) {
      composerRef.current.focus();
    }
  }, [composerOpen]);

  // Keyboard: ESC to close thread view or composer
  React.useEffect(() => {
    function handler(e) {
      if (e.key === "Escape") {
        if (composerOpen) setComposerOpen(false);
        if (activeThreadId) setActiveThreadId(null);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [composerOpen, activeThreadId]);

  // ---- Helpers ----
  function formatShortDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, {month:"short", day:"numeric"}) + " " + d.toLocaleTimeString(undefined, {hour:'2-digit', minute:'2-digit'});
  }

  // ---- Composer: new thread ----
  function handleComposerSubmit(e) {
    e.preventDefault();
    if (!composerTitle.trim() || !composerBody.trim()) return;
    const newThread = {
      id: threads.length + 1,
      title: composerTitle.trim(),
      author: "You",
      authorAvatar: "🟤",
      time: new Date().toISOString(),
      replies: 0,
      views: 1,
      excerpt: composerBody.length > 96 ? composerBody.slice(0,96)+"…" : composerBody,
      posts: [
        {
          id: Date.now(),
          author: "You",
          authorAvatar: "🟤",
          ts: new Date().toISOString(),
          text: composerBody
        }
      ]
    };
    setThreads([newThread, ...threads]);
    setComposerOpen(false);
    setComposerTitle("");
    setComposerBody("");
    setActiveThreadId(newThread.id);
  }

  // ---- Layout ----
  // Cards grid responsive: 1-2 columns, elegant shadow, script fonts
  return (
    <div className="container" style={{ minHeight: "calc(100vh - 90px)", paddingTop: "120px", paddingBottom: "40px", width: "100vw", maxWidth:"100vw", }}>
      {/* Header */}
      <section style={{textAlign: "center", marginBottom: "24px",width:"100%"}}>
        <h1 className="title" style={{
          color:"var(--secondary)",
          fontFamily:"'Great Vibes',cursive",
          fontWeight:400,
          fontSize: "clamp(2.3rem, 6vw, 4rem)",
          letterSpacing:"0.04em",
          textShadow:"0 2px 19px rgba(191,161,74,0.11)",
          margin:0,
        }}>
          Community Forum
        </h1>
        <p className="description" style={{
          margin:"0 auto",
          marginTop: 9,
          marginBottom: 6,
          maxWidth: 560,
          fontSize: "1.16rem",
          color: "var(--text-secondary)"
        }}>
          Discuss technique, share music, and support one another as fellow violinists & learners. Use this forum to ask questions, share practice progress, or offer tips!
        </p>
      </section>
      {/* New Thread Composer (collapsible) */}
      <section aria-label="New Discussion Composer"
        className="card"
        style={{
          background:"linear-gradient(98deg,#232946 81%,#BFA14A17 100%)",
          margin: "0 0 25px 0",
          maxWidth: 670,
          marginLeft:"auto",marginRight:"auto",
          border:"1.5px solid var(--border-color)",
          boxShadow:"0 2px 12px 0 rgba(45,55,86,0.14)"
        }}
      >
        <button type="button"
          className="btn"
          aria-expanded={composerOpen}
          aria-controls="composer-area"
          onClick={() => setComposerOpen(v=>!v)}
          style={{
            fontFamily:"'Great Vibes',cursive",
            fontWeight:400, fontSize:"1.09rem",
            background:"var(--secondary)",
            color:"#1A2236",
            borderRadius:5,
            marginBottom: 0,
            minWidth: 128,
            marginRight:20,
            boxShadow:"0 2px 8px 0 rgba(42, 50, 90, 0.09)"
          }}>
          {composerOpen ? "Cancel" : "New Discussion"}
        </button>
        {composerOpen && (
          <form id="composer-area"
            onSubmit={handleComposerSubmit}
            style={{marginTop:20, display:"flex", flexDirection:"column", gap:13}}
            aria-label="Start a new thread"
          >
            <input
              ref={composerRef}
              aria-label="Discussion subject"
              style={{
                padding:"10px 13px",
                fontFamily:"'Great Vibes',cursive",
                borderRadius:6,
                fontSize:"1.16rem",
                border:"1.2px solid var(--border-color)",
                background:"rgba(46,64,87,0.13)",
                color:"var(--text-color)",
                marginBottom:8,
                letterSpacing:"0.03em"
              }}
              maxLength={68}
              required
              value={composerTitle}
              onChange={e=>setComposerTitle(e.target.value)}
              placeholder="Enter a subject (e.g., 'How do I shift positions smoothly?')"
            />
            <textarea
              required
              aria-label="Discussion details"
              style={{
                padding:"11px 13px",
                fontFamily:"'Great Vibes',cursive",
                borderRadius:7,
                fontSize:"1.03rem",
                minHeight:65,
                border:"1.2px solid var(--border-color)",
                background:"rgba(46,64,87,0.13)",
                color:"var(--text-color)"
              }}
              value={composerBody}
              onChange={e=>setComposerBody(e.target.value)}
              placeholder="Describe your question, experience, or topic for discussion…"
              maxLength={702}
            />
            <div style={{marginTop:2, display:"flex",gap:9}}>
              <button type="submit"
                className="btn"
                style={{
                  background:"var(--secondary)",
                  color:"#1A2236",
                  border:"2px solid var(--secondary)",
                  fontSize:"1.08rem",
                  borderRadius:5,
                  minWidth:84,
                  fontWeight:400
                }}>Post</button>
              <span className="description" style={{marginLeft:9, color:"var(--text-secondary)", fontSize:"0.94rem"}}>Posts are public and moderated.</span>
            </div>
          </form>
        )}
      </section>
      {/* Thread Listing + Thread View Grid */}
      <section className="forum-grid" style={{
        display:"grid",
        gridTemplateColumns: activeThreadId ? (window.innerWidth>970 ? "2.5fr 3fr":"1fr") : "1fr",
        gap: activeThreadId? 32:0,
        width:"100%",
        maxWidth:"1150px",
        marginLeft:"auto",
        marginRight:"auto"
      }}>
        {/* Threads List */}
        <div style={{
          width:"100%",
          minWidth:0,
          maxWidth: activeThreadId ? 600 : "100vw"
        }}>
          {threads.length === 0 && <div className="card" style={{textAlign:"center"}}>No discussions yet.</div>}
          <ul style={{
            listStyle:"none",
            margin:0,
            padding:0,
            display:"flex",
            flexDirection:"column",
            gap:"1.35vw"
          }}>
            {threads.map(thread=>(
              <li key={thread.id}
                className="card home-feature-card"
                tabIndex={0}
                aria-label={thread.title}
                style={{
                  cursor:"pointer",
                  borderLeft: thread.id===activeThreadId? "5px solid var(--secondary)":"1.5px solid var(--border-color)",
                  background: thread.id===activeThreadId
                    ? "linear-gradient(92deg,#292c49 89%,#BFA14A14 100%)"
                    : "linear-gradient(97deg,#232946 81%,#BFA14A11 100%)",
                  transition:"background 0.18s, border 0.17s",
                  boxShadow:"0 2px 13px 0 rgba(45,48,98,0.10)",
                  minHeight:80,
                  margin:0,
                  outline: thread.id===activeThreadId?"3px solid var(--secondary,#BFA14A3a)":"none"
                }}
                onClick={()=>setActiveThreadId(thread.id)}
                onKeyDown={e=>{
                  if(e.key==="Enter"||e.key===" ") setActiveThreadId(thread.id);
                }}
                aria-current={thread.id===activeThreadId}
              >
                <div style={{
                  display:"flex", flexDirection:"row", gap:19, alignItems:"flex-start", width:"100%"
                }}>
                  <div style={{
                    fontSize:36,
                    width:42, height:42,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background:"rgba(191,161,74,0.09)",
                    borderRadius:"50%",
                    border:"1.2px solid var(--border-color)"
                  }}
                  aria-label={`Avatar ${thread.author}`}>{thread.authorAvatar}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{
                      fontFamily:"'Great Vibes',cursive",
                      fontWeight:400,
                      color:"var(--text-color)",
                      fontSize:"1.18rem",
                      margin:"-2px 0 3px 0",
                      letterSpacing:"0.024em"
                    }}>
                      {thread.title}
                    </div>
                    <div className="description" style={{
                      fontSize:"0.98rem",
                      color:"var(--text-secondary)",
                      marginBottom:2
                    }}>{thread.excerpt}</div>
                    <div style={{
                      color:"var(--secondary)",
                      fontSize:"0.93rem"
                    }}>
                      {thread.author} • {formatShortDate(thread.time)}
                      <span style={{color:"var(--text-secondary)",marginLeft:13}}>Replies: {thread.replies} | Views: {thread.views}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Thread Detail View */}
        {activeThreadId && (
          <div className="card" style={{
            minWidth:0,
            marginTop:0,
            marginLeft:0,
            border:"1.7px solid var(--secondary)",
            background:"linear-gradient(101deg,#202944 89%,#BFA14A0c 100%)",
            boxShadow:"0 5px 22px 0 rgba(45,55,86,0.16)",
            display:"flex",
            flexDirection:"column",
            minHeight:180,
            maxWidth: "99vw"
          }}>
            <button
              type="button"
              aria-label="Close thread view"
              style={{
                background:"none", border:"none",
                cursor:"pointer", alignSelf:"flex-end", color:"var(--secondary)", fontSize:24, fontWeight:400, padding:3
              }}
              onClick={()=>setActiveThreadId(null)}
            >×</button>
            {(() => {
              const thread = threads.find(t=>t.id===activeThreadId);
              if (!thread) return null;
              return (
                <section>
                  <div style={{
                    fontFamily:"'Great Vibes',cursive",
                    color:"var(--secondary)",
                    fontWeight:400,
                    fontSize:"1.46rem",
                    margin:"0 0 8px 0"
                  }}>{thread.title}</div>
                  <ol style={{
                    listStyle:"none",
                    margin:0, padding:0,
                    display:"flex", flexDirection:"column", gap:"7px"
                  }}>
                    {thread.posts.map(post=>(
                      <li key={post.id} style={{
                        margin:"0 0 7px 0",
                        background:"rgba(46,64,87,0.10)",
                        borderRadius:8,
                        padding:"9px 13px",
                        fontFamily:"'Great Vibes',cursive",
                        position:"relative"
                      }}>
                        <span style={{
                          color:"var(--secondary)",fontSize:"1.09rem",
                          fontWeight:400,
                          marginRight:15
                        }}>[{post.authorAvatar}] {post.author}</span>
                        <span style={{
                          color:"var(--text-secondary)",fontSize:"0.97rem",
                          marginLeft:6, marginRight:7
                        }}>{formatShortDate(post.ts)}</span>
                        <div style={{
                          color:"var(--text-color)",
                          fontSize:"1.07rem",marginTop:2,marginLeft:8
                        }}>
                          {post.text}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="description" style={{
                    marginTop: 15, color:"var(--text-secondary)", fontSize:"0.98rem"
                  }}>
                    <span>End of discussion. <span role="img" aria-label="violin">🎻</span></span>
                  </div>
                </section>
              );
            })()}
          </div>
        )}
      </section>
      {/* Responsive/Accessibility styles inline for isolation */}
      <style>{`
        @media (max-width: 900px) {
          .forum-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
        @media (max-width: 700px) {
         .forum-grid { grid-template-columns: 1fr !important; }
         .card, .home-feature-card { font-size: 1.04rem !important; padding: 1.2rem 1vw !important;}
        }
        .home-feature-card:focus, .card:focus {
          outline: 3px solid var(--secondary,#BFA14Ac9);
        }
      `}</style>
    </div>
  );
}

export default Community;

import React from "react";

// PUBLIC_INTERFACE
/**
 * Lessons page – displays a section of embedded violin lesson videos
 * with refined styling, accessibility, and responsiveness.
 */
function Lessons() {
  // Sample video lesson data
  const videoLessons = [
    {
      title: "Violin Basics – Posture & Bow Hold",
      desc:
        "Learn the proper posture and how to hold the bow for a beautiful sound.",
      url: "https://www.youtube.com/watch?v=EQNwt1_uTxc",
    },
    {
      title: "First Notes: Open Strings",
      desc:
        "Let’s sound the first notes using open strings and basic bowing patterns.",
      url: "https://www.youtube.com/watch?v=TwNBWlSg5L8",
    },
    {
      title: "Beginner Song: Twinkle, Twinkle Variations",
      desc:
        "Play a simple song and explore beginner-friendly variations.",
      url: "https://www.youtube.com/watch?v=bdTrp0YwL5Q",
    }
  ];

  return (
    <div
      className="container"
      style={{
        minHeight: "calc(100vh - 90px)",
        paddingTop: "124px",
        paddingBottom: "44px",
        width: "100vw",
        maxWidth: "100vw",
      }}
    >
      <section style={{
        textAlign: "center",
        marginBottom: "2.8vw",
        marginTop: 0,
        width: "100%",
      }}>
        <h1 className="title"
          style={{
            color: "var(--secondary)",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            margin: 0,
            paddingBottom: 4,
            fontWeight: 400,
            textShadow: "0 2px 22px rgba(191,161,74,0.10)",
            letterSpacing: "0.045em"
          }}
        >
          Violin Video Lessons
        </h1>
        <p className="description"
           style={{
             margin: "0 auto",
             marginTop: 10,
             marginBottom: 18,
             maxWidth: 590,
             fontSize: "1.16rem",
             color: "var(--text-secondary)",
           }}>
          Dive into step-by-step violin lessons with curated videos—start with the fundamentals and follow along through each technique.
        </p>
      </section>

      {/* Responsive video lessons grid */}
      <section
        aria-label="Video lessons"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "2.3vw",
          maxWidth: "1170px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {videoLessons.map((lesson, i) => {
          // Helper to convert YouTube watch URL to embed
          function getEmbedUrl(url) {
            if (!url) return "";
            // Example: https://www.youtube.com/watch?v=EQNwt1_uTxc
            const match = url.match(
              /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)/
            );
            if (match && match[1]) {
              return `https://www.youtube.com/embed/${match[1]}`;
            }
            // If already /embed/, return as is
            if (url.includes("youtube.com/embed/")) {
              return url;
            }
            // fallback
            return url;
          }
          return (
            <article
              className="card"
              key={lesson.title}
              tabIndex={0}
              aria-label={`Lesson: ${lesson.title}`}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
                gap: "3vw",
                background: "var(--card-bg, #202944)",
                border: "1.5px solid var(--border-color, #d1be65)",
                boxShadow: "0 2px 14px 0 rgba(40,48,77,0.05)",
                borderRadius: "13px",
                padding: "2vw 2vw",
                margin: 0,
                // Responsive stack for mobile
                flexWrap: "wrap",
              }}
            >
              {/* Video Embed (aspect-ratio for responsive) */}
              <div
                style={{
                  flex: "0 0 350px",
                  minWidth: 240,
                  maxWidth: 410,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 9,
                  overflow: "hidden",
                  boxShadow: "0 3px 30px 0 rgba(60,63,94,0.14)",
                  background: "#191b28",
                  marginRight: 0,
                  marginBottom: "auto",
                }}
              >
                <iframe
                  src={getEmbedUrl(lesson.url)}
                  title={lesson.title}
                  width="100%"
                  height="220"
                  style={{
                    border: "none",
                    width: "100%",
                    maxWidth: 410,
                    minWidth: 220,
                    minHeight: 180,
                    aspectRatio: "16/9",
                    borderRadius: 7,
                    background: "#15162a",
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  tabIndex={0}
                  aria-label={lesson.title}
                />
              </div>
              {/* Lesson Description */}
              <div
                style={{
                  flex: "1 1 0px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minWidth: 0,
                  padding: "0.4vw 0.8vw",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Great Vibes', cursive",
                    color: "var(--secondary)",
                    fontWeight: 400,
                    fontSize: "clamp(1.22rem, 2.3vw, 2rem)",
                    margin: "0 0 8px 0",
                    letterSpacing: "0.034em",
                    textShadow: "0 2px 22px rgba(191,161,74,0.09)",
                  }}
                  id={`lesson-title-${i}`}
                >
                  {lesson.title}
                </h2>
                <p
                  className="description"
                  style={{
                    margin: "0 0 0 0",
                    color: "var(--text-secondary)",
                    fontSize: "1.08rem",
                    fontWeight: 400,
                    letterSpacing: "0.03em",
                    lineHeight: 1.45,
                  }}
                  id={`lesson-desc-${i}`}
                >
                  {lesson.desc}
                </p>
              </div>
            </article>
          );
        })}
            {/* Lesson Description */}
            <div
              style={{
                flex: "1 1 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                minWidth: 0,
                padding: "0.4vw 0.8vw",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: "var(--secondary)",
                  fontWeight: 400,
                  fontSize: "clamp(1.22rem, 2.3vw, 2rem)",
                  margin: "0 0 8px 0",
                  letterSpacing: "0.034em",
                  textShadow: "0 2px 22px rgba(191,161,74,0.09)",
                }}
                id={`lesson-title-${i}`}
              >
                {lesson.title}
              </h2>
              <p
                className="description"
                style={{
                  margin: "0 0 0 0",
                  color: "var(--text-secondary)",
                  fontSize: "1.08rem",
                  fontWeight: 400,
                  letterSpacing: "0.03em",
                  lineHeight: 1.45,
                }}
                id={`lesson-desc-${i}`}
              >
                {lesson.desc}
              </p>
            </div>
          </article>
        ))}
      </section>
      {/* Accessibility: Ensure separation */}
      <div aria-hidden style={{height: "2vw"}}/>
      {/* Inline responsive CSS for grid adjustment */}
      <style>
        {`
        @media (min-width: 800px) {
          [aria-label="Video lessons"] {
            grid-template-columns: 1fr 1fr;
          }
          [aria-label="Video lessons"] .card {
            min-height: 255px;
          }
        }
        @media (min-width: 1200px) {
          [aria-label="Video lessons"] {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          [aria-label="Video lessons"] .card {
            flex-direction: column;
            align-items: center;
            padding: 3vw 1vw;
          }
          [aria-label="Video lessons"] .card > div:first-child {
            max-width: 100vw;
            min-width: 0;
            width: 100% !important;
            margin-bottom: 0.5rem;
          }
          [aria-label="Video lessons"] .card > div:last-child {
            width: 100%;
            padding: 0.2vw 1vw;
          }
        }
        `}
      </style>
    </div>
  );
}

export default Lessons;

import React, { useState } from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Settings Page for OrchestraVirtuoso
 * Features: User Profile (view/edit), Password Change, Notification Preferences, Theme Selection, Privacy Controls.
 * Fully orchestral-themed, using grouped cards and labeled forms with mock/profile data.
 */
const defaultProfile = {
  name: "Elena Maestro",
  email: "elena.maestro@email.com",
  username: "violinVirtuoso",
  avatar: "🎻",
  bio: "Aspiring violinist and orchestral enthusiast. Loves Bach, Perlman, and chamber ensembles.",
};

function Settings() {
  // Profile states (mock/user - in real, would come from API or context)
  const [profile, setProfile] = useState(defaultProfile);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileEdit, setProfileEdit] = useState({ ...defaultProfile });

  // Password state
  const [pwInputs, setPwInputs] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [pwChanged, setPwChanged] = useState(false);

  // Notification preferences (mock)
  const [notifPrefs, setNotifPrefs] = useState({
    newLesson: true,
    communityReplies: true,
    practiceReminders: false,
    productUpdates: true,
  });

  // Theme selection
  const [theme, setTheme] = useState("dark"); // "light" or "dark"

  // Privacy controls
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    optOutAnalytics: false,
    allowMessages: true,
  });

  // Handler: Profile Edit Save
  function handleProfileSave(e) {
    e.preventDefault();
    setProfile({ ...profileEdit });
    setEditingProfile(false);
  }

  // Handler: Password Change
  function handlePasswordChange(e) {
    e.preventDefault();
    // Simple mock check (actual verification would be server-side)
    if (
      pwInputs.current &&
      pwInputs.new &&
      pwInputs.new === pwInputs.confirm
    ) {
      setPwChanged(true);
      setPwInputs({ current: "", new: "", confirm: "" });
      setTimeout(() => setPwChanged(false), 2500);
    }
  }

  // Theme toggle: light/dark (with root CSS var changes)
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
    // Quick theme CSS swap (in production, use context/provider)
    document.documentElement.style.setProperty("--base-dark", theme === "dark" ? "#fff8e7" : "#1A2236");
    document.documentElement.style.setProperty("--text-color", theme === "dark" ? "#7D6523" : "#D2B48C");
    document.documentElement.style.setProperty(
      "--card-bg",
      theme === "dark" ? "#f8edcd" : "#202944"
    );
  }

  // Section card reusable
  function SectionCard({ title, icon, children }) {
    return (
      <section
        className="card"
        style={{
          marginBottom: "2vw",
          padding: "2.1vw 2.6vw",
          background:
            "linear-gradient(96deg,var(--card-bg,#202944) 94%,rgba(191,161,74,0.09) 100%)",
          border: "1.45px solid var(--border-color)",
          borderRadius: "14px",
          boxShadow: "0 2px 13px 0 rgba(42,50,98,0.08)",
          maxWidth: 760,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 12,
          gap: 11,
        }}>
          <span aria-hidden style={{
            fontSize: 29,
            color: "var(--secondary)",
          }}>{icon}</span>
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            color: "var(--secondary)",
            fontWeight: 400,
            fontSize: "clamp(1.22rem,2.5vw,1.9rem)",
            margin: 0,
            letterSpacing: "0.032em"
          }}>{title}</h2>
        </div>
        {children}
      </section>
    );
  }

  // MAIN PAGE
  return (
    <div
      className="container"
      style={{
        minHeight: "calc(100vh - 92px)",
        paddingTop: "124px",
        paddingBottom: "56px",
        width: "100vw",
        maxWidth: "100vw",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 className="title"
          style={{
            color: "var(--secondary)",
            fontFamily: "'Great Vibes', cursive",
            fontWeight: 400,
            fontSize: "clamp(2.3rem,7vw,4rem)",
            margin: 0,
            marginBottom: 3,
            letterSpacing: "0.04em",
            textShadow: "0 3px 18px rgba(191,161,74,0.13)",
          }}
        >
          Settings
        </h1>
        <div className="description"
          style={{
            margin: "0 auto",
            fontSize: "1.17rem",
            color: "var(--text-secondary)",
            maxWidth: 700,
            marginTop: 8
          }}
        >
          Orchestrate your experience – manage your profile, preferences, and privacy in a single harmonious page.
        </div>
      </section>

      {/* USER PROFILE VIEW/EDIT */}
      <SectionCard title="User Profile" icon={profile.avatar}>
        {!editingProfile ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 25,
              alignItems: "center",
              flexWrap: "wrap",
              width: "100%",
              boxSizing: "border-box"
            }}
          >
            <span
              aria-label="profile avatar"
              style={{
                fontSize: 44,
                marginRight: 10,
                borderRadius: "50%",
                background: "rgba(191,161,74,0.09)",
                padding: "11px 16px",
                minWidth: 60,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 8px 0 rgba(191,161,74,0.07)"
              }}
            >
              {profile.avatar}
            </span>
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  fontWeight: 400,
                  color: "var(--text-color)",
                  fontSize: "1.28rem",
                  fontFamily: "'Great Vibes', cursive",
                  marginBottom: 2,
                  overflowWrap: "anywhere"
                }}
              >
                {profile.name}
              </div>
              <div className="description" style={{ fontSize: "1.02rem", overflowWrap: "anywhere" }}>
                @{profile.username} &bull; {profile.email}
              </div>
              {profile.bio && (
                <div
                  className="description"
                  style={{
                    marginTop: 8,
                    fontSize: "1.04rem",
                    maxWidth: 380,
                    overflowWrap: "break-word"
                  }}
                >
                  {profile.bio}
                </div>
              )}
            </div>
            <button
              className="btn"
              style={{
                marginLeft: "auto",
                background: "var(--secondary)",
                color: "#1A2236",
                borderRadius: 7,
                minWidth: 80,
                maxHeight: 51
              }}
              onClick={() => {
                setEditingProfile(true);
                setProfileEdit({ ...profile });
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleProfileSave}
            style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}
            aria-label="Edit Profile"
          >
            <label>
              Name:
              <input
                type="text"
                required
                value={profileEdit.name}
                style={inputStyle}
                onChange={e => setProfileEdit(p => ({ ...p, name: e.target.value }))}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                required
                value={profileEdit.email}
                style={inputStyle}
                onChange={e => setProfileEdit(p => ({ ...p, email: e.target.value }))}
              />
            </label>
            <label>
              Username:
              <input
                type="text"
                required
                value={profileEdit.username}
                style={inputStyle}
                onChange={e => setProfileEdit(p => ({ ...p, username: e.target.value }))}
                disabled
                aria-disabled="true"
                title="Usernames cannot be changed"
              />
            </label>
            <label>
              Bio:
              <textarea
                rows={2}
                maxLength={160}
                value={profileEdit.bio}
                style={{ ...inputStyle, minHeight: 49, resize: "vertical" }}
                onChange={e => setProfileEdit(p => ({ ...p, bio: e.target.value }))}
                placeholder="Share a little about yourself…"
              />
            </label>
            <div style={{ display: "flex", gap: 14, marginTop: 5 }}>
              <button type="submit" className="btn"
                style={{
                  background: "var(--secondary)",
                  color: "#1A2236",
                  borderRadius: 7,
                  minWidth: 72
                }}>Save</button>
              <button type="button" className="btn"
                style={{
                  background: "rgba(191,161,74,0.09)",
                  color: "var(--text-color)",
                  border: "1px solid var(--secondary)",
                  minWidth: 84
                }}
                onClick={() => setEditingProfile(false)}
              >Cancel</button>
            </div>
          </form>
        )}
      </SectionCard>

      {/* PASSWORD CHANGE */}
      <SectionCard title="Change Password" icon="🔒">
        <form
          onSubmit={handlePasswordChange}
          style={{ maxWidth: 350, display: "flex", flexDirection: "column", gap: 12 }}
          autoComplete="off"
          aria-label="Change Password"
        >
          <label>
            Current Password:
            <input
              type="password"
              required
              value={pwInputs.current}
              style={inputStyle}
              onChange={e => setPwInputs(p => ({ ...p, current: e.target.value }))}
              autoComplete="current-password"
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              required
              value={pwInputs.new}
              style={inputStyle}
              onChange={e => setPwInputs(p => ({ ...p, new: e.target.value }))}
              autoComplete="new-password"
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              required
              value={pwInputs.confirm}
              style={inputStyle}
              onChange={e => setPwInputs(p => ({ ...p, confirm: e.target.value }))}
              autoComplete="new-password"
            />
          </label>
          <div style={{ marginTop: 7 }}>
            <button className="btn" style={{
              background: "var(--secondary)",
              color: "#1A2236",
              borderRadius: 7,
              minWidth: 97,
              fontWeight: 400
            }}>Change Password</button>
            {pwChanged && (
              <span className="description"
                style={{ color: "#82bf2d", fontSize: "1rem", marginLeft: 18 }}>Password changed!</span>
            )}
          </div>
        </form>
      </SectionCard>

      {/* NOTIFICATION PREFERENCES */}
      <SectionCard title="Notification Preferences" icon="🎶">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 9,
            maxWidth: 420
          }}>
          {[
            {
              key: "newLesson",
              label: "Notify me of new lessons & resources",
            },
            {
              key: "communityReplies",
              label: "Community: Replies to my posts",
            },
            {
              key: "practiceReminders",
              label: "Practice reminders (daily/weekly)",
            },
            {
              key: "productUpdates",
              label: "Product updates & orchestral news",
            }
          ].map(({ key, label }) => (
            <label key={key} style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              fontSize: "1.06rem"
            }}>
              <input
                type="checkbox"
                checked={notifPrefs[key]}
                onChange={e => setNotifPrefs(n => ({ ...n, [key]: e.target.checked }))}
                style={checkboxStyle}
                aria-checked={notifPrefs[key]}
              />
              <span style={{
                marginLeft: 7,
                color: "var(--text-color)",
                fontFamily: "'Great Vibes', cursive"
              }}>{label}</span>
            </label>
          ))}
        </div>
      </SectionCard>

      {/* THEME SELECTION */}
      <SectionCard title="Theme Selection" icon={theme === "dark" ? "🌑" : "☀️"}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 16
        }}>
          <span style={{ fontWeight: 400, fontSize: "1.09rem" }}>
            Light Theme
          </span>
          <label className="theme-toggle"
            style={{
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
              marginLeft: 6,
              marginRight: 6
            }}>
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              style={{ ...checkboxStyle, width: 28, height: 22 }}
              aria-checked={theme === "dark"}
            />
            <span style={{
              background: theme === "dark"
                ? "linear-gradient(to right,#212135,#bfa14a 98%)"
                : "linear-gradient(to right,#dce1eb 48%,#bfa14a 100%)",
              borderRadius: 13,
              display: "inline-block",
              width: 48,
              height: 19,
              marginLeft: 5,
              marginRight: 5,
              border: "1.2px solid var(--border-color)",
              position: "relative"
            }}>
              <span style={{
                position: "absolute",
                left: theme === "dark" ? 27 : 4,
                top: 1.5,
                width: 15,
                height: 15,
                background: "#fff5d3",
                borderRadius: "50%",
                boxShadow: "0 1px 6px 0 rgba(80,67,21,0.14)",
                transition: "left 0.18s",
                border: "1px solid var(--secondary)"
              }} />
            </span>
          </label>
          <span style={{ fontWeight: 400, fontSize: "1.09rem" }}>
            Dark Theme
          </span>
        </div>
        <div className="description" style={{ fontSize: "1.02rem", marginTop: 4 }}>
          Experiment with a lighter sheet music motif or a moody concert dark.
        </div>
      </SectionCard>

      {/* PRIVACY CONTROLS */}
      <SectionCard title="Privacy Controls" icon="👁️‍🗨️">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 440
          }}>
          <label style={{ display: "flex", alignItems: "center", fontSize: "1.04rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={privacy.showProfile}
              onChange={e => setPrivacy(p => ({ ...p, showProfile: e.target.checked }))}
              style={checkboxStyle}
              aria-checked={privacy.showProfile}
            />
            <span style={{ marginLeft: 8, color: "var(--text-color)" }}>
              Profile visible to other community members
            </span>
          </label>
          <label style={{ display: "flex", alignItems: "center", fontSize: "1.04rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={privacy.allowMessages}
              onChange={e => setPrivacy(p => ({ ...p, allowMessages: e.target.checked }))}
              style={checkboxStyle}
              aria-checked={privacy.allowMessages}
            />
            <span style={{ marginLeft: 8, color: "var(--text-color)" }}>
              Allow direct messages from OrchestraVirtuoso members
            </span>
          </label>
          <label style={{ display: "flex", alignItems: "center", fontSize: "1.04rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={privacy.optOutAnalytics}
              onChange={e => setPrivacy(p => ({ ...p, optOutAnalytics: e.target.checked }))}
              style={checkboxStyle}
              aria-checked={privacy.optOutAnalytics}
            />
            <span style={{ marginLeft: 8, color: "var(--text-color)" }}>
              Opt out of anonymous usage analytics
            </span>
          </label>
        </div>
        <div className="description" style={{ fontSize: "0.98rem", marginTop: 7 }}>
          Control your presence, messaging, and data settings. Contact <a href="mailto:support@orchestravirtuoso.com" style={{ color: "var(--secondary)" }}>support</a> for data/deletion requests.
        </div>
      </SectionCard>

      {/* Responsive inline CSS */}
      <style>
        {`
        @media (max-width: 700px) {
          .card { font-size: 1.04rem !important; padding: 1.1rem 1vw !important; }
          section.card { max-width: 99vw !important; padding: 1.1rem 1.5vw !important; }
        }
        label { font-size: 1.01rem; }
        input[type="text"], input[type="email"], input[type="password"], textarea {
          margin-top: 2px;
        }
        `}
      </style>
    </div>
  );
}

// Common styles
const inputStyle = {
  padding: "7.5px 13px",
  fontSize: "1.07rem",
  fontFamily: "'Great Vibes', cursive",
  borderRadius: 6,
  border: "1.3px solid var(--border-color)",
  background: "rgba(46,64,87,0.11)",
  color: "var(--text-color)",
  letterSpacing: "0.025em",
  marginTop: 2,
  marginBottom: 1,
  minWidth: 0,
  maxWidth: "98vw",
};

const checkboxStyle = {
  accentColor: "var(--secondary,#bfa14a)",
  width: 17,
  height: 17,
  marginRight: 5,
  borderRadius: 5,
  boxShadow: "0 1.5px 5px 0 rgba(191,161,74,0.08)"
};

export default Settings;

import React from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Reusable Card component for feature previews.
 * Props: icon, image, title, description, link, cta
 */
import { Link } from "react-router-dom";

function Card({ icon, image, title, description, link, cta }) {
  // If link is an internal route, use <Link>
  const isInternal = link && link.startsWith("/");
  const Wrapper = isInternal ? Link : "a";
  const props = isInternal
    ? { to: link }
    : { href: link, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...props}
      className="card home-feature-card"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 28,
        textDecoration: "none",
        color: "inherit",
        minHeight: 110,
        boxShadow: "0 2px 14px 0 rgba(40,48,77,0.09)"
      }}
      tabIndex={0}
    >
      <div style={{ minWidth: 58, minHeight: 58, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon ||
          (image && (
            <img
              src={image}
              alt={title + " preview"}
              style={{ width: 54, height: 54, objectFit: "contain", borderRadius: 10, background: "rgba(191,161,74,0.045)" }}
            />
          ))}
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily: "'Great Vibes', cursive",
          color: "var(--text-color)",
          fontWeight: 400,
          margin: 0,
          fontSize: "1.37rem"
        }}>{title}</h3>
        <div style={{
          color: "var(--text-secondary)",
          fontSize: "1.03rem",
          fontFamily: "'Great Vibes', cursive",
          fontWeight: 400,
          marginTop: 4,
          marginBottom: 10,
          lineHeight: 1.44
        }}>{description}</div>
        {cta && (
          <span
            className="btn"
            style={{
              padding: "7px 18px",
              fontSize: "0.93rem",
              fontWeight: 500,
              background: "var(--secondary)",
              color: "#1A2236",
              borderRadius: 4,
              boxShadow: "0 2px 9px 0 rgba(42, 50, 90, 0.09)",
              marginTop: 6,
              textDecoration: "none"
            }}
            tabIndex={-1}
          >
            {cta}
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export default Card;

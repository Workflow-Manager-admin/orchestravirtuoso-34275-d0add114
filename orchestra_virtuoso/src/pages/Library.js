import React from "react";

// PUBLIC_INTERFACE
function Library() {
  /**
   * Placeholder component for Sheet Music Library page.
   */
  return (
    <div className="container" style={{ minHeight: "calc(100vh - 90px)", paddingTop: "120px", width: "100vw" }}>
      <h1 className="title">Sheet Music Library</h1>
      <p className="description">
        A curated library of sheet music for all skill levels. (WIP)
      </p>
    </div>
  );
}

export default Library;

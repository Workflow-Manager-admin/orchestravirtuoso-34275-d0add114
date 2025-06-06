import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Lessons from "./pages/Lessons";
import Practice from "./pages/Practice";
import Library from "./pages/Library";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";

/**
 * Main App component with routing for all core feature pages.
 */

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  <div className="hero">
                    <div className="subtitle">Immerse Yourself in the World of Violin</div>
                    <h1 className="title">OrchestraVirtuoso</h1>
                    <div className="description">
                      Learn, practice, and connect in a refined, orchestral environment.
                    </div>
                  </div>
                </div>
              }
            />
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
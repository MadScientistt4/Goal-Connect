import React, { useRef, useState } from "react";
import Navbar from "./Navbar.js";
import Hero from "./Hero.js";
import MatchCenter from "./MatchCenter.js";
import { Routes, Route } from "react-router-dom";
import ClubDashboard from "./ClubDashboard.js";
import Crowdfunding from "./Crowdfunding";
import Digitalfootballacademy from "./Digitalfootballacademy";
import RegistrationPage from "./registration";
import Sessions from "./Sessions"; 
import News from "./News"; 

const App = () => {
  const matchCenterRef = useRef(null);
  const [showSessions, setShowSessions] = useState(false); // State to manage Sessions visibility

  // Function to scroll to MatchCenter
  const scrollToMatchCenter = () => {
    if (matchCenterRef.current) {
      matchCenterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to close Registration and open Sessions
  const closeRegistration = () => {
    setShowSessions(true); // Open Sessions when Registration is closed
  };

  return (
    <>
      <Navbar scrollToMatchCenter={scrollToMatchCenter} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Hero scrollToMatchCenter={scrollToMatchCenter} />
              <div ref={matchCenterRef}>
                <MatchCenter />
              </div>
            </div>
          }
        />
        <Route path="/club-dashboard" element={<ClubDashboard />} />
        <Route path="/crowdfunding" element={<Crowdfunding />} />
        <Route path="/Digitalfootballacademy" element={<Digitalfootballacademy />} />
        <Route path="/registration" element={<RegistrationPage closeRegistration={closeRegistration} />} />
        <Route path="/News" element={<News />} />

      </Routes>

      {showSessions && <Sessions />} {/* Render Sessions conditionally */}
    </>
  );
};

export default App;

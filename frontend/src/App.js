import React, { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Hero from "./components/Home/Hero.js";
import MatchCenter from "./components/Home/MatchCenter.js";
import ClubDashboard from "./components/Clubs/ClubDashboard.js";
import ClubsMenu from './components/Clubs/ClubsMenu.js'
import Crowdfunding from "./components/Crowdfunding.js";
import Digitalfootballacademy from "./components/Digitalfootballacademy.js";
import RegistrationPage from "./components/registration.js";
import Sessions from "./components/Sessions.js"; 
import News from "./components/News.js"; 
import ProductList from './components/e-commerce/product-list.js';
import JobApplicationForm from './components/JobApplicationForm.js';
import SignUp from "./components/SignUp/index.js";
import MatchSummaryPage from "./components/Matches/MatchSummary.js";


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
      <Navbar scrollToMatchCenter={scrollToMatchCenter} loggedIn={true} />
      <Routes>
        <Route path="/" element={
          <div>
            <Hero scrollToMatchCenter={scrollToMatchCenter} />
            <div ref={matchCenterRef}>
              <MatchCenter />
            </div>
          </div>
        }/>
        <Route path="/club-dashboard" element={<ClubDashboard />} />
        <Route path="/crowdfunding" element={<Crowdfunding />} />
        <Route path="/Digitalfootballacademy" element={<Digitalfootballacademy />} />
        <Route path="/registration" element={<RegistrationPage closeRegistration={closeRegistration} />} />
        <Route path="/News" element={<News />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/apply' element={<JobApplicationForm />} />
        <Route path='/shop' element={<ProductList />} />
        <Route path='/clubs' element={<ClubsMenu />} />
        <Route path='/match-summary' element={<MatchSummaryPage />} />
      </Routes>
      {showSessions && <Sessions />} {/* Render Sessions conditionally */}
    </>
  );
};

export default App;

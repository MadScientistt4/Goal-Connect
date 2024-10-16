import React, { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.js";
import Hero from "./Hero.js";
import MatchCenter from "./MatchCenter.js";
import ClubDashboard from "./ClubDashboard.js";
import ClubsMenu from './ClubsMenu.js'
import Crowdfunding from "./Crowdfunding";
import Digitalfootballacademy from "./Digitalfootballacademy";
import RegistrationPage from "./registration";
import Sessions from "./Sessions"; 
import News from "./News"; 
import ProductList from './components/e-commerce/product-list.js';
import JobApplicationForm from './JobApplicationForm.js';
import SignUp from './components/SignUp/index.js';
import Login from './components/Login/index';

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
        <Route path='/login' element={<Login/>}> </Route>
        <Route path='/apply' element={<JobApplicationForm />} />
        <Route path='/shop' element={<ProductList />} />
        <Route path='/clubs' element={<ClubsMenu />} />
      </Routes>
      {showSessions && <Sessions />} {/* Render Sessions conditionally */}
    </>
  );
};

export default App;

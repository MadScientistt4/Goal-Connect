import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Hero from "./components/Home/Hero.js";
import MatchCenter from "./components/Home/MatchCenter.js";
import ClubDashboard from "./components/Clubs/ClubDashboard.js";
import ClubsMenu from './components/Clubs/ClubsMenu.js';
import Crowdfunding from "./components/Crowdfunding.js";
import Digitalfootballacademy from "./components/Digitalfootballacademy.js";
import RegistrationPage from "./components/registration.js";
import News from "./components/News.js"; 
import ProductList from './components/e-commerce/product-list.js';
import JobApplicationForm from './components/JobApplicationForm.js';
import SignUp from './components/SignUp/index.js';
import Login from './components/Login/index';
import MatchSummaryPage from "./components/Matches/MatchSummary.js";
import PostNews from "./components/Clubs/PostNews.js";
import CreateCampaign from "./components/Clubs/CreateCampaign.js";
import ClubPage from "./components/Clubs/ClubPage.js";
import Tournament from "./components/SearchTournament/Tournament.js";
import SponsorDashboard from "./SponsorDashboard.js";
import Sessions from "./components/Sessions"; // Corrected import

const App = () => {
  const matchCenterRef = useRef(null);

  // Function to scroll to MatchCenter
  const scrollToMatchCenter = () => {
    if (matchCenterRef.current) {
      matchCenterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar scrollToMatchCenter={scrollToMatchCenter} loggedIn={true} />
      <Routes>
        <Route path="/" element={
          <div>
            <Hero scrollToMatchCenter={scrollToMatchCenter} loggedIn={true}/>
            <div ref={matchCenterRef}>
              <MatchCenter />
            </div>
          </div>
        }/>
        <Route path="/club-dashboard" element={<ClubDashboard />} />
        <Route path="/crowdfunding" element={<Crowdfunding />} />
        <Route path="/Digitalfootballacademy" element={<Digitalfootballacademy />} />
         <Route path="/registration" element={<RegistrationPage />} /> 
        <Route path="/News" element={<News />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/apply' element={<JobApplicationForm />} />
        <Route path='/shop' element={<ProductList />} />
        <Route path="/clubs" element={<ClubsMenu />} />
        <Route path="/clubs/:clubName" element={<ClubPage />} />
        <Route path='/match-summary' element={<MatchSummaryPage />} />
        <Route path='/post-news' element={<PostNews />} />
        <Route path="/create-campaign" element={<CreateCampaign />} />
        <Route path="/tournaments" element={<Tournament />} />
        <Route path="/sponsor-dashboard" element={<SponsorDashboard />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </>
  );
};

export default App;

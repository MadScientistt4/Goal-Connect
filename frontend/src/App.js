import React, { useRef } from 'react'
import Navbar from './Navbar.js'
import Hero from './Hero.js'
import MatchCenter from './MatchCenter.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClubDashboard from './ClubDashboard.js'

const App = () => {
  const matchCenterRef = useRef(null);

  // Function to scroll to MatchCenter
  const scrollToMatchCenter = () => {
    if (matchCenterRef.current) {
      matchCenterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Router>
      <main className='bg-gradient-to-r from-background-dark to-[#1b202c]'>
        <Navbar scrollToMatchCenter={scrollToMatchCenter} />
        <Routes>
          <Route path="/" element={
            <div>
              <Hero scrollToMatchCenter={scrollToMatchCenter} />
              <div ref={matchCenterRef}>
                <MatchCenter />
              </div>
            </div>
          } />
          <Route path="/club-dashboard" element={<ClubDashboard />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App


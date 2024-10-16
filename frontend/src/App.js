import React, { useRef } from 'react'
import Navbar from './Navbar.js'
import Hero from './Hero.js'
import MatchCenter from './MatchCenter.js'
import SignUp from './components/Signup/index.js'
import { Routes, Route } from 'react-router-dom'
const App = () => {
  const matchCenterRef = useRef(null);

  // Function to scroll to MatchCenter
  const scrollToMatchCenter = () => {
    if (matchCenterRef.current) {
      matchCenterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <Navbar scrollToMatchCenter={scrollToMatchCenter} />
      <Routes>
        <Route>
          <Route path="/" element={
            <div>
              <Hero scrollToMatchCenter={scrollToMatchCenter} />
              <div ref={matchCenterRef}>
                <MatchCenter />
              </div>
            </div>
          } />
        </Route>
        <Route path='/signup' element={<SignUp/>}></Route>
      </Routes>
    </>
  )
}

export default App


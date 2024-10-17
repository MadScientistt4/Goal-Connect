import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const predefinedClubsData = [
  {
    title: "City FC",
    description: "Support us in training young players and enhancing facilities.",
    logo: "https://upload.wikimedia.org/wikipedia/sco/thumb/e/eb/Manchester_City_FC_badge.svg/2048px-Manchester_City_FC_badge.svg.png",
    fundingGoal: "₹500,000",
    currentFunding: "₹200,000",
  },
];

const Crowdfunding = () => {
  const [clubsData, setClubsData] = useState(predefinedClubsData);
  const location = useLocation();
  const { clubName, clubLogo, customMessage } = location.state || {};

  useEffect(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    
    setClubsData([...predefinedClubsData, ...storedCampaigns]);
  }, []);

  const handleContributeClick = (club) => {
    console.log(`Contributing to ${club.title}`);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-white">Support Your Favorite Football Clubs</h1>
      <p className="text-sm mb-10 text-gray-400">CONTRIBUTE TO CLUB DEVELOPMENT AND JOIN THE JOURNEY</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl px-4">
        {clubsData.map((club, index) => {
          const fundingGoal = parseInt(club.fundingGoal.replace(/₹|,/g, ''));
          const currentFunding = parseInt(club.currentFunding.replace(/₹|,/g, ''));

          if (isNaN(fundingGoal) || isNaN(currentFunding)) {
            console.error(`Invalid funding data for ${club.title}`);
            return null;
          }

          const displayClubName = club.title === "Your Custom Club" ? clubName : club.title;
          const displayClubLogo = club.logo === "url-to-logo" ? clubLogo : club.logo; 
          return (
            <div key={index} className="border border-gray-600 p-6 flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-300 transform transition-all hover:scale-105">
              <div>
                <img src={displayClubLogo} alt={`${displayClubName} logo`} className="w-24 h-24 mx-auto mb-4 object-cover" />
                <h2 className="text-xl font-bold mb-3 text-white text-center">{displayClubName}</h2>
                <p className="text-sm text-gray-300 mb-2 text-center">{customMessage}</p>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-400">Funding Goal: {club.fundingGoal}</p>
                  <div className="relative w-full bg-gray-600 rounded-full h-3 mb-2">
                    <div 
                      className="bg-green-400 h-3 rounded-full"
                      style={{ width: `${(currentFunding / fundingGoal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-green-400">{club.currentFunding} raised</p>
                </div>
                {club.customMessage && (
                  <p className="text-sm text-yellow-400 text-center italic mb-4">
                    {club.customMessage}
                  </p>
                )}
              </div>
              <button
                className="bg-orange-600 text-white py-2 px-5 rounded mt-4 hover:bg-orange-500 transition duration-300"
                onClick={() => handleContributeClick(club)}
              >
                Contribute
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Crowdfunding;

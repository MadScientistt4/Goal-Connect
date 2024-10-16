import React, { useState } from 'react';

const SponsorDashboard = () => {
  const [sponsorClubs] = useState([
    {
      id: 1,
      name: 'Manchester United',
      logo: 'https://via.placeholder.com/150?text=Club+A+Logo',
      description: 'Club A is known for its competitive spirit and strong community.',
    },
    {
      id: 2,
      name: 'Bangalore Football club',
      logo: 'https://via.placeholder.com/150?text=Club+B+Logo',
      description: 'Club B focuses on youth engagement and skill development.',
    },
    {
      id: 3,
      name: 'East bengal FC',
      logo: 'https://via.placeholder.com/150?text=Club+C+Logo',
      description: 'Club C has a rich history and a passionate fan base.',
    },
    {
      id: 4,
      name: 'Club D',
      logo: 'https://via.placeholder.com/150?text=Club+D+Logo',
      description: 'Club D excels in community outreach and sportsmanship.',
    },
    {
      id: 5,
      name: 'Club E',
      logo: 'https://via.placeholder.com/150?text=Club+E+Logo',
      description: 'Club E promotes fitness and teamwork among young athletes.',
    },
    {
      id: 6,
      name: 'Club F',
      logo: 'https://via.placeholder.com/150?text=Club+F+Logo',
      description: 'Club F is celebrated for its inclusivity and diverse programs.',
    },
  ]);

  const [selectedClub, setSelectedClub] = useState(null);
  const [sponsorshipDetails, setSponsorshipDetails] = useState({
    sponsorName: '',
    sponsorLogo: null,
    logoPosition: '',
    amount: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');

  const logoPositions = [
    { label: 'Front Center', price: 100 },
    { label: 'Sleeve', price: 50 },
    { label: 'Back', price: 75 },
  ];

  const handleSponsorshipFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setSuccessMessage(`Thank you! Your sponsorship for ${selectedClub.name} has been submitted.`);
    // Resetting the form
    setSponsorshipDetails({
      sponsorName: '',
      sponsorLogo: null,
      logoPosition: '',
      amount: 0,
    });
    setSelectedClub(null);
  };

  const handleLogoChange = (event) => {
    const logo = event.target.files[0];
    setSponsorshipDetails({
      ...sponsorshipDetails,
      sponsorLogo: logo,
    });
  };

  const handlePositionChange = (event) => {
    const selectedPosition = event.target.value;
    const positionDetails = logoPositions.find(pos => pos.label === selectedPosition);
    setSponsorshipDetails({
      ...sponsorshipDetails,
      logoPosition: selectedPosition,
      amount: positionDetails ? positionDetails.price : 0,
    });
  };

  return (
    <div className="container mx-auto p-6 bg-[#1E3A8A] min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-white text-center animate__animated animate__fadeInDown">
          Sponsor Dashboard
        </h1>

        {/* Club Selection Section */}
        <div className="flex flex-wrap justify-center mb-4">
          {sponsorClubs.map((club) => (
            <div key={club.id} className="w-full md:w-1/2 p-4">
              <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-center transition duration-300 transform hover:scale-105">
                <img src={club.logo} alt={`${club.name} Logo`} className="w-32 h-32 mb-2 rounded-full border-2 border-indigo-500" />
                <h2 className="text-xl font-bold mb-2 text-white text-center">{club.name}</h2>
                <p className="text-gray-300 text-center mb-4">{club.description}</p>
                <button
                  className="bg-[#1E3A8A] hover:bg-[#1A2E66] text-white font-bold py-2 px-4 rounded w-full transition duration-300"
                  onClick={() => setSelectedClub(club)}
                >
                  Select Club
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sponsorship Form Section */}
        {selectedClub && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Sponsorship Form for {selectedClub.name}
            </h2>
            <form onSubmit={handleSponsorshipFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Sponsor Name:
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={sponsorshipDetails.sponsorName}
                  onChange={(event) =>
                    setSponsorshipDetails({
                      ...sponsorshipDetails,
                      sponsorName: event.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Sponsor Logo:
                </label>
                <input
                  type="file"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleLogoChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Logo Position:
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={sponsorshipDetails.logoPosition}
                  onChange={handlePositionChange}
                  required
                >
                  <option value="">Select Position</option>
                  {logoPositions.map((position) => (
                    <option key={position.label} value={position.label}>
                      {position.label} (₹{position.price})
                    </option>
                  ))}
                </select>
              </div>
              
              <button
                className="bg-[#1E3A8A] hover:bg-[#1A2E66] text-white font-bold py-2 px-4 rounded w-full transition duration-300"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Success Message Section */}
        {successMessage && (
          <div className="mb-4 text-green-500 text-lg text-center">
            {successMessage}
          </div>
        )}

        {/* Shirt Preview Section */}
        {selectedClub && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-white">Shirt Preview</h2>
            <div className="relative w-full h-48 bg-gray-900 border border-gray-700 flex items-center justify-center">
              {sponsorshipDetails.sponsorLogo && (
                <img
                  src={URL.createObjectURL(sponsorshipDetails.sponsorLogo)}
                  alt="Sponsor Logo"
                  className="absolute w-1/4 h-1/4"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
              <span className="text-gray-400">Preview</span>
            </div>
          </div>
        )}

        {/* Payment Option Section */}
        {selectedClub && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-white">Payment Option</h2>
            <button
              className="bg-[#1E3A8A] hover:bg-[#1A2E66] text-white font-bold py-2 px-4 rounded w-full transition duration-300"
            >
              Pay ₹{sponsorshipDetails.amount}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorDashboard;

import React, { useState } from 'react';

// Sample club data
const clubsData = [
    { name: 'East Bengal FC', logo: 'https://administrator.the-aiff.com/uploads/sm_EastBengalFClogowebp1_1680264050.png' },
    { name: 'Mohammedan Sporting Club', logo: 'https://administrator.the-aiff.com/logos/sm_8020-logo_small-1645793900.png' },
    { name: 'Bengaluru Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8021-logo_small-1578937550.png' },
    { name: 'Kerala Blasters Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8982-logo_small-1608191863.jpg' },
    { name: 'Mumbai City FC', logo: 'https://administrator.the-aiff.com/uploads/sm_MCFC01_1691062308.png' },
    { name: 'East Bengal FC', logo: 'https://administrator.the-aiff.com/uploads/sm_EastBengalFClogowebp1_1680264050.png' },
    { name: 'Mohammedan Sporting Club', logo: 'https://administrator.the-aiff.com/logos/sm_8020-logo_small-1645793900.png' },
    { name: 'Bengaluru Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8021-logo_small-1578937550.png' },
    { name: 'Kerala Blasters Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8982-logo_small-1608191863.jpg' },
    { name: 'Mumbai City FC', logo: 'https://administrator.the-aiff.com/uploads/sm_MCFC01_1691062308.png' },
    { name: 'East Bengal FC', logo: 'https://administrator.the-aiff.com/uploads/sm_EastBengalFClogowebp1_1680264050.png' },
    { name: 'Mohammedan Sporting Club', logo: 'https://administrator.the-aiff.com/logos/sm_8020-logo_small-1645793900.png' },
    { name: 'Bengaluru Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8021-logo_small-1578937550.png' },
    { name: 'Kerala Blasters Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8982-logo_small-1608191863.jpg' },
    { name: 'Mumbai City FC', logo: 'https://administrator.the-aiff.com/uploads/sm_MCFC01_1691062308.png' },
    // You can add more clubs here
];

const ClubsMenu = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter clubs based on search term
    const filteredClubs = clubsData.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-[92vh] bg-cover bg-center bg-no-repeat bg-background-hero">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

            {/* Main content */}
            <div className="relative container mx-auto p-4 z-2">
                <h1 className='text-5xl font-bold mb-4 text-white'>Find Clubs</h1>

                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Clubs..."
                        className="w-full text-black p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Clubs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {filteredClubs.map((club, index) => (
                        <div key={index} className="flex flex-col items-center border border-gray-700 shadow-sm shadow-gray-800 bg-card-background p-4 rounded-lg">
                            <img
                                src={club.logo}
                                alt={`${club.name} Logo`}
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-white font-semibold text-lg text-center">{club.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClubsMenu;

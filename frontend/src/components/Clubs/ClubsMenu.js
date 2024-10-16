import ClubDetails from "./ClubDetails"; // Ensure this path is correct
import Squad from './Squad'; // Import the Squad component
import React, { useState, useEffect } from 'react';
import { newsItems } from './NewsItems';
import { Link, useNavigate } from 'react-router-dom';

// Updated clubsData with color information
export const clubsData = [
    { name: 'East Bengal FC', logo: 'https://administrator.the-aiff.com/uploads/sm_EastBengalFClogowebp1_1680264050.png', color: 'red' },
    { name: 'Mohammedan Sporting Club', logo: 'https://administrator.the-aiff.com/logos/sm_8020-logo_small-1645793900.png', color: 'green' },
    { name: 'Bengaluru Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8021-logo_small-1578937550.png', color: 'blue' },
    { name: 'Kerala Blasters Football Club', logo: 'https://administrator.the-aiff.com/logos/sm_8982-logo_small-1608191863.jpg', color: 'yellow' },
    { name: 'Mumbai City FC', logo: 'https://administrator.the-aiff.com/uploads/sm_MCFC01_1691062308.png', color: 'lightblue' },
    // Additional clubs can be added here
];

export const clubs = [
    {
        name: "East Bengal FC",
        address: "Emami East Bengal FC, Ground Floor, 687, Eastern Metropolitan Bypass, Anandapur, East Kolkata Twp, Kolkata, West Bengal 700107",
        founded: "01 Aug 1920",
        president: "NA",
        playersRegistered: 228,
        logo: "https://administrator.the-aiff.com/uploads/sm_EastBengalFClogowebp1_1680264050.png",
        image: "https://www.indiansuperleague.com/static-assets/images/club/overview/1102.png?v=101.38"
    },
    {
        name: "Mohammedan Sporting Club",
        address: "Mohammedan Sporting Club, 34, 1st Floor, Alimuddin Street, Kolkata, West Bengal 700016",
        founded: "01 Jan 1891",
        president: "NA",
        playersRegistered: 230,
        logo: "https://placehold.co/100x100",
        image: "https://placehold.co/600x400"
    },
    {
        name: "Bengaluru Football Club",
        address: "Bengaluru FC, 103, 3rd Main, 3rd Cross, Domlur Layout, Bengaluru, Karnataka 560071",
        founded: "20 Jul 2013",
        president: "Parth Jindal",
        playersRegistered: 180,
        logo: "https://www.indiansuperleague.com/static-assets/images/club/538/656.png?v=101.39",
        image: "https://www.indiansuperleague.com/static-assets/images/club/overview/656.png?v=101.39"
    },
    {
        name: "Kerala Blasters Football Club",
        address: "Jawaharlal Nehru Stadium, Kaloor, Kochi, Kerala 682017",
        founded: "2014",
        president: "N/A",
        playersRegistered: 200,
        logo: "https://placehold.co/100x100",
        image: "https://placehold.co/600x400"
    },
    {
        name: "Mumbai City FC",
        address: "Mumbai City FC, 1st Floor, Manish Commercial Centre, 90, M.G. Road, Ghatkopar (East), Mumbai, Maharashtra 400077",
        founded: "2014",
        president: "N/A",
        playersRegistered: 210,
        logo: "https://placehold.co/100x100",
        image: "https://placehold.co/600x400"
    },
];

const ClubsMenu = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []); // Empty dependency array means this effect runs once on mount

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClub, setSelectedClub] = useState(null);

    // Filter clubs based on search term
    const filteredClubs = clubsData.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle club selection
    const handleClubSelect = (club) => {
        const clubDetails = clubs.find(c => c.name === club.name);
        if (clubDetails) {
            navigate(`/clubs/${encodeURIComponent(club.name.toLowerCase().replace(/ /g, '-'))}`);
        }
    };

    // Ensure selectedClub is not null before accessing its properties
    const clubNews = selectedClub ? newsItems[selectedClub.name]?.newsItems : [];

    // If a club is selected, render its details and news
    if (selectedClub) {
        return (
            <div className={`relative min-h-[92vh] bg-${selectedClub.color}-900`}>
                <div className={`absolute inset-0 bg-${selectedClub.color}-800 bg-opacity-80 z-0`}></div>
                <div className="relative container mx-auto p-4 z-2">
                    <ClubDetails club={selectedClub} />
                    <Squad clubName={selectedClub.name} clubColor={selectedClub.color} />
                    <button
                        onClick={() => setSelectedClub(null)}
                        className={`mt-4 bg-${selectedClub.color}-500 hover:bg-${selectedClub.color}-700 text-white font-bold py-2 px-4 rounded`}
                    >
                        Back to Clubs
                    </button>
                    <div>
                        <h2 className='text-white'>News for {selectedClub.name}</h2>
                        {/* Render the club's news */}
                        {Array.isArray(clubNews) && clubNews.length > 0 ? (
                            <div className="space-y-4">
                                {clubNews.map((news, index) => (
                                    <div key={index} className="p-4 bg-gray-800 text-white rounded-md shadow-md">
                                        <img src={news.thumbnail} alt={news.title} className="w-full h-48 object-cover mb-2 rounded-md" />
                                        <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                                        <p>{news.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white">No news available for this club.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Render the clubs menu if no club is selected
    return (
        <div className="relative min-h-[92vh] bg-gradient-to-br from-gray-900 to-blue-900">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="relative container mx-auto p-4 z-2">
                <h1 className='text-5xl font-bold mb-4 text-white'>Find Clubs</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Clubs..."
                        className="w-full text-black p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {filteredClubs.map((club, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center border border-${club.color}-700 shadow-sm shadow-${club.color}-800 bg-${club.color}-900 bg-opacity-50 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105`}
                            onClick={() => handleClubSelect(club)}
                        >
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

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ClubDetails from './ClubDetails';
import Squad from './Squad';
import { clubs, clubsData } from "./ClubsMenu";
import { newsItems } from './NewsItems';

const ClubPage = () => {
    const { clubName } = useParams();
    const decodedClubName = decodeURIComponent(clubName).replace(/-/g, ' ');
    const club = clubs.find(c => c.name.toLowerCase() === decodedClubName.toLowerCase());
    const clubData = clubsData.find(c => c.name.toLowerCase() === decodedClubName.toLowerCase());

    if (!club || !clubData) {
        return <div>Club not found</div>;
    }

    const clubNews = newsItems[club.name]?.newsItems || [];

    return (
        <div className={`relative min-h-[92vh] bg-${clubData.color}-900`}>
            <div className={`absolute inset-0 bg-${clubData.color}-800 bg-opacity-80 z-0`}></div>
            <div className="relative container mx-auto p-4 z-2">
                <ClubDetails club={club} />
                <Squad clubName={club.name} clubColor={clubData.color} />
                
                {/* News Section */}
                <section className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-white">Club News</h2>
                        <Link 
                            to={{
                                pathname: "/post-news",
                                state: { clubName: club.name }
                            }}
                            className={`bg-${clubData.color}-600 hover:bg-${clubData.color}-700 text-white font-bold py-2 px-4 rounded`}
                        >
                            Post News
                        </Link>
                    </div>
                    {clubNews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {clubNews.map((news, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img src={news.thumbnail} alt={news.title} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                                        <p className="text-gray-600">{news.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white">No news available for this club.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ClubPage;

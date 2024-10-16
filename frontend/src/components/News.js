import React, { useState, useEffect } from 'react';

const newsData = {
    mainArticles: [
        {
            image: "https://placehold.co/1200x600",
            alt: "A young athlete standing on a field with stadium lights in the background",
            title: "From Arunachal Pradesh to Mumbai, Gyamar Nikum chases his dreams",
            date: "14 Oct, 2024"
        },
        {
            image: "https://placehold.co/1200x600",
            alt: "Celebrating a victory in a match",
            title: "Team India secures a stunning victory in their latest match",
            date: "13 Oct, 2024"
        },
        {
            image: "https://placehold.co/1200x600",
            alt: "A coach giving a motivational speech",
            title: "Behind the scenes with coach Manolo Marquez",
            date: "12 Oct, 2024"
        },
        {
            image: "https://placehold.co/1200x600",
            alt: "An intense moment in a soccer game",
            title: "Thrilling moments from the latest league matches",
            date: "11 Oct, 2024"
        },
        {
            image: "https://placehold.co/1200x600",
            alt: "Players training in the field",
            title: "Preparations for the upcoming international friendly matches",
            date: "10 Oct, 2024"
        },
    ],
    articles: [
        {
            image: "https://placehold.co/300x200",
            alt: "A coach speaking at a press conference",
            title: "Farukh did what we expected him to do: Manolo Marquez",
            date: "13 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "A soccer match between two teams",
            title: "Report: Farukh Choudhary on target as India play out draw with Vietnam",
            date: "12 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "A goalkeeper making a save during a match",
            title: "Friendlies like these put us in uncomfortable situations: Sandhu on Vietnam clash",
            date: "11 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "A coach giving instructions to players during training",
            title: "Preview, Vietnam vs India: Blue Tigers target first win under Manolo Marquez",
            date: "11 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "A young athlete celebrating a goal",
            title: "Young talent shines in the national leagues",
            date: "10 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "Fans cheering in a stadium",
            title: "Fans back in full force as leagues resume",
            date: "09 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "A player dribbling past an opponent",
            title: "Top players to watch this season",
            date: "08 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "A coach discussing strategies with players",
            title: "Coaching changes shake up the league",
            date: "07 Oct, 2024"
        },
        {
            image: "https://placehold.co/300x200",
            alt: "A training session in progress",
            title: "Training camps preparing players for the upcoming season",
            date: "06 Oct, 2024"
        },
    ]
};

const MainArticle = ({ article, onNext, onPrev, isPrevDisabled, isNextDisabled }) => (
    <div className="relative bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-4">
        <img src={article.image} alt={article.alt} className="w-full h-96 object-cover"/>
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
            <div className="flex items-center text-white mb-2">
                <i className="fas fa-file-alt mr-2"></i>
                <span className="text-lg font-semibold">{article.title}</span>
            </div>
            <span className="text-sm">{article.date}</span>
        </div>
        <button 
            onClick={onPrev} 
            disabled={isPrevDisabled} 
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            &lt;
        </button>
        <button 
            onClick={onNext} 
            disabled={isNextDisabled} 
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            &gt;
        </button>
    </div>
);

const Article = ({ image, alt, title, date }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
        <img src={image} alt={alt} className="w-full h-48 object-cover"/>
        <div className="p-4">
            <div className="flex items-center text-gray-300 mb-2">
                <i className="fas fa-file-alt mr-2"></i>
                <span className="text-lg font-semibold">{title}</span>
            </div>
            <span className="text-sm text-gray-500">{date}</span>
        </div>
    </div>
);

const News = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const filteredArticles = newsData.articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNext = () => {
        if (currentIndex < newsData.mainArticles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="bg-black text-white min-h-screen py-8">
            <div className="max-w-6xl mx-auto p-4">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
                    />
                </div>
                
                {/* Main Article Section */}
                <div className="relative mb-4">
                    <MainArticle 
                        article={newsData.mainArticles[currentIndex]} 
                        onNext={handleNext}
                        onPrev={handlePrev}
                        isPrevDisabled={currentIndex === 0}
                        isNextDisabled={currentIndex === newsData.mainArticles.length - 1}
                    />
                </div>

                {/* Smaller Articles Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    {filteredArticles.map((article, index) => (
                        <Article 
                            key={index}
                            image={article.image} 
                            alt={article.alt} 
                            title={article.title} 
                            date={article.date} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News;

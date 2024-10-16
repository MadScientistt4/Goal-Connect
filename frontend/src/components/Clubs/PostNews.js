import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateNewsItems } from './NewsItems'; // Import update function

const PostNewsForm = () => {
    const location = useLocation();
    const { clubName } = location.state || {}; // Retrieve the club name from navigation state

    const [newsTitle, setNewsTitle] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [thumbnail, setThumbnail] = useState(''); // Add thumbnail state for the news

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a new news item object
        const newNewsItem = {
            thumbnail, // You can handle file/image uploads separately
            title: newsTitle,
            description: newsContent,
        };

        // Call the update function to add the news to the relevant club
        updateNewsItems(clubName, newNewsItem);

        // Reset form fields
        setNewsTitle('');
        setNewsContent('');
        setThumbnail('');

        console.log('News item added:', newNewsItem);
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 bg-gray-900 p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-white">Post News for {clubName}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-white mb-2">News Title</label>
                    <input
                        id="title"
                        type="text"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
                        placeholder="Enter the news title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-white mb-2">News Content</label>
                    <textarea
                        id="content"
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
                        rows="6"
                        placeholder="Enter the news content"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block text-white mb-2">Thumbnail URL</label>
                    <input
                        id="thumbnail"
                        type="text"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
                        placeholder="Enter thumbnail URL (optional)"
                    />
                </div>
                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md">
                    Submit News
                </button>
            </form>
        </div>
    );
};

export default PostNewsForm;

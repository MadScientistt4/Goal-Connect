import React, { useState } from 'react';


const PostNews = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        thumbnail: null,
        headline: '',
        description: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setFormData({ ...formData, thumbnail: e.target.files[0] });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to handle file uploads
        const formDataObj = new FormData();
        formDataObj.append('thumbnail', formData.thumbnail);
        formDataObj.append('headline', formData.headline);
        formDataObj.append('description', formData.description);

    };

    return (
        <div className="relative h-[92vh] flex justify-center items-center">
            {/* Background Image with opacity */}
            <div className="absolute inset-0 bg-background-hero bg-cover bg-center opacity-50"></div>
            <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full z-10">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Post Club News</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Headline</label>
                        <input
                            type="text"
                            name="headline"
                            value={formData.headline}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
                            placeholder="Enter news headline"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-200">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
                            placeholder="Enter news description"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit News
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostNews;

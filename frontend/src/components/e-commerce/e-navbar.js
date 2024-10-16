import { useState, useEffect } from "react";
import { ShoppingBag, Search, X, Heart } from "lucide-react";

function Navbar({ onSearch, cartItemCount, onCartClick, onClearSearch, favoriteCount, onFavoritesClick }) {
    const [searchTerm, setSearchTerm] = useState("");

    
    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []); // Empty dependency array means this effect runs once on mount

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        onClearSearch();
    };

    return (
        <nav className="bg-blue-600 text-white py-4 mb-6">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div className="w-1/3"></div> {/* Empty div for spacing */}
                    <h1 className="text-2xl font-bold text-center w-1/3">Sports Store</h1>
                    <div className="flex items-center space-x-4 w-1/3 justify-end">
                        <form onSubmit={handleSearch} className="flex justify-end items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-40 bg-blue-500 text-white placeholder-blue-200 border-blue-400 pr-8 rounded py-1 px-2"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={handleClearSearch}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                            <button type="submit" className="bg-white text-blue-600 hover:bg-blue-100 p-2 rounded">
                                <Search className="h-5 w-5" />
                            </button>
                        </form>
                        <button
                            className="bg-white text-blue-600 hover:bg-blue-100 p-2 rounded relative"
                            onClick={onFavoritesClick}
                        >
                            <Heart className="h-5 w-5" />
                            {favoriteCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {favoriteCount}
                                </span>
                            )}
                        </button>
                        <button
                            className="bg-white text-blue-600 hover:bg-blue-100 p-2 rounded relative"
                            onClick={onCartClick}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

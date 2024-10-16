import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as FootballLogo } from "../assets/football-logo.svg"
import { ReactComponent as ProfilePic } from "../assets/profile-pic.svg"
import { ReactComponent as Hamburger } from "../assets/hamburger.svg"
import { useNavigate } from 'react-router-dom';

const Navbar = ({ scrollToMatchCenter, loggedIn }) => {
    let [menu, setMenu] = React.useState(false);
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    const toggleMenu = () => {
        setMenu(prev => !prev);
    };

    const handleClubsClick = () => {
        navigate('/clubs'); // Redirect to /clubs
    };

    const Menu = () => (
        <div className="menu absolute text-white max-h-[85vh] bg-background-dark bg-opacity-[0.98] top-[15vh] w-[65vw] left-[20%] flex flex-col items-center justify-around rounded-[10%]">
            <Link
                to="/"
                className="text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4"
                onClick={scrollToMatchCenter}
            >
                Match hub
            </Link>
            <Link
                to="/crowdfunding"
                className="text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4"
            >
                Crowdfunding
            </Link>
            <Link
                to="/news"
                className="text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4"
            >
                News
            </Link>
            <Link to="/clubs" className="text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4">
                Clubs
            </Link>
            {loggedIn && (
                <>
                    <Link to="/DigitalFootballAcademy" className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center p-4'>Digital Football Academy</Link>
                    <Link to="/shop" className='text-xl text-center w-full py-10 h-full flex items-center justify-center p-4'>Shop</Link>
                </>
            )}
        </div>
    );

    return (
        <nav className='sticky top-0 w-full flex justify-between items-center py-3 px-3 sm:px-10 bg-background-dark shadow-2xl shadow-slate-800/200 border-b border-b-gray-500 z-10 bg-opacity-[0.95]'>
            <Link to="/">
                <div className="left flex justify-center items-center gap-3 text-white">
                    <FootballLogo className='w-9 h-9' />
                    <span className='text-xl text-md max-[363px]:hidden'>Goal Connect</span>
                </div>
            </Link>

            {/* Right - Links and Menu */}
            <div className="right flex justify-center items-center gap-4 sm:gap-7 text-white">
                <Link to="/" className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer' onClick={scrollToMatchCenter}>Match hub</Link>
                <Link to="/News" className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer'>News</Link>
                <Link to="/clubs" className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer' onClick={handleClubsClick}>Clubs</Link> {/* Navigate to Clubs */}

                {/* Conditionally render Shop and Digital Football Academy based on loggedIn prop */}
                {loggedIn && (
                    <>
                        <Link to="/DigitalFootballAcademy" className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer'>Digital Football Academy</Link>
                        <Link to="/shop" className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer'>Shop</Link>
                    </>
                )}

                {/* Profile/Login */}
                {loggedIn ? (
                    <div className='login py-4 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration:75'>
                        <ProfilePic className='h-8 w-10' />
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <div className='login hover:border-gray-400 border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration:75'>
                                {/* <ProfilePic className='h-8 w-6' /> */}
                                <span className='text-xl'>Login</span>
                            </div>
                        </Link>
                        <Link to="/signup">
                            <div className='login hover:border-gray-400 border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration:75'>
                                {/* <ProfilePic className='h-8 w-6' /> */}
                                <span className='text-xl'>Sign up</span>
                            </div>
                        </Link>
                    </>
                )}

                {/* Hamburger Menu */}
                <div className='hamburger md:hidden block border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer'>
                    <Hamburger onClick={toggleMenu} className='md:hidden block h-8 w-6' />
                </div>
            </div>

            {/* Mobile Menu */}
            {menu && <Menu />}
        </nav>
    );
};

export default Navbar;

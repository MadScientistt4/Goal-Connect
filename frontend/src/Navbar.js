import React from 'react';
import { ReactComponent as FootballLogo } from '../src/assets/football-logo.svg';
import { ReactComponent as ProfilePic } from '../src/assets/profile-pic.svg';
import { ReactComponent as Hamburger } from '../src/assets/hamburger.svg';
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
        <div className={`menu absolute text-white max-h-[85vh] bg-background-dark bg-opacity-[0.98] top-[15vh] w-[65vw] left-[20%] flex flex-col items-center justify-around rounded-[10%] transition-transform duration-500 ${menu ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
            <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center p-4' onClick={scrollToMatchCenter}>Match hub</span>
            <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center p-4'>News</span>
            <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center p-4' onClick={handleClubsClick}>Clubs</span> {/* Navigate to Clubs */}
            {loggedIn && (
                <>
                    <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center p-4'>Digital Football Academy</span>
                    <span className='text-xl text-center w-full py-10 h-full flex items-center justify-center p-4'>Shop</span>
                </>
            )}
        </div>
    );

    return (
        <nav className='sticky top-0 w-full flex justify-between items-center py-3 px-3 sm:px-10 bg-background-dark shadow-2xl shadow-slate-800/200 border-b border-b-gray-500 z-10 bg-opacity-[0.95]'>
            {/* Left - Logo */}
            <div className="left flex justify-center items-center gap-3 text-white">
                <FootballLogo className='w-9 h-9' />
                <span className='text-xl text-md max-[363px]:hidden'>Goal Connect</span>
            </div>

            {/* Right - Links and Menu */}
            <div className="right flex justify-center items-center gap-4 sm:gap-7 text-white">
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer' onClick={scrollToMatchCenter}>Match hub</span>
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer'>News</span>
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer' onClick={handleClubsClick}>Clubs</span> {/* Navigate to Clubs */}

                {/* Conditionally render Shop and Digital Football Academy based on loggedIn prop */}
                {loggedIn && (
                    <>
                        <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer'>Digital Football Academy</span>
                        <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 cursor-pointer'>Shop</span>
                    </>
                )}

                {/* Profile/Login */}
                {loggedIn ? (
                    <div className='login py-4 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration:75'>
                        <ProfilePic className='h-8 w-10' />
                    </div>
                ) : (
                    <div className='login hover:border-gray-400 border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration:75'>
                        <ProfilePic className='h-8 w-6' />
                        <span className='text-xl'>Login</span>
                    </div>
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

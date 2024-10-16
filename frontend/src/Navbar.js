import React from 'react'
import { ReactComponent as FootballLogo } from '../src/assets/football-logo.svg';
import { ReactComponent as ProfilePic } from '../src/assets/profile-pic.svg';
import { ReactComponent as Hamburger } from '../src/assets/hamburger.svg';

const Navbar = ({ scrollToMatchCenter }) => {

    let [menu, setMenu] = React.useState(false)

    const toggleMenu = () => {
        console.log(menu)
        setMenu((old) => (!old))
    }

    function Menu(){
        return (
        <div className = "menu absolute text-white max-h-[85vh] bg-background-dark bg-opacity-[0.98] top-[15vh] w-[65vw] left-[20%] flex flex-col items-center justify-around rounded-[10%]">
            <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4'><a href="#">Match hub</a></span>
            <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4'><a href="#">News</a></span>
            <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4'><a href="#">Players</a></span>
            <span className='text-xl border-b border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4'><a href="#">Digital Football Academy</a></span>
            <span className='text-xl border-b-gray-500 text-center w-full py-10 h-full flex items-center justify-center border-t-gray-500 p-4'><a href="#">Shop</a></span>
        </div>  
        )
    }

    return (
        <nav className = 'sticky top-0 w-full flex justify-between items-center py-3 px-3 sm:px-10 bg-background-dark shadow-2xl shadow-slate-800/200 border-b border-b-gray-500 z-10 bg-opacity-[0.95]'>
            <div className = "left flex justify-center items-center gap-3 text-white">
                <FootballLogo className='w-9 h-9'/>
                <span className='text-xl text-md max-[363px]:hidden'>Goal Connect</span>
            </div>
            <div className = "right flex justify-center items-center gap-4 sm:gap-7 text-white">
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 ' onClick={scrollToMatchCenter}><a href="#">Match hub</a></span>
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 '><a href="#">News</a></span>
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 '><a href="#">Players</a></span>
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 '><a href="#">Shop</a></span>
                <span className='hidden md:block text-xl hover:text-blue-300 transition-all duration:75 '><a href="#">Digitial Football Academy</a></span>
                <div className = 'login hover:border-gray-400 border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration:75'>
                    <ProfilePic className='h-8 w-6'/>
                    <span className='text-xl'><a href="#">Login</a></span>
                </div>
                <div className = 'hamburger md:hidden block border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer'>
                    <Hamburger onClick = {toggleMenu} className='md:hidden block h-8 w-6'/> 
                </div>
            </div>
            {menu ? <Menu /> : null}
        </nav>
    )
}

export default Navbar
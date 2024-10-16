import React from 'react';
import MatchContainer from '../../components/Home/MatchContainer.js';

const MatchCenter = () => {
    let [showPast, setShowPast] = React.useState(true);

    // Define a function to toggle the value of showPast
    const toggleShowPast = () => {
        setShowPast(prev => !prev);
    };

    return (
        <div className='p-10 flex flex-col'>
            <h1 className='border-b border-b-gray-600 text-white text-6xl font-bold pb-4 mb-3'>Match Center</h1>
            <div className='ongoing flex flex-col pb-4 mb-4 border-b border-b-gray-600'>
                <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-red-600 rounded-full'></div>
                    <h1 className='text-3xl sm:text-4xl text-white font-semibold'>Ongoing matches</h1>
                </div>
                <MatchContainer live={true} />
            </div>
            <div className='upcoming flex flex-col pb-4 mb-4 border-b border-b-gray-600'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-3xl sm:text-4xl text-white font-semibold' onClick={toggleShowPast}>Upcoming matches</h1>
                </div>
                {showPast ? (
                    <div>
                        <MatchContainer live={false} />
                        <MatchContainer live={false} />
                        <MatchContainer live={false} />
                    </div>
                ) : null}
            </div>
            <div className='ongoing flex flex-col pb-4 mb-4 border-b border-b-gray-600'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-3xl sm:text-4xl text-white font-semibold' onClick={toggleShowPast}>Past matches</h1>
                </div>
                {showPast ? (
                    <div>
                        <MatchContainer live={false} />
                        <MatchContainer live={false} />
                        <MatchContainer live={false} />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MatchCenter;

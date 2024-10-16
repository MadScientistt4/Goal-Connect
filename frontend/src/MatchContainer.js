import React from 'react'
import {ReactComponent as Liverpool} from './assets/liverpool.svg'
import {ReactComponent as Chelsea} from './assets/chelsea.svg'

const MatchContainer = (props) => {

    return (
        <div className='flex flex-col mt-4'>
            <div className='date text-gray-400'>11th October 2024</div>
            <div className='match-container'>
                <div className='score flex flex-col md:flex-row items-center gap-3 justify-center'>
                    <div className='team flex gap-1 items-center justify-center'>
                        <Liverpool className='w-10 h-10' />
                        <h1 className='text-[#a8b2ce] text-xl text-center'>Mohun Bagan Super Giant</h1>
                    </div>
                    <h1 className='score-text text-5xl md:text-6xl'>3-0</h1>
                    <div className='team flex gap-1 items-center justify-center'>
                        <Chelsea className='w-10 h-10' />
                        <h1 className='text-[#a8b2ce] text-xl text-center'>Mumbai City FC</h1>
                    </div>
                </div>
                <div>
                    <h1 className='font-bold text-gray-200'>Thane Sub-junior Youth League</h1>
                </div>
                <div>
                    {props.live ? <button className='border border-gray-400 p-3 rounded hover:text-blue-300 hover:border-blue-300'>Join live discussion</button>
                    :
                    <button className='border border-gray-400 p-3 rounded hover:text-blue-300 hover:border-blue-300'>See highlights</button>}
                </div>
            </div>
        </div>
    )
}

export default MatchContainer
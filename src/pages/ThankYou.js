import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import mxbg from '../assets/bg25.svg'

export const ThankYou = () => {
    return (
        <div className='w-full h-[100vh] bg-cover flex justify-center items-center p-8' style={{ backgroundImage: `url(${mxbg})` }}>
            <div className="flex flex-col">
                <h1 className='text-2xl md:text-4xl font-bold mb-8 text-black text-center' > Your message has been sent 🏃</h1>
                <Link to='/'>
                    <p className='text-center p-2 hover:bg-white/40 backdrop-blur-sm rounded-full cursor-pointer'>Return to 🏠</p>
                </Link>
            </div>
        </div>
    )
}

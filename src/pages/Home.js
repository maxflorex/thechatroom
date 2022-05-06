import React from 'react'
import Hero from '../components/Hero'
import bg from '../assets/UnicornGradient_11.svg'

const Home = () => {
    return (
        <div style={{ backgroundImage: `url(${ bg })`}} className='bg-cover overflow-hidden'><Hero /></div>
    )
}

export default Home
import React, { useState } from 'react'
import mxbg from '../assets/bg25.svg'
import { btntw2, inputtw, inputtw2 } from '../Styles/Styles'

const Contact = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center p-8' style={{ backgroundImage: `url(${mxbg})` }}>
      <div className="flex flex-col">
        <h1 className='text-8xl font-bold mb-8 text-black'>Contact me 🤙</h1>
        <form className='flex flex-col gap-4 justify-center items-center pt-16'>
          <p className='italic'>Email:</p>
          <input type="text" placeholder='Enter your email...' className={inputtw}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='italic'>Message:</p>
          <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder='Enter your message...' className={inputtw2}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={btntw2}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
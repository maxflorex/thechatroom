import React, { useContext, useState } from 'react'
import mxbg from '../assets/bg25.svg'
import { btntw2, inputtw, inputtw2 } from '../Styles/Styles'
import { useSendMessageMutation } from '../services/appApi.js'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate();
  const { socket } = useContext(AppContext)
  const [sendMessage, { sending, error }] = useSendMessageMutation();

  // FUNCTION - LOGIN
  const handleMessage = (e) => {
    e.preventDefault();
    // LOGIN LOGIC
    sendMessage({ email, message }).then(({ data }) => {
      if (data) {
        // NAVIGATE TO THE CHAT
        navigate('/thankyou')
      }
    })
  }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center p-8' style={{ backgroundImage: `url(${mxbg})` }}>
      <div className="flex flex-col">
        <h1 className='text-5xl md:text-8xl font-bold mb-8 text-black text-center' > Contact me 🤙</h1>
        <form className='flex flex-col gap-4 justify-center items-center pt-8 md:pt-16'>
          <p className='italic'>Email:</p>
          <input type="email" name='email' placeholder='Enter your email...' className={inputtw}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='italic'>Message:</p>
          <textarea id="w3review" name="message" rows="4" cols="50" placeholder='Enter your message...' className={inputtw2}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={btntw2} onClick={handleMessage}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
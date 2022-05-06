import React from 'react'
import MessageForm from '../components/MessageForm'
import Sidebar from '../components/Sidebar'
import bg from '../assets/bg25.svg'

const Chat = () => {
  return (
    <div className="bg-cover w-[100vw] h-[100vh]" style={{ backgroundImage: `url(${bg})` }}>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vw] px-8 xl:px-96 md:px-40 '>
        <div className="flex flex-col md:flex-row gap-8 h-[70vh] overflow-auto">
          <Sidebar />
          <MessageForm />
        </div>
      </div>
    </div>
  )
}

export default Chat
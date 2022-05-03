import React from 'react'
import MessageForm from '../components/MessageForm'
import Sidebar from '../components/Sidebar'

const Chat = () => {
  return (
    <>
      <div className="flex justify-between container mx-auto my-16 gap-16">
        <Sidebar />
        <MessageForm />
      </div>
    </>
  )
}

export default Chat
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { btntw, inputtw } from '../Styles/Styles';

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const user = useSelector((state) => state.user);
    const { socket, currentRooms, setMessages, messages, privateMemberMsg } =
        useContext(AppContext);
    const messageEndRef = useRef(null);

    // USEEFFECT
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // FUNCTION - GET DATE
    const getFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();

        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year;
    };

    const todayDate = getFormattedDate();

    socket.off('room-messages').on('room-messages', (roomMessages) => {
        setMessages(roomMessages);
    });

    // FUNCTION - HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message) return;
        const today = new Date();
        const minutes =
            today.getMinutes() < 10
                ? '0' + today.getMinutes()
                : today.getMinutes();
        const time = today.getHours() + ':' + minutes;
        const roomId = currentRooms;
        socket.emit('message-room', roomId, message, user, time, todayDate);
        setMessage('');
    };

    // FUNCTION - SCROLL TO BOTTOM
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="border-2 w-[100vw] p-8 rounded-lg relative">
            {user && !privateMemberMsg?._id && (
                <div className="w-full bg-teal-400 p-4 rounded-lg text-xl mb-8">
                    You are in the{' '}
                    <span className="font-bold uppercase">{currentRooms}</span>{' '}
                    room
                </div>
            )}
            {user && privateMemberMsg?._id && (
                <div className="w-full bg-teal-400 p-4 rounded-lg text-xl mb-8 flex gap-4">
                    <h1>
                        Your conversation wite{' '}
                        <span className="font-bold uppercase">
                            {privateMemberMsg.name}
                        </span>{' '}
                        room
                    </h1>
                    <img src={privateMemberMsg.picture} alt="Private Member"  className='w-16 h-16'/>
                </div>
            )}
            {!user ? (
                <h1 className="w-full bg-amber-200 p-4 rounded-lg">
                    Login to use the chat
                </h1>
            ) : (
                messages?.map(({ _id: date, messagesByDate }, index) => (
                    <div className="flex flex-col gap-4 pb-24" key={index}>
                        {messagesByDate?.map(
                            ({ content, time, from: sender }, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 items-start"
                                >
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={sender.picture}
                                            alt="Pic"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <p className="text-xs ">
                                            {sender._id == user?._id
                                                ? 'You'
                                                : sender.name}
                                        </p>
                                    </div>

                                    <p>{content}</p>
                                    <p>{time}</p>
                                </div>
                            )
                        )}
                    </div>
                ))
            )}
            <div ref={messageEndRef} />
            <form
                className="absolute bottom-8"
                disabled={!user}
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Type message..."
                    className={inputtw}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className={btntw}>Send</button>
            </form>
        </div>
    );
};

export default MessageForm;

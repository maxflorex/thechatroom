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

    // USEEFFECT - SCROLL TO BOTTOM
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
        <div className="p-8 rounded-3xl relative pb-8 md:pb-16  w-full z-10 backdrop-blur-sm bg-white/30 flex flex-col overflow-auto scrollbar">
            {user && !privateMemberMsg?._id && (
                <h1 className="w-full p-4 rounded-full text-xl mb-8 text-center backdrop-blur-sm bg-indigo-900/60 drop-shadow-md text-white font-thin">
                    You are in the{' '}
                    <span className="font-black uppercase text-amber-300">
                        {currentRooms}
                    </span>{' '}
                    room
                </h1>
            )}
            {user && privateMemberMsg?._id && (
                <div className="w-full p-4 rounded-full text-xl mb-8 text-center backdrop-blur-sm bg-indigo-900/60 drop-shadow-md text-white font-thin flex justify-center">
                    <div className="flex gap-2 items-center">
                        <h1>
                            Your conversation with
                            <span className="font-bold uppercase pl-2 text-amber-300">
                                {privateMemberMsg.name}
                            </span>
                        </h1>
                        <img
                            src={privateMemberMsg.picture}
                            alt="Member"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                </div>
            )}
            {!user ? (
                <h1 className="w-full bg-amber-200 p-4 rounded-lg">
                    Login to use the chat
                </h1>
            ) : (
                messages?.map(({ _id: date, messagesByDate }, index) => (
                    <div
                        className="flex flex-col gap-4 pb-8 md:pb-24 drop-shadow-sm"
                        key={index}
                    >
                        {messagesByDate?.map(
                            ({ content, time, from: sender }, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-2 ${
                                        sender._id == user?._id
                                            ? 'bg-white/60 items-end'
                                            : 'bg-amber-200/60 items-start'
                                    }  p-4 rounded-xl w-full`}
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

                                    <p className="text-xl py-2">{content}</p>
                                    <p className="self-end text-sm">{time}</p>
                                </div>
                            )
                        )}
                    </div>
                ))
            )}
            <div ref={messageEndRef} />
            <form
                className="static bottom-0 w-full flex items-center gap-4"
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

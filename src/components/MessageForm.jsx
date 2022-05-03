import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { btntw, inputtw } from '../Styles/Styles';

const MessageForm = () => {
    const [message, setMessage] = useState('');
    const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
        useContext(AppContext);
    const user = useSelector((state) => state.user);

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

    // FUNCTION - HANDLE SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!message) return;
        const today = new Date();
        const minutes =
            today.getMinutes() < 10
                ? '0' + today.getMinutes()
                : today.getMinutes();
        const time = today.getHours + ':' + minutes;
        const roomId = currentRoom;
        socket.emit('message-room', roomId, message, user, time, todayDate);
        setMessage('');
    };

    return (
        <div className="border-2 w-[100vw] p-8 rounded-lg relative">
            <h1 className="w-full bg-amber-200 p-4 rounded-lg">
                Login to use the chat
            </h1>
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

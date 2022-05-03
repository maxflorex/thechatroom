import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';

const Sidebar = () => {
    const user = useSelector((state) => state.user);
    const {
        socket,
        currentRooms,
        setCurrentRooms,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessages,
        setNewMessages,
        rooms,
        setRooms,
    } = useContext(AppContext);

    useEffect(() => {
        if (user) {
            setCurrentRooms('general');
            getRooms();
            socket.emit('join-room', 'general');
            socket.emit('new-user')
        }
    }, []);

    socket.off('new-user').on('new-user', (payload) => {
        setMembers(payload);
    });

    // FUNCTION - GET ROOMS
    const getRooms = () => {
        fetch('http://localhost:5001/rooms')
            .then((res) => res.json())
            .then((data) => setRooms(data));
    };

    return (
        <div className="border-2 h-[60vh] w-[25vw] p-8 rounded-lg flex flex-col gap-24">
            <ul>
                <h1 className="text-3xl font-semibold">Rooms</h1>
                <hr className="my-8" />
                <li>First One</li>
                <li>Second One</li>
                <li>Third One</li>
            </ul>
            {/* MEMBERS */}
            <ul>
                <h1 className="text-3xl font-semibold">Members</h1>
                <hr className="my-8" />
                {members.map((member, index) => (
                    <div key={index}>
                        <h1>{member.name}</h1>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;

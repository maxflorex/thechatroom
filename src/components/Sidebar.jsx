import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { addNotifications, resetNotifications } from '../features/userSlice';

const Sidebar = () => {
    const user = useSelector((state) => state.user);
    const {
        socket,
        currentRooms,
        setCurrentRooms,
        members,
        setMembers,
        privateMemberMsg,
        setPrivateMemberMsg,
        rooms,
        setRooms,
    } = useContext(AppContext);

    // ALLOWS TO CALL THE NOTIFICATIONS
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setCurrentRooms('general');
            getRooms();
            socket.emit('join-room', 'general');
            socket.emit('new-user');
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

    // FUNCTION - JOIN ROOMS
    const joinRoom = (room, isPublic = true) => {
        // console.log(room);
        if (!user) {
            return alert('Please login');
        }
        socket.emit('join-room', room, currentRooms);
        setCurrentRooms(room);

        if (isPublic) {
            setPrivateMemberMsg(null);
        }
        // DISPATCH FOR NOTIFICATIONS
        dispatch(resetNotifications(room));
    };

    socket.off('notifications').on('notifications', (room) => {
        if (currentRooms !== room) dispatch(addNotifications(room));
    });

    // FUNCTION - ORDER ALPHABETICALLY
    const orderIds = (id1, id2) => {
        if (id1 > id2) {
            return id1 + '-' + id2;
        } else {
            return id2 + '-' + id1;
        }
    };

    // HANDLER - PRIVATE MESSAGES
    const handlePrivateMemberMsg = (member) => {
        setPrivateMemberMsg(member);
        const roomId = orderIds(user._id, member._id);
        joinRoom(roomId, false);
    };

    return (
        <div className="border-2 h-[60vh] w-[25vw] p-8 rounded-lg flex flex-col gap-24">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">Rooms</h1>
                <hr className="my-8" />
                {rooms.map((room, index) => (
                    <div
                        key={index}
                        onClick={() => joinRoom(room)}
                        active={room === currentRooms}
                    >
                        <h1 className="cursive cursor-pointer uppercase font-semibold">
                            {room}
                            {currentRooms !== room && (
                                <span>{user.newMessages[room]}</span>
                            )}
                        </h1>
                    </div>
                ))}
            </div>
            {/* MEMBERS */}
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">Members</h1>
                <hr className="my-8" />
                {members.map((member, index) => (
                    <div
                        key={index}
                        active={privateMemberMsg?._id === member._id}
                        onClick={() => handlePrivateMemberMsg(member)}
                        disabled={member._id === user._id}
                        className="flex gap-2 items-center"
                    >
                        <img
                            src={member.picture}
                            alt="pic"
                            className="rounded-full w-12 h-12"
                        />
                        {member.status === 'online' ? (
                            <h1 className="text-xs p-2 bg-teal-500 rounded-full">
                                Online
                            </h1>
                        ) : (
                            <h1 className="text-xs p-2 bg-amber-400 rounded-full">
                                Offline
                            </h1>
                        )}
                        <h1 className="cursive cursor-pointer uppercase font-semibold">
                            {member.name}
                            <span>
                                {
                                    user.newMessages[
                                        orderIds(member._id, user._id)
                                    ]
                                }
                            </span>
                            {member._id === user?._id && '(You)'}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

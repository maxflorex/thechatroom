import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../context/appContext';
import { addNotifications, resetNotifications } from '../features/userSlice';

const Sidebar = () => {
    const [showRooms, setShowRooms] = useState(true);
    const [showMembers, setShowMembers] = useState(true);

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
        fetch('https://thechatroombymax.herokuapp.com/rooms')
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
        <div className=" w-full md:w-96 md:p-8 p-4 rounded-3xl flex flex-col md:gap-24 gap-4 overflow-auto backdrop-blur-sm bg-white/30 min-h-[25vh] items-center justify-center scrollbar">
            <div className="flex flex-col gap-4">
                <h1
                    className="text-xl md:text-4xl font-black text-center md:text-left w-full bg-white/30 md:bg-transparent rounded-full cursor-pointer  py-2 px-4"
                    onClick={() => setShowRooms(!showRooms)}
                >
                    Rooms
                </h1>
                {showRooms === true && (
                    <div className="md:grid-cols-1 grid grid-cols-4 gap-4">
                        <hr className="my-6 hidden md:block" />
                        {rooms.map((room, index) => (
                            <div
                                key={index}
                                onClick={() => joinRoom(room)}
                                active={room === currentRooms}
                                className="hover:bg-white/80 p-2 hover:rounded-xl hover:scale-110 active:scale-100"
                            >
                                <h1 className="cursive cursor-pointer capitalize font-thin text-normal md:text-2xl text-center md:text-left">
                                    {room}
                                    {currentRooms !== room && (
                                        <span>{user.newMessages[room]}</span>
                                    )}
                                </h1>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* MEMBERS */}
            <div className="flex flex-col gap-4">
                <h1
                    className="text-xl md:text-4xl font-semibold text-center md:text-left bg-white/30 md:bg-transparent rounded-full cursor-pointer py-2 px-4"
                    onClick={() => setShowMembers(!showMembers)}
                >
                    Members
                </h1>
                {showMembers && (
                    <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
                        <hr className="mt-6 hidden md:block" />
                        {members.map((member, index) => (
                            <div
                                key={index}
                                active={privateMemberMsg?._id === member._id}
                                onClick={() => handlePrivateMemberMsg(member)}
                                disabled={member._id === user._id}
                                className="flex gap-2 items-center hover:bg-white/80 p-2 hover:rounded-xl hover:scale-110 active:scale-100 content-center"
                            >
                                <img
                                    src={member.picture}
                                    alt="pic"
                                    className="rounded-full w-8 h-8 hover:scale-150 object-cover"
                                />
                                <h1 className="cursive cursor-pointer capitalize font-thin text-normal md:text-2xl text-center md:text-left ">
                                    {member.name}
                                    <span className="pl-2 md:text-sm text-xs hidden md:block">
                                        {member._id === user?._id && '(You)'}
                                    </span>
                                </h1>
                                {user.newMessages[
                                    orderIds(member._id, user._id)
                                ] > 0 && (
                                    <h1 className="bg-red-600 text-sm text-white m-auto rounded-full py-2 px-3">
                                        {
                                            user.newMessages[
                                                orderIds(member._id, user._id)
                                            ]
                                        }
                                    </h1>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

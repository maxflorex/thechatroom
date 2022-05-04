import React from 'react';
import { Link } from 'react-router-dom';
import { RiChatSmile2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { linktw } from '../Styles/Styles';
import { useLogoutUserMutation } from '../services/appApi';

const Navigation = () => {
    const [logoutUser] = useLogoutUserMutation();

    // GET USER STATE FROM REDUX
    const user = useSelector((state) => state.user);

    // FUNCTION - LOGOUT
    const handleLogout = async (e) => {
        e.preventDefault();
        await logoutUser(user);
        // REDIRECT TO HOMEPAGE
        window.location.replace('/');
    };

    return (
        <div className="bg-slate-300 p-8 h-[6vh]">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <RiChatSmile2Fill className="text-3xl" />
                </Link>
                <div className="flex gap-4 items-center">
                    <Link to="/chat">Chat</Link>
                    {!user ? (
                        <>
                            <Link to="/login">Login</Link>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-4 items-center ">
                                <img
                                    src={user.picture}
                                    className="w-8 h-8 rounded-full"
                                />
                                <h3 className="font-semibold">
                                    Hello, {user.name}
                                </h3>
                            </div>
                        </>
                    )}
                    {user && (
                        <span className={linktw} onClick={handleLogout}>
                            Logout
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navigation;

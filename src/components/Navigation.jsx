import React from 'react';
import { Link } from 'react-router-dom';
import { RiChatSmile2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { linktw } from '../Styles/Styles';
import { useLoginUserMutation } from '../services/appApi';

const Navigation = () => {
    const [logoutUser] = useLoginUserMutation();
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
        <div className="bg-slate-300 p-8">
            <div className="container mx-auto flex justify-between">
                <RiChatSmile2Fill className="text-3xl" />
                <div className="flex gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/chat">Chat</Link>
                    {!user ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-4 ">
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

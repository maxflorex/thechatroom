import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { linkstw, linktw2 } from '../Styles/Styles';
import { useLogoutUserMutation } from '../services/appApi';
import model1 from '../assets/Other 02.png';
import { motion } from 'framer-motion';

const Navigation = () => {
    const [logoutUser] = useLogoutUserMutation();
    const [showLogout, setShowLogout] = useState(false);

    // GET USER STATE FROM REDUX
    const user = useSelector((state) => state.user);

    // FUNCTION - LOGOUT
    const handleLogout = async (e) => {
        e.preventDefault();
        await logoutUser(user);
        // REDIRECT TO HOMEPAGE
        window.location.replace('/');
    };

    // FUNCTION - TIME INTERVAL FOR LOGOUT DROPDOWN
    useEffect(() => {
        const interval = setInterval(() => {
            setShowLogout(false);
        }, 5000);
        return () => clearInterval(interval);
    }, [showLogout]);

    return (
        <motion.div
            className="absolute w-[100vw] z-50" 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 1, opacity: 1 }}
            transition={{ ease: 'easeInOut', delay: 0.3 }}
        >
            <div className="p-8 h-[6vh] mx-auto">
                <div className="flex justify-between items-center">
                    {/* LOGO */}
                    <Link to="/">
                        <div className="flex gap-2 items-center">
                            <img src={model1} alt="logo" className="w-24" />
                            <h1 className="font-bold text-3xl  hover:scale-110 md:block hidden">
                                The Chatroom
                            </h1>
                        </div>
                    </Link>
                    {/* MENU */}
                    <div className="flex gap-8 items-center">
                        <Link to="/contact" className={linkstw}>
                            Get in touch
                        </Link>
                        {!user ? (
                            <>
                                <Link to="/login" className={linktw2}>
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                <div
                                    className="flex gap-4 items-center p-4 bg-white rounded-full cursor-pointer"
                                    onClick={() => setShowLogout(!showLogout)}
                                >
                                    <img
                                        src={user.picture}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <h3 className="font-semibold text-sm md:text-xl">
                                        Hello, {user.name}
                                    </h3>
                                    {user && showLogout && (
                                        <motion.span
                                            className="absolute text-xl -bottom-32 right-auto left-auto font-bold p-4 bg-amber-200 rounded-full hover:bg-amber-500"
                                            onClick={handleLogout}
                                            initial={{
                                                scale: 0,
                                                y: -1,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                scale: 1,
                                                y: 0,
                                                opacity: 1,
                                            }}
                                            transition={{
                                                ease: 'easeOut',
                                                duration: 0,
                                            }}
                                        >
                                            Logout
                                        </motion.span>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navigation;

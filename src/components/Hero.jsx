import React from 'react';
import bg from '../assets/Other 20.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { linktw2 } from '../Styles/Styles';

const Hero = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className="grid grid-cols-2 content-center place-content-center w-[90vw] mx-auto pt-[6vh] h-[100vh]">
            <div className="flex flex-col justify-center items-start p-16 leading-loose gap-8 col-span-2 md:col-span-1">
                <motion.h1
                    className="text-8xl font-bold"
                    initial={{ x: '100vw', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ ease: 'easeOut', delay: 0 }}
                >
                    <span className="text-white font-extrabold text-8xl drop-shadow-md">
                        Stay Connected
                    </span>
                    <br />
                    With Your Friends
                </motion.h1>
                <motion.p
                    className="text-2xl italic"
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ ease: 'easeOut', delay: 1 }}
                >
                    The Chatroom let you connect with the world
                </motion.p>
                <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        ease: 'easeOut',
                        delay: 2,
                        type: 'spring',
                    }}
                >
                    <span className={linktw2}>
                        {!user ? (
                            <Link to="/signup">Sign up now!</Link>
                        ) : (
                            <Link to="/chat">Start a chat</Link>
                        )}
                    </span>
                </motion.div>
            </div>
            <motion.img
                src={bg}
                alt="background"
                initial={{ scale: 0, y: '120%', opacity: 0 }}
                animate={{ scale: 1, y: '0%', opacity: 1 }}
                transition={{ ease: 'easeOut', delay: 0 }}
                className="drop-shadow-sm 2xl:p-32 hidden md:block"
            />
        </div>
    );
};

export default Hero;

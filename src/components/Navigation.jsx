import React from 'react';
import { Link } from 'react-router-dom';
import { RiChatSmile2Fill } from 'react-icons/ri';

const Navigation = () => {
    return (
        <div className="bg-slate-300 p-8">
            <div className="container mx-auto flex justify-between">
                <RiChatSmile2Fill className='text-3xl'/>
                <div className="flex gap-4">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;

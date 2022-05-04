import React from 'react';

const Hero = () => {
    return (
        <div className="grid grid-cols-2 content-center place-content-center">
            <div className="flex flex-col justify-center items-start p-16 leading-loose">
                <h1 className="text-3xl uppercase font-bold leading-relaxed">
                    <span className="text-teal-500 font-normal leading-relaxed">
                        Share the world
                    </span>{' '}
                    with your friends
                </h1>
                <p className="text-xl italic">
                    The Chatroom let you connect with the world
                </p>
                <a href='/chat' className="mt-4 bg-slate-300 p-4 rounded-lg hover:bg-slate-900 hover:text-white duration-500 cursor-pointer">
                    Get Started
                </a>
            </div>
            <div className="bg-slate-500 h-[94vh] w-100vh] bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2371&q=80')] bg-cover bg-center"></div>
        </div>
    );
};

export default Hero;

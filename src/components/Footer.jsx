import React from 'react';

const Footer = () => {
    return (
        <footer className="flex justify-center p-2 absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <h1 className='text-xs md:text-base'>
                Project made with ❤️ by{' '}
                <a href="https://maxflores.dev" target="_blank">
                    Max Flores
                </a>
            </h1>
        </footer>
    );
};

export default Footer;

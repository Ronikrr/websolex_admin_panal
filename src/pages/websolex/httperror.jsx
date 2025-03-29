import React from 'react';
import un from '../../assets/img/401 Error Unauthorized-rafiki.svg'
import { Link } from 'react-router-dom';
const UnauthorizedPage = () => {
    return (
        <div className="flex items-center justify-center h-screen m-0 bg-gray-100">
            <div className="w-full p-10 text-center ">
                
                <img src={un} loading='lazy' className='w-[600px] h-[600px] object-cover aspect-square mx-auto ' alt="" />
                <p className="mt-4 text-[30px] font-bold text-gray-600 capitalize ">The website server is down. <br /> Please come back after a few minutes.</p>
                <div className="mt-6 space-x-4">
                    <Link
                        to="/"
                        className="inline-block px-6 py-2 text-lg text-white bg-[var(--primary-color)] rounded-lg hover:bg-blue-400"
                    >
                        Go to Login
                    </Link>
                  
                </div>
            </div>
        </div>
    );
}

export default UnauthorizedPage;

import React from 'react'
import { Link } from 'react-router-dom'
import Notfound_iamge from '../assets/img/404.png';
const Notfound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-screen gap-5 ">
                <Link className=' w-full lg:w-[1200px] mx-auto h-full lg:h-[600px] overflow-hidden' to="/">

                    <div className="container w-full h-full mx-auto ">
                        <div className="flex flex-wrap px-[15px] w-full  h-full">
                            <div className="w-full h-full ">
                                <img src={Notfound_iamge} className='object-contain w-full h-full aspect-square' alt="" />
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="w-full lg:w-[1200px] mx-auto flex justify-center">
                    <Link to="/" className='px-6 py-4 font-semibold text-white uppercase bg-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-100 hover:text-blue-600 '   > go to dashboard </Link>
                </div>
            </div>

        </>
    )
}

export default Notfound
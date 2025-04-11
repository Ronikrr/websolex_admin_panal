import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiNotification2Line } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import Logoutmodel from "../ui/logoutmodel";
import { useSelector } from "react-redux";
const Header = ({ toogleslidebar }) => {
    const {user} = useSelector((state) => state?.auth?.user);
    const [isopen, setisopen] = useState(false);
    const [isuser, setisuseropen] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [isModelOpen, setisModelOpen] = useState(false);
    const handleOnClickOpenModel = () => {
        setisModelOpen(!isModelOpen);
    };
    if (!user) {
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?query=${encodeURIComponent(search)}`);
        }
    };


    const logout = () => {
        localStorage.removeItem("Admintoken_websolex");
        navigate("/");
    };

    const toggledropdown = () => {
        setisopen(!isopen);
        // setismessageopen(false);
        setisuseropen(false);
    };


    const isuseropen = () => {
        setisuseropen(!isuser);
        setisopen(false);
        // setismessageopen(false);
    };


    useEffect(() => {
        setTimeout(() => {
            setisopen(false);
            // setismessageopen(false);
            setisuseropen(false);
        }, 3000);
    }, []);

    return (
        <div className="h-[80px] w-screen md:w-full flex px-5 lg:px-11 py-4  items-center justify-center bg-[#fff]"  >
         
            <Logoutmodel
                isOpen={isModelOpen}
                onClose={() => setisModelOpen(false)}
                onConfirm={logout}
            />

            <div className="flex items-center justify-between w-full lg:justify-between">
                <div className="main_bars xl:hidden ">
                    <FaBars className="cursor-pointer " onClick={toogleslidebar} />
                </div>
                <div className="flex items-center space-x-3 search">
                    <div className="relative flex items-center gap-2">

                        <form onSubmit={handleSubmit} >
                            <input type="search" name='search' value={search} onChange={(e) => setSearch(e.target.value)} className="py-2 px-3 rounded-lg bg-[#f1f5f9] " placeholder="Search..." />
                        </form>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ul className="flex items-center gap-4">

                        <li className="relative">
                            <Link
                                className="w-[33.99px] relative h-[33.99px] rounded-full flex items-center justify-center border border-[0.5px] border-[rgba(226,232,240,1)] bg-[rgba(239,244,251,1)]"
                                onClick={toggledropdown}
                            >
                                <RiNotification2Line />
                                <div className="absolute w-[10px] h-[10px] bg-red-500 rounded-full right-0 top-0"></div>
                            </Link>
                            {isopen && (
                                <div className="absolute flex flex-col block mt-2 bg-white border rounded-sm -right-27 h-90 w-75 border-stroke shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80">
                                    <div className="px-5 py-3">
                                        <h5 className="text-sm font-medium text-[#8a99af]">
                                            Notification
                                        </h5>
                                    </div>
                                    <ul className="flex flex-col h-auto px-5 pb-4 overflow-y-auto">
                                        <li>
                                            <Link className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                                                <p className="text-sm">
                                                    <span className="">
                                                        Edit your information in a swipe
                                                    </span>
                                                    Sint occaecat cupidatat non proident, sunt in culpa
                                                    qui officia deserunt mollit anim.
                                                </p>
                                                <p className="text-xs">12 May, 2025</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li className="flex-col hidden lg:flex">
                            <p className="capitalize" >{user?.name}</p>
                            <p>{user?.email}</p>
                        </li>
                    </ul>
                    <div className="relative">
                        <Link className="flex items-center gap-4" onClick={isuseropen}>
                            <span className="relative w-12 h-12 rounded-full">
                                {user?.profileImage == null ? (
                                    <img
                                        src="https://www.t3bucket.com/f/0-user.svg"
                                        alt="Profile"
                                        className="object-cover w-12 h-12 rounded-full"
                                        loading="lazy"
                                    />
                                ) : (
                                    <img
                                        src={user?.profileImage}
                                        alt="Profile"
                                        className="object-cover w-12 h-12 rounded-full"
                                            loading="lazy"
                                    />
                                )}
                             
                            </span>
                        </Link>
                        {isuser && (
                            <div className="absolute right-0 flex flex-col block z-[1000] mt-4 bg-white border rounded-sm w-[15.625rem] border-stroke shadow-default ">
                                <ul className="flex flex-col gap-5 px-6 border-b border-stroke py-7  text-[#64748b]">
                                    <li className="w-full">
                                        <Link
                                            to="/profile"
                                            className="flex items-center w-full gap-3 text-sm font-medium capitalize duration-300 ease-in-out hover:text-blue-400 lg:text-base"
                                        >
                                            <CiUser className="text-[22px]" /> my profile
                                        </Link>
                                    </li>

                                    <li
                                        className="w-full"

                                    >
                                        <Link className="flex items-center w-full gap-3 text-sm font-medium capitalize duration-300 ease-in-out hover:text-blue-400 lg:text-base"
                                            onClick={
                                                handleOnClickOpenModel
                                            }>
                                            <TbLogin2 className="text-[22px]" /> logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;

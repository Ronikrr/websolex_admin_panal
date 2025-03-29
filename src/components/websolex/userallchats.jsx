
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../ui/breadcrumb'
import Input from '../ui/input'
import { CiSearch } from 'react-icons/ci';
import { MdAttachFile } from "react-icons/md";
import { IoMdHappy } from 'react-icons/io';
import { BsSend } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import defaultim from '../../assets/img/rb_859.png'

const Userallchats = () => {
    const [User, setUsers] = useState({ users: [] }); // Initialize as an object with 'users' as an empty array.
    const [error, seterror] = useState(null);
    const [activeChat, setactiveChat] = useState(null);
    const [message, setmessage] = useState([]);
    const navigate = useNavigate();

    const handleuserclick = (user) => {
        setactiveChat(user);
        setmessage([
            { sender: 'user', text: "hi there!", time: "2:00 PM" },
            { sender: 'self', text: "Hello! How can I help?", time: "2:05 PM" },
        ]);
    };

    const handlesendmessage = (e) => {
        e.preventDefault();
        const messageInput = e.target.message.value;
        if (messageInput.trim() !== '') {
            setmessage((prevmessage) => [
                ...prevmessage,
                { sender: 'self', text: messageInput, time: new Date().toLocaleTimeString() },
            ]);
            e.target.reset();
        }
    };

    useEffect(() => {
        const Admintoken_websolex = localStorage.getItem('Admintoken_websolex');
        if (!Admintoken_websolex) {
            navigate('/');
            return;
        }

        const fetchUsers = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/users', {
                    method: 'GET',
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    seterror(errorText);
                } else {
                    const data = await res.json();
                    setUsers(data); // Ensure the API returns the correct structure.
                }
            } catch (err) {
                console.error('Error fetching users:', err);
                seterror('Failed to fetch users');
            }
        };

        fetchUsers();
    }, [navigate]);

    if (!User.users.length && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full bg-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h1 className="capitalize text-[26px] font-semibold">team page</h1>
                <Breadcrumb />
            </div>

            <div className="flex items-start w-full bg-white rounded-md shadow-md mb-7">
                {/* Sidebar */}
                <div className="sticky top-0 w-3/12">
                    <div className="flex sticky top-0 items-center px-6 py-7 border-b border-[var(--border-color)]">
                        <h3 className="text-lg font-semibold text-black">Active Conversations</h3>
                        <span className="ml-4 text-base text-black bg-[#f7f9fc] py-[.125rem] px-2 rounded-md">
                            {User.users.length}
                        </span>
                    </div>
                    <div className="flex flex-col max-h-full p-5 overflow-auto no-scrollbar">
                        <form action="" className="sticky top-0 mb-7">
                            <div className="relative">
                                <Input placeholder={'Search...'} />
                                <button className="absolute cursor-pointer top-4 right-4">
                                    <CiSearch />
                                </button>
                            </div>
                        </form>
                        <div className="h-full max-h-full no-scrollbar space-y-2.5 overflow-auto">
                            {User.users.map((user) => {
                                const profileImage = user.profileImage
                                    ? user.profileImage
                                    : 'https://www.t3bucket.com/f/0-user.svg';
                                return (
                                    <div
                                        key={user.id}
                                        onClick={() => handleuserclick(user)}
                                        className={`flex items-center px-4 py-2 rounded cursor-pointer gap-3.5 ${activeChat?.id === user.id
                                            ? ''
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="relative w-16 h-12">
                                            {user.profileImage && (
                                                <img loading='lazy'
                                                    src={profileImage}
                                                    className="object-cover object-center w-full h-full rounded-full aspect-square"
                                                    alt={user.name}
                                                />
                                            )}
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></span>
                                        </div>
                                        <div className="w-full">
                                            <h5 className="text-sm font-semibold text-black">
                                                {user.name}
                                            </h5>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Chat Box */}
                <div className="w-9/12 border-l  border-[var(--border-color)]">
                    {activeChat ? (
                        <>
                            {/* Chat Header */}
                            <div className="flex sticky top-0 bg-white items-center justify-between px-6 py-7 border-b border-[var(--border-color)]">
                                <div className="flex items-center">
                                    <div className="mr-[1.125rem] h-12 w-12 max-w-12 overflow-hidden rounded-full">
                                        <img loading='lazy'
                                            src={activeChat.profileImage
                                                ? activeChat.profileImage
                                                : defaultim}
                                            className="object-cover object-center w-full h-full"
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-semibold text-black">
                                            {activeChat.name}
                                        </h5>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="max-h-[100vh] space-y-3.5 overflow-auto px-6 py-[1.875rem]">
                                {message.map((msg, index) => (
                                    <div
                                        className={`max-w-[31.25rem] ${msg.sender === 'self' ? 'ml-auto text-right' : ''
                                            }`}
                                        key={index}
                                    >
                                        <div
                                            className={`mb-2.5 py-3 px-5 rounded-2xl ${msg.sender === 'self'
                                                ? 'rounded-br-none bg-[var(--primary-color)] text-white'
                                                : 'rounded-tl-none bg-gray-100'
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                        </div>
                                        <p className="text-xs">{msg.time}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Input Box */}
                            <div className="sticky bottom-0 border-t border-[var(--border-color)] bg-white py-5 px-6 hidden-overflow">
                                <form
                                    className="flex items-center justify-between space-x-4"
                                    onSubmit={handlesendmessage}
                                >
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            name="message"
                                            className="w-full pl-5 py-3 pr-20 text-black bg-[rgb(239,244,251)] border rounded-md outline-none h-13 border-[var(--border-color)] placeholder-body focus:border focus:border-[var(--primary-color)]"
                                            placeholder="type something here"
                                        />
                                        <div className="absolute inline-flex items-center justify-end space-x-4 cursor-pointer top-4 right-5">
                                            <button className="hover:text-[var(--primary-color)]">
                                                <MdAttachFile />
                                            </button>
                                            <button className="hover:text-[var(--primary-color)]">
                                                <IoMdHappy />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="flex w-12 h-12 bg-[var(--primary-color)] hover:opacity-90 items-center justify-center rounded-md text-white">
                                        <BsSend />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p>Select a user to start a conversation</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Userallchats;

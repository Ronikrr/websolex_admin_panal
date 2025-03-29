
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Section_three = () => {
    const [isopen, setisopen] = useState(false);

    const handleonclick = () => {
        setisopen(!isopen);
    }
    const leads = [
        {
            name: "Google",
            visiter: "9500",
            revenues: "5825",
            duration: "4.8%",
            sales: "590",
            status: "Lost Lead",
            statusColor: "bg-red-100 text-red-500",
            image: "https://react-demo.tailadmin.com/assets/brand-01-10b0313f.svg",
        },
        {
            name: "Twitter",
            visiter: "500",
            revenues: "-222",
            duration: "4.8%",
            sales: "467",
            status: "Active",
            statusColor: "bg-green-100 text-green-500",
            image: "https://react-demo.tailadmin.com/assets/brand-02-31d534b8.svg",
        },
        {
            name: "Youtube",
            visiter: "5000",
            revenues: "6565",
            duration: "4.8%",
            sales: "420",
            status: "Active",
            statusColor: "bg-green-100 text-green-500",
            image: "https://react-demo.tailadmin.com/assets/brand-06-205212ad.svg",
        },
        {
            name: "Vimeo",
            visiter: "6000",
            revenues: "9898",
            duration: "4.8%",
            sales: "389",
            status: "Active",
            statusColor: "bg-green-100 text-green-500",
            image: "https://react-demo.tailadmin.com/assets/brand-04-1c41292a.svg",
        },
        {
            name: "Facebook",
            visiter: "3500",
            revenues: "-555",
            duration: "4.8%",
            sales: "390",
            status: "Lost Lead",
            statusColor: "bg-red-100 text-red-500",
            image: "https://react-demo.tailadmin.com/assets/brand-05-b51c44b2.svg",
        },
    ];

    const users = [
        {
            id: 1,
            profile: "https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png",
            name: "Devid Heilo",
            message: "How are you?",
            mins: "12min",
            messages_count: "3",
            status: "online",
        },
        {
            id: 2,
            profile: "https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png",
            name: "Devid Heilo",
            message: "How are you?",
            mins: "12min",
            messages_count: "3",
            status: "online",
        },
        {
            id: 3,
            profile: "https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png",
            name: "Devid Heilo",
            message: "How are you?",
            mins: "12min",
            messages_count: "3",
            status: "online",
        },
        {
            id: 4,
            profile: "https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png",
            name: "Devid Heilo",
            message: "How are you?",
            mins: "12min",
            messages_count: "3",
            status: "offline",
        },
        {
            id: 5,
            profile: "https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png",
            name: "Devid Heilo",
            message: "How are you?",
            mins: "12min",
            messages_count: "3",
            status: "offline",
        },
        {
            id: 6,
            profile: "https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png",
            name: "Devid Heilo",
            message: "How are you?",
            mins: "12min",
            messages_count: "3",
            status: "offline",
        }
    ]

    return (
        <div className="mb-7 flex flex-col xl:flex-row items-center gap-4 md:gap-6 2xl:gap-7.5">
            <div className="w-full xl:w-4/12 mb-7 xl:mb-0 ">
                <div className="bg-white border rounded-md border border-[var(--border-color)] shadow-md">
                    <div className="flex flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="">
                            <h2 className="text-[22px] font-semibold capitalize text-[rgb(28,36,52)]">
                                Chats
                            </h2>

                        </div>
                    </div>
                    <div className="w-full ">
                        {users.map((item, id) => {
                            return (
                                <a className="flex items-center gap-5 py-3 px-7 hover:bg-[rgb(250,250,250)] dark:hover:bg-meta-4" key={id} href="/">
                                    <div className="relative rounded-full h-14 w-14">
                                        <img loading='lazy' src={item.profile} alt="" />
                                        <div className={`absolute right-0 bottom-0 h-3.5  ${item.status === "online" ? "bg-[rgb(16,185,129)]" : "bg-[rgb(255,5,5)]"}  w-3.5 rounded-full border-2 border-white`}></div>
                                    </div>
                                    <div className="flex items-center justify-between flex-1">
                                        <div className="">
                                            <h5 className="font-medium text-black " > {item.name} </h5>
                                            <p>
                                                <span className="text-sm text-black " > {item.message} </span>
                                                <span className="text-xs text-[#64748b] " >. {item.mins}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center w-6 h-6 bg-blue-400 rounded-full">
                                            <span className="text-sm font-medium text-white">{item.messages_count}</span>
                                        </div>
                                    </div>
                                </a>
                            )
                        })}



                    </div>
                </div>
            </div>



            <div className="w-full bg-white rounded-md shadow-md xl:w-[62.5%] ">
                <div className="px-5 pt-6 overflow-hidden pb-2.5 sm:px-7 xl:pb-1 ">
                    <div className="flex flex-col gap-2 mb-7 sm:flex-row sm:items-center sm:justify-between">
                        <div className="">
                            <h2 className="text-[22px] mb-1.5 capitalize  font-bold text-[rgb(28,36,52)]">
                                Top channels
                            </h2>

                        </div>
                        <div className="flex items-center">
                            <div className="relative cursor-pointer ">
                                <PiDotsThreeOutlineFill className='text-[#98A6AD] hover:text-black ' onClick={handleonclick} />
                                {isopen && (
                                    <div className="absolute right-0 z-40 w-40 p-1 space-y-1 bg-white border rounded-sm shadow-sm top-full border-stroke">
                                        <button className='flex w-full capitalize items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4' >
                                            <FaRegEdit /> edit
                                        </button>
                                        <button className='flex w-full capitalize items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4' >
                                            <RiDeleteBin6Line />  delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        {/* Header */}
                        <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                            <div className="p-2.5 xl:p-5 flex-1">Source</div>
                            <div className="p-2.5 xl:p-5 flex-1">Visitors</div>
                            <div className="p-2.5 xl:p-5 flex-1">Revenues</div>
                            <div className="p-2.5 xl:p-5 flex-1 hidden md:flex justify-center">Sales</div>
                            <div className="p-2.5 xl:p-5 flex-1 hidden md:flex justify-center">Conversion</div>
                        </div>

                        {/* Body */}
                        <div className="divide-y divide-gray-200">
                            {leads.map((lead, index) => {

                                const revenues = (lead.sales / lead.visiter) * 100
                                const rev = Math.floor(revenues * 100) / 100
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center w-full py-1 transition duration-150 border-t hover:bg-gray-50"
                                    >
                                        {/* Source */}
                                        <div className="p-2.5 xl:p-4 flex items-center flex-1">
                                            <img
                                                loading='lazy'
                                                src={lead.image}
                                                alt={lead.name}
                                                className="w-10 h-10 mr-3 rounded-full"
                                            />
                                            <span className="hidden md:block">{lead.name}</span>
                                        </div>

                                        {/* Visitors */}
                                        <div className="p-2.5 text-center xl:p-4 text-gray-700 flex-1">
                                            {lead.visiter}
                                        </div>

                                        {/* Revenues */}
                                        <div
                                            className={`p-2.5 text-center xl:p-4 flex-1 ${lead.revenues.startsWith('-') ? 'text-red-500' : 'text-green-500'
                                                }`}
                                        >
                                            Rs{lead.revenues}
                                        </div>

                                        {/* Sales */}
                                        <div className="p-2.5 text-center xl:p-4 hidden md:flex justify-center flex-1">
                                            {lead.sales}
                                        </div>

                                        {/* Conversion */}
                                        <div className="p-2.5 text-center xl:p-4 text-blue-400 hidden md:flex justify-center flex-1">
                                            {rev}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Section_three;

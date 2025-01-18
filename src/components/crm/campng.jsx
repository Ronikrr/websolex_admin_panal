import React, { useState } from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { TfiTimer } from "react-icons/tfi";

import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
// Register the ChartJS components
import { MdOutlineCalendarMonth } from "react-icons/md";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const Campng = () => {
    const [isopen, setisopen] = useState(false);

    const handleonclick = () => {
        setisopen(!isopen);
    }

    // Chart data
    const data = {
        labels: ["M", "T", "W", "T", "F", "S", "S"], // Days of the week
        datasets: [
            {
                label: "Dataset 1",
                data: [300, 400, 250, 300, 200, 200, 200],
                backgroundColor: "#4F46E5", // Dark blue
                barPercentage: 0.6,
            },
            {
                label: "Dataset 2",
                data: [350, 300, 300, 200, 200, 250, 250],
                backgroundColor: "#93C5FD", // Light blue
                barPercentage: 0.6,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide grid lines on X-axis
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "#E5E7EB", // Light gray grid lines
                },
                ticks: {
                    stepSize: 100, // Increment ticks by 100
                },
            },
        },
    };
    const todolist = [
        {
            id: 1,
            logo: "https://react-demo.tailadmin.com/assets/uideck-d5b949ad.svg",
            title: "Uideck Yearly Meetings",
            time: "10:20 AM - 3:00 PM",
            date: "14 February,2025",
            color: "bg-[#10b98114]",
            text_color:"text-[rgb(16,185,129)]",
            status: "Completed",
        },
        {
            id: 2,
            logo: "https://react-demo.tailadmin.com/assets/uideck-d5b949ad.svg",
            title: "Uideck Yearly Meetings",
            time: "10:20 AM - 3:00 PM",
            date: "14 February,2025",
            color: "bg-[#3c50e014]",
            text_color: "text-[var(--primary-color)]",
            status: "upcoming",
        },
        {
            id: 3,
            logo: "https://react-demo.tailadmin.com/assets/uideck-d5b949ad.svg",
            title: "to do list",
            time: "10:20 AM - 3:00 PM",
            date: "14 February,2025",
           
            color: "bg-[#fb545414]",
            text_color: "text-[#fb5454]",
            status: "Canceled",
        }

    ]
    
    return (
        <div className='flex flex-col items-center gap-4 xl:flex-row mt-7 md:gap-6 2xl:gap-7' >
            <div className="w-full xl:w-5/12">
                <div className="bg-white border rounded-sm border border-[--border-color] shadow-default">
                    <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="">
                            <h2 className="text-[22px] font-semibold capitalize text-[rgb(28,36,52)]">
                                Campaigns
                            </h2>
                        </div>
                        <div className="flex items-center">
                            <p className="font-normal text-black uppercase">Short By</p>
                            <div className="relative z-10 inline-block">
                                <select
                                    name=""
                                    className="relative z-20 inline-flex py-1 pl-3 pr-8 font-normal bg-transparent outline-none appearance-none"
                                    id=""
                                >
                                    <option value="">Current Week</option>
                                    <option value="">Last Week</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-6 pt-4 ">
                        <Bar data={data} options={options} />
                    </div>
                </div>
            </div>
            <div className="w-full xl:w-7/12">
                <div className="bg-white border rounded-sm shadow-default">
                    <div className="flex flex-col gap-2 px-6 py-4 border-b border-[--border-color] sm:flex-row sm:items-center sm:justify-between">
                        <div className="">
                            <h2 className="text-[22px] font-semibold capitalize text-[rgb(28,36,52)]">
                                to do list
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
                    <div className="px-4 py-4 md:py-6 xl:px-7">
                        <div className="flex flex-col gap-1">
                                {todolist.map((item, id) => (
                                    <div className="flex items-center justify-between" key={item.id} >
                                        <div className="flex flex-grow gap-4 item-center">
                                            <div className="w-16 h-16 flex items-center justify-center rounded-full border border-[--border-color]  ">
                                                <img src={item.logo} alt="" />
                                            </div>
                                            <div className="">
                                                <h4 className='mb-2 font-medium text-black ' >{ item.title }</h4>
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
                                                    <div className="flex items-center gap-1.5"> <TfiTimer />
                                                        <span className='text-xs font-normal' > {item.time} </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <MdOutlineCalendarMonth />
                                                        <span className='text-xs font-normal' > {item.date} </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`py-1.5 px-2.5 text-sm capitalize rounded-lg font-normal ${item.color} ${item.text_color} `} >{ item.status }</span>
                                    </div>
                                )) }
                           
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Campng

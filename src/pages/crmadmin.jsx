import React from "react";
import Crmsection from "../components/crm/crmsection";
import Table from "../components/crm/table";
import Campng from "../components/crm/campng";
// Circular Progress Component
const CircularProgress = ({ percentage, color }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;

    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width="100" height="100" className="inline-block">
            <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="5"
                fill="transparent"
            />
            <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={color}
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
            />
        </svg>
    );
};

// Card Component
const StatCard = ({ value, title, percentage, change, color }) => {
    return (
        <div className="flex items-center justify-between w-full bg-white rounded-lg shadow-md p-7 lg:p-5 2xl:p-7 ">
            <div className="w-6/12" >
                <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
                <p className="text-sm text-gray-500">{title}</p>
                <div
                    className={`mt-2 flex items-center flex-col xl:flex-row text-sm ${change > 0 ? "text-green-500" : "text-red-500"
                        }`}
                >
                    <span
                        className={`px-2 py-1 rounded-full ${change > 0 ? "bg-green-100" : "bg-red-100"
                            }`}
                    >
                        {change > 0 ? `+${change}%` : `${change}%`}
                    </span>
                    <span className="ml-2 text-gray-500">Since last week</span>
                </div>
            </div>
            <div className="flex justify-center w-6/12" >
                <CircularProgress percentage={percentage} color={color} />
            </div>
        </div>
    );
};

// Main Dashboard Component
const Dashboard = () => {
    const stats = [
        {
            value: 197,
            title: "Clients Added",
            percentage: 70, // Percentage is present
            change: 2.5,
            color: "#4F46E5",
        },
        {
            value: 745,
            title: "Contracts Signed",
            percentage: 45, // Percentage is present
            change: -1.5,
            color: "#4F46E5",
        },
        {
            value: 512,
            title: "Invoice Sent",
            percentage: 60, // Percentage is present
            change: 0.5,
            color: "#4F46E5",
        },
    ];


    return (
        <div className="p-5 lg:p-[0.5rem] 2xl:p-10 ">
            <div className="">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div className="">
                        <h2 className="text-[22px] font-bold text-[rgb(28,36,52)]">
                            This Week’s Overview
                        </h2>
                    </div>
                    <div className="flex items-center">
                        <p className="font-medium text-black uppercase">Short By</p>
                        <div className="relative z-10 inline-block">
                            <select
                                name=""
                                className="relative z-20 inline-flex py-1 pl-3 pr-8 font-medium bg-transparent outline-none appearance-none"
                                id=""
                            >
                                <option value="">Current Week</option>
                                <option value="">Last Week</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="2xl:gap-7.5 flex flex-col lg:flex-row gap-4  md:gap-6 ">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
                </div>
            </div>


            <Crmsection />
            <Table />
            <Campng/>
        </div>
         
    );
};

export default Dashboard;


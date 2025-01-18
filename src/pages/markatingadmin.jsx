import React, { useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaChartBarSolid } from "react-icons/lia";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaCoinsSolid } from "react-icons/lia";
import Marktingtable from "../components/markting/marktingtable";
import Channlvisiter from "../components/markting/channlvisiter";
const StatCard = ({ value, title, percentage, change, color, icon }) => {
  return (
    <div className="flex items-center justify-between w-full bg-white rounded-lg shadow-md p-7">
      <div>
        <div className="w-[33.99px] h-[33.99px]">
          <div className={`w-full h-full text-[30px] ${color} `}>{icon}</div>
        </div>
        <p className="text-[16px] text-[#64748b] mt-[20px] mb-[8px]">{title}</p>
        <h2 className="text-[24px] font-bold text-gray-800">{value}</h2>
        <div
          className={`mt-2 flex items-center text-sm ${change > 0 ? "text-green-500" : "text-red-500"
            }`}
        >

          {change > 0 ? `+${change}%` : `${change}%`}

          <span className="ml-2 text-[14px] text-gray-500">then last week</span>
        </div>
      </div>

    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const stats = [
    {
      value: "7.8/10",
      icon: <LiaChartBarSolid />,
      title: "Avg. Client Rating",
      percentage: 70, // Percentage is present
      change: 2.5,
      color: "text-[#4F46E5]",
    },
    {
      value: "7.8/10",
      icon: <HiOutlineUsers />,
      title: "Instagram Followers",
      percentage: 45, // Percentage is present
      change: -1.5,
      color: "text-[#10b981]",
    },
    {
      value: "$5.03",
      icon: <LiaCoinsSolid />,
      title: "Avg. Client Rating",
      percentage: 60, // Percentage is present
      change: 0.5,
      color: "text-[#f0950c]",
    },
  ];
  const [isopen, setisopen] = useState(false);

  const handleonclick = () => {
    setisopen(!isopen);
  }

  return (
    <div className="p-5 lg:p-4 2xl:p-10 ">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="">
            <h2 className="text-[22px] mb-1.5 font-bold text-[rgb(28,36,52)]">
              Highlights
            </h2>
            <span className="font-medium text-[#64748b]" >
              Latest social statistics
            </span>
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

        {/* Cards */}
        <div className="2xl:gap-7.5 flex flex-col lg:flex-row gap-4  md:gap-6 ">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>


      <Marktingtable />
      <Channlvisiter />
      {/* <Campng /> */}
    </div>

  );
};

export default Dashboard;


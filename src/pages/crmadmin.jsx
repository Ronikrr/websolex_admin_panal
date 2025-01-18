// import React from 'react'
// import { GoGraph } from "react-icons/go";
// const Crm = () => {
//     // Calculate dynamic polygon points for the clipPath
//     const calculatePolygonPoints = (percentage) => {
//         const angle = (percentage / 100) * 360; // Convert percentage to degrees
//         const radians = (angle - 90) * (Math.PI / 180); // Offset by 90 degrees to start at the top
//         const x = Math.cos(radians) * 50 + 50; // Calculate x coordinate (normalized to 0-100)
//         const y = Math.sin(radians) * 50 + 50; // Calculate y coordinate (normalized to 0-100)

//         if (percentage <= 50) {
//             return `50% 50%, 50% 0%, ${x}% ${y}%`;
//         } else {
//             return `50% 50%, 50% 0%, 100% 0%, 100% 100%, ${x}% ${y}%`;
//         }
//     };

//     const polygonPoints = calculatePolygonPoints(percentage);
//     const midstan = [
//         {
//             id: 1,
//             count: 197,
//             headtext: "Client added",
//             icons: <GoGraph />,
//             alertcolor:"bg-[rgb(16,185,129)]",
//             static: "2.5%",
//             weeks: "Since last week",
//             color: "border-blue-500",
//             par: 78,
//         }, {
//             id: 1,
//             count: 197,
//             headtext: "Client added",
//             icons: <GoGraph />,
//             alertcolor:"bg-[rgb(16,185,129)]",
//             static: "2.5%",
//             weeks: "Since last week",
//             color: "border-blue-500",
//         }, {
//             id: 1,
//             count: 197,
//             headtext: "Client added",
//             icons: <GoGraph />,
//             alertcolor:"bg-[rgb(16,185,129)]",
//             static: "2.5%",
//             weeks: "Since last week",
//             color: "border-blue-500",
//         },
//     ]
//   return (
//       <div className='p-10' >
//           <div className="">
//               <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center sm:justify-between">
//                   <div className="">
//                       <h2 className='font-bold text-[rgb(28,36,52)] text-[22px] ' >This Week’s Overview</h2>
//                   </div>
//                   <div className="flex items-center">
//                       <p className='font-medium text-black uppercase ' >Short By</p>
//                       <div className="relative z-10 inline-block">
//                           <select name="" className='relative z-20 text-[#] inline-flex py-1 pl-3 pr-8 font-medium bg-transparent outline-none appearance-none' id="">
//                               <option value="">Current Week</option>
//                               <option value="">Last Week</option>
//                           </select>
//                       </div>
//                   </div>
//               </div>
//               <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
//                   {midstan.map((item, id) => (
//                       <div key={id} className="xl:p-7.5 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6">
//                           <div className="flex items-end justify-between">
//                               <div className="">
//                                   <h3 className='mb-4 font-bold text-[rgb(28,36,52)]  text-[28px] ' >{ item.count}</h3>
//                                   <p className='font-medium' >{ item.headtext}</p>
//                                   <span className='flex items-center gap-2 mt-2' >
//                                       <span className={`flex items-center gap-1 p-1 text-xs font-medium text-white rounded-md ${item.alertcolor}`}><GoGraph /> <span>{item.static }</span> </span>
//                                       <span className='text-sm font-medium' >{ item.weeks}</span>
//                                   </span>
//                               </div>
//                               <div className="">
//                                    <div className="relative w-16 h-16">
                                     
//                                       <div className="absolute inset-0 border-[5px] border-gray-200 rounded-full"></div>
                                      
//                                       <div
//                                           className={`absolute inset-0 border-[5px] ${item.color} rounded-full`}
//                                           style={{
//                                               clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)",
//                                               transform: `rotate(${item.par * 3.6}deg)`,
//                                           }}
//                                       ></div>
                                     
//                                       <div className="absolute bg-white rounded-full inset-7"></div>
//                                   </div>
                                  
//                               </div>
//                           </div>
//                       </div>
//                   ))}
//               </div>
//           </div>
//     </div>
//   )
// }

// export default Crm
// import React from "react";
// import { GoGraph } from "react-icons/go";

// const Crm = () => {
//     // Calculate dynamic polygon points for the clipPath
//     // const calculatePolygonPoints = (percentage) => {
//     //     const angle = (percentage / 100) * 360; // Convert percentage to degrees
//     //     const radians = (angle - 90) * (Math.PI / 180); // Offset by 90 degrees to start at the top
//     //     const x = Math.cos(radians) * 50 + 50; // Calculate x coordinate (normalized to 0-100)
//     //     const y = Math.sin(radians) * 50 + 50; // Calculate y coordinate (normalized to 0-100)

//     //     if (percentage <= 50) {
//     //         return `50% 50%, 50% 0%, ${x}% ${y}%`;
//     //     } else {
//     //         return `50% 50%, 50% 0%, 100% 0%, 100% 100%, ${x}% ${y}%`;
//     //     }
//     // };

//     const midstan = [
//         {
//             id: 1,
//             count: 197,
//             headtext: "Client added",
//             icons: <GoGraph />,
//             alertcolor: "bg-[rgb(16,185,129)]",
//             static: "2.5%",
//             weeks: "Since last week",
//             color: "border-blue-500",
//             par: 78,
//         },
//         {
//             id: 2,
//             count: 120,
//             headtext: "Tasks completed",
//             icons: <GoGraph />,
//             alertcolor: "bg-[rgb(255,99,71)]",
//             static: "5.0%",
//             weeks: "Since last week",
//             color: "border-red-500",
//             par: 65,
//         },
//         {
//             id: 3,
//             count: 89,
//             headtext: "Projects delivered",
//             icons: <GoGraph />,
//             alertcolor: "bg-[rgb(54,162,235)]",
//             static: "1.8%",
//             weeks: "Since last week",
//             color: "border-blue-400",
//             par: 42,
//         },
//     ];
//     const radius = 20;
//     const circumference = 2 * Math.PI * radius;

//     const offset = circumference - (percentage / 100) * circumference;

//     return (
        // <div className="p-10">
        //     <div className="">
        //         {/* Header */}
        //         <div className="flex flex-col gap-2 mb-8 sm:flex-row sm:items-center sm:justify-between">
        //             <div className="">
        //                 <h2 className="text-[22px] font-bold text-[rgb(28,36,52)]">
        //                     This Week’s Overview
        //                 </h2>
        //             </div>
        //             <div className="flex items-center">
        //                 <p className="font-medium text-black uppercase">Short By</p>
        //                 <div className="relative z-10 inline-block">
        //                     <select
        //                         name=""
        //                         className="relative z-20 inline-flex py-1 pl-3 pr-8 font-medium bg-transparent outline-none appearance-none"
        //                         id=""
        //                     >
        //                         <option value="">Current Week</option>
        //                         <option value="">Last Week</option>
        //                     </select>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* Cards */}
        //         <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3">
//                     {midstan.map((item) => (
//                         <div
//                             key={item.id}
//                             className="xl:p-7.5 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6"
//                         >
//                             <div className="flex items-end justify-between">
//                                 <div className="">
//                                     <h3 className="text-[28px] font-bold text-[rgb(28,36,52)] mb-4">
//                                         {item.count}
//                                     </h3>
//                                     <p className="font-medium">{item.headtext}</p>
//                                     <span className="flex items-center gap-2 mt-2">
//                                         <span
//                                             className={`flex items-center gap-1 p-1 text-xs font-medium text-white rounded-md ${item.alertcolor}`}
//                                         >
//                                             {item.icons} <span>{item.static}</span>
//                                         </span>
//                                         <span className="text-sm font-medium">{item.weeks}</span>
//                                     </span>
//                                 </div>
//                                 {/* Circular Progress
//                                 <div className="relative w-16 h-16">
//                                     <svg width="50" height="50" className="inline-block">
//                                         <circle
//                                             cx="25"
//                                             cy="25"
//                                             r={radius}
//                                             stroke="#E5E7EB"
//                                             strokeWidth="4"
//                                             fill="transparent"
//                                         />
//                                         <circle
//                                             cx="25"
//                                             cy="25"
//                                             r={radius}
//                                             stroke={color}
//                                             strokeWidth="4"
//                                             fill="transparent"
//                                             strokeDasharray={circumference}
//                                             strokeDashoffset={offset}
//                                             strokeLinecap="round"
//                                         />
//                                     </svg>
//                                 </div> */}
//                             </div>
//                         </div>
//                     ))}
        //         </div>
        //     </div>
           

        //     <Crmsection />
          
        // </div>
//     );
// };

// export default Crm;
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


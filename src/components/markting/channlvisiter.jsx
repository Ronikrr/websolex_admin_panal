import React, { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import { MdLeaderboard } from 'react-icons/md';
const emailData = [
  // Google
  {
    platform: "Google",
    title: "iPhone 14 Plus Giveaway",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "37%",
    count: "(247)",
  },
  {
    platform: "Google",
    title: "Google AdSense",
    status: "In Draft",
    statusColor: "bg-blue-100 text-blue-500",
    conversion: "0.01%",
    count: "(1)",
  },
  {
    platform: "Google",
    title: "Pixel 7 Pro Giveaway",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "22%",
    count: "(1.5K)",
  },
  {
    platform: "Google",
    title: "Chromebook Giveaway",
    status: "In Queue",
    statusColor: "bg-yellow-100 text-yellow-500",
    conversion: "5%",
    count: "(350)",
  },
  {
    platform: "Google",
    title: "Nest Hub Promo",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "30%",
    count: "(2K)",
  },

  // Facebook
  {
    platform: "Facebook",
    title: "Best Headsets Giveaway",
    status: "In Queue",
    statusColor: "bg-yellow-100 text-yellow-500",
    conversion: "0%",
    count: "(0)",
  },
  {
    platform: "Facebook",
    title: "Gaming Accessories Giveaway",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "15%",
    count: "(720)",
  },
  {
    platform: "Facebook",
    title: "VR Headset Giveaway",
    status: "In Draft",
    statusColor: "bg-blue-100 text-blue-500",
    conversion: "0.5%",
    count: "(10)",
  },
  {
    platform: "Facebook",
    title: "Wireless Earbuds Giveaway",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "18%",
    count: "(1.2K)",
  },
  {
    platform: "Facebook",
    title: "Smart Home Devices Giveaway",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "10%",
    count: "(650)",
  },

  // Instagram
  {
    platform: "Instagram",
    title: "Affiliation Program",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "12%",
    count: "(2.6K)",
  },
  {
    platform: "Instagram",
    title: "Lifestyle Gadgets Giveaway",
    status: "In Queue",
    statusColor: "bg-yellow-100 text-yellow-500",
    conversion: "10%",
    count: "(500)",
  },
  {
    platform: "Instagram",
    title: "Fitness Tracker Giveaway",
    status: "In Draft",
    statusColor: "bg-blue-100 text-blue-500",
    conversion: "0.3%",
    count: "(30)",
  },
  {
    platform: "Instagram",
    title: "Smartwatch Giveaway",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "20%",
    count: "(3K)",
  },
  {
    platform: "Instagram",
    title: "Home Automation Promo",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "25%",
    count: "(4K)",
  },

  // Seranking
  {
    platform: "Seranking",
    title: "Macbook Pro M1 Giveaway",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "18%",
    count: "(6.4K)",
  },
  {
    platform: "Seranking",
    title: "SEO Tools Giveaway",
    status: "In Queue",
    statusColor: "bg-yellow-100 text-yellow-500",
    conversion: "8%",
    count: "(420)",
  },
  {
    platform: "Seranking",
    title: "Website Audit Promo",
    status: "In Draft",
    statusColor: "bg-blue-100 text-blue-500",
    conversion: "0.02%",
    count: "(5)",
  },
  {
    platform: "Seranking",
    title: "Digital Marketing Toolkit",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "25%",
    count: "(3.5K)",
  },
  {
    platform: "Seranking",
    title: "Content Strategy Plan",
    status: "Sent",
    statusColor: "bg-green-100 text-green-500",
    conversion: "15%",
    count: "(2K)",
  },
];



const filters = [
  { name: "Google", icon: <FaGoogle className="text-red-500" /> },
  { name: "Facebook", icon: <FaFacebook className="text-blue-500" /> },
  { name: "Instagram", icon: <FaInstagram className="text-pink-500" /> },
  { name: "Seranking", icon: <MdLeaderboard className="text-blue-600" /> },
];

const Channlvisiter = () => {
  const [activefilter, setactivefilter] = useState("Google");
  const [isopen, setisopen] = useState(false);

  const fliterdata = emailData.filter(
    (email) => email.platform === activefilter
  )

  const handleonclick = () => {
    setisopen(!isopen);
  }
  return (
    <div className="mt-7.5 w-full flex flex-col xl:flex-row items-center gap-4 md:gap-6 2xl:gap-7.5">
      <div className="w-full xl:w-6/12">
        <div className="bg-white border rounded-md border border-[var(--border-color)] shadow-md">
          <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row border-b border-[var(--border-color)] sm:items-center sm:justify-between">

            <div className="">
              <h2 className="text-[26px] font-semibold capitalize text-[rgb(28,36,52)]">
                Featured Campaigns
              </h2>
              <p className="text-sm font-medium text-[#98A6AD]" >75% activity growth</p>
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
          <div className="p-5 rounded-lg shadow-md">
            {/* Filter Buttons */}
            <div className="flex mb-4 space-x-4">
              {filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setactivefilter(filter.name)}
                  className={`px-4 py-2 flex items-center  md:gap-6 rounded-md ${filter.name === activefilter
                    ? "bg-blue-100 text-blue-500 border border-blue-500 "
                    : "border border-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-500 hover:border hover:border-blue-500 "
                    }`}
                >
                  {filter.icon}
                  <span className='hidden md:block' >{filter.name}</span>
                </button>
              ))}
            </div>

            {/* Table */}
            <table className="w-full border border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-gray-700">Email Title</th>
                  <th className="p-3 text-left text-gray-700">Status</th>
                  <th className="p-3 text-left text-gray-700">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {fliterdata.map((email, index) => (
                  <tr
                    key={index}
                  >
                    <td className="p-3">{email.title}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-md text-sm ${email.statusColor}`}
                      >
                        {email.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {email.conversion}
                      <span className="text-gray-500"> {email.count}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full xl:w-6/12">
        <div className="bg-white border rounded-md border border-[var(--border-color)] shadow-md">
          <div className="flex flex-col gap-2 px-6 py-4 sm:flex-row border-b border-[var(--border-color)] sm:items-center sm:justify-between">

            <div className="">
              <h2 className="text-[26px] font-semibold capitalize text-[rgb(28,36,52)]">
                Feedback
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
          <div className="p-6">
            <div className="flex flex-col gap-7">
              <div className="relative z-10 flex gap-5">
                <div className="w-full h-16 max-w-16 rounded-full border-[3px] border-[var(--border-color)] ">
                  <img src="https://react-demo.tailadmin.com/assets/user-14-eba44d22.png" alt="" />
                </div>
                <div className="">
                  <p className='text-black' >
                    <span className='font-medium' >Timothy Smith</span>
                    <span className='px-1' >Commented on Cloud</span>
                    <span className='font-medium' >Killan James</span>
                  </p>
                  <span className="block mt-1 text-sm text-[#64748b] "> 1 hour ago </span>
                  <p className="mt-2.5 text-black">
                    It's an Affiliate commissions SaaS application that allows you
                    to track your affiliate revenue.
                  </p>
                </div>
                <span className="absolute left-8 -z-10 h-[300%] w-[1px] border-l  border-dashed border-[var(--border-color)] "></span>
              </div>
              <div className="relative z-10 flex gap-5">
                <div className="w-full h-16 max-w-16 rounded-full border-[3px] border-[var(--border-color)] ">
                  <img src="https://react-demo.tailadmin.com/assets/user-14-eba44d22.png" alt="" />
                </div>
                <div className="">
                  <p className='text-black' >
                    <span className='font-medium' >Timothy Smith</span>
                    <span className='px-1' >Commented on Cloud</span>
                    <span className='font-medium' >Killan James</span>
                  </p>
                  <span className="block mt-1 text-sm text-[#64748b] "> 1 hour ago </span>
                  <p className="mt-2.5 text-black">
                    It's an Affiliate commissions SaaS application that allows you
                    to track your affiliate revenue.
                  </p>
                </div>

              </div>
              <div className="relative z-10 flex gap-5">
                <div className="w-full h-16 max-w-16 rounded-full border-[3px] border-[var(--border-color)] ">
                  <img src="https://react-demo.tailadmin.com/assets/user-14-eba44d22.png" alt="" />
                </div>
                <div className="">
                  <p className='text-black' >
                    <span className='font-medium' >Timothy Smith</span>
                    <span className='px-1' >Commented on Cloud</span>
                    <span className='font-medium' >Killan James</span>
                  </p>
                  <span className="block mt-1 text-sm text-[#64748b] "> 1 hour ago </span>
                  <p className="mt-2.5 text-black">
                    It's an Affiliate commissions SaaS application that allows you
                    to track your affiliate revenue.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channlvisiter
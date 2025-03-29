// import React, { useEffect, useState } from "react";
// import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6"; // Added down arrow icon
// import { FiEye } from "react-icons/fi";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import { GoPeople } from "react-icons/go";
// import Sectiontwo from "../components/websolex/section_two"
// import Sectionthree from "../components/websolex/section_three";
// const Websolexhome = () => {
//     const [seecount, setViewCount] = useState(0);
//     const [contact, setcontact] = useState(0);
//     const [work, setwork] = useState(0);
//     const [service, setservice] = useState(0);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [viewRes, contactRes, workRes, serviceRes] = await Promise.all([
//                     fetch('https://websolex-admin.vercel.app/view_count'),
//                     fetch('https://websolex-admin.vercel.app/view_contactform'),
//                     fetch('https://websolex-admin.vercel.app/api/lastworkadd'),
//                     fetch('https://websolex-admin.vercel.app/api/service')
//                 ]);
//                 const viewData = await viewRes.json();
//                 const contactData = await contactRes.json();
//                 const workData = await workRes.json();
//                 const serviceData = await serviceRes.json();

//                 setViewCount(viewData.count || 0);
//                 setcontact(contactData.length || 0);
//                 setwork(workData.length || 0);
//                 setservice(serviceData.length || 0);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, []);





//     const first = [
//         {
//             id: 1,
//             icon: <FiEye className="text-[var(--primary-color)] text-[25px]" />,
//             balance: seecount,
//             totalview: "Total views",
//             pericon: <FaArrowUpLong />,
//         },
//         {
//             id: 2,
//             icon: <AiOutlineShoppingCart className="text-[var(--primary-color)] text-[25px]" />,
//             balance: contact,
//             totalview: "contact count",
//             pericon: <FaArrowDownLong />,
//         }, {
//             id: 3,
//             icon: <MdOutlineShoppingBag className="text-[var(--primary-color)] text-[25px]" />,
//             balance: work,
//             totalview: 'total work',
//             pericon: <FaArrowUpLong />,
//         },
//         {
//             id: 4,
//             icon: <GoPeople className="text-[var(--primary-color)] text-[25px]" />,
//             balance: service,
//             totalview: "service count",
//             pericon: <FaArrowDownLong />,
//         },
//     ];

//     return (
//         <div className="w-full bg-gray-100 2xl:p-10 md:p-6">
//             <div className="flex flex-wrap w-full mb-7 ">
//                 {first.map((item) => {
//                     return (
//                         <div
//                             key={item.id}
//                             className="flex w-full lg:w-6/12 xl:w-3/12 mb-7 2xl:mb-0 lg:odd:justify-start lg:even:justify-end 2xl:odd:justify-noraml 2xl:even:justify-normal "
//                         >
//                             <div className="w-full py-6 bg-white border justify-center text-center rounded-sm shadow-md lg:w-11/12 border-[var(--border-color)] px-7">
//                                 <div className="flex justify-start w-full">
//                                     <div className="flex items-center justify-center bg-gray-100 rounded-full h-11 w-11">
//                                         {item.icon}
//                                     </div>
//                                 </div>
//                                 <div className="flex items-end justify-start mt-4">
//                                     <div className="text-left" >
//                                         <h4 className="text-[24px] font-semibold">{item.balance}</h4>
//                                         <span className="text-sm font-bold flex text-[#64748B]">
//                                             {item.totalview}
//                                         </span>
//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>


//             <Sectiontwo />
//             <Sectionthree />
//         </div>
//     );
// };

// export default Websolexhome;
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import Sectiontwo from "../components/websolex/section_two";
import Sectionthree from "../components/websolex/section_three";

const Websolexhome = () => {
    const [seecount, setViewCount] = useState(0);
    const [contact, setContact] = useState(0);
    const [work, setWork] = useState(0);
    const [service, setService] = useState(0);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const endpoints = [
                "https://websolex-admin.vercel.app/view_count",
                "https://websolex-admin.vercel.app/view_contactform",
                "https://websolex-admin.vercel.app/api/lastworkadd",
                "https://websolex-admin.vercel.app/api/service"
            ];

            const responses = await Promise.all(endpoints.map(url => fetch(url)));
            const [viewData, contactData, workData, serviceData] = await Promise.all(responses.map(res => res.json()));

            setViewCount(viewData.count || 0);
            setContact(contactData.length || 0);
            setWork(workData.length || 0);
            setService(serviceData.length || 0);
        } catch (error) {
            setError("Failed to fetch data. Please try again.");
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const first = useMemo(() => [
        {
            id: 1,
            icon: <FiEye className="text-[var(--primary-color)] text-[25px]" />,
            balance: seecount,
            totalview: "Total views",
            pericon: <FaArrowUpLong />,
        },
        {
            id: 2,
            icon: <AiOutlineShoppingCart className="text-[var(--primary-color)] text-[25px]" />,
            balance: contact,
            totalview: "Contact Count",
            pericon: <FaArrowDownLong />,
        },
        {
            id: 3,
            icon: <MdOutlineShoppingBag className="text-[var(--primary-color)] text-[25px]" />,
            balance: work,
            totalview: "Total Work",
            pericon: <FaArrowUpLong />,
        },
        {
            id: 4,
            icon: <GoPeople className="text-[var(--primary-color)] text-[25px]" />,
            balance: service,
            totalview: "Service Count",
            pericon: <FaArrowDownLong />,
        },
    ], [seecount, contact, work, service]);

    return (
        <div className="w-full bg-gray-100 2xl:p-10 md:p-6">
            {error && <div className="mb-4 text-center text-red-500">{error}</div>}

            <div className="flex flex-wrap w-full mb-7">
                {first.map((item) => (
                    <div key={item.id} className="flex w-full lg:w-6/12 xl:w-3/12 mb-7 lg:odd:justify-start lg:even:justify-end">
                        <div className="w-full py-6 bg-white border text-center rounded-sm shadow-md lg:w-11/12 border-[var(--border-color)] px-7">
                            <div className="flex justify-start w-full">
                                <div className="flex items-center justify-center bg-gray-100 rounded-full h-11 w-11">
                                    {item.icon}
                                </div>
                            </div>
                            <div className="flex items-end justify-start mt-4">
                                <div className="text-left">
                                    <h4 className="text-[24px] font-semibold">{item.balance}</h4>
                                    <span className="text-sm font-bold flex text-[#64748B]">{item.totalview}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Sectiontwo />
            <Sectionthree />
        </div>
    );
};

export default Websolexhome;


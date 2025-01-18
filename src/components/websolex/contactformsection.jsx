import React, { useEffect, useState } from 'react'
import Breadcrumb from '../ui/breadcrumb'

const Contactformsection = () => {

    const [contactdata, setcontactdata] = useState([]);
    const [subscribe, setsubscribe] = useState([])
    const [showError, setShowError] = useState("");
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchcontactdata = async () => {
    //         try {
    //             const res = await fetch('https://websolex-admin.vercel.app/view_contactform',
    //                 {
    //                     method: "GET"
    //                 }
    //             )
    //             const data = await res.json()
    //             console.log(data)
    //             setcontactdata(data);


    //         } catch (error) {
    //             setError(error.message);
    //             setShowError(true);
    //             setTimeout(() => setShowError(false), 3000);
    //         }
    //     }
    //     fetchcontactdata()
    // }, [])
    useEffect(() => {
        const fetchleads = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/view_contactform', {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const result = await res.json();
                setcontactdata(result);
            } catch (error) {
                setShowError(true)
                setError("Error fetching team members: " + error.message);
                console.error("Error fetching team members:", error);
            }
        };
        const fetchleadssub = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/subscribe', {
                    method: "GET",
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const result = await res.json();
                setsubscribe(result);
            } catch (error) {
                setShowError(true)
                setError("Error fetching team members: " + error.message);
                console.error("Error fetching team members:", error);
            }
        };
        fetchleadssub()
        fetchleads();
    }, []);
    console.log(contactdata)
    return (

        <div className='w-full' >
            {error && (
                <div
                    className={`fixed top-4 left-0 transform -translate-x-1/2 bg-red-500 text-white px-10 py-6 rounded shadow-lg transition-transform duration-500 ${showError
                        ? "translate-x-0  opacity-100"
                        : "-translate-x-[500px] opacity-0"
                        }`}
                >
                    {error}
                </div>
            )}
            <div className="flex flex-col items-center justify-between mb-4 lg:flex-row">
                <h1 className='capitalize text-[26px] font-semibold  '>contact form</h1>
                <Breadcrumb />
            </div>
            <div className="flex flex-col items-start lg:flex-row gap-7 ">
                <div className="w-full md:w-8/12">
                    <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                        <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                            <div className="p-2.5 xl:p-4 ">ID</div>
                            <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">name</div>
                            <div className="p-2.5 xl:p-4 flex-1">email</div>
                            <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">phone</div>
                            <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">subject</div>
                            <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">message</div>
                        </div>
                        <div className="flex flex-col w-full">
                            {contactdata.map((contact, index) => (
                                <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200" key={index}>
                                    <div className=" p-2.5 xl:p-4">{index + 1}</div>
                                    <div className="flex-1 p-2.5 xl:p-4 hidden lg:block">{contact.name}</div>
                                    <div className="flex-1 p-2.5 xl:p-4 overflow-hidden">{contact.email}</div>
                                    <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact.contactnumber}</div>
                                    <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact.subject}</div>
                                    <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact.message}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-4/12">
                    <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                        <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                            <div className="p-2.5 xl:p-4 flex-1">ID</div>
                            <div className="p-2.5 xl:p-4 flex-1">email</div>
                        </div>
                        <div className="flex flex-col w-full">
                            {subscribe.map((data, index) => (
                            <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200" key={index} >
                                <div className="flex-1 p-2.5 xl:p-4"> {index + 1} </div>
                                <div className="flex-1 p-2.5 xl:p-4"> {data.email} </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contactformsection
// import React, { useEffect, useState } from 'react';
// import Breadcrumb from '../ui/breadcrumb';

// const Contactformsection = () => {
//     const [contactdata, setcontactdata] = useState([]);
//     const [subscribe, setsubscribe] = useState([]);
//     const [showError, setShowError] = useState("");
//     const [error, setError] = useState(null);
//     const [contactLoading, setContactLoading] = useState(false);
//     const [subscribeLoading, setSubscribeLoading] = useState(false);

//     useEffect(() => {
//         const fetchContactData = async () => {
//             setContactLoading(true);
//             try {
//                 const response = await fetch('https://websolex-admin.vercel.app/view_contactform', { method: "GET" });
//                 if (!response.ok) throw new Error('Failed to fetch contact data.');
//                 const data = await response.json();
//                 setcontactdata(data);
//             } catch (error) {
//                 setShowError(true);
//                 setError("Error fetching contact data: " + error.message);
//             } finally {
//                 setContactLoading(false);
//             }
//         };

//         const fetchSubscribeData = async () => {
//             setSubscribeLoading(true);
//             try {
//                 const response = await fetch('https://websolex-admin.vercel.app/subscribe', { method: "GET" });
//                 if (!response.ok) throw new Error('Failed to fetch subscription data.');
//                 const data = await response.json();
//                 setsubscribe(data);
//             } catch (error) {
//                 setShowError(true);
//                 setError("Error fetching subscription data: " + error.message);
//             } finally {
//                 setSubscribeLoading(false);
//             }
//         };

//         fetchContactData();
//         fetchSubscribeData();
//     }, []);

//     return (
//         <div className="w-full">
//             {error && (
//                 <div
//                     className={`fixed top-4 left-0 transform -translate-x-1/2 bg-red-500 text-white px-10 py-6 rounded shadow-lg transition-transform duration-500 ${showError ? "translate-x-0 opacity-100" : "-translate-x-[500px] opacity-0"
//                         }`}
//                 >
//                     {error}
//                 </div>
//             )}
//             <div>
//                 <div className="flex flex-col items-center justify-between mb-4 lg:flex-row">
//                     <h1 className="capitalize text-[26px] font-semibold">Contact Form</h1>
//                     <Breadcrumb />
//                 </div>
//                 <div className="flex flex-col items-start lg:flex-row gap-7">
//                     <div className="w-full md:w-8/12">
//                         <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
//                             <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
//                                 <div className="p-2.5 xl:p-4">ID</div>
//                                 <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">Name</div>
//                                 <div className="p-2.5 xl:p-4 flex-1">Email</div>
//                                 <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">Phone</div>
//                                 <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">Subject</div>
//                                 <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">Message</div>
//                             </div>
//                             {contactLoading ? (
//                                 <div className="animate-pulse">
//                                     {Array.from({ length: 6 }).map((_, index) => (
//                                         <div key={index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
//                                             <div className="w-10 h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                             <div className="w-full h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                             <div className="w-full h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                             <div className="w-full h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                             <div className="w-full h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                             <div className="w-full h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                     <div className="flex flex-col w-full">
//                                         {contactdata.map((contact, index) => (
//                                             <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200" key={index}>
//                                             <div className="p-2.5 xl:p-4">{index + 1}</div>
//                                             <div className="flex-1 p-2.5 xl:p-4 hidden lg:block">{contact.name}</div>
//                                             <div className="flex-1 p-2.5 xl:p-4 overflow-hidden">{contact.email}</div>
//                                             <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact.contactnumber}</div>
//                                             <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact.subject}</div>
//                                             <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact.message}</div>
//                                         </div>
//                                     ))}
//                                     </div>
//                             )}
//                         </div>
//                     </div>
//                     <div className="w-full md:w-4/12">
//                         <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
//                             <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
//                                 <div className="p-2.5 xl:p-4 flex-1">ID</div>
//                                 <div className="p-2.5 xl:p-4 flex-1">Email</div>
//                             </div>
//                             {subscribeLoading ? (
//                                 <div className="animate-pulse">
//                                     {Array.from({ length: 4 }).map((_, index) => (
//                                         <div key={index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
//                                             <div className="w-10 h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                             <div className="w-full h-5 mx-2 rounded-lg bg-slate-400"></div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                     <div className="flex flex-col w-full">
//                                         {subscribe.map((data, index) => (
//                                         <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200" key={index}>
//                                             <div className="flex-1 p-2.5 xl:p-4">{index + 1}</div>
//                                             <div className="flex-1 p-2.5 xl:p-4">{data.email}</div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Contactformsection;

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../ui/breadcrumb'
import FeedbackMessage from '../ui/feedback';
const Contactformsection = () => {

    const [contactdata, setcontactdata] = useState([]);
    const [subscribe, setsubscribe] = useState([])
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        const fetchleads = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/view_contactform', {
                    method: "GET",
                });

                if (!res.ok) {
                    setFeedback({
                        message: `Error fetching contact from data:${res.message}`,
                        type: 'error',
                    });
                }

                const result = await res.json();
                setcontactdata(result);
            } catch (error) {
                setFeedback({
                    message: `Error fetching contact from data:${error.message}`,
                    type: 'error',
                });
            }
        };
        const fetchleadssub = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/subscribe', {
                    method: "GET",
                });
                if (!res.ok) {
                    setFeedback({
                        message: `Error fetching subscribed data:${res.message}`,
                        type: 'error',
                    });
                }

                const result = await res.json();
                setsubscribe(result);
            } catch (error) {
                setFeedback({
                    message: `Error fetching subscribed data:${error.message}`,
                    type: 'error',
                });
            }
        };
        fetchleadssub()
        fetchleads();
    }, []);
    return (

        <div className='w-full' >
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
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
                                    <div className="flex-1 p-2.5 xl:p-4 hidden lg:block">{contact?.name}</div>
                                    <div className="flex-1 p-2.5 xl:p-4 overflow-hidden">{contact?.email}</div>
                                    <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact?.contactnumber}</div>
                                    <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact?.subject}</div>
                                    <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{contact?.message}</div>
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
                                    <div className="flex-1 p-2.5 xl:p-4"> {data?.email} </div>
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

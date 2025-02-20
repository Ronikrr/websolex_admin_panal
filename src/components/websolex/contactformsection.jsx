import React, { useEffect, useState } from "react";
import Breadcrumb from "../ui/breadcrumb";
import FeedbackMessage from "../ui/feedback";
import {
    fetchcontactform,
    fetchsubcribe,
} from "../../Redux/slice/contactDetailAction";
import { useDispatch, useSelector } from "react-redux";
const Contactformsection = () => {
    const dispatch = useDispatch();
    const { contactData, subscribeData, error } = useSelector(
        (state) => state.contactfrom
    );

    const [feedback, setFeedback] = useState({ message: "", type: "" });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        dispatch(fetchcontactform());
        dispatch(fetchsubcribe());
    }, [dispatch]);
    useEffect(() => {
        if (error) {
            setFeedback(error);
        }
    }, [error]);
    return (
        <div className="w-full">
            {feedback.message && (
                <FeedbackMessage
                    message={feedback.message}
                    type={feedback.type}
                    onClear={handleClear}
                />
            )}
            <div className="flex flex-col items-center justify-between mb-4 lg:flex-row">
                <h1 className="capitalize text-[26px] font-semibold  ">contact form</h1>
                <Breadcrumb />
            </div>
            <div className="flex flex-col items-start lg:flex-row gap-7 ">
                <div className="w-full md:w-8/12">
                    <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                        <table className="w-full border border-collapse border-gray-200">
                            <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                                <tr>
                                    <th className="p-2.5 xl:p-4 border border-gray-200">ID</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">Name</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200">Email</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">Phone</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">Subject</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactData.length > 0 ? (
                                    contactData.map((contact, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="p-2.5 xl:p-4 border border-gray-200">{index + 1}</td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">
                                                {contact?.name}
                                            </td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200">{contact?.email}</td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">
                                                {contact?.contactnumber}
                                            </td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">
                                                {contact?.subject}
                                            </td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">
                                                {contact?.message}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-center border border-gray-200">
                                            No contact data found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <div className="w-full md:w-8/12">
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
                            {contactData.length > 0 ? (
                                contactData.map((contact, index) => (
                                    <div
                                        className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200"
                                        key={index}
                                    >
                                        <div className=" p-2.5 xl:p-4">{index + 1}</div>
                                        <div className="flex-1 p-2.5 xl:p-4 hidden lg:block">
                                            {contact?.name}
                                        </div>
                                        <div className="flex-1 p-2.5 xl:p-4 overflow-hidden">
                                            {contact?.email}
                                        </div>
                                        <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">
                                            {contact?.contactnumber}
                                        </div>
                                        <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">
                                            {contact?.subject}
                                        </div>
                                        <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">
                                            {contact?.message}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center">
                                    <p>No contact Data found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div> */}
                {/* <div className="w-full md:w-4/12">
                    <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                        <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                            <div className="p-2.5 xl:p-4 flex-1">ID</div>
                            <div className="p-2.5 xl:p-4 flex-1">email</div>
                        </div>
                        <div className="flex flex-col w-full">
                            {subscribeData.length > 0 ? (
                                subscribeData.map((data, index) => (
                                    <div
                                        className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200"
                                        key={index}
                                    >
                                        <div className="flex-1 p-2.5 xl:p-4"> {index + 1} </div>
                                        <div className="flex-1 p-2.5 xl:p-4"> {data?.email} </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center">
                                    <p>No subscriber found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div> */}
                <div className="w-full md:w-4/12">
                    <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                        <table className="w-full border border-collapse border-gray-200">
                            <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                                <tr>
                                    <th className="p-2.5 xl:p-4 border border-gray-200">ID</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscribeData.length > 0 ? (
                                    subscribeData.map((data, index) => (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="p-2.5 xl:p-4 border border-gray-200">{index + 1}</td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200">{data?.email}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="p-4 text-center border border-gray-200">
                                            No subscriber found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contactformsection;

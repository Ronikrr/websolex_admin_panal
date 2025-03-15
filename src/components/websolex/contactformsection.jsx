import React, { useEffect, useState } from "react";
import Breadcrumb from "../ui/breadcrumb";
import FeedbackMessage from "../ui/feedback";

const Contactformsection = () => {
    const [contactData, setContactData] = useState([]);
    const [subscribeData, setSubscribeData] = useState([]);
    const [feedback, setFeedback] = useState({ message: "", type: "" });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };

    useEffect(() => {
        const fetchContactForm = async () => {
            try {
                const response = await fetch("https://websolex-admin.vercel.app/view_contactform");
                if (!response.ok) throw new Error("Failed to fetch contact data.");
                const data = await response.json();
                setContactData(data);
            } catch (error) {
                setFeedback({ message: error.message, type: "error" });
            }
        };

        const fetchSubscribe = async () => {
            try {
                const response = await fetch("https://websolex-admin.vercel.app/subscribe");
                if (!response.ok) throw new Error("Failed to fetch subscriber data.");
                const data = await response.json();
                setSubscribeData(data);
            } catch (error) {
                setFeedback({ message: error.message, type: "error" });
            }
        };

        fetchContactForm();
        fetchSubscribe();
    }, []);

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
                <h1 className="capitalize text-[26px] font-semibold">contact form</h1>
                <Breadcrumb />
            </div>

            <div className="flex flex-col items-start gap-7">
                {/* Contact Form Table */}
                <div className="w-full ">
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

                {/* Subscription Table */}
                <div className="w-full ">
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

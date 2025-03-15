
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../ui/breadcrumb';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '../../Redux/slice/employyeslice';

const Blogpagesection = () => {
    const dispatch = useDispatch();
    const { employees, feedback: feedbackdata } = useSelector((state) => state.employees.employees)
    console.log(employees)

    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };

    const recentLead = employees[employees.length - 1];
    useEffect(() => {
        if (feedbackdata) {
            setFeedback(feedbackdata)
        }
        dispatch(fetchEmployee());
    }, [dispatch, feedbackdata]);

    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex items-center justify-between mb-4">
                <h1 className='capitalize text-[26px] font-semibold  '>employee mangement</h1>
                <Breadcrumb />
            </div>
            <div className="w-full">
                {/* Most Recent Lead */}
                <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                    <div className="flex items-center justify-between w-full">
                        <div className="py-6">
                            <h1 className="capitalize text-[26px] font-semibold">Most Recent Added</h1>
                        </div>
                    </div>

                    <table className="w-full border border-collapse border-gray-200">
                        <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                            <tr>
                                <th className="p-2.5 xl:p-5 border border-gray-200">ID</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Email</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Name</th>

                            </tr>
                        </thead>
                        <tbody>
                            {recentLead ? (
                                <tr className="border-b border-gray-200">
                                    <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">1</td>
                                    <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{recentLead?.email}</td>
                                    <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{recentLead?.name}</td>

                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center border border-gray-200">No recent lead added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* All Leads */}
                <div className="w-full p-5 bg-white rounded-md shadow-md">
                    <h1 className="capitalize text-[26px] py-6 font-semibold">All Added</h1>
                    <table className="w-full border border-collapse border-gray-200">
                        <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                            <tr>
                                <th className="p-2.5 xl:p-5 border border-gray-200">ID</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Email</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Name</th>


                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((lead, index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{index + 1}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{lead?.email}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{lead?.name}</td>


                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center border border-gray-200">No leads found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>





        </div>
    );
};

export default Blogpagesection;



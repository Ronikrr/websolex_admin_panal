
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../ui/breadcrumb';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '../../Redux/slice/employyeslice';

const Blogpagesection = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state?.employees);
    const feedbacks = useSelector((state) => state?.employees);


    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };

    useEffect(() => {

        dispatch(fetchEmployee());
    }, [dispatch]);
    useEffect(() => {
        if (feedbacks) {
            setFeedback(feedbacks)
        }
    }, [feedbacks])

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

                {/* All Leads */}
                <div className="w-full p-5 bg-white rounded-md shadow-md">
                    <h1 className="capitalize text-[26px] py-6 font-semibold">All Added</h1>
                    <table className="w-full border border-collapse border-gray-200">
                        <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                            <tr>
                                <th className="p-2.5 xl:p-5 border border-gray-200">ID</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Email</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Name</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees?.employees?.length > 0 ? (
                                employees?.employees.map((lead, index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{index + 1}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{lead?.email}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{lead?.name}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{lead?.role}</td>
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



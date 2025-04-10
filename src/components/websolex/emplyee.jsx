
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../ui/breadcrumb';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchalluser } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Blogpagesection = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state?.auth?.user);
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])
    const { users } = useSelector((state) => state?.auth);
    const employeeRoles = users
        ?.filter(user => user?.role === "employee")
        .map(user => user);
    const feedbacks = useSelector((state) => state?.employees);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        // ✅ Redirect if user is not an admin
        if (user?.role === 'user' || user?.role === 'employee') {
            navigate('/unauthorized');
            return;
        }
    }, [user, navigate]);
    useEffect(() => {
        // Fetch all users when the component mounts
        dispatch(fetchalluser());
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
            <div className="flex flex-col items-center justify-between mb-4 lg:flex-row">
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
                            {employeeRoles?.length > 0 ? (
                                employeeRoles.map((lead, index) => (
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



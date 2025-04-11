
import React, { useEffect, useMemo } from "react";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import Sectiontwo from "../components/websolex/section_two";
import Sectionthree from "../components/websolex/section_three";
import { useDispatch, useSelector } from "react-redux";
import { fetchalluser } from "../Redux/authSlice";
import { fetchcontactform, fetchsubcribe } from "../Redux/slice/contactDetailSlice";
import { fetchourwork } from "../Redux/slice/lastworkslice";
import FeedbackMessage from "../components/ui/feedback";
const Websolexhome = () => {
    const user = useSelector((state) => state?.auth?.users?.length);
    const contact = useSelector((state) => state?.contactfrom?.contactData?.length);
    const subscribefrom = useSelector((state) => state?.contactfrom?.subscribeData?.length);
    const ourwork = useSelector((state) => state?.ourwork?.ourwork?.length);
    const [feedbackMessage, setFeedbackMessage] = React.useState({ message: "", type: "" });
    const feedback = {
        user: useSelector((state) => state?.auth?.feedback),
        contact: useSelector((state) => state?.contactfrom?.feedback),
        ourwork: useSelector((state) => state?.ourwork?.feedback),   
    }
    const dispatch = useDispatch();

    
    useEffect(() => {
        if (feedback.user?.message) {
            setFeedbackMessage({ message: feedback.user?.message, type: feedback.user?.type });
        }
        if (feedback.contact?.message) {
            setFeedbackMessage({ message: feedback.contact?.message, type: feedback.contact?.type });
            
        }
        if (feedback.ourwork?.message) {
            
            setFeedbackMessage({ message: feedback.ourwork?.message, type: feedback.ourwork?.type });
        }
    },[feedback])
    useEffect(() => {
        dispatch(fetchalluser())
        dispatch(fetchcontactform())
        dispatch(fetchsubcribe())
        dispatch(fetchourwork())
    }, [dispatch])
    const onClear = () => {
        setFeedbackMessage({ message: "", type: "" });
    }

    const first = useMemo(() => [
        {
            id: 1,
            icon: <FiEye className="text-[var(--primary-color)] text-[25px]" />,
            balance: user,
            totalview: "Total users",
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
            balance: ourwork,
            totalview: "Total Work",
            pericon: <FaArrowUpLong />,
        },
        {
            id: 4,
            icon: <GoPeople className="text-[var(--primary-color)] text-[25px]" />,
            balance: subscribefrom,
            totalview: "suscribe Count",
            pericon: <FaArrowDownLong />,
        },
    ], [user, contact, ourwork, subscribefrom]);

    return (
        <div className="w-full bg-gray-100 2xl:p-10 md:p-6">
            {/* {error && <div className="mb-4 text-center text-red-500">{error}</div>} */}
            {feedback && (
                <FeedbackMessage
                    message={feedbackMessage.message}
                    type={feedbackMessage?.type} onClear={onClear}
                />
            )}
            <div className="flex flex-wrap w-full mb-7">
                {first.map((item) => (
                    <div key={item.id} className="flex w-full lg:w-6/12 xl:w-3/12 mb-7">
                        <div className="w-full py-6 bg-white border text-center rounded-sm shadow-md lg:w-11/12 border-[var(--border-color)] px-7">
                            <div className="flex justify-start w-full">
                                <div className="flex items-center justify-center bg-gray-100 rounded-full h-11 w-11">
                                    {item.icon}
                                </div>
                            </div>
                            <div className="flex items-end justify-start mt-4">
                                <div className="text-left">
                                    <h4 className="text-[24px] font-semibold">
                                        {item.balance !== null ? item.balance : "Loading..."}
                                    </h4>
                                    <span className=" text-[10px] font-bold flex text-[#64748B]">  {item.totalview || "Loading..."}</span>
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


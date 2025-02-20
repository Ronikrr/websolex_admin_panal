
import React, { useEffect, useState } from 'react';
import BreadcrumbNav from '../../components/ui/breadcrumb';
import Seconduray from '../../components/ui/seconduray';
import Primary from '../../components/ui/primary';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BiCurrentLocation } from 'react-icons/bi';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactDetails, updateContactDetails } from '../../Redux/slice/contactslice';
import { fetchSocialDetails, updateSocialDetails } from '../../Redux/slice/socialslice';
const Contactdetailsection = () => {
    const dispatch = useDispatch();
    const contactDetails = useSelector((state) => state.contact.data)
    const socialDetails = useSelector((state) => state.social.data)
    const contactFeedback = useSelector((state) => state.contact.feedback)
    const socialFeedback = useSelector((state) => state.social.feedback)

    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        dispatch(fetchContactDetails());
        dispatch(fetchSocialDetails())
    }, [dispatch]);
    useEffect(() => {
        if (contactFeedback) {
            setFeedback(contactFeedback)
        }
        if (socialFeedback) {
            setFeedback(socialFeedback)

        }
    }, [contactFeedback, socialFeedback]);

    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'contact') {
            dispatch(updateContactDetails({ ...contactDetails, [name]: value }));
        } else {
            dispatch(updateSocialDetails({ ...socialDetails, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateContactDetails(contactDetails))
    }
   
    const handlesocialSubmit = (e) => {
        e.preventDefault();
        dispatch(updateSocialDetails(socialDetails))
    }
    return (
        <div className=''>
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="w-full">
                <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-semibold text-black text-[26px] ">Contact details</h2>
                    <BreadcrumbNav />
                </div>
                <div className="flex flex-col gap-8 lg:flex-row ">
                    <div className="w-full xl:w-6/12">
                        <div className="bg-white border rounded-sm border-[var(--border-color)] shadow-default ">
                            <div className="py-4 border-b border-[var(--border-color)] capitalize px-7 ">
                                contact details
                            </div>
                            <div className="p-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                                        <div className="w-full sm:w-1/2 ">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >address</label>
                                            <div className="relative">
                                                <input
                                                    name={'address'}
                                                    value={contactDetails?.address}
                                                    onChange={(e) => handleInputChange(e, 'contact')}
                                                    placeholder={"contact address"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                                <div className="absolute top-4 right-4 ">
                                                    <BiCurrentLocation className='text-[20px] text-[#64748b]' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2 ">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >phone number</label>
                                            <div className="relative">
                                                <input
                                                    name={'phoneno'}
                                                    value={contactDetails?.phoneno}
                                                    onChange={(e) => handleInputChange(e, 'contact')}
                                                    placeholder={"enter phone number"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                                <div className="absolute top-4 right-4 ">
                                                    <FaPhoneAlt className='text-[20px] text-[#64748b]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="w-full">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >avaliablity</label>
                                            <div className="relative">
                                                <input
                                                    name={'avaliablity'}
                                                    value={contactDetails?.avaliablity}
                                                    onChange={(e) => handleInputChange(e, 'contact')}
                                                    placeholder={"enter avaliablity"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="w-full">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >emails</label>
                                            <div className="relative">
                                                <input
                                                    name={'email'}
                                                    value={contactDetails?.email}
                                                    onChange={(e) => handleInputChange(e, 'contact')}
                                                    placeholder={"enter email"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                                <div className="absolute top-4 right-4 ">
                                                    <MdOutlineMailOutline className='text-[20px] text-[#64748b]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <Seconduray label={"Cancel"} />
                                        <Primary label={"Save"} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Second Form for Social Media */}
                    <div className="w-full xl:w-6/12">
                        <div className="bg-white border rounded-sm border-[var(--border-color)] shadow-default ">
                            <div className="py-4 border-b capitalize border-[var(--border-color)]  px-7 ">
                                social media
                            </div>
                            <div className="p-7">
                                <form onSubmit={handlesocialSubmit}>
                                    <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                                        <div className="w-full sm:w-1/2 ">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >facebook</label>
                                            <div className="relative">
                                                <input
                                                    name={'facebook'}
                                                    onChange={(e) => handleInputChange(e, 'social')}
                                                    value={socialDetails?.facebook}
                                                    placeholder={"enter facebook link"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                                <div className="absolute top-4 right-4 ">
                                                    <FaFacebook className='text-[20px] text-[#64748b]' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-1/2 ">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >whatsapp</label>
                                            <div className="relative">
                                                <input
                                                    name={'whatsapp'}
                                                    onChange={(e) => handleInputChange(e, 'social')}
                                                    value={socialDetails?.whatsapp}
                                                    placeholder={"enter whatsapp link"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                                <div className="absolute top-4 right-4 ">
                                                    <FaWhatsapp className='text-[20px] text-[#64748b]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="w-full">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >instagram</label>
                                            <div className="relative">
                                                <input
                                                    name={'instagram'}
                                                    onChange={(e) => handleInputChange(e, 'social')}
                                                    value={socialDetails?.instagram}
                                                    placeholder={"enter instagram link"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                                <div className="absolute top-4 right-4 ">
                                                    <FaInstagram className='text-[20px] text-[#64748b]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="w-full">
                                            <label htmlFor="" className='block mb-3 text-sm font-medium text-black capitalize' >linkedin</label>
                                            <div className="relative">
                                                <input
                                                    name={'linkedin'}
                                                    onChange={(e) => handleInputChange(e, 'social')}
                                                    value={socialDetails?.linkedin}
                                                    placeholder={"enter linkedin link"}
                                                    className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 pl-4 pr-10 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                                />
                                                <div className="absolute top-4 right-4 ">
                                                    <FaLinkedin className='text-[20px] text-[#64748b]' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        <Seconduray label={"Cancel"} />
                                        <Primary label={"Save"} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactdetailsection;

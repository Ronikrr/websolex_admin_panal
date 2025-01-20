
import React, { useEffect, useState } from 'react';
import BreadcrumbNav from '../../components/ui/breadcrumb';
import Seconduray from '../../components/ui/seconduray';
import Primary from '../../components/ui/primary';
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BiCurrentLocation } from 'react-icons/bi';
import FeedbackMessage from '../ui/feedback';
const Contactdetailsection = () => {
    const [contactDetails, setContactDetails] = useState({
        address: '',
        phoneno: '',
        avaliablity: '',
        email: ''
    });
    const [socialdetails, setsocial] = useState({
        facebook: '',
        whatsapp: '',
        instagram: '',
        linkedin: '',
    });

    const [soid, setsoId] = useState(null);
    const [id, setId] = useState(null);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/api/contactdetails', {
                    method: 'GET',
                });

                const data = await res.json();
                if (data && data.length > 0) {
                    setContactDetails(data[0]);
                    setId(data[0]._id);
                }
            } catch (error) {
                setFeedback({
                    message: `Error fetching contact :${error}`,
                    type: 'error',
                });
            }
        };
        const fetchsocialDetails = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/api/socialdetails', {
                    method: 'GET',
                });

                const data = await res.json();
                if (data && data.length > 0) {
                    setsocial(data[0]);
                    setsoId(data[0]._id);
                }
            } catch (error) {
                setFeedback({
                    message: `Error fetching social details:${error}`,
                    type: 'error',
                });
            }
        };
        fetchsocialDetails();
        fetchContactDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactDetails({
            ...contactDetails,
            [name]: value
        });
    };
    const handlesocialChange = (e) => {
        const { name, value } = e.target;
        setsocial({
            ...socialdetails,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (id) {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/api/contactdetails', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id,
                        ...contactDetails
                    }),
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    setFeedback({
                        message: `Error fetching contact details:${errorData}`,
                        type: 'error',
                    });
                }
            } catch (error) {
                setFeedback({
                    message: `Error fetching contact details:${error}`,
                    type: 'error',
                });
            }
        } else {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/api/contactdetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactDetails),
                });
                const data = await res.json();
                setId(data.member._id);
            } catch (error) {
                setFeedback({
                    message: `Error fetching contact details:${error}`,
                    type: 'error',
                });
            }
        }
    };
    
    const handlesocialSubmit = async (e) => {
        e.preventDefault();

        if (soid) {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/api/socialdetails', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: soid, // Ensure you are sending the correct ID
                        ...socialdetails
                    }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    setFeedback({
                        message: `Error: ${errorData.message || 'Failed to update social details'}`,
                        type: 'error',
                    });
                }

              
            
            } catch (error) {
                setFeedback({
                    message: `Error fetching social details:${error}`,
                    type: 'error',
                });
            }
        } else {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/api/socialdetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(socialdetails),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    setFeedback({
                        message: `Error: ${errorData.message || 'Failed to update social details'}`,
                        type: 'error',
                    });
                }

                const data = await res.json();
                
                setsocial({ ...socialdetails, _id: data.member._id }); // Update state with new ID
            } catch (error) {
                setFeedback({
                    message: `Error: ${error.message || 'Failed to update social details'}`,
                    type: 'error',
                });
            }
        }
    };
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
                                                    onChange={handleChange}
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
                                                    onChange={handleChange}
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
                                                    onChange={handleChange}
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
                                                    onChange={handleChange}
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
                                                    onChange={handlesocialChange}
                                                    value={socialdetails?.facebook}
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
                                                    onChange={handlesocialChange}
                                                    value={socialdetails?.whatsapp}
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
                                                    onChange={handlesocialChange}
                                                    value={socialdetails?.instagram}
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
                                                    onChange={handlesocialChange}
                                                    value={socialdetails?.linkedin}
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

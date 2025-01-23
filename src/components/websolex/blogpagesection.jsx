import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input'
import Primary from '../ui/primary'
import Seconduray from '../ui/seconduray';
import Breadcrumb from '../ui/breadcrumb';
import axios from 'axios';
import FeedbackMessage from '../ui/feedback';
const Blogpagesection = () => {
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [errors, setErrors] = useState({});
    const [isOpenLastAll, setIsOpenLastAll] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        setTimeout(() => {
            setIsOpenLastAll(false);
        }, 3000);
    }, [isOpenLastAll]);

    useEffect(() => {
        const fetchleads = async () => {
            try {
                const res = await fetch('https://websolex-admin.vercel.app/api/blogpage', {
                    method: "GET",
                });

                // Check if the response is successful
                if (!res.ok) {
                    setFeedback({
                        message: `Error fetching blog data:${res.message}`,
                        type: 'error',
                    });
                }

                const data = await res.json();
                setLeads(data);
            } catch (error) {
                setFeedback({
                    message: `Error fetching blog data:${error}`,
                    type: 'error',
                });
            }
        };
        fetchleads();
    }, []);
    const validateForm = (data) => {
        const newErrors = {};
        if (!data.name || data.name.trim() === '') newErrors.name = 'Name is required';
        if (!data.title1 || data.title1.trim() === '') newErrors.title1 = 'title1 is required';
        if (!data.description1 || data.description1.trim() === '') newErrors.description1 = 'description1 is required';
        if (!data.title2 || data.title2.trim() === '') newErrors.title2 = 'title2 is required';
        if (!data.description2 || data.description2.trim() === '') newErrors.description2 = 'description2 is required';
        if (!data.title3 || data.title3.trim() === '') newErrors.title3 = 'title3 is required';
        if (!data.description3 || data.description3.trim() === '') newErrors.description3 = 'description3 is required';

        if (!imageFile) newErrors.image = 'Image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleAddSave = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const title1 = e.target.title1.value;
        const description1 = e.target.description1.value;
        const title2 = e.target.title2.value;
        const description2 = e.target.description2.value;
        const title3 = e.target.title3.value;
        const description3 = e.target.description3.value;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("title1", title1);
        formData.append("description1", description1);
        formData.append("title2", title2);
        formData.append("description2", description2);
        formData.append("title3", title3);
        formData.append("description3", description3);

        if (imageFile) formData.append("image_blog_work", imageFile);

        // Validate form
        if (!validateForm({ name, title1, description1, title2, description2, title3, description3, image: imageFile })) return;

        try {
            const response = await axios.post(`https://websolex-admin.vercel.app/api/blogpage`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                setIsOpenAddModel(false);  // Close the modal
                setFeedback({
                    message: `blog added successfully!`,
                    type: 'success',
                });
                setLeads([...leads, response.data.blogadd.savedblogadd]);
                resetFormFields(e);
            }
        } catch (error) {
            setFeedback({
                message: `Error : Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const title1 = e.target.title1.value;
        const description1 = e.target.description1.value;
        const title2 = e.target.title2.value;
        const description2 = e.target.description2.value;
        const title3 = e.target.title3.value;
        const description3 = e.target.description3.value;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("title1", title1);
        formData.append("description1", description1);
        formData.append("title2", title2);
        formData.append("description2", description2);
        formData.append("title3", title3);
        formData.append("description3", description3);

        if (imageFile) formData.append("image_blog_work", imageFile);

        // Validate form
        if (!validateForm({ name, title1, description1, title2, description2, title3, description3, image: imageFile })) return;

        try {
            const response = await axios.put(`https://websolex-admin.vercel.app/api/blogpage/${selectedLead._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                setIsOpenModel(false);  
                setFeedback({
                    message: `blog updated successfully!`,
                    type: 'success',
                });
                setLeads(leads.map(lead => (lead._id === selectedLead._id ? response.data.updatedBlog : lead)));
                resetFormFields(e);
            }
        } catch (error) {

            setFeedback({
                message: `Error : Failed to updating lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };

    const resetFormFields = (e) => {
        if (e && e.target) {
            e.target.reset();
        }
        setImageFile(null);
        setImagePreview(null);
        setErrors({});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const recentLead = leads[leads.length - 1];

    const handleEditClick = (lead) => {
        setSelectedLead(lead);
        setImageFile(lead.image);
        setImagePreview(lead.image);
        setIsOpenModel(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://websolex-admin.vercel.app/api/blogpage/${id}`, {
                method: 'DELETE',
            });
            setLeads(leads.filter((lead) => lead._id !== id));
            setFeedback({
                message: `blog deleted successfully!`,
                type: 'success',
            });
        } catch (error) {
            setFeedback({
                message: `Error deleting blog. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };




    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex flex-col items-center justify-between mb-4 lg:flex-row">
                <h1 className='capitalize text-[26px] font-semibold  '>blog page</h1>
                <Breadcrumb />
            </div>

            {/* Most Recent Lead */}
            <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">

                <div className="flex items-center justify-between w-full">
                    <div className="py-6">
                        <h1 className='capitalize text-[26px] font-semibold '>Most Recent added</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="relative cursor-pointer ">
                            <button className='flex items-center gap-3 rounded-lg px-6 py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000' title='add' onClick={() => setIsOpenAddModel(true)} >
                                <IoMdAdd /> add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                    <div className="p-2.5  flex-1">ID</div>
                    <div className="p-2.5  flex-1">Image</div>
                    <div className="p-2.5  flex-1">Name</div>
                    <div className="p-2.5  flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {recentLead ? (
                        <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                            <div className="flex-1 p-2.5">1</div>
                            <div className="flex-1 p-2.5">
                                <img src={recentLead?.image} alt={recentLead?.name} className="object-cover w-16 h-16 aspect-square" />
                            </div>
                            <div className="flex-1 p-2.5">{recentLead?.name}</div>


                            <div className="flex items-center flex-1 gap-2">
                                <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(recentLead)}>
                                    <FaRegEdit />
                                </button>
                                <button className="text-red-500 hover:text-black" onClick={() => handleDelete(recentLead?._id)}>
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 text-center">
                            <p>No recent lead added yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* All Leads */}
            <div className="w-full p-5 bg-white rounded-md shadow-md">
                <h1 className='capitalize text-[26px] py-6 font-semibold'>All added</h1>
                <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                    <div className="p-2.5  flex-1">ID</div>
                    <div className="p-2.5  flex-1">Image</div>
                    <div className="p-2.5  flex-1">Name</div>
                    <div className="p-2.5  flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {leads.length > 0 ? (
                        leads.map((lead, index) => (
                            <div key={index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                                <div className="p-2.5  flex-1">{index + 1}</div>
                                <div className="p-2.5  flex-1">
                                    <img src={lead?.image} alt={lead?.name || 'Lead Image'} className="object-cover w-16 h-16 aspect-w-1 aspect-h-1" />
                                </div>
                                <div className="p-2.5  flex-1">{lead?.name}</div>

                                <div className="flex items-center flex-1 gap-2">
                                    <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(lead)}>
                                        <FaRegEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-black" onClick={() => handleDelete(lead?._id)}>
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                        )
                        )
                    ) : (
                        <div className="p-4 text-center">
                            <p>No leads found.</p>
                        </div>
                    )}
                </div>
            </div>

            {(isOpenAddModel || isOpenModel) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">{isOpenAddModel ? 'Add New Lead' : 'Edit Lead'}</h1>
                        <form className="flex flex-col gap-4" onSubmit={isOpenAddModel ? handleAddSave : handleEditSave}>

                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Name:</label>
                                <Input
                                    type="text"
                                    name="name"
                                    defaultValue={isOpenModel ? selectedLead.name : ''}

                                    placeholder="Enter name"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                            <div className="flex flex-row flex-col items-center gap-4 md:flex-row ">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">title1:</label>
                                    <Input
                                        type="text"
                                        name="title1"
                                        defaultValue={isOpenModel ? selectedLead.title1 : ''}

                                        placeholder="Enter title1"
                                    />
                                    {errors.title1 && <p className="text-sm text-red-500">{errors.title1}</p>}
                                </div> <div className="flex flex-col w-full">
                                    <label className="text-gray-600">description1:</label>
                                    <Input
                                        type="text"
                                        name="description1"
                                        defaultValue={isOpenModel ? selectedLead.description1 : ''}

                                        placeholder="Enter description1"
                                    />
                                    {errors.description1 && <p className="text-sm text-red-500">{errors.description1}</p>}
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">title2:</label>
                                    <Input
                                        type="text"
                                        name="title2"
                                        defaultValue={isOpenModel ? selectedLead.title2 : ''}

                                        placeholder="Enter title2"
                                    />
                                    {errors.title2 && <p className="text-sm text-red-500">{errors.title2}</p>}
                                </div> <div className="flex flex-col w-full">
                                    <label className="text-gray-600">description2:</label>
                                    <Input
                                        type="text"
                                        name="description2"
                                        defaultValue={isOpenModel ? selectedLead.description2 : ''}

                                        placeholder="Enter description2"
                                    />
                                    {errors.description2 && <p className="text-sm text-red-500">{errors.description2}</p>}
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">title3:</label>
                                    <Input
                                        type="text"
                                        name="title3"
                                        defaultValue={isOpenModel ? selectedLead.title3 : ''}

                                        placeholder="Enter title3"
                                    />
                                    {errors.title3 && <p className="text-sm text-red-500">{errors.title3}</p>}
                                </div> <div className="flex flex-col w-full">
                                    <label className="text-gray-600">description3:</label>
                                    <Input
                                        type="text"
                                        name="description3"
                                        defaultValue={isOpenModel ? selectedLead.description3 : ''}

                                        placeholder="Enter description3"
                                    />
                                    {errors.description3 && <p className="text-sm text-red-500">{errors.description3}</p>}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input
                                        type="file"
                                        name="image_blog_work"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img src={isOpenModel ? imagePreview : imagePreview} alt="Preview" className="w-16 h-16" />
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <Primary type="submit" label={isOpenAddModel ? 'Save' : 'Update'} />
                                <Seconduray
                                    type="button"
                                    label={"Cancel"}
                                    onClick={() => (isOpenAddModel ? setIsOpenAddModel(false) : setIsOpenModel(false))}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blogpagesection;


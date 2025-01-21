import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaRegEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input'
import Primary from '../ui/primary'
import Seconduray from '../ui/seconduray';
import Breadcrumb from '../ui/breadcrumb';
import axios from 'axios';
import FeedbackMessage from '../ui/feedback';


const Servicepagesection = () => {
    const [leads, setLeads] = useState([]);
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);
    const [isOpenLastAll, setIsOpenLastAll] = useState(false);
    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    const toggleViewMode = (leads) => {
        setSelectedLead(leads);
        setIsViewMode(true);
    };

    const API_URL = "https://websolex-admin.vercel.app/api/teampage";

    const fetchleads = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setLeads(data);

        } catch (error) {
            setFeedback({
                message: `Error fetching team members:${error}`,
                type: 'error',
            });
        }
    };


    useEffect(() => {
        fetchleads();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsOpenLastAll(false);
        }, 3000);
    }, [isOpenLastAll]);

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.name || data.name.trim() === '') newErrors.name = 'Name is required';
        if (!data.post || data.post.trim() === '') newErrors.post = 'Post is required';
        if (!imageFile) newErrors.image = 'Image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddSave = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const post = e.target.post.value;
        const linkedin = e.target.linkedin.value;
        const insta = e.target.insta.value;
        const facebook = e.target.facebook.value;

        // Prepare form data for the request
        const formData = new FormData();
        formData.append("name", name);
        formData.append("post", post);
        formData.append("linkedin", linkedin);
        formData.append("insta", insta);
        formData.append("facebook", facebook);
        if (imageFile) formData.append("image", imageFile);

        // Validate form
        if (!validateForm({ name, post, image: imageFile })) return;

        try {
            const response = await axios.post(`https://websolex-admin.vercel.app/api/teampage`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                setIsOpenModel(false);
                setFeedback({
                    message: `Team member added successfully!`,
                    type: 'success',
                });
                const result = await response.json();
                setLeads([...leads, result.data.savedMember]);
                resetFormFields(e);
            }

        } catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };



    const handleEditSave = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const post = e.target.post.value;
        const linkedin = e.target.linkedin.value;
        const insta = e.target.insta.value;
        const facebook = e.target.facebook.value;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("post", post);
        formData.append("linkedin", linkedin);
        formData.append("insta", insta);
        formData.append("facebook", facebook);
        if (imageFile) formData.append("image", imageFile);

        if (!validateForm({ name, post, image: imageFile })) return;

        try {
            const response = await fetch(`https://websolex-admin.vercel.app/api/teampage/${selectedLead._id}`, {
                method: 'PUT',
                body: formData,
            });
            const result = await response.json();
            if (response.status === 200) {
                setIsOpenModel(false);
                setLeads(leads.map((lead) => (lead._id === selectedLead._id ? result.member : lead)));
                setFeedback({
                    message: `Our team has been updated successfully!`,
                    type: 'success',
                });
                resetFormFields(e);
            }

        } catch (error) {
            setFeedback({
                message: `Error updating team member:: ${error}`,
                type: 'error',
            });
        }
    };

    const resetFormFields = (e) => {
        if (e && e.target) {
            e.target.reset()
        }
        setImageFile(null);
        setImagePreview(null);
        setErrors({});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image (JPEG, PNG, or GIF)');
                return;
            }
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                alert('File is too large. Please upload an image smaller than 5MB');
                return;
            }
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
            await fetch(`https://websolex-admin.vercel.app/api/teampage/${id}`, {
                method: 'DELETE',
            });
            setLeads(leads.filter((lead) => lead._id !== id));
            setFeedback({
                message: `our team deleted successfully!`,
                type: 'success',
            });
        } catch (error) {
            setFeedback({
                message: `Error deleting team member. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };

    const handleSubmit = isOpenAddModel ? handleAddSave : isViewMode ? null : handleEditSave;


    return (
        <div className="w-full h-screen bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex flex-col items-center justify-between mb-4 sm:flex-row">
                <h1 className='capitalize text-[26px] font-semibold  '>team page</h1>
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
                    <div className="p-2.5 xl:p-5 flex-1">ID</div>
                    <div className="p-2.5 xl:p-5 flex-1">Image</div>
                    <div className="p-2.5 xl:p-5 flex-1">Name</div>
                    <div className="p-2.5 xl:p-5 flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {recentLead ? (
                        <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                            <div className="flex-1">{1}</div>
                            <div className="flex-1">
                                <img src={recentLead.image} alt={recentLead.name} className="object-cover w-16 h-16 aspect-square" />
                            </div>
                            <div className="flex-1">{recentLead.name}</div>


                            {/* Render Star Rating for Recent Lead */}


                            <div className="flex items-center flex-1 gap-2">
                                <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(recentLead)}>
                                    <FaRegEdit />
                                </button>
                                <button className="text-gray-600 hover:text-black" onClick={() => toggleViewMode(recentLead)}>
                                    <FaRegEye />
                                </button>
                                <button className="text-red-500 hover:text-black" onClick={() => handleDelete(recentLead._id)}>
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
                    <div className="p-2.5 xl:p-5 flex-1">ID</div>
                    <div className="p-2.5 xl:p-5 flex-1">Image</div>
                    <div className="p-2.5 xl:p-5 flex-1">Name</div>
                    <div className="p-2.5 xl:p-5 flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {leads.length > 0 ? (

                        leads.map((lead, index) => {

                            return (
                                <div key={lead._id || index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                                    <div className="flex-1"> {lead.id || index + 1}</div>
                                    <div className="flex-1">
                                        <img src={lead.image} alt={lead.name || 'Lead Image'} className="object-cover w-16 h-16 aspect-w-1 aspect-h-1" />
                                    </div>
                                    <div className="flex-1">{lead.name}</div>

                                    <div className="flex items-center flex-1 gap-2">
                                        <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(lead._id)}>
                                            <FaRegEdit />
                                        </button>
                                        <button className="text-red-500 hover:text-black" onClick={() => handleDelete(lead._id)}>
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="p-4 text-center">
                            <p>No leads found.</p>
                        </div>
                    )}
                </div>
            </div>

            {(isOpenAddModel || isOpenModel || isViewMode) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">

                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">
                            {isOpenAddModel ? 'Add New Lead' : isViewMode ? 'View Lead' : 'Edit Lead'}
                        </h1>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col items-center gap-1 lg:gap-4 lg:flex-row">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Name:</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        defaultValue={isOpenModel ? selectedLead.name : ''}
                                        placeholder="Enter name"
                                        disabled={isViewMode}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Post:</label>
                                    <Input
                                        type="text"
                                        name="post"
                                        defaultValue={isOpenModel ? selectedLead.post : ''}
                                        placeholder="Enter post"
                                        disabled={isViewMode}
                                    />
                                    {errors.insta && <p className="text-sm text-red-500">{errors.insta}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1 lg:gap-4 lg:flex-row">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">LinkedIn:</label>
                                    <Input
                                        type="url"
                                        name="linkedin"
                                        className="p-2.5 xl:p-3 border border-gray-200 rounded-md"
                                        defaultValue={isOpenModel ? selectedLead.linkedin : ''}
                                        placeholder="Enter LinkedIn"
                                        disabled={isViewMode}
                                    />
                                    {errors.linkedin && <p className="text-sm text-red-500">{errors.linkedin}</p>}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Instagram:</label>
                                    <Input
                                        type="text"
                                        name="insta"
                                        defaultValue={isOpenModel ? selectedLead.insta : ''}
                                        placeholder="Enter Instagram"
                                        disabled={isViewMode}
                                    />
                                    {errors.insta && <p className="text-sm text-red-500">{errors.insta}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Facebook:</label>
                                <Input
                                    type="text"
                                    name="facebook"
                                    defaultValue={isOpenModel ? selectedLead.facebook : ''}
                                    placeholder="Enter Facebook"
                                    disabled={isViewMode}
                                />
                                {errors.facebook && <p className="text-sm text-red-500">{errors.facebook}</p>}
                            </div>


                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={isViewMode}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img src={isOpenModel ? imagePreview : imagePreview} alt="Preview" className="w-16 h-16" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between mt-4">
                                {!isViewMode && (
                                    <Primary type="submit" className="btn btn-primary">
                                        {isOpenAddModel ? 'Save' : 'Update'}
                                    </Primary>
                                )}
                                <Seconduray
                                    type="button"
                                    label={"Cancel"}
                                    onClick={() => (isOpenAddModel ? setIsOpenAddModel(false) : isViewMode ? setIsViewMode(false) : setIsOpenModel(false))}
                                >
                                    Cancel
                                </Seconduray>
                            </div>
                        </form>
                    </div>
                </div>
            )}



        </div>
    );
};

export default Servicepagesection;


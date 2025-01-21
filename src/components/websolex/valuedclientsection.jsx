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

const Valuedclientsection = () => {
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
    const API_URL = "https://websolex-admin.vercel.app/api/valuedclients";

    const fetchleads = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setLeads(data);
            console.log(data)

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

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.name || data.name.trim() === '') newErrors.name = 'Name is required';
        if (!imageFile) newErrors.image = 'Image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddSave = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;

        const formData = new FormData();
        formData.append("name", name)
        formData.append("images", imageFile);

        if (!validateForm({ name, images: imageFile })) return;

        try {
            const res = await axios.post(`https://websolex-admin.vercel.app/api/valuedclients`,
                formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (res.status === 200) {
                setIsOpenAddModel(false);
                setFeedback({
                    message: `Valued client added successfully!`,
                    type: 'success',
                });
                const result = await res.json();
                setLeads([...leads, result.data.client.savedclient]);
                resetFormFields(e);
            }
        }
        catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });  
        }
    };
    const handleEditSave = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;


        const formData = new FormData();
        formData.append("name", name);

        if (imageFile) formData.append("images", imageFile);

        if (!validateForm({ name, image: imageFile })) return;

        try {
            const response = await fetch(`https://websolex-admin.vercel.app/api/valuedclients/${selectedLead._id}`, {
                method: 'PUT',
                body: formData,
            });
            const result = await response.json();
            if (response.status === 200) {
                setIsOpenModel(false);
                setLeads(leads.map((lead) => (lead._id === selectedLead._id ? result.member : lead)));
                setFeedback({
                    message: `Our client has been updated successfully!!`,
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
            await fetch(`https://websolex-admin.vercel.app/api/valuedclients/${id}`, {
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
  

    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex items-center justify-between mb-4">
                <h1 className='capitalize text-[26px] font-semibold  '>valued cilent</h1>
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
                            <div className="flex-1">1</div>
                            <div className="flex-1">
                                <img src={recentLead.image} alt={recentLead.name} className="object-cover w-16 h-16 aspect-square" />
                            </div>
                            <div className="flex-1">{recentLead.name}</div>
                            <div className="flex items-center flex-1 gap-2">
                                <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(recentLead)}>
                                    <FaRegEdit />
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
                                <div key={lead.id || index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                                    <div className="flex-1">{lead.id || index + 1}</div>
                                    <div className="flex-1">
                                        <img src={lead.image} alt={lead.name || 'Lead Image'} className="object-cover w-16 h-16 aspect-w-1 aspect-h-1" />
                                    </div>
                                    <div className="flex-1">{lead.name}</div>



                                    <div className="flex items-center flex-1 gap-2">
                                        <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(lead)}>
                                            <FaRegEdit />
                                        </button>
                                        <button className="text-red-500 hover:text-black" onClick={() => handleDelete(lead._id)}>
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                            )
                        }
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

                            {/* Image Upload */}
                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input
                                        type="file"
                                        name="images"
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
                                <Primary type="submit" className="btn btn-primary" labal={isOpenAddModel ? 'Save' : 'Update'} >

                                </Primary>
                                <Seconduray
                                    type="button"
                                    label={"Cancel"}
                                    onClick={() => (isOpenAddModel ? setIsOpenAddModel(false) : setIsOpenModel(false))}
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

export default Valuedclientsection;



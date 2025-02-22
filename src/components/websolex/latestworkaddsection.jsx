import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input'
import Primary from '../ui/primary'
import Seconduray from '../ui/seconduray';
import Breadcrumb from '../ui/breadcrumb';
import Textarea from '../ui/textarea';
import ProjectForm from './projectform'
import FeedbackMessage from '../ui/feedback';
import Static from './static';
import { useDispatch, useSelector } from 'react-redux';
import { fetchourwork, addOurWork, updateOurwork, deleteOurwork } from '../../Redux/slice/lastworkslice';
import { Link } from 'react-router-dom';
const initialState = {
    name: '',
    description: '',
    category: '',
    work: '',
    image: null,
    imagePreview: null
}
const Latestworkaddsection = () => {
    const dispatch = useDispatch();
    const { ourwork, feedback: feedbackdata } = useSelector((state) => state.ourwork)
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [errors, setErrors] = useState({});
    const [isOpenLastAll, setIsOpenLastAll] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [formData, setformData] = useState(initialState);
    useEffect(() => {
        dispatch(fetchourwork());
    }, [dispatch]);
    useEffect(() => {
        if (feedbackdata) {
            setFeedback(feedbackdata)
        }
    }, [feedbackdata])
    useEffect(() => {
        setTimeout(() => {
            setIsOpenLastAll(false);
        }, 3000);
    }, [isOpenLastAll]);

    const validateForm = (formData) => {
        const newErrors = {};
        if (!formData.name || formData.name.trim() === '') newErrors.name = 'Name is required';
        if (!formData.description || formData.description.trim() === '') newErrors.description = 'Description is required';
        if (!formData.work || formData.work.trim() === '') newErrors.work = 'work details are required';
        if (!formData.image) newErrors.image = 'Image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddSave = async (e) => {
        e.preventDefault();

        const newFormData = new FormData();
        newFormData.append("name", formData.name);
        newFormData.append("description", formData.description);
        newFormData.append("category", formData.category);
        newFormData.append("work", formData.work);
        if (formData.image) newFormData.append("image_work", formData.image);

        if (!validateForm(formData)) return;

        try {
            await dispatch(addOurWork(newFormData)).unwrap();
            resetFormFields();
            setIsOpenAddModel(false);
        } catch (error) {
            setFeedback({
                message: `Failed to add work. Please try again. ${error?.response?.data || error.message}`,
                type: 'error',
            });
        }
    };

    const handleEditSave = async (id) => {
        const newFormData = new FormData();
        newFormData.append("name", formData.name);
        newFormData.append("description", formData.description);
        newFormData.append("category", formData.category);
        newFormData.append("work", formData.work);
        if (formData.image) newFormData.append("image_work", formData.image);
        if (!validateForm(formData)) return;
        try {
            await dispatch(updateOurwork({ id, formData: newFormData })).unwrap();
            resetFormFields();
            setIsOpenModel(false);
        } catch (error) {
            setFeedback({
                message: `Error updating work: ${error?.message}`,
                type: 'error',
            });
        }
    };

    const resetFormFields = () => {
        setformData(initialState)
        setErrors({});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            img.src = event.target.result;
        };

        img.onload = () => {
            if (img.width === img.height) {

                setformData((prev) => ({
                    ...prev,
                    image: file,
                    imagePreview: URL.createObjectURL(file)
                }))
            } else {
                setFeedback({
                    message: `Only square images are allowed.`,
                    type: 'error',
                });
            }
        };

        reader.readAsDataURL(file);
    };
    const recentLead = ourwork[ourwork.length - 1];

    const handleEditClick = (lead) => {
        setformData({
            name: lead.name,
            description: lead.description,
            category: lead.category,
            work: lead.work,
            image: lead.image,
            imagePreview: lead.image
        })
        setIsOpenModel(true);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setformData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteOurwork(id));
        }
    };
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    const handleOpenAddModal = () => {
        resetFormFields();
        setIsOpenAddModel(true);
    }

    return (
        <div className="w-full bg-gray-100 ">

            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex flex-col items-center justify-between mt-4 mb-4 lg:flex-row lg:mt-0">
                <h1 className='capitalize text-[26px] font-semibold  '>our work</h1>
                <Breadcrumb />
            </div>
            <div className="flex flex-col items-start lg:flex-row gap-7 ">
                <div className="w-full md:w-7/12">
                    {/* Most Recent Lead */}
                    <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                        <div className="flex items-center justify-between w-full">
                            <div className="py-6">
                                <h1 className="capitalize lg:text-[26px] font-semibold ">Most Recent added</h1>
                            </div>
                            <div className="flex items-center">
                                <div className="relative cursor-pointer ">
                                    <button
                                        className="flex items-center gap-3 rounded-lg px-4 py-1 lg:px-6 lg:py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000"
                                        title="add"
                                        onClick={handleOpenAddModal}
                                    >
                                        <IoMdAdd /> add
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border border-collapse border-gray-200">
                                {/* Table Header */}
                                <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase">
                                    <tr>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 w-[75px]">ID</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Image</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">Name</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">category</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Action</th>
                                    </tr>
                                </thead>
                                {/* Table Body */}
                                <tbody>
                                    {recentLead ? (
                                        <tr key={recentLead?.id} className="text-center border-b border-gray-200">
                                            <td className="p-2.5 xl:p-3 border border-gray-200">1</td>
                                            <td className="p-2.5 xl:p-3 border border-gray-200">
                                                <Link to={recentLead?.image} className='cursor-pointer' target='_blank' >

                                                    <img
                                                        src={recentLead?.image}
                                                        alt={recentLead?.name || 'Lead Image'}
                                                        className="object-cover w-8 h-8 mx-auto lg:w-16 lg:h-16 aspect-square"
                                                    />
                                                </Link>
                                            </td>
                                            <td
                                                className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                                title={recentLead?.name}
                                            >
                                                {recentLead?.name}
                                            </td>
                                            <td
                                                className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                                title={recentLead?.category}
                                            >
                                                {recentLead?.category}
                                            </td>
                                            <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                                <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(recentLead)}>
                                                    <FaRegEdit />
                                                </button>
                                                <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDelete(recentLead._id)}>
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-4 text-center">No leads found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="w-full p-5 bg-white rounded-md shadow-md">
                        <h1 className="capitalize text-[15px] lg:text-[26px] py-6 font-semibold">All added</h1>

                        <div className="overflow-x-auto ">
                            <table className="w-full border border-collapse border-gray-200 rounded-md">
                                {/* Table Header */}
                                <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase">
                                    <tr>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 w-[75px]">ID</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Image</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">Name</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">category</th>
                                        <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Action</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody>
                                    {ourwork?.length > 0 ? (
                                        ourwork?.map((lead, index) => (
                                            <tr key={lead.id || index} className="text-center border-b border-gray-200">
                                                <td className="p-2.5 xl:p-3 border border-gray-200">{lead?.id || index + 1}</td>
                                                <td className="p-2.5 xl:p-3 border border-gray-200">
                                                    <Link
                                                        to={lead?.image} className='cursor-pointer' target='_blank
                                                        ' >

                                                    <img
                                                        src={lead?.image}
                                                        alt={lead?.name || 'Lead Image'}
                                                        className="object-cover w-8 h-8 mx-auto lg:w-16 lg:h-16 aspect-square"
                                                    />
                                                    </Link>
                                                </td>
                                                <td
                                                    className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                                    title={lead?.name}
                                                >
                                                    {lead?.name}
                                                </td>
                                                <td
                                                    className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                                    title={lead?.category}
                                                >
                                                    {lead?.category}
                                                </td>

                                                <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                                    <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(lead)}>
                                                        <FaRegEdit />
                                                    </button>
                                                    <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDelete(lead?._id)}>
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-4 text-center">No leads found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-5/12">
                    <div className="bg-white mb-7 lg:mb-0 border rounded-sm border-[var(--border-color)] shadow-default ">
                        <div className="py-4 border-b border-[var(--border-color)] capitalize  px-7 ">
                            client & completed project
                        </div>
                        <div className="p-7">
                            <ProjectForm />
                        </div>

                    </div>
                    <div className="bg-white lg:mt-7 border rounded-sm border-[var(--border-color)] shadow-default ">
                        <div className="py-4 border-b border-[var(--border-color)] capitalize  px-7 ">
                            set static
                        </div>
                        <div className="p-7">
                            <Static />
                        </div>

                    </div>
                </div>
            </div>
            {(isOpenAddModel || isOpenModel) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">{isOpenAddModel ? 'Add New Lead' : 'Edit Lead'}</h1>
                        <form className="flex flex-col gap-4" onSubmit={isOpenAddModel ? handleAddSave : handleEditSave}>
                            <div className="flex flex-col items-center gap-1 lg:gap-4 lg:flex-row ">
                                {/* Name */}
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Name:</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData?.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter name"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">work:</label>
                                    <Input
                                        type="text"
                                        name="work"
                                        value={formData?.work}
                                        onChange={handleInputChange}
                                        placeholder="Enter work"
                                    />
                                    {errors.work && <p className="text-sm text-red-500">{errors.work}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-1 lg:gap-4 ">
                                {/* Description */}
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Description:</label>
                                    <Textarea
                                        name="description"
                                        className="p-2.5 xl:p-3 border border-gray-200 rounded-md"
                                        value={formData?.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter description"
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Category:</label>
                                    <select
                                        name="category"
                                        className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 px-4 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                        value={formData?.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select category</option>
                                        <option value="web design">web design</option>
                                        <option value="app design">app design</option>
                                        <option value="Graphic Design">Graphic Design</option>
                                        <option value="web development">web development</option>
                                        <option value="app development">app development</option>
                                    </select>
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>
                            </div>
                            {/* Image Upload */}
                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input
                                        type="file"
                                        name="image_work"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {formData.imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img src={formData.imagePreview} alt="Preview" className="w-16 h-16" />
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <Primary type="submit" label={isOpenAddModel ? 'Save' : 'Update'} className="btn btn-primary">

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

export default Latestworkaddsection;


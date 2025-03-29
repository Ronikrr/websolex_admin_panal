import React, { useEffect, useState } from 'react';
import { FaEye, FaRegEdit, FaRegStar, FaStar } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input';
import Primary from '../ui/primary';
import Secondary from '../ui/seconduray';
import Breadcrumb from '../ui/breadcrumb';
import Textarea from '../ui/textarea';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchclientrate, addclientrate, deleteclientrate, updateclientrate } from '../../Redux/slice/testimonalapiSlice';
import { useLocation } from 'react-router-dom';
import Deletemodel from '../ui/deletemodel';

const Clienttestadd = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth?.user);
    const { clientrate, feedback } = useSelector((state) => state.clientrate);
    const [isOpenDeleteModel, setisOpenDeleteModel] = useState(false)
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [currentEditId, setCurrentEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [localFeedback, setLocalFeedback] = useState({ message: "", type: "" });
    const onClear = () => {
        setLocalFeedback({ message: "", type: "" })
    }
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        business: "",
        rate: "",
        image: null,
        imagePreview: null,
    });

    useEffect(() => {
        dispatch(fetchclientrate());
    }, [dispatch]);

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.name.trim()) newErrors.name = "Name is required";
        if (!data.description.trim()) newErrors.description = "Description is required";
        if (!data.rate.trim()) newErrors.rate = "Rating is required";
        if (!data.image && isOpenAddModal) newErrors.image = "Image is required";
        return newErrors;
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            business: "",
            rate: "",
            image: null,
            imagePreview: null,
        });
        setErrors({});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: file ? URL.createObjectURL(file) : null,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('business', formData.business)
        formDataToSend.append('rate', formData.rate)
        if (formData.image) formDataToSend.append("image_work_client", formData.image);

        try {
            await dispatch(addclientrate(formDataToSend)).unwrap();
            setIsOpenAddModal(false);
            resetForm();
        } catch {
            setLocalFeedback({ message: "Failed to add testimonial.", type: "error" });
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('business', formData.business)
        formDataToSend.append('rate', formData.rate)
        if (formData.image) formDataToSend.append("image_work_client", formData.image)

        try {
            await dispatch(updateclientrate({ id: currentEditId, formData: formDataToSend })).unwrap();
            setIsOpenEditModal(false);
            resetForm();
        } catch {
            setLocalFeedback({ message: "Failed to update testimonial.", type: "error" });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this testimonial?")) {
            dispatch(deleteclientrate(id));
        }
    };

    const handleEditClick = (item) => {
        setCurrentEditId(item._id);
        setFormData({
            name: item.name,
            description: item.description,
            business: item.business,
            rate: item.rate,
            image: null,
            imagePreview: item.image,
        });
        setIsOpenEditModal(true);
    };

    const renderStars = (rate) => {
        const stars = Array(5).fill(<FaRegStar className="text-gray-300" />);
        for (let i = 0; i < rate; i++) {
            stars[i] = <FaStar key={i} className="text-yellow-500" />;
        }
        return stars;
    };

    const recentLead = clientrate?.[clientrate.length - 1];


    const handleDeleteClick = async (id) => {
        setisOpenDeleteModel(true)
    };
    const pagename = location.pathname.split('/').filter(Boolean).pop();

    return (
        <div className="p-4 bg-gray-100">
            {(feedback.message || localFeedback.message) && (
                <FeedbackMessage message={feedback.message || localFeedback.message} type={feedback.type || localFeedback.type} onClear={onClear} />
            )}

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Testimonials</h1>
                <Breadcrumb />
            </div>
            <Deletemodel
                isOpen={isOpenDeleteModel}
                onClose={() => setisOpenDeleteModel(false)}
                onConfirm={handleDelete}
                pagename={pagename}
            />

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
                                onClick={() => { resetForm(); setIsOpenAddModal(true); }}
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
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">Rate</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {recentLead ? (
                                <tr key={recentLead?.id} className="text-center border-b border-gray-200">
                                    <td className="p-2.5 xl:p-3 border border-gray-200">1</td>
                                    <td className="p-2.5 xl:p-3 border border-gray-200">
                                        <img loading='lazy'
                                            src={recentLead?.image}
                                            alt={recentLead?.name || 'Lead Image'}
                                            className="object-cover w-8 h-8 mx-auto lg:w-16 lg:h-16 aspect-square"
                                        />
                                    </td>
                                    <td
                                        className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                        title={recentLead?.name}
                                    >
                                        {recentLead?.name}
                                    </td>
                                    <td
                                        className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] "

                                    >
                                        <div className="flex justify-center w-full">
                                            {recentLead?.rate ? renderStars(recentLead?.rate) : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                        {user?.role === "user" ? (
                                            <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(recentLead)}>
                                                <FaEye />
                                            </button>
                                        ) : (

                                            <>
                                                    <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(recentLead)}>
                                                        <FaRegEdit />
                                                    </button>
                                                    {user?.role === "admin" && (

                                                    <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDeleteClick(recentLead._id)}>
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                    )}
                                            </>
                                        )}
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
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">Rate</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {clientrate?.length > 0 ? (
                                clientrate?.map((lead, index) => (
                                    <tr key={lead.id || index} className="text-center border-b border-gray-200">
                                        <td className="p-2.5 xl:p-3 border border-gray-200">{lead?.id || index + 1}</td>
                                        <td className="p-2.5 xl:p-3 border border-gray-200">
                                            <img loading='lazy'
                                                src={lead?.image}
                                                alt={lead?.name || 'Lead Image'}
                                                className="object-cover w-8 h-8 mx-auto lg:w-16 lg:h-16 aspect-square"
                                            />
                                        </td>
                                        <td
                                            className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                            title={lead?.name}
                                        >
                                            {lead?.name}
                                        </td>
                                        <td
                                            className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] "

                                        >
                                            <div className="flex justify-center w-full">
                                                {lead?.rate ? renderStars(lead?.rate) : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">

                                            {user?.role === "user" ? (
                                                <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(lead)}>
                                                    <FaEye />
                                                </button>
                                            ) : (

                                                <>
                                                        <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(lead)}>
                                                            <FaRegEdit />
                                                        </button>
                                                        {user?.role === "admin" && (

                                                        <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDeleteClick(lead?._id)}>
                                                            <RiDeleteBin6Line />
                                                        </button>
                                                        )}
                                                </>
                                            )}
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



            {(isOpenAddModal || isOpenEditModal) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1.5/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">{isOpenAddModal ? 'Add New Lead' : 'Edit Lead'}</h1>
                        <form className="flex flex-col gap-4" onSubmit={isOpenAddModal ? handleAdd : handleEdit}>
                            <div className="flex flex-col items-center gap-5 lg:flex-row">
                                {/* Name */}
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Name:</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData?.name}
                                        onChange={handleChange}
                                        placeholder="Enter name"
                                        disabled={user?.role === 'user'}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>
                                {/* Business */}
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Business:</label>
                                    <Input
                                        type="text"
                                        name="business"
                                        value={formData.business}
                                        onChange={handleChange}
                                        disabled={user?.role === 'user'}
                                        placeholder="Enter business"
                                    />
                                    {errors.business && <p className="text-sm text-red-500">{errors.business}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Description:</label>
                                <Textarea
                                    name="description"
                                    className="p-2.5 xl:p-3 border border-gray-200 rounded-md"
                                    value={formData?.description}
                                    disabled={user?.role === 'user'}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>



                            {/* Rate */}
                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Rate:</label>
                                <Input
                                    type="number"
                                    disabled={user?.role === 'user'}
                                    name="rate"
                                    value={formData?.rate}
                                    onChange={handleChange}
                                    min="0"
                                    max="5"
                                    placeholder="Enter rate"
                                />
                                {errors.rate && <p className="text-sm text-red-500">{errors.rate}</p>}
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input
                                        disabled={user?.role === 'user'}
                                        type="file"
                                        name="image_client_work"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {formData.imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img loading='lazy' src={formData.imagePreview} alt="Preview" className="w-16 h-16" />
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <Primary type="submit" disabled={user?.role === 'user'} label={isOpenAddModal ? 'Save' : 'Update'} />
                                <Secondary
                                    type="button"
                                    label={"Cancel"}
                                    onClick={() => (isOpenAddModal ? setIsOpenAddModal(false) : setIsOpenEditModal(false))}
                                />

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Clienttestadd;

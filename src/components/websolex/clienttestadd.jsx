import React, { useEffect, useState } from 'react';
import { FaRegEdit, FaRegStar, FaStar } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input'
import Primary from '../ui/primary'
import Seconduray from '../ui/seconduray';
import Breadcrumb from '../ui/breadcrumb';
import Textarea from '../ui/textarea';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchclientrate, addclientrate, clearFeedback, deleteclientrate, updateclientrate } from '../../Redux/slice/testimonalapiSlice';
const Clienttestadd = () => {
    const dispatch = useDispatch();
    const { clientrate, feedback } = useSelector((state) => state.clientrate);
    const [isOpenModel, setIsOpenModel] = useState(false)
    const [isOpenAddModel, setIsOpenAddModel] = useState(false)

    const [errors, setErrors] = useState({})
    const [feedbacks, setfeedbacks] = useState({ message: "", type: "" })

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        business: '',
        rate: '',
        image: null,
        imagePreview: null,
    })


    useEffect(() => {
        clearFeedback()
    }, [])

    useEffect(() => {
        dispatch(fetchclientrate());
    }, [dispatch]);


    const validateBlogForm = (formData) => {
        const errors = {}
        if (!formData.name.trim()) errors.name = "Name is required"
        if (!formData.description.trim()) errors.description = "description is required"
        // if (!formData.business.trim()) errors.business = "business is required"
        if (!formData.rate.trim()) errors.rate = "rate is required"
        if (!formData.image) errors.image = "Image is required"

        return errors
    }



    const handleAddSave = async (e) => {
        e.preventDefault();

        const validationErrors = validateBlogForm(formData);
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
            const result = await dispatch(addclientrate(formDataToSend)).unwrap(); // Unwrap to handle errors properly
            if (result) {
                resetFormFields(); // Reset form only if successful
                setIsOpenAddModel(false);
            }
        } catch (error) {
            console.error("Error adding blog:", error);
            setfeedbacks({ message: "Failed to add blog. Please try again.", type: "error" });
        }
    };


    const handleEditSave = async (id) => {


        const validationErrors = validateBlogForm(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formDataToSend.append('description', formData.description)
        formDataToSend.append('business', formData.business)
        formDataToSend.append('rate', formData.rate)
        if (formData.image) formDataToSend.append("image_work_client", formData.image)

        // dispatch(updateBlog({ id, formData: formDataToSend }));
        try {
            const result = await dispatch(updateclientrate({ id, formData: formDataToSend })).unwrap(); // Unwrap to handle errors properly
            if (result) {
                resetFormFields(); // Reset form only if successful
                setIsOpenModel(false);
            }
        } catch (error) {

            setfeedbacks({ message: "Failed to update blog. Please try again.", type: "error" });
        }
    }

    const resetFormFields = () => {
        setFormData({
            name: "",
            description: "",
            business: '',
            rate: '',
            image: null,
            imagePreview: null,
        })
        setErrors({})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }))
        }
    }

    const recentLead = clientrate?.length > 0 ? clientrate[clientrate?.length - 1] : null

    const handleEditClick = (lead) => {
        setFormData({
            name: lead.name,
            description: lead.description,
            business: lead.business,
            rate: lead.rate,
            image: lead.image,
            imagePreview: lead.image,
        })
        setIsOpenModel(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteclientrate(id));
        }
    };
    const handleformChange = (e) => {
        const { name, value } = e.target
        setFormData((prevdata) => ({
            ...prevdata,
            [name]: value
        }))
    }

    const renderStars = (rate) => {
        const totalStars = 5;
        let stars = [];

        // Render filled stars
        for (let i = 0; i < Math.floor(rate); i++) {
            stars.push(<FaStar key={`filled-${i}`} className="text-yellow-500" />);
        }

        // Render empty stars
        for (let i = Math.floor(rate); i < totalStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
        }

        return stars;
    };
    const handleaddlead = () => {
        resetFormFields()
        setIsOpenAddModel(true)
    }
   
    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message || feedbacks.message} type={feedback.type || feedbacks.type} />
            )}
            <div className="flex items-center justify-between mb-4">
                <h1 className='capitalize text-[26px] font-semibold  '>testimonial</h1>
                <Breadcrumb />
            </div>

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
                                onClick={handleaddlead}
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
                                        <img
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


            {/* All Leads */}

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
                                            <img
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
           

            {(isOpenAddModel || isOpenModel) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1.5/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">{isOpenAddModel ? 'Add New Lead' : 'Edit Lead'}</h1>
                        <form className="flex flex-col gap-4" onSubmit={isOpenAddModel ? handleAddSave : handleEditSave}>
                            <div className="flex flex-col items-center gap-5 lg:flex-row">
                                {/* Name */}
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Name:</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData?.name}
                                        onChange={handleformChange}
                                        placeholder="Enter name"
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
                                        onChange={handleformChange}
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
                                    onChange={handleformChange}
                                    placeholder="Enter description"
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>



                            {/* Rate */}
                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Rate:</label>
                                <Input
                                    type="number"
                                    name="rate"
                                    value={formData.rate}
                                    onChange={handleformChange}
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
                                        type="file"
                                        name="image_client_work"
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
    )
}

export default Clienttestadd;


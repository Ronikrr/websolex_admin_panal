import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input'
import Primary from '../ui/primary'
import Seconduray from '../ui/seconduray';
import Breadcrumb from '../ui/breadcrumb';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { fetchteams, addteamMember, updateTeamMember, deleteTeamMember } from '../../Redux/slice/teamslice';
const initialState = {
    name: '',
    post: '',
    linkedin: '',
    insta: '',
    facebook: '',
    image: null,
    imagePreview: null
}
const Servicepagesection = () => {
    const dispatch = useDispatch();
    const { teamMember: leads, feedback: feedbackdata } = useSelector(state => state.teamMember);
    const [errors, setErrors] = useState({});
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenLastAll, setIsOpenLastAll] = useState(false);
    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [formData, setformData] = useState(initialState)

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        if (feedbackdata) {
            setFeedback(feedbackdata)
        }
    }, [feedbackdata])
    useEffect(() => {
        dispatch(fetchteams());
    }, [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            setIsOpenLastAll(false);
        }, 3000);
    }, [isOpenLastAll]);

    const validateForm = (formData) => {
        const newErrors = {};
        if (!formData.name || formData.name.trim() === '') newErrors.name = 'Name is required';
        if (!formData.post || formData.post.trim() === '') newErrors.post = 'Post is required';
        if (!formData.image) newErrors.image = 'Image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleAddSave = async (e) => {
        e.preventDefault();

        // Validate form
        if (!validateForm(formData)) return;

        const newFormdata = new FormData();
        newFormdata.append("name", formData.name);
        newFormdata.append("post", formData.post);
        newFormdata.append("linkedin", formData.linkedin);
        newFormdata.append("insta", formData.insta);
        newFormdata.append("facebook", formData.facebook);
        if (formData.image) newFormdata.append("image", formData.image);

        try {
            await dispatch(addteamMember(newFormdata)).unwrap();
            setIsOpenModel(false);
            resetFormFields();  // ✅ Reset fields only after successful execution
        } catch (error) {
            setFeedback({
                message: `Failed to add lead: ${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };




    const handleEditSave = async (id) => {
        if (!validateForm(formData)) return;

        const newFormdata = new FormData();
        newFormdata.append("name", formData.name);
        newFormdata.append("post", formData.post);
        newFormdata.append("linkedin", formData.linkedin);
        newFormdata.append("insta", formData.insta);
        newFormdata.append("facebook", formData.facebook);
        if (formData.image) newFormdata.append("image", formData.image);

        try {
            await dispatch(updateTeamMember({ id, formData: newFormdata })).unwrap();
            resetFormFields(); // ✅ Reset fields only after successful execution
            setIsOpenModel(false);
        } catch (error) {
            setFeedback({
                message: `Error updating team member: ${error}`,
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
            const aspectRatio = img.width / img.height;

            // Check if the aspect ratio is 3:4
            if (Math.abs(aspectRatio - 0.75) < 0.01 || Math.abs(aspectRatio - 1) < 0.01) {
                setformData((prev) => ({
                    ...prev,
                    image: file,
                    imagePreview: URL.createObjectURL(file)
                }))
            } else {
                setFeedback({
                    message: `Only 3:4 aspect ratio images are allowed.`,
                    type: 'error',
                });
            }
        };

        reader.readAsDataURL(file);
    };


    const recentLead = leads[leads.length - 1];

    const handleEditClick = (lead) => {
        setformData({
            name: lead.name,
            post: lead.post,
            linkedin: lead.linkedin,
            insta: lead.insta,
            facebook: lead.facebook,
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
        try {
            if (window.confirm("Are you sure you want to delete this blog?")) {
                dispatch(deleteTeamMember(id));
            }
        } catch (error) {
            setFeedback({
                message: `Error deleting team member. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isOpenAddModel) {
            handleAddSave(e);
        } else {
            handleEditSave(formData.id);  // Ensure `formData.id` exists for edit mode
        }
    };
    const handleaddlead = () => {
        resetFormFields()
        setIsOpenAddModel(true)
    }

    return (
        <div className="w-full h-screen bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex flex-col items-center justify-between mt-4 mb-4 lg:mt-0 sm:flex-row">
                <h1 className='capitalize text-[26px] font-semibold  '>team page</h1>
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
                                    <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                        <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(recentLead)}>
                                            <FaRegEdit />
                                        </button>
                                        <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDelete(recentLead?._id)}>
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
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {leads?.length > 0 ? (
                                leads?.map((lead, index) => (
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
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50"  >

                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">
                            {isOpenAddModel ? 'Add New Lead' : 'Edit Lead'}
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
                                        value={formData?.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter name"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Post:</label>
                                    <Input
                                        type="text"
                                        name="post"
                                        value={formData?.post}
                                        onChange={handleInputChange}
                                        placeholder="Enter post"
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
                                        value={formData?.linkedin}
                                        onChange={handleInputChange}
                                        placeholder="Enter LinkedIn"
                                    />
                                    {errors.linkedin && <p className="text-sm text-red-500">{errors.linkedin}</p>}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">Instagram:</label>
                                    <Input
                                        type="text"
                                        name="insta"
                                        value={formData?.insta}
                                        onChange={handleInputChange}
                                        placeholder="Enter Instagram"
                                    />
                                    {errors.insta && <p className="text-sm text-red-500">{errors.insta}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Facebook:</label>
                                <Input
                                    type="text"
                                    name="facebook"
                                    value={formData?.facebook}
                                    onChange={handleInputChange}
                                    placeholder="Enter Facebook"

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

                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {formData?.imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img src={formData?.imagePreview} alt="Preview" className="w-16 h-16" />
                                    </div>
                                )}
                            </div>

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

export default Servicepagesection;


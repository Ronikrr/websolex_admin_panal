import React, { useEffect, useState } from 'react';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input'
import Primary from '../ui/primary'
import Seconduray from '../ui/seconduray';
import Breadcrumb from '../ui/breadcrumb';
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from 'react-redux';
import { addvaluedClient, deleteValuedClient, fetchvaluedclient, updateValuedClient } from '../../Redux/slice/valuedclientslice';
const initialState = {
    name: '',
    image: null,
    imagePreview: null
}
const Valuedclientsection = () => {
    const dispatch = useDispatch();
    const { valuedclient, feedbacks } = useSelector((state) => state.valuedclient)
    const { user } = useSelector((state) => state.auth?.user);
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [errors, setErrors] = useState({});
    const [isOpenLastAll, setIsOpenLastAll] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [fromdata, setfromdata] = useState(initialState)
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        setTimeout(() => {
            setIsOpenLastAll(false);
        }, 3000);
    }, [isOpenLastAll]);
    useEffect(() => {
        dispatch(fetchvaluedclient())
    }, [dispatch]);
    useEffect(() => {
        if (feedbacks) {
            setFeedback({ message: feedbacks.message, type: feedbacks.type })
        }
    }, [feedbacks])
    const validateForm = (formDataObj) => {
        const newErrors = {};

        const name = formDataObj.get("name");
        const image = formDataObj.get("images");

        if (!name || name.trim() === "") newErrors.name = "Name is required";
        if (!image) newErrors.image = "Image is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleAddSave = async (e) => {
        e.preventDefault();

        const newformData = new FormData();
        console.log(newformData)
        newformData.append("name", fromdata.name)
        if (fromdata.image) newformData.append("images", fromdata.image); // Fix

        if (!validateForm(newformData)) return;

        try {
            const res = await dispatch(addvaluedClient(newformData)).unwrap();
            if (!res.ok) {
                setIsOpenAddModel(false);
                resetFormFields();
                console.log(res.message)
                setFeedback({
                    message: `${res.message}`,
                    type: 'success',
                });

            }
            if (res.status === 200) {

            }
        }
        catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.message}`,
                type: 'error',
            });
        }
    };
    const handleEditSave = async (e, id) => {
        e.preventDefault();

        const newformData = new FormData();
        newformData.append("name", fromdata.name);

        if (fromdata.image) newformData.append("images", fromdata.image);

        if (!validateForm(fromdata)) return;

        try {
            const response = await dispatch(updateValuedClient({ id, formdata: newformData })).unwrap();
            console.log("Update Response:", response);

            if (response && response._id) {
                setIsOpenModel(false);
                resetFormFields();
            } else {
                console.log("Invalid response from server");
            }
        } catch (error) {
            console.error("Update Error:", error);
            setFeedback({
                message: `Error updating team member: ${error.message}`,
                type: 'error',
            });
        }
    };
    useEffect(() => {
        if (!isOpenAddModel && !isOpenModel) {
            resetFormFields();
        }
    }, [isOpenAddModel, isOpenModel]);



    const resetFormFields = () => {
        setfromdata(initialState); // Resets form data
        setErrors({}); // Clears errors
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setfromdata((prev) => ({
                ...prev,
                image: file, // Correct key
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const recentLead = valuedclient[valuedclient?.length - 1];
    const handleEditClick = (lead) => {
        if (!lead) {
            console.error("Lead is undefined");
            return;
        }
        console.log("Lead object:", lead);

        setfromdata({
            id: lead._id,
            name: lead.name,
            image: lead.image,
            imagePreview: lead.image
        });
        setIsOpenModel(true);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setfromdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteValuedClient(id));
        }
    };
    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex flex-col items-center justify-between mb-4 lg:flex-row">
                <h1 className='capitalize  text-[26px] font-semibold  '>valued cilent</h1>
                <Breadcrumb />
            </div>

            {/* Most Recent Lead */}
            <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">

                <div className="flex items-center justify-between w-full">
                    <div className="py-6">
                        <h1 className='capitalize text-[15px] lg:text-[26px] font-semibold '>Most Recent added</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="relative cursor-pointer ">
                            <button className='flex items-center gap-3 rounded-lg px-4 py-1 lg:px-6 lg:py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000' title='add'
                                onClick={() => setIsOpenAddModel(true)}
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
                                <tr key={recentLead.id} className="text-center border-b border-gray-200">
                                    <td className="p-2.5 xl:p-3 border border-gray-200">1</td>
                                    <td className="p-2.5 xl:p-3 border border-gray-200">
                                        <img
                                            src={recentLead.image}
                                            alt={recentLead.name || 'Lead Image'}
                                            className="object-contain w-16 h-8 mx-auto lg:w-64 lg:h-16 aspect-square"
                                        />
                                    </td>
                                    <td className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize ">{recentLead.name}</td>
                                    <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                        <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(recentLead)}>
                                            <FaRegEdit />
                                        </button>
                                        <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDelete(recentLead?._id)}>
                                            <RiDeleteBin6Line />
                                        </button>
                                        {user?.role === "user" ? (
                                            <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(recentLead)}>
                                                <FaEye />
                                            </button>
                                        ) : (
                                            <>
                                                <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(recentLead)}>
                                                    <FaRegEdit />
                                                </button>
                                                <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDelete(recentLead._id)}>
                                                    <RiDeleteBin6Line />
                                                </button>
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
                <h1 className="capitalize teaxt-[15px] lg:text-[26px] py-6 font-semibold">All added</h1>

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
                            {valuedclient?.length > 0 ? (
                                valuedclient.map((lead, index) => (
                                    <tr key={lead.id || index} className="text-center border-b border-gray-200">
                                        <td className="p-2.5 xl:p-3 border border-gray-200">{lead.id || index + 1}</td>
                                        <td className="p-2.5 xl:p-3 border border-gray-200">
                                            <img
                                                src={lead.image}
                                                alt={lead.name || 'Lead Image'}
                                                className="object-contain w-16 h-8 mx-auto lg:w-64 lg:h-16 aspect-square"
                                            />
                                        </td>
                                        <td className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize text-wrap">{lead.name}</td>
                                        <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                            {/* <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(lead)}>
                                                <FaRegEdit />
                                            </button>
                                            <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDelete(lead._id)}>
                                                <RiDeleteBin6Line />
                                            </button> */}
                                            {user?.role === "user" ? (
                                                <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(lead)}>
                                                    <FaEye />
                                                </button>
                                            ) : (
                                                <>
                                                        <button className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleEditClick(lead)}>
                                                            <FaRegEdit />
                                                        </button>
                                                        <button className="text-red-500 hover:text-black text-[10px] lg:text-[15px]" onClick={() => handleDelete(lead?._id)}>
                                                            <RiDeleteBin6Line />
                                                        </button>
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


            {(isOpenAddModel || isOpenModel) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50 ">
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1/3" >
                        <h1 className="capitalize text-[15px] lg:text-[26px] font-semibold mb-4 ">{isOpenAddModel ? 'Add New Lead' : 'Edit Lead'}</h1>
                        <form className="flex flex-col gap-4" onSubmit={isOpenAddModel ? handleAddSave : handleEditSave}>

                            <div className="flex flex-col w-full">
                                <label className="text-gray-600 text-[10px] lg:text-[15px] ">Name:</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={fromdata?.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter name"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-[76.666667%] lg:w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {fromdata?.imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img src={fromdata?.imagePreview} alt="Preview" className="w-16 h-16" />
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


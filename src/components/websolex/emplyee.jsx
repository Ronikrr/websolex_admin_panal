
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
import { fetchEmployee, addEmployee, deleteEmployee, patchEmployee, updateEmployee } from '../../Redux/slice/employyeslice';
const initialState = {
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    salary: "",
    join_date: "",
    status: "",
};
const Blogpagesection = () => {
    const dispatch = useDispatch();
    const { employees, feedback: feedbackdata } = useSelector((state) => state.employees)
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    const [formData, setFormData] = useState(initialState);
    const statusOptions = [
        "Active",
        "Inactive",
    ];
    const recentLead = employees[employees.length - 1];
    useEffect(() => {
        if (feedbackdata) {
            setFeedback(feedbackdata)
        }
    }, [feedbackdata])
    useEffect(() => {
        dispatch(fetchEmployee());
    }, [dispatch]);
    const validateForm = (fromdata) => {
        const newErrors = {};
        if (!fromdata.name || fromdata.name.trim() === "") newErrors.name = "Name is required";
        if (!fromdata.designation || fromdata.designation.trim() === "") newErrors.designation = "Designation is required";
        if (!fromdata.department || fromdata.department.trim() === "") newErrors.department = "Department is required";
        if (!fromdata.email || fromdata.email.trim() === "") newErrors.email = "Email is required";
        if (!fromdata.phone || fromdata.phone.trim() === "") newErrors.phone = "Phone is required";
        if (!fromdata.salary || isNaN(fromdata.salary)) newErrors.salary = "Valid salary is required";
        if (!fromdata.join_date || fromdata.join_date.trim() === "") newErrors.join_date = "Join date is required";
        if (!fromdata.status || fromdata.status.trim() === "") newErrors.status = "Status is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        if (!validateForm(formValues)) {
            console.error("Validation failed:", errors);
            return;
        }
        try {
            const response =  await dispatch(addEmployee(formValues)).unwrap();
            if (response) {
                resetFormFields();
                setIsOpenModel(false);
            }
        } catch (error) {
            setFeedback({
                message: `Failed to add employee. ${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };
    const handleEditSave = async (id) => {
        if (!validateForm(formData)) return;

        try {
            const response = await dispatch(updateEmployee({ id, formData })).unwrap()

            if (response) {
                setIsOpenModel(false);
                resetFormFields()
            }
        } catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            dispatch(deleteEmployee(id));
        }
    };
    const handleEditClick = (lead) => {
        setFormData({
            name: lead.name,
            designation: lead.designation,
            department: lead.department,
            email: lead.email,
            phone: lead.phone,
            salary: lead.salary,
            join_date: lead.join_date,
            status: lead.status
        })
        setIsOpenModel(true);
    };
    const resetFormFields = () => {
        setFormData(initialState);
        setErrors({});
    };

    const handleStatusUpdate = async (employeeId, newStatus) => {
        dispatch(patchEmployee(employeeId, newStatus))
    };
    const handleChangeStatus = (employeeId, newStatus) => {
        handleStatusUpdate(employeeId, newStatus);
    };

    const handleinputchange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleOpenAddModal = () => {
        resetFormFields();
        setIsOpenAddModel(true);
        setIsOpenModel(false);
    }

    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex items-center justify-between mb-4">
                <h1 className='capitalize text-[26px] font-semibold  '>employee mangement</h1>
                <Breadcrumb />
            </div>

            {/* Most Recent Lead
            <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">

                <div className="flex items-center justify-between w-full">
                    <div className="py-6">
                        <h1 className='capitalize text-[26px] font-semibold '>Most Recent added</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="relative cursor-pointer ">
                            <button className='flex items-center gap-3 rounded-lg px-6 py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000' title='add' onClick={handleOpenAddModal} >
                                <IoMdAdd /> add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                    <div className="p-2.5 xl:p-5 flex-1">ID</div>
                    <div className="p-2.5 xl:p-5 flex-1">email</div>
                    <div className="p-2.5 xl:p-5 flex-1">Name</div>
                    <div className="p-2.5 xl:p-5 flex-1">status</div>
                    <div className="p-2.5 xl:p-5 flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {recentLead ? (
                        <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                            <div className="flex-1 p-2.5 xl:p-5">1</div>
                            <div className="flex-1 p-2.5 xl:p-5">{recentLead?.email}</div>
                            <div className="flex-1 p-2.5 xl:p-5">{recentLead?.name}</div>
                            <div className="p-2.5 xl:p-5 flex-1">
                                <select
                                    value={recentLead?.status}
                                    onChange={(e) => handleChangeStatus(recentLead?._id, e.target.value)}
                                >
                                    {statusOptions.map((status, index) => (
                                        <option key={index} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
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

            All Leads
            <div className="w-full p-5 bg-white rounded-md shadow-md">
                <h1 className='capitalize text-[26px] py-6 font-semibold'>All added</h1>
                <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                    <div className="p-2.5 xl:p-5 flex-1">ID</div>
                    <div className="p-2.5 xl:p-5 flex-1">email</div>
                    <div className="p-2.5 xl:p-5 flex-1">Name</div>
                    <div className="p-2.5 xl:p-5 flex-1">status</div>
                    <div className="p-2.5 xl:p-5 flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {employees.length > 0 ? (
                        employees.map((lead, index) => (
                            <div key={index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                                <div className="p-2.5 xl:p-5 flex-1">{index + 1}</div>
                                <div className="p-2.5 xl:p-5 flex-1">
                                    {lead?.email}
                                </div>
                                <div className="p-2.5 xl:p-5 flex-1">{lead?.name}</div>
                                <div className="p-2.5 xl:p-5 flex-1">
                                    <select
                                        value={lead?.status}
                                        onChange={(e) => handleChangeStatus(lead?._id, e.target.value)}
                                    >
                                        {statusOptions.map((status, index) => (
                                            <option key={index} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center flex-1 gap-2">
                                    <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(lead)}>
                                        <FaRegEdit />
                                    </button>
                                    <button className="text-red-500 hover:text-black" onClick={() => handleDelete(lead?._id)}>
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center">
                            <p>No leads found.</p>
                        </div>
                    )}
                </div>
            </div> */}
            <div className="w-full">
                {/* Most Recent Lead */}
                <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                    <div className="flex items-center justify-between w-full">
                        <div className="py-6">
                            <h1 className="capitalize text-[26px] font-semibold">Most Recent Added</h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="flex items-center gap-3 rounded-lg px-6 py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000"
                                title="add"
                                onClick={handleOpenAddModal}
                            >
                                <IoMdAdd /> Add
                            </button>
                        </div>
                    </div>

                    <table className="w-full border border-collapse border-gray-200">
                        <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                            <tr>
                                <th className="p-2.5 xl:p-5 border border-gray-200">ID</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Email</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Name</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Status</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentLead ? (
                                <tr className="border-b border-gray-200">
                                    <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">1</td>
                                    <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{recentLead?.email}</td>
                                    <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{recentLead?.name}</td>
                                    <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">
                                        <select
                                            value={recentLead?.status}
                                            onChange={(e) => handleChangeStatus(recentLead?._id, e.target.value)}
                                        >
                                            {statusOptions.map((status, index) => (
                                                <option key={index} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-2.5 xl:p-5 flex justify-center gap-2">
                                        <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(recentLead)}>
                                            <FaRegEdit />
                                        </button>
                                        <button className="text-red-500 hover:text-black" onClick={() => handleDelete(recentLead?._id)}>
                                            <RiDeleteBin6Line />
                                        </button>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center border border-gray-200">No recent lead added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* All Leads */}
                <div className="w-full p-5 bg-white rounded-md shadow-md">
                    <h1 className="capitalize text-[26px] py-6 font-semibold">All Added</h1>
                    <table className="w-full border border-collapse border-gray-200">
                        <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                            <tr>
                                <th className="p-2.5 xl:p-5 border border-gray-200">ID</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Email</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Name</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Status</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((lead, index) => (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{index + 1}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{lead?.email}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">{lead?.name}</td>
                                        <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">
                                            <select
                                                value={lead?.status}
                                                onChange={(e) => handleChangeStatus(lead?._id, e.target.value)}
                                            >
                                                {statusOptions.map((status, index) => (
                                                    <option key={index} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-2.5 xl:p-5 justify-center  flex gap-2">
                                            <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(lead)}>
                                                <FaRegEdit />
                                            </button>
                                            <button className="text-red-500 hover:text-black" onClick={() => handleDelete(lead?._id)}>
                                                <RiDeleteBin6Line />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center border border-gray-200">No leads found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
                                    value={formData?.name}
                                    onChange={handleinputchange}
                                    placeholder="Enter name"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">designation:</label>
                                    <Input
                                        type="text"
                                        name="designation"
                                        value={formData?.designation}
                                        onChange={handleinputchange}
                                        placeholder="Enter designation"
                                    />
                                    {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
                                </div> <div className="flex flex-col w-full">
                                    <label className="text-gray-600">department:</label>
                                    <Input
                                        type="text"
                                        name="department"
                                        value={formData?.department}
                                        onChange={handleinputchange}
                                        placeholder="Enter department"
                                    />
                                    {errors.department && <p className="text-sm text-red-500">{errors.department}</p>}
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">email:</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData?.email}
                                        onChange={handleinputchange}
                                        placeholder="Enter email"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div> <div className="flex flex-col w-full">
                                    <label className="text-gray-600">phone:</label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData?.phone}
                                        onChange={handleinputchange}

                                        placeholder="Enter phone"
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">salary:</label>
                                    <Input
                                        type="number"
                                        name="salary"
                                        value={formData?.salary}
                                        onChange={handleinputchange}

                                        placeholder="Enter salary"
                                    />
                                    {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">join date:</label>
                                    <Input
                                        type="date"
                                        name="join_date"
                                        value={formData?.join_date}
                                        onChange={handleinputchange}

                                        placeholder="Enter join date"
                                    />
                                    {errors.join_date && <p className="text-sm text-red-500">{errors.join_date}</p>}
                                </div>
                            </div>

                            <div className="flex flex-row items-center gap-4">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="status">Employee Status:</label>
                                    <select
                                        className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 px-4 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
                                        id="status"
                                        name="status"
                                        value={formData?.status}
                                        onChange={handleinputchange}

                                    >
                                        {statusOptions.map((statusOption) => (
                                            <option key={statusOption} value={statusOption}>
                                                {statusOption}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
                                </div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <Primary type="submit" label={isOpenAddModel ? 'Save' : 'Update'} className="btn btn-primary" />


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

export default Blogpagesection;



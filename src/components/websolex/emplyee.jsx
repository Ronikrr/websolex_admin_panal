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
    const [leads, setLeads] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [errors, setErrors] = useState({});
    const [feedback, setFeedback] = useState({ message: '', type: '' });
   
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    // Status options
    const statusOptions = [
        "Active",
        "Inactive",
        "Probation",
        "Resigned",
        "Terminated",
        "Retired",
        "On Leave",
        "Deceased"
    ];

    // Fetch employees
    const fetchLeads = async () => {
        try {
            const res = await fetch("https://websolex-admin.vercel.app/api/employee", {
                method: "GET", // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json", // Specify the content type
                },
            });

            if (!res.ok) {
                setFeedback({
                    message: `Error fetching emplyees :${res.message}`,
                    type: 'error',
                });
            }

            const data = await res.json();
            setLeads(data);
        } catch (error) {
            setFeedback({
                message: `Error fetching emplyees :${error}`,
                type: 'error',
            });
        }
    };

    const recentLead = leads[leads.length - 1];

    useEffect(() => {
        fetchLeads();
    }, []);

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.name || data.name.trim() === "") newErrors.name = "Name is required";
        if (!data.designation || data.designation.trim() === "") newErrors.designation = "Designation is required";
        if (!data.department || data.department.trim() === "") newErrors.department = "Department is required";
        if (!data.email || data.email.trim() === "") newErrors.email = "Email is required";
        if (!data.phone || data.phone.trim() === "") newErrors.phone = "Phone is required";
        if (!data.salary || isNaN(data.salary)) newErrors.salary = "Valid salary is required";
        if (!data.join_date || data.join_date.trim() === "") newErrors.join_date = "Join date is required";
        if (!data.status || data.status.trim() === "") newErrors.status = "Status is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleAddSave = async (e) => {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());

        console.log("Form Values:", formValues);

        // Validate form
        if (!validateForm(formValues)) {
            console.error("Validation failed:", errors);
            return;
        }

        try {
            // Send form data using fetch
            const response = await fetch("https://websolex-admin.vercel.app/api/employee", {
                method: "POST",
                body: JSON.stringify(formValues),  // Convert form values to JSON
                headers: {
                    "Content-Type": "application/json",  // Set header to indicate JSON data
                },
            });

            // Check if the request was successful
            if (response.ok) {
                const data = await response.json();
                setIsOpenModel(false);

                setFeedback({
                    message: `Employee added successfully.`,
                    type: 'success',
                });
                setLeads([...leads, data]);  // Assuming response data contains the newly added employee
                e.target.reset();
            } 
        } catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };


    // Handle editing an employee
    const handleEditSave = async (e) => {
        e.preventDefault();
        const updatedLead = { ...selectedLead};
        console.log(updatedLead)
        if (!validateForm(updatedLead)) return;

        try {
            const response = await fetch(`https://websolex-admin.vercel.app/api/employee/${selectedLead._id}`, 
                {
                    method: 'PUT',
                    headers:{
                    'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(updatedLead), 
                }
            );
         
            if (response.ok) {
                setIsOpenModel(false);
                setFeedback({
                    message: `employee updated success`,
                    type: 'success',
                });
                setLeads(leads.map((lead) => (lead._id === selectedLead._id ? updatedLead : lead)));
            }
        } catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://websolex-admin.vercel.app/api/employee/${id}`);
            setLeads(leads.filter((lead) => lead._id !== id));
            setFeedback({
                message: `employee deleted success`,
                type: 'success',
            });
        } catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };
    const handleEditClick = (lead) => {
        setSelectedLead(lead); 
        setIsOpenModel(true); 
    };

    const handleStatusUpdate = async (employeeId, newStatus) => {
        try {
            const response = await fetch(`https://websolex-admin.vercel.app/api/employee/${employeeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }), 
            });
            if (response.ok) {
                const updatedEmployee = await response.json();
                console.log('Employee status updated:', updatedEmployee);
 
                setLeads(leads.map((lead) =>
                    lead._id === employeeId ? { ...lead, status: newStatus } : lead
                ));
                setFeedback({
                    message: `Employee status updated successfully!`,
                    type: 'success',
                });
            }
        } catch (error) {
            setFeedback({
                message: `Failed to add lead. Please try again.${error.response ? error.response.data : error.message}`,
                type: 'error',
            });
        }
    };
    const handleChangeStatus = (employeeId, newStatus) => {
        handleStatusUpdate(employeeId, newStatus);
    };




    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex items-center justify-between mb-4">
                <h1 className='capitalize text-[26px] font-semibold  '>employee mangement</h1>
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

            {/* All Leads */}
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
                    {leads.length > 0 ? (
                        leads.map((lead, index) => (
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
                                    defaultValue={isOpenModel ? selectedLead?.name : ''}
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
                                        defaultValue={isOpenModel ? selectedLead?.designation : ''}
                                        placeholder="Enter designation"
                                    />
                                    {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
                                </div> <div className="flex flex-col w-full">
                                    <label className="text-gray-600">department:</label>
                                    <Input
                                        type="text"
                                        name="department"
                                        defaultValue={isOpenModel ? selectedLead?.department : ''}
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
                                        defaultValue={isOpenModel ? selectedLead?.email : ''}

                                        placeholder="Enter email"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div> <div className="flex flex-col w-full">
                                    <label className="text-gray-600">phone:</label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        defaultValue={isOpenModel ? selectedLead?.phone : ''}

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
                                        defaultValue={isOpenModel ? selectedLead?.salary : ''}

                                        placeholder="Enter salary"
                                    />
                                    {errors.salary && <p className="text-sm text-red-500">{errors.salary}</p>}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="text-gray-600">join date:</label>
                                    <Input
                                        type="date"
                                        name="join_date"
                                        defaultValue={isOpenModel ? selectedLead?.join_date : ''}

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
                                        defaultValue={isOpenModel ? selectedLead?.status : ''}
                                        
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
                                <Primary type="submit" label={isOpenAddModel ? 'Save' : 'Update'} className="btn btn-primary"/>
                                    
                               
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



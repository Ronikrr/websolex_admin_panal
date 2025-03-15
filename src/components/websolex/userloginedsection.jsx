import React, { useEffect, useState } from 'react'
import Breadcrumb from '../ui/breadcrumb';
import { IoMdAdd } from 'react-icons/io';
import Input from '../ui/input';
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import Submit from '../ui/submit';
import { RiDeleteBinLine } from 'react-icons/ri';
import FeedbackMessage from '../ui/feedback';
import emailjs from 'emailjs-com';
const Userloginedsection = () => {

    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [Users, setUsers] = useState([]);
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [feedback, setFeedback] = useState({ message: "", type: "" });

    const API = "http://localhost:8000";
    // const API = "https://websolex-admin.vercel.app";

    // Clear Feedback
    const handleClear = () => setFeedback({ message: "", type: "" });

    // Handle Form Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Fetch Users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API}/users`, { method: "GET" });

                if (!res.ok) {
                    const errorData = await res.json();
                    setFeedback({
                        message: `An error occurred while fetching data: ${errorData.message}`,
                        type: "error",
                    });
                    return;
                }

                const data = await res.json();
                setUsers(data.users);
            } catch (error) {
                setFeedback({
                    message: `Error fetching user data: ${error.message}`,
                    type: "error",
                });
            }
        };

        fetchData();
    }, []);

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setFeedback({ message: "All fields are required!", type: "error" });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setFeedback({ message: "Passwords do not match!", type: "error" });
            return;
        }

        try {
            const res = await fetch(`${API}/users`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const errorData = await res.json();
                setFeedback({ message: `Error: ${errorData.message}`, type: "error" });
                return;
            }

            setIsOpenAddModel(false);

            // Send Email (Optional)
            const emailResponse = await emailjs.sendForm(
                "service_szoqqsl",
                "template_3vvce77",
                e.target,
                "OoU53v3GRHWpMFiXL"
            );

            if (emailResponse.status === 200) {
                setFeedback({ message: "User added successfully, and email sent!", type: "success" });
            } else {
                setFeedback({ message: "User added successfully, but failed to send email.", type: "warning" });
            }
        } catch (error) {
            setFeedback({ message: `Error submitting form: ${error.message}`, type: "error" });
        }
    };

    // Update Status (Active/Inactive)
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`${API}/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setFeedback({ message: `Error: ${errorData.message}`, type: "error" });
                return;
            }

            // Update state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, status: newStatus } : user
                )
            );

            setFeedback({ message: "User status updated successfully!", type: "success" });
        } catch (error) {
            setFeedback({ message: `Error updating status: ${error.message}`, type: "error" });
        }
    };

    // Update Role
    const handleRoleChange = async (id, newRole) => {
        try {
            const res = await fetch(`${API}/usersrole/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setFeedback({ message: `Error: ${errorData.message}`, type: "error" });
                return;
            }

            // Update state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, role: newRole } : user
                )
            );

            setFeedback({ message: "Role changed successfully!", type: "success" });
        } catch (error) {
            setFeedback({ message: `Error updating role: ${error.message}`, type: "error" });
        }
    };

    // Delete User
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API}/users/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json();
                setFeedback({ message: `Error: ${errorData.message}`, type: "error" });
                return;
            }

            // Update state
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

            setFeedback({ message: "User deleted successfully!", type: "success" });
        } catch (error) {
            setFeedback({ message: `Error deleting user: ${error.message}`, type: "error" });
        }
    };

    const statusOptions = ["admin", "user", "employee"];


    return (
        <>

            <div className='w-full' >
                {feedback.message && (
                    <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
                )}
                <div className="flex items-center justify-between mb-4">
                    <h1 className='capitalize text-[26px] font-semibold  '>our users</h1>
                    <Breadcrumb />
                </div>
                <div className="w-full">
                    <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                        <div className="flex items-center justify-between w-full">
                            <div className="py-6">
                                <h1 className="capitalize text-[26px] font-semibold">Most Recent Added</h1>
                            </div>
                            <div className="flex items-center">
                                <button
                                    className="flex items-center gap-3 rounded-lg px-6 py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000"
                                    title="Add"
                                    onClick={() => setIsOpenAddModel(true)}
                                >
                                    <IoMdAdd /> Add
                                </button>
                            </div>
                        </div>

                        <table className="w-full border border-collapse border-gray-200">
                            <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5]">
                                <tr>
                                    <th className="p-2.5 xl:p-4 border border-gray-200">Name</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">Image</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200 ">role</th>
                                    {/* <th className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">Username</th> */}
                                    <th className="p-2.5 xl:p-4 border border-gray-200">Email</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">Phone</th>
                                    <th className="p-2.5 xl:p-4 border border-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Users.length > 0 ? (
                                    Users.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-200">
                                            <td className="p-2.5 xl:p-4 border border-gray-200 text-center capitalize ">{user?.name}</td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell">
                                                <div className="flex justify-center rounded-full">
                                                    {user?.profileImage ? (
                                                        <img src={user?.profileImage} className="object-cover w-12 h-12 rounded-full" alt="Profile" />
                                                    ) : (
                                                        <img src="https://www.t3bucket.com/f/0-user.svg" alt="Profile" className="object-cover w-12 h-12 rounded-full" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-2.5 xl:p-5 border border-gray-200 text-center ">
                                                <select
                                                    value={user?.role}
                                                    onChange={(e) => handleRoleChange(user?._id, e.target.value)}
                                                    className='capitalize'
                                                >
                                                    {statusOptions.map((status, index) => (
                                                        <option key={index} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            {/* <td className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell text-center">{user?.username}</td> */}
                                            <td className="p-2.5 xl:p-4 border border-gray-200 text-center">{user?.email}</td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200 hidden lg:table-cell text-center">{user?.phoneNo}</td>
                                            <td className="p-2.5 xl:p-4 border border-gray-200">
                                                <div className="flex items-center justify-center gap-2">
                                                    <p>{user.status}</p>
                                                    {user.status === 'pending' && user._id && (
                                                        <>
                                                            <button
                                                                className="px-4 py-2 text-white duration-1000 bg-green-500 border border-green-500 rounded-xl hover:bg-transparent hover:text-green-500"
                                                                onClick={() => handleStatusChange(user._id, 'Approved')}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                className="px-4 py-2 text-white duration-1000 bg-red-500 border border-red-500 rounded-xl hover:bg-transparent hover:text-red-500"
                                                                onClick={() => handleStatusChange(user._id, 'rejected')}
                                                            >
                                                                Reject
                                                            </button>
                                                            <button className="text-red-500" onClick={() => handleDelete(user._id)}>
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </>
                                                    )}
                                                    {user.status === 'rejected' && user._id && (
                                                        <>
                                                            <button
                                                                className="px-4 py-2 text-white duration-1000 bg-green-500 border border-green-500 rounded-xl hover:bg-transparent hover:text-green-500"
                                                                onClick={() => handleStatusChange(user._id, 'Approved')}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button className="text-red-500" onClick={() => handleDelete(user._id)}>
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </>
                                                    )}
                                                    {user.status === 'Approved' && user._id && (
                                                        <>
                                                            <button
                                                                className="px-4 py-2 text-white duration-1000 bg-red-500 border border-red-500 rounded-xl hover:bg-transparent hover:text-red-500"
                                                                onClick={() => handleStatusChange(user._id, 'rejected')}
                                                            >
                                                                Reject
                                                            </button>
                                                            <button className="text-red-500" onClick={() => handleDelete(user._id)}>
                                                                <RiDeleteBinLine />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-center border border-gray-200">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            {(isOpenAddModel) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 2xl:w-1/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">add user</h1>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="" className='mb-2.5 block font-medium text-black capitalize' >name</label>
                                <div className="relative">

                                    <Input
                                        type={`text`}
                                        name={`name`}

                                        onChange={handleChange}
                                        placeholder='enter your name'
                                    />
                                    <span className='absolute right-4 top-4' >
                                        <AiOutlineUser className='text-[22px] text-[var(--icon-color)] ' />
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="" className='mb-2.5 block font-medium text-black capitalize' >email</label>
                                <div className="relative">

                                    <Input
                                        type={`email`}
                                        name={`email`}

                                        onChange={handleChange}
                                        placeholder='enter your email'
                                    />
                                    <span className='absolute right-4 top-4' >
                                        <HiOutlineMail className='text-[22px] text-[var(--icon-color)] ' />
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="" className='mb-2.5 block font-medium text-black capitalize' >password</label>
                                <div className="relative">

                                    <Input
                                        type={`${showPassword ? 'text' : 'password'}`}
                                        name="password"

                                        onChange={handleChange}
                                        placeholder='enter your password'
                                    />
                                    <span className='absolute cursor-pointer right-4 top-4 ' onClick={() => setShowPassword((prev) => !prev)}  >
                                        {showPassword ?
                                            (<ImEye className='text-[22px] text-[var(--icon-color)] ' />) :
                                            (<ImEyeBlocked className='text-[22px] text-[var(--icon-color)] ' />)
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="" className='mb-2.5 block font-medium text-black capitalize' >re-type password</label>
                                <div className="relative">

                                    <Input
                                        type={`${showRepeatPassword ? 'text' : 'password'}`}
                                        name="confirmPassword"

                                        onChange={handleChange}
                                        placeholder='enter your password'
                                    />
                                    <span className='absolute cursor-pointer right-4 top-4 ' onClick={() => setShowRepeatPassword((prev) => !prev)}  >
                                        {showRepeatPassword ?
                                            (<ImEye className='text-[22px] text-[var(--icon-color)] ' />) :
                                            (<ImEyeBlocked className='text-[22px] text-[var(--icon-color)] ' />)
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="mb-5">
                                <Submit
                                    label={"Create"}

                                />
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Userloginedsection

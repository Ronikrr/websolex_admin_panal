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
const Userloginedsection = () => {

    const [isOpenAddModel, setIsOpenAddModel] = useState(false);
    const [Users, setUser] = useState([]);
    const [formdata, setformdata] = useState({});
    const [ishowpss, setishowpss] = useState(false);
    const [ishowrepss, setishowrepss] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const onsubmit = async (e) => {
        e.preventDefault();
        if (
            !formdata.name ||
            !formdata.email ||
            !formdata.password ||
            !formdata.confirmPassword
        ) {
            setFeedback({
                message: `All fields are required!`,
                type: 'error',
            });
            return;
        }

        if (formdata.password !== formdata.confirmPassword) {
            setFeedback({
                message: `Passwords do not match!`,
                type: 'error',
            });
            return;
        }

        try {
            const res = await fetch("https://websolex-admin.vercel.app/users", {
                method: "POST",
                body: JSON.stringify(formdata),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                setFeedback({
                    message: `An error occurred while submitting the form.:${res.message}`,
                    type: 'error',
                });
            }
            else {
                setIsOpenAddModel(false)
                setFeedback({
                    message: `user added succesfully`,
                    type: 'success',
                });
            }
        } catch (error) {
            setFeedback({
                message: `An error occurred while submitting the form :${error.message}`,
                type: 'error',
            });
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://websolex-admin.vercel.app/users', {
                    method: 'GET',
                });

                if (!res.ok) {
                    setFeedback({
                        message: `An error occurred while submitting the form :${res.message}`,
                        type: 'error',
                    });
                }

                const data = await res.json();
                setUser(data.users);  // Ensure the data is valid
            } catch (error) {
                setFeedback({
                    message: `Error fetching user data::${error.message}`,
                    type: 'error',
                });
            }
        };

        fetchData();
    }, []);
    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:8000/users/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });


            if (!res.ok) {
                setFeedback({
                    message: `An error occurred while submitting the form :${res.message}`,
                    type: 'error',
                });
            }


            setUser((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id ? { ...user, status: newStatus } : user
                )
            );
        } catch (error) {

            setFeedback({
                message: `Error updating status :${error.message}`,
                type: 'error',
            });

        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8000/users/${id}`, {
                method: 'DELETE',
            });
            setFeedback({
                message: `user deleted success`,
                type: 'success',
            });
        } catch (error) {
            setFeedback({
                message: `Error updating status :${error.message}`,
                type: 'error',
            });
        }
    };

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
                <div className="flex items-center gap-7">
                    <div className="w-full ">
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

                                <div className="p-2.5 xl:p-4 flex-1">name</div>
                                <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">username</div>
                                <div className="p-2.5 xl:p-4 flex-1">email</div>
                                <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">phone</div>
                                <div className="p-2.5 xl:p-4 flex-1">actions</div>

                            </div>
                            <div className="flex flex-col w-full">
                                {Users.map((user, _id) => {
                                    return (
                                        <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200" key={user._id} >

                                            <div className="flex-1 p-2.5 xl:p-4">{user?.name}</div>
                                            <div className="flex-1 p-2.5 xl:p-4 hidden lg:block">{user?.username}</div>
                                            <div className="flex-1 p-2.5 xl:p-4">{user?.email}</div>
                                            <div className="p-2.5 xl:p-4 flex-1 hidden lg:block">{user?.phoneNo}</div>

                                            {user.status === 'pending' && user?._id ? (
                                                <>
                                                    <div className="flex-1 p-2.5 xl:p-7 ">
                                                        <button className='px-4 py-2 my-1 text-white capitalize duration-1000 bg-green-500 border border-green-500 rounded-xl hover:shadow-lg hover:border hover:bg-transparent hover:text-green-500 hover:border-green-500' onClick={() => handleStatusChange(user._id, 'Approved')} >
                                                            approve
                                                        </button>
                                                        <button className='px-4 py-2 my-1 text-white capitalize duration-1000 bg-red-500 border border-red-500 rounded-xl hover:shadow-lg hover:border hover:bg-transparent hover:text-red-500 hover:border-red-500' onClick={() => handleStatusChange(user._id, 'rejected')} >
                                                            reject
                                                        </button>
                                                        <button className='text-red-500' onClick={() => handleDelete(user._id)} > <RiDeleteBinLine /> </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex-1 flex gap-2 items-center p-2.5 xl:9-7">

                                                    <p>{user.status}</p>
                                                    {user.status === 'rejected' && user._id ? (
                                                            <>
                                                                <button className='px-4 py-2 my-1 text-white capitalize duration-1000 bg-green-500 border border-green-500 rounded-xl hover:shadow-lg hover:border hover:bg-transparent hover:text-green-500 hover:border-green-500' onClick={() => handleStatusChange(user._id, 'Approved')} >
                                                                    approve
                                                                </button>
                                                                <button className='text-red-500' onClick={() => handleDelete(user._id)}  > <RiDeleteBinLine /> </button>
                                                        </>
                                                    ) :
                                                        ""
                                                    }
                                                    {user.status === 'Approved' && user._id ? (
                                                            <>
                                                                <button className='px-4 py-2 my-1 text-white capitalize duration-1000 bg-red-500 border border-red-500 rounded-xl hover:shadow-lg hover:border hover:bg-transparent hover:text-red-500 hover:border-red-500' onClick={() => handleStatusChange(user._id, 'rejected')} >
                                                                    reject
                                                                </button>
                                                                <button className='text-red-500' onClick={() => handleDelete(user._id)}  > <RiDeleteBinLine /> </button>
                                                            </>
                                                    ) : ""}
                                                </div>
                                            )}


                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {(isOpenAddModel) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">
                    <div className="w-1/3 p-8 bg-white rounded-md shadow-md">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">add user</h1>
                        <form action="" onSubmit={onsubmit}>
                            <div className="mb-4">
                                <label htmlFor="" className='mb-2.5 block font-medium text-black capitalize' >name</label>
                                <div className="relative">

                                    <Input
                                        type={`text`}
                                        name={`name`}

                                        onChange={handlechange}
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

                                        onChange={handlechange}
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
                                        type={`${ishowpss ? 'text' : 'password'}`}
                                        name="password"

                                        onChange={handlechange}
                                        placeholder='enter your password'
                                    />
                                    <span className='absolute cursor-pointer right-4 top-4 ' onClick={() => setishowpss((prev) => !prev)}  >
                                        {ishowpss ?
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
                                        type={`${ishowrepss ? 'text' : 'password'}`}
                                        name="confirmPassword"

                                        onChange={handlechange}
                                        placeholder='enter your password'
                                    />
                                    <span className='absolute cursor-pointer right-4 top-4 ' onClick={() => setishowrepss((prev) => !prev)}  >
                                        {ishowrepss ?
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
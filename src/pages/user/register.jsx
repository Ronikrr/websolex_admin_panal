import React, { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { ImEye, ImEyeBlocked } from 'react-icons/im'
import { Link,useNavigate } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai";
import Input from '../../components/ui/input';
import Submit from '../../components/ui/submit';
const Register = () => {
    const [formdata, setformdata] = useState({});
    const [ishowpss, setishowpss] = useState(false);
    const [ishowrepss, setishowrepss] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);

    const navigate = useNavigate();
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
            setErrorMessage("All fields are required!");
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); 
            return;
        }

        if (formdata.password !== formdata.confirmPassword) {
            setErrorMessage("Passwords do not match!");
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); 
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
                setErrorMessage("An error occurred while submitting the form." ,res.message);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000); 
            }
            else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            setErrorMessage("An error occurred while submitting the form.");
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };

    // const registerUser = async (userData) => {
    //     // Add user to the database with 'is_approved' set to false
    //     await db.collection('users').add({
    //         ...userData,
    //         is_approved: false,
    //     });
    // };


    return (
        <div className='flex items-center justify-center w-screen h-screen' >
            <div
                className={`fixed top-4 left-0 transform -translate-x-1/2 bg-red-500 text-white px-10 py-6 rounded shadow-lg transition-transform duration-500 ${showError ? "translate-x-0  opacity-100" : "-translate-x-[500px] opacity-0"
                    }`}
            >
                {errorMessage}
            </div>

            <div className="border rounded-sm border-[--border-color] bg-white w-[1280px] shadow-sm ">
                <div className="flex flex-wrap items-center w-full">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-[4.375rem] text-center px-[6.5rem]">
                            <Link to="/" className='inline-block text-[50px] capitalize font-semibold mb-3' >websolex </Link>
                            <p className='2xl:px-20 text-[30px]' >admin</p>
                            <span className="inline-block mt-16">
                                <img src="https://www.t3bucket.com/f/0-Group15.png" className='w-[350px] h-[350px]' alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="w-full border-[--border-color]  xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12 xl:p-17">
                            <span className="mb-1.5 block font-medium capitalize "> start for free </span>
                            <h2 className="text-2xl text-black mb-9 font-blod">Sign In to TailAdmin</h2>
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
                                <div className="mt-6 text-center">
                                    <p>Already have an account? <Link to='/login' className='text-[var(--primary-color)]' >Sign in</Link> </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

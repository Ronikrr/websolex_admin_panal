import React, { useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { ImEye, ImEyeBlocked } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/input'
import Submit from '../../components/ui/submit'
import FeedbackMessage from '../../components/ui/feedback';
import { loginuser } from '../../Redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch();
    const {  error } = useSelector((state) => state.auth)
    const [ishowpss, setishowpss] = useState(false);
    const [formdata, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    if (error) {
        setFeedback({
            message: `Error :${error}`,
            type: 'error',
        });
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formdata.email || !formdata.password) {
            setFeedback({
                message: `Both fields are required!`,
                type: 'error',
            });
            return;
        }

        try {
            const res = await dispatch(loginuser(formdata)).unwrap()
            if (!res.ok) {
                setFeedback({
                    message: `network connection error :${res.message}`,
                    type: 'error',
                });
            }
            navigate('/websolex');

        } catch (error) {
            setFeedback({
                message: `network connection error :${error}`,
                type: 'error',
            });
        }
    };

    return (
        <div className='flex items-center justify-center w-screen h-screen' >
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="border rounded-sm border-[--border-color] bg-white w-[1280px] shadow-sm ">
                <div className="flex flex-wrap items-center w-full">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-[4.375rem] text-center px-[6.5rem]">
                            <Link to="/" className='inline-block mb-5' >
                                <img src={'https://www.t3bucket.com/f/0-HorizantalLogo.png'} className='w-[150px]' alt="" />
                            </Link>
                            <p className='2xl:px-20 text-[16px]' >Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.</p>
                            <span className="inline-block mt-16">
                                <img src="https://www.t3bucket.com/f/0-Group152.png" className='w-[350px] h-[350px]' alt="" />
                            </span>
                        </div>
                    </div>
                    <div className="w-full border-[var(--border-color)]  xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12 xl:p-17">
                            <span className="mb-1.5 block font-medium capitalize "> start for free </span>
                            <h2 className="text-2xl text-black mb-9 font-blod">Sign In to TailAdmin</h2>
                            <form onSubmit={onSubmit} >
                                <div className="mb-4">
                                    <label htmlFor="" className='mb-2.5 block font-medium text-black capitalize' >email</label>
                                    <div className="relative">

                                        <Input
                                            type={'email'}
                                            name={`email`}
                                            value={formdata.email}
                                            onChange={handleChange}
                                            placeholder={'enter your email'}
                                        />
                                        <span className='absolute right-4 top-3 lg:top-4' ><HiOutlineMail className='text-[15px] lg:text-[22px] text-[var(--icon-color)] ' />  </span>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="" className='mb-2.5 block font-medium text-black capitalize' >password</label>
                                    <div className="relative">

                                        <Input
                                            type={`${ishowpss ? 'text' : 'password'}`}
                                            name={`password`}
                                            value={formdata.password}
                                            onChange={handleChange}
                                            placeholder={'enter your password'}
                                        />
                                        <span className='absolute cursor-pointer right-4 top-3 lg:top-4 ' onClick={() => setishowpss((prev) => !prev)}  >
                                            {ishowpss ?
                                                (<ImEye className='text-[15px] lg:text-[22px] text-[var(--icon-color)] ' />) :
                                                (<ImEyeBlocked className='text-[15px] lg:text-[22px] text-[var(--icon-color)] ' />)
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-5">
                                    <Submit
                                        label={'Submit'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
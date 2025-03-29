import React, { useState, useEffect } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/input';
import Submit from '../../components/ui/submit';
import FeedbackMessage from '../../components/ui/feedback';
import { loginuser } from '../../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [ishowpss, setishowpss] = useState(false);
    const [formdata, setFormData] = useState({
        email: '',
        password: '',
    });
    const [feedback, setFeedback] = useState({ message: '', type: '' });

    // ✅ Handle Redux error changes with useEffect to avoid infinite re-rendering
    useEffect(() => {
        if (error) {
            setFeedback({
                message: `Error: ${error}`,
                type: 'error',
            });
        }
    }, [error]);

    // ✅ Clear feedback
    const handleClear = () => {
        setFeedback({ message: '', type: '' });
    };

    // ✅ Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!formdata.email || !formdata.password) {
            setFeedback({
                message: 'Both fields are required!',
                type: 'error',
            });
            return;
        }

        try {
            await dispatch(loginuser(formdata)).unwrap();

            // ✅ Clear feedback and navigate if login is successful
            setFeedback({
                message: 'Login successful!',
                type: 'success',
            });

            setTimeout(() => navigate('/websolex'), 1000);
        } catch (error) {
            setFeedback({
                message: `Login failed: ${error.message || 'Unknown error'}`,
                type: 'error',
            });
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            {/* ✅ Feedback Message */}
            {feedback.message && (
                <FeedbackMessage
                    message={feedback.message}
                    type={feedback.type}
                    onClear={handleClear}
                />
            )}

            <div className="border rounded-sm border-[--border-color] bg-white w-[1280px] shadow-sm">
                <div className="flex flex-wrap items-center w-full">
                    {/* ✅ Left Side */}
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="py-[4.375rem] text-center px-[6.5rem]">
                            <Link to="/" className="inline-block mb-5">
                                <img
                                    src="https://www.t3bucket.com/f/0-HorizantalLogo.png"
                                    className="w-[150px]"
                                    alt="Company Logo" 
                                />
                            </Link>
                            <p className="2xl:px-20 text-[16px]">
                                Sign in with your credentials to access the Websolex admin panel.
                            </p>
                            <span className="inline-block mt-16">
                                <img
                                    src="https://www.t3bucket.com/f/0-Group152.png"
                                    className="w-[350px] h-[350px]"
                                    alt="Illustration" 
                                />
                            </span>
                        </div>
                    </div>

                    {/* ✅ Right Side */}
                    <div className="w-full border-[var(--border-color)] xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12 xl:p-17">
                            <span className="mb-1.5 block font-medium capitalize">
                                Start for free
                            </span>
                            <span className="text-xl font-bold text-black mb-9">
                                Sign In to Websolex Admin
                            </span>
                            <form onSubmit={onSubmit}>
                                {/* ✅ Email Input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="email" 
                                        className="mb-2.5 block font-medium text-black capitalize"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formdata.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                        />
                                        <span className="absolute right-4 top-3 lg:top-4">
                                            <HiOutlineMail className="text-[15px] lg:text-[22px] text-[var(--icon-color)]" />
                                        </span>
                                    </div>
                                </div>

                                {/* ✅ Password Input */}
                                <div className="mb-6">
                                    <label
                                        htmlFor="password" 
                                        className="mb-2.5 block font-medium text-black capitalize"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Input
                                            type={ishowpss ? 'text' : 'password'}
                                            name="password"
                                            value={formdata.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                        <span
                                            className="absolute cursor-pointer right-4 top-3 lg:top-4" 
                                            onClick={() => setishowpss((prev) => !prev)}
                                        >
                                            {ishowpss ? (
                                                <ImEye className="text-[15px] lg:text-[22px] text-[var(--icon-color)]" />
                                            ) : (
                                                <ImEyeBlocked className="text-[15px] lg:text-[22px] text-[var(--icon-color)]" />
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* ✅ Submit Button */}
                                <div className="mb-5">
                                    <Submit label="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

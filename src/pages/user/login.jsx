import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { ImEye, ImEyeBlocked } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from '../../Redux/authSlice';
import Input from '../../components/ui/input';
import Submit from '../../components/ui/submit';
import FeedbackMessage from '../../components/ui/feedback';
import logo from '../../assets/img/webp/0-HorizantalLogo.webp';
import illustration from '../../assets/img/webp/0-Group152.webp';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [feedback, setFeedback] = useState(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (error) {
            setFeedback({ message: `Error: ${error}`, type: 'error' });
        }
        return () => clearTimeout(timeoutRef.current);
    }, [error]);

    const handleClearFeedback = useCallback(() => setFeedback(null), []);

    const handleChange = useCallback((e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setFeedback({ message: 'Both fields are required!', type: 'error' });
            return;
        }
        try {
            await dispatch(loginuser(formData)).unwrap();
            setFeedback({ message: 'Login successful!', type: 'success' });
            timeoutRef.current = setTimeout(() => navigate('/websolex'), 1000);
        } catch (error) {
            setFeedback({ message: `Login failed: ${error.message || 'Unknown error'}`, type: 'error' });
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            {feedback?.message && (
                <FeedbackMessage message={feedback?.message} type={feedback?.type} onClear={handleClearFeedback} />
            )}
            <div className="border rounded-sm border-gray-300 bg-white w-[1280px] shadow-sm flex flex-wrap">
                {/* Left Side */}
                <div className="hidden px-24 py-16 text-center xl:block xl:w-1/2">
                    <Link to="/" className="inline-block mb-5">
                        <img src={logo} className="w-36" alt="Company Logo" loading="lazy" />
                    </Link>
                    <p className="text-lg">Sign in with your credentials to access the Websolex admin panel.</p>
                    <img src={illustration} className="mx-auto mt-16 w-80 h-80" alt="Illustration" loading="lazy" />
                </div>
                {/* Right Side */}
                <div className="w-full p-8 border-gray-300 xl:w-1/2 xl:border-l ">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <h2 className="text-xl font-bold text-black">Sign In to Websolex Admin</h2>
                        <form onSubmit={handleSubmit} className="w-full mt-6 space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block font-medium text-black">Email</label>
                                <div className="relative">
                                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                                    <HiOutlineMail className="absolute text-xl text-gray-500 right-4 top-3" />
                                </div>
                            </div>
                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block font-medium text-black">Password</label>
                                <div className="relative">
                                    <Input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                                    <span className="absolute cursor-pointer right-4 top-3" onClick={() => setShowPassword((prev) => !prev)}>
                                        {showPassword ? <ImEye className="text-xl text-gray-500" /> : <ImEyeBlocked className="text-xl text-gray-500" />}
                                    </span>
                                </div>
                            </div>
                            {/* Submit */}
                            <Submit label="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

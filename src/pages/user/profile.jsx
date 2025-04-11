
import React, { useEffect, useState } from 'react';
import Primary from '../../components/ui/primary';
import Input from '../../components/ui/input';
import BreadcrumbNav from '../../components/ui/breadcrumb';
import { FaRegUser } from 'react-icons/fa';
import { RiContactsBook3Line } from 'react-icons/ri';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import FeedbackMessage from '../../components/ui/feedback';
import { useSelector, useDispatch } from 'react-redux';
import { getuserprofile, updateuserprofile } from '../../Redux/authSlice';
import Logoutmodel from '../../components/ui/logoutmodel';


const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const error = useSelector((state) => state.auth.feedback);
    const [formData, setFormData] = useState({
        name: '',
        phoneNo: '',
        email: '',
        password: '',
        username: '',
        profileImage: '',
    });
    const [isModelOpen, setisModelOpen] = useState(false)
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [feedback, setFeedback] = useState({ message: '', type: '' });
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/login-history/${user?.user?.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Admintoken_websolex')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setHistory(data[data.length - 1]);
                    console.log(data)
                } else {
                    console.error('Failed to fetch login history');
                }
            } catch (error) {
                console.error('Error fetching login history:', error);
            }
        };
        fetchLoginHistory();
    }, [user]);



    useEffect(() => {
        dispatch(getuserprofile());
    }, [dispatch]);

    const handleopenmodel = () => {
        setisModelOpen(!isModelOpen)
    }
    useEffect(() => {
        if (!error) {
            setFeedback({ message: error.message, type: error.type })
        }
    }, [error])
    useEffect(() => {
        if (user?.user) {
            setFormData({
                name: user?.user?.name || '',
                phoneNo: user?.user?.phoneNo || '',
                email: user?.user?.email || '',
                username: user?.user?.username || '',
                profileImage: user?.user?.profileImage || '',
            });
        }
        else if (error) {
            setFeedback({ message: `${error.message}`, type: error.message });
        }

    }, [user, error]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file && ["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
            setNewProfileImage(file);
        } else {
            setFeedback({ message: "Only PNG, JPG, or GIF files are allowed.", type: "error" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(newProfileImage)
        const token = localStorage.getItem("Admintoken_websolex");
        if (!token) {
            navigate("/");
            return;
        }

        // Prepare form data
        const updatedData = new FormData();
        updatedData.append("name", formData.name);
        updatedData.append("phoneNo", formData.phoneNo);
        updatedData.append("email", formData.email);
        updatedData.append("username", formData.username);
        if (newProfileImage) {
            updatedData.append("profileImage", newProfileImage);
        }
        // console.log(updatedData)

        dispatch(updateuserprofile(updatedData));
    };
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    const handlelogout = () => {
        localStorage.removeItem("Admintoken_websolex")
        navigate('/')
    }

    return (
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
            {feedback?.message && (
                <FeedbackMessage message={feedback?.message} type={feedback?.type} onClear={handleClear} />
            )}
            <Logoutmodel
                isOpen={isModelOpen}
                onClose={() => setisModelOpen(false)}
                onConfirm={handlelogout}
            />
            <div className="mx-auto max-w-[67.5rem]">
                <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-semibold text-black text-[15px]">Settings</h2>
                    <BreadcrumbNav />
                </div>
                <div className="flex flex-wrap gap-8">
                    <div className="w-full">
                        <div className="bg-white border rounded-sm border-[var(--border-color)] shadow-default">
                            <div className="py-4 border-b border-[var(--border-color)] capitalize px-7">

                                <div className="flex items-center justify-between w-full">
                                    <span> Personal Information</span>
                                    <span> <Link to={"/loginhistory"} >{new Date(history.loginTime).toLocaleString()}</Link> </span>
                                </div>
                            </div>
                            <div className="p-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col items-center lg:flex-row">
                                        <div className="flex items-center w-full gap-4 mb-4 xl:w-6/12">
                                            <div className="rounded-full h-14 w-14">
                                                <img
                                                    src={formData?.profileImage || 'https://www.t3bucket.com/f/0-user.svg'}
                                                    alt="Profile"
                                                    className="object-cover w-12 h-12 rounded-full"
                                                    loading='lazy'
                                                />
                                            </div>
                                            <div>
                                                <span className="mb-1.5 text-black">Edit your photo</span>
                                                <span className="flex gap-2.5">
                                                    <input
                                                        type="file"
                                                        name="profileImage"
                                                        accept="image/*"
                                                        className="hidden"
                                                        id="profileImage"
                                                        onChange={handleFileChange}
                                                    />
                                                    <label
                                                        htmlFor="profileImage"
                                                        className="text-sm text-blue-500 hover:text-[var(--primary-color)] capitalize cursor-pointer"
                                                    >
                                                        Update
                                                    </label>
                                                    <button
                                                        type="button"
                                                        className="text-sm hover:text-[var(--primary-color)] capitalize"
                                                    >
                                                        Delete
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                                        <div className="w-full sm:w-1/2">
                                            <label className="block mb-3 text-sm font-medium text-black capitalize">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    name="name"
                                                    value={formData?.name} onChange={handleChange} placeholder="Enter full name"
                                                />
                                                <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
                                                    <FaRegUser className="text-[15px] lg:text-[20px] text-[#64748b]" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="w-full ">
                                            <label className="block mb-3 text-sm font-medium text-black capitalize">
                                                Phone Number
                                            </label>
                                            <div className="relative">

                                                <Input
                                                    name="phoneNo"
                                                    value={formData?.phoneNo}
                                                    onChange={handleChange} placeholder="Enter phone number"
                                                />
                                                <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
                                                    <RiContactsBook3Line className="text-[15px] lg:text-[20px] text-[#64748b]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5 ">
                                        <label className="block mb-3 text-sm font-medium text-black capitalize">
                                            Email Address
                                        </label>
                                        <div className="relative">

                                            <Input
                                                name="email"
                                                value={formData?.email}
                                                onChange={handleChange}
                                                placeholder="Enter email address"
                                            />
                                            <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
                                                <MdOutlineMailOutline className="text-[15px] lg:text-[20px] text-[#64748b]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <label className="block mb-3 text-sm font-medium text-black capitalize">
                                            Username
                                        </label>
                                        <Input
                                            name="username"
                                            value={formData?.username}
                                            onChange={handleChange}
                                            placeholder="Enter username"
                                        />
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <button type="button" className="px-6 py-2 text-white bg-red-500 border border-red-600 rounded-md hover:shadow-md hover:text-red-600 hover:bg-red-100" onClick={handleopenmodel} >
                                            Logout
                                        </button>
                                        <div className="flex items-center gap-4">

                                            <Primary label="Save" type="submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

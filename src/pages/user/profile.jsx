    import React, { useEffect, useState } from 'react';
    import Secondurary from '../../components/ui/seconduray';
    import Primary from '../../components/ui/primary';
    import Input from '../../components/ui/input';
    import BreadcrumbNav from '../../components/ui/breadcrumb';
    import { FaRegUser } from 'react-icons/fa';
    import { RiContactsBook3Line } from 'react-icons/ri';
    import { MdOutlineFileUpload, MdOutlineMailOutline } from 'react-icons/md';
    import { ImEye, ImEyeBlocked } from 'react-icons/im';
    import { useNavigate } from 'react-router-dom';

    const Profile = () => {
        const [user, setUser] = useState({
            name: '',
            phoneNo: '',
            email: '',
            password: '',
            username: '',
        });
        const [error, setError] = useState(null);
        const [profileImage, setProfileImage] = useState(null);
        const [isshowpass, setShowPassword] = useState(false);
        const [successMessage, setSuccessMessage] = useState(null);
        const [showError, setShowError] = useState(false);
        const [showMessage, setShowMessage] = useState(false);
        const navigate = useNavigate();

        const handleShowPassword = () => {
            setShowPassword(!isshowpass);
        };

        const logout = () => {
            localStorage.removeItem('adminToken');
            navigate('/');
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setUser((prevUser) => ({
                ...prevUser,
                [name]: value,
            }));
        };

        const handleFileChange = (e) => {
            const file = e.target.files[0];

            if (file) {
                // Validate file type
                if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
                    alert("Only PNG, JPG, or GIF files are allowed.");
                    return;
                }

                // Validate file size (max 800 KB)
                if (file.size > 800 * 1024) {
                    alert("File size exceeds the limit of 800 KB.");
                    return;
                }
                setProfileImage(file); 
            } else {
                console.error("No file selected.");
            }
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
            const adminToken = localStorage.getItem('adminToken');
            if (!adminToken) {
                navigate('/');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('name', user.name);
                formData.append('phoneNo', user.phoneNo);
                formData.append('email', user.email);
                formData.append('password', user.password);
                formData.append('username', user.username);
                if (profileImage) {
                    formData.append('profileImage', profileImage);
                }

                const res = await fetch('https://websolex-admin.vercel.app/profile', {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error(`Error updating profile: ${res.statusText}`);
                }

                // const data = await res.json();
                setSuccessMessage('Profile updated successfully!');
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            } catch (error) {
                console.error('Error updating profile:', error);
                setError(error.message);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        };

        useEffect(() => {
            const fetchData = async () => {
                const adminToken = localStorage.getItem('adminToken');
                if (!adminToken) {
                    navigate('/');
                    return;
                }

                try {
                    const res = await fetch('https://websolex-admin.vercel.app/profile', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${adminToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.status === 401) {
                        navigate("/");
                        return;
                    } else if (res.status === 500) {
                        throw new Error('Server error. Please try again later.');
                    }

                    if (!res.ok) {
                        throw new Error(`Error fetching profile: ${res.status}`);
                    }

                    const data = await res.json();
                    setUser(data.user);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError(error.message);
                    setShowError(true);
                    setTimeout(() => setShowError(false), 3000);
                }
            };

            fetchData();
        }, [navigate]);
        console.log('Profile Image:', profileImage);

        return (
            <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
                {error && (
                    <div
                        className={`fixed top-4 left-0 transform -translate-x-1/2 bg-red-500 text-white px-10 py-6 rounded shadow-lg transition-transform duration-500 ${showError ? 'translate-x-0 opacity-100' : '-translate-x-[500px] opacity-0'}`}
                    >
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div
                        className={`fixed top-4 left-0 transform -translate-x-1/2 bg-green-500 text-white px-10 py-6 rounded shadow-lg transition-transform duration-500 ${showMessage ? 'translate-x-0 opacity-100' : '-translate-x-[500px] opacity-0'}`}
                    >
                        {successMessage}
                    </div>
                )}
                <div className="mx-auto max-w-[67.5rem]">
                    <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="font-semibold text-black text-[26px]">Settings</h2>
                        <BreadcrumbNav />
                    </div>
                    <div className="flex flex-wrap gap-8">
                        <div className="w-full">
                            <div className="bg-white border rounded-sm border-[var(--border-color)] shadow-default">
                                <div className="py-4 border-b border-[var(--border-color)] capitalize px-7">
                                    Personal Information
                                </div>
                                <div className="p-7">
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex items-center">
                                            <div className="flex items-center w-full gap-4 mb-4 xl:w-6/12">
                                                <div className="rounded-full h-14 w-14">
                                                    {
                                                        user.profileImage ? (
                                                            <img src={user.profileImage} alt="Profile" className="profile-image" />
                                                        ) : (
                                                                <img src='https://www.t3bucket.com/f/0-user.svg' alt="Profile" className="w-12 h-12 rounded-full" />
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <span className="mb-1.5 text-black">Edit your photo</span>
                                                    <span className="flex gap-2.5">
                                                        <input
                                                            type="file"
                                                            name="profileImage"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => setProfileImage(e.target.files[0])}
                                                        />
                                                        <label
                                                            htmlFor="profileImage"
                                                            className="text-sm hover:text-[var(--primary-color)] capitalize cursor-pointer"
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
                                            <div className="relative xl:w-6/12 mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-[var(--primary-color-)] bg-[#eff4fb] py-4 px-4 sm:py-7.5">
                                                <input
                                                    type="file"
                                                    name="profileImage"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"

                                                />
                                                <div className="flex flex-col items-center justify-center space-y-3">
                                                    <span className="flex items-center rounded-full justify-center w-10 h-10 bg-white border-[#e2e8f0]">
                                                        <MdOutlineFileUpload className="text-[22px] text-[var(--primary-color-)]" />
                                                    </span>
                                                    <p>
                                                        <span className="text-[var(--primary-color-)]">Click to upload</span>
                                                        or drag and drop
                                                    </p>
                                                    <p className="mb-1.5">SVG, PNG, JPG, or GIF (max, 800x800px)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                                            <div className="w-full sm:w-1/2">
                                                <label htmlFor="name" className="block mb-3 text-sm font-medium text-black capitalize">
                                                    Full Name
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        name="name"
                                                        value={user.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter full name"
                                                    />
                                                    <div className="absolute top-4 right-4">
                                                        <FaRegUser className="text-[20px] text-[#64748b]" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full sm:w-1/2">
                                                <label htmlFor="phoneNo" className="block mb-3 text-sm font-medium text-black capitalize">
                                                    Phone Number
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        name="phoneNo"
                                                        value={user.phoneNo}
                                                        onChange={handleChange}
                                                        placeholder="Enter phone number"
                                                    />
                                                    <div className="absolute top-4 right-4">
                                                        <RiContactsBook3Line className="text-[20px] text-[#64748b]" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="email" className="block mb-3 text-sm font-medium text-black capitalize">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    name="email"
                                                    value={user.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter email address"
                                                />
                                                <div className="absolute top-4 right-4">
                                                    <MdOutlineMailOutline className="text-[20px] text-[#64748b]" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="password" className="block mb-3 text-sm font-medium text-black capitalize">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    name="password"
                                                    type={isshowpass ? 'text' : 'password'}
                                                    value={user.password}
                                                    onChange={handleChange}
                                                    placeholder="Enter password"
                                                />
                                                <div
                                                    className="absolute cursor-pointer top-4 right-4"
                                                    onClick={handleShowPassword}
                                                >
                                                    {isshowpass ? (
                                                        <ImEye className="text-[22px] text-[var(--icon-color)]" />
                                                    ) : (
                                                        <ImEyeBlocked className="text-[22px] text-[var(--icon-color)]" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="username" className="block mb-3 text-sm font-medium text-black capitalize">
                                                Username
                                            </label>
                                            <Input
                                                name="username"
                                                value={user.username}
                                                onChange={handleChange}
                                                placeholder="Enter username"
                                            />
                                        </div>
                                        <div className="flex justify-between gap-4">
                                            <button
                                                type="button"
                                                className="px-6 py-2 text-white capitalize bg-red-500 border border-red-600 rounded-md hover:shadow-md hover:text-red-600 hover:bg-red-100"
                                                onClick={logout}
                                            >
                                                Logout
                                            </button>
                                            <div className="flex items-center gap-4">
                                                <Secondurary label="Cancel" />
                                                <Primary label="Save" type="submit" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* Additional UI components */}
                    </div>
                </div >
            </div >
        );
    };

    export default Profile;

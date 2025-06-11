import { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoMdAdd } from "react-icons/io"
import Input from "../ui/input"
import Primary from "../ui/primary"
import Seconduray from "../ui/seconduray"
import Breadcrumb from "../ui/breadcrumb"
import FeedbackMessage from "../ui/feedback"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs, addBlog, updateBlog, deleteBlog, clearFeedback } from "../../Redux/slice/blogslice"
import Deletemodel from "../ui/deletemodel"
import { useLocation, useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa"
import User from "../ui/user"


const Blogpagesection = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const  {user}  = useSelector((state) => state?.auth?.user)
    const { blogs, feedback } = useSelector((state) => state.blogs)
    const [isOpenModel, setIsOpenModel] = useState(false)
    const [isOpenAddModel, setIsOpenAddModel] = useState(false)
    const [errors, setErrors] = useState({})
    const [isOpenDeleteModel, setisOpenDeleteModel] = useState(false)
    const [feedbacks, setfeedbacks] = useState({ message: "", type: "" })
    const [formData, setFormData] = useState({
        name: "",
        content: [{ title: "", subtitle: "", description: "" }],
        image: null,
        imagePreview: null,
    })

    const onClear = () => {
        setfeedbacks({ message: "", type: "" })
    }
        
        
        
    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])
    useEffect(() => {
        if (feedback && feedback.message) {
            setfeedbacks({
                message: typeof feedback.message === "object" ? JSON.stringify(feedback.message) : feedback.message,
                type: feedback.type,
            })
            dispatch(clearFeedback())
        }
    }, [feedback, dispatch])

    const validateBlogForm = (formData) => {
        const errors = {}
        if (!formData.name.trim()) errors.name = "Name is required"

        formData.content.forEach((item, index) => {
            if (!item.title.trim()) errors[`title${index + 1}`] = "Title is required"
            if (!item.description.trim()) errors[`description${index + 1}`] = "Description is required"
        })

        if (!formData.image) errors.image = "Image is required"

        return errors
    }

    const handleInputChange = (index, field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            content: prevState.content.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
        }))
    }

    const handleAddInputSet = () => {
        setFormData((prevState) => ({
            ...prevState,
            content: [...prevState.content, { title: "", subtitle: "", description: "" }],
        }))
    }

    const handleAddSave = async (e) => {
        e.preventDefault()

        const validationErrors = validateBlogForm(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formData.content.forEach((item, index) => {
            formDataToSend.append(`title${index + 1}`, item.title)
            formDataToSend.append(`subtitle${index + 1}`, item.subtitle)
            formDataToSend.append(`description${index + 1}`, item.description)
        })
        if (formData.image) formDataToSend.append("image_blog_work", formData.image)

        try {
            const result = await dispatch(addBlog(formDataToSend)).unwrap() // Unwrap to handle errors properly
            if (result) {
                resetFormFields() // Reset form only if successful
                setIsOpenAddModel(false)
            }
        } catch (error) {
            console.error("Error adding blog:", error)
            setfeedbacks({ message: "Failed to add blog. Please try again.", type: "error" })
        }
    }

    const handleEditSave = async (id) => {
        const validationErrors = validateBlogForm(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formDataToSend = new FormData()
        formDataToSend.append("name", formData.name)
        formData.content.forEach((item, index) => {
            formDataToSend.append(`title${index + 1}`, item.title)
            formDataToSend.append(`subtitle${index + 1}`, item.subtitle)
            formDataToSend.append(`description${index + 1}`, item.description)
        })
        if (formData.image) formDataToSend.append("image_blog_work", formData.image)

        // dispatch(updateBlog({ id, formData: formDataToSend }));
        try {
            const result = await dispatch(updateBlog({ id, formData: formDataToSend })).unwrap() // Unwrap to handle errors properly
            if (result) {
                resetFormFields() // Reset form only if successful
                setIsOpenModel(false)
            }
        } catch (error) {
            setfeedbacks({ message: "Failed to update blog. Please try again.", type: "error" })
        }
    }

    const resetFormFields = () => {
        setFormData({
            name: "",
            content: [{ title: "", subtitle: "", description: "" }],
            image: null,
            imagePreview: null,
        })
        setErrors({})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }))
        }
    }

    const recentLead = blogs.length > 0 ? blogs[blogs.length - 1] : null

    const handleEditClick = (lead) => {
        setFormData({
            name: lead.name,
            content:
                Array.isArray(lead.content) && lead.content.length > 0
                    ? lead.content
                    : [{ title: "", subtitle: "", description: "" }],
            image: lead.image,
            imagePreview: lead.image,
        })
        setIsOpenModel(true)
    }

    const handleDelete = async (id) => {
        dispatch(deleteBlog(id))
    }

    const handleDeleteClick = async (id) => {
        setisOpenDeleteModel(true)
    }
    const pagename = location.pathname.split("/").filter(Boolean).pop()

    return (
        <div className="w-full bg-gray-100 ">
            <User />
            {feedback && (
                <FeedbackMessage
                    message={typeof feedbacks?.message === "object" ? JSON.stringify(feedbacks?.message) : feedbacks?.message}
                    type={feedbacks?.type} onClear={onClear}
                />
            )}
            <div className="flex flex-col items-center justify-between my-4 lg:flex-row">
                <h1 className="capitalize text-[26px] font-semibold">blog page</h1>
                <Breadcrumb />
            </div>
            <Deletemodel
                isOpen={isOpenDeleteModel}
                onClose={() => setisOpenDeleteModel(false)}
                onConfirm={handleDelete}
                pagename={pagename}
            />

            {/* Most Recent Lead */}

            <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                <div className="flex items-center justify-between w-full">
                    <div className="py-6">
                        <h1 className="capitalize lg:text-[26px] font-semibold ">Most Recent added</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="relative cursor-pointer ">
                            <button
                                className="flex items-center gap-3 rounded-lg px-4 py-1 lg:px-6 lg:py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000"
                                title="add"
                                onClick={() => setIsOpenAddModel(true)}
                            >
                                <IoMdAdd /> add
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse border-gray-200">
                        {/* Table Header */}
                        <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase">
                            <tr>
                                <th className="p-2.5 xl:p-5 border border-gray-200 w-[75px]">ID</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Image</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">Name</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {recentLead ? (
                                <tr key={recentLead?.id} className="text-center border-b border-gray-200">
                                    <td className="p-2.5 xl:p-3 border border-gray-200">1</td>
                                    <td className="p-2.5 xl:p-3 border border-gray-200">
                                        <img
                                            loading="lazy"
                                            src={recentLead?.image || "/placeholder.svg"}
                                            alt={recentLead?.name || "Lead Image"}
                                            className="object-cover w-8 h-8 mx-auto lg:w-16 lg:h-16 aspect-square"
                                        />
                                    </td>
                                    <td
                                        className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                        title={recentLead?.name}
                                    >
                                        {recentLead?.name}
                                    </td>
                                    <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                        {user?.role === "user" ? (
                                            <button
                                                className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]"
                                                onClick={() => handleEditClick(recentLead)}
                                            >
                                                <FaEye />
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]"
                                                    onClick={() => handleEditClick(recentLead)}
                                                >
                                                    <FaRegEdit />
                                                </button>
                                                {user?.role === "admin" && (
                                                    <button
                                                        className="text-red-500 hover:text-black text-[10px] lg:text-[15px]"
                                                        onClick={() => handleDeleteClick(recentLead._id)}
                                                    >
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center">
                                        No leads found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-full p-5 bg-white rounded-md shadow-md">
                <h1 className="capitalize text-[15px] lg:text-[26px] py-6 font-semibold">All added</h1>

                <div className="overflow-x-auto ">
                    <table className="w-full border border-collapse border-gray-200 rounded-md">
                        {/* Table Header */}
                        <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase">
                            <tr>
                                <th className="p-2.5 xl:p-5 border border-gray-200 w-[75px]">ID</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Image</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">Name</th>
                                <th className="p-2.5 xl:p-5 border border-gray-200 text-center">Action</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {blogs?.length > 0 ? (
                                blogs?.map((lead, index) => (
                                    <tr key={lead.id || index} className="text-center border-b border-gray-200">
                                        <td className="p-2.5 xl:p-3 border border-gray-200">{lead?.id || index + 1}</td>
                                        <td className="p-2.5 xl:p-3 border border-gray-200">
                                            <img
                                                loading="lazy"
                                                src={lead?.image || "/placeholder.svg"}
                                                alt={lead?.name || "Lead Image"}
                                                className="object-cover w-8 h-8 mx-auto lg:w-16 lg:h-16 aspect-square"
                                            />
                                        </td>
                                        <td
                                            className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                            title={lead?.name}
                                        >
                                            {lead?.name}
                                        </td>

                                        <td className="px-2.5 py-5 xl:px-3 xl:py-10 flex justify-center gap-2">
                                            {user?.role === "user" ? (
                                                <button
                                                    className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]"
                                                    onClick={() => handleEditClick(lead)}
                                                >
                                                    <FaEye />
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        className="text-gray-600 hover:text-black text-[10px] lg:text-[15px]"
                                                        onClick={() => handleEditClick(lead)}
                                                    >
                                                        <FaRegEdit />
                                                    </button>
                                                    {user?.role === "admin" && (
                                                        <button
                                                            className="text-red-500 hover:text-black text-[10px] lg:text-[15px]"
                                                            onClick={() => handleDeleteClick(lead?._id)}
                                                        >
                                                            <RiDeleteBin6Line />
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center">
                                        No leads found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {(isOpenAddModel || isOpenModel) && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">
                            {isOpenAddModel ? "Add New Blog" : "Edit Blog"}
                        </h1>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={
                                isOpenAddModel
                                    ? handleAddSave
                                    : (e) => {
                                        e.preventDefault()
                                        handleEditSave(formData._id)
                                    }
                            }
                        >
                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Name:</label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData((prevState) => ({ ...prevState, name: e.target.value }))}
                                    placeholder="Enter name"
                                    disabled={user?.role === "user"}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                            {formData.content.map((item, index) => (
                                <div key={index} className="flex flex-row gap-4">
                                    <div className="flex flex-col w-full">
                                        <label className="text-gray-600 text-[10px] lg:text-[15px]">Title {index + 1}:</label>
                                        <Input
                                            type="text"
                                            name={`title${index + 1}`}
                                            value={item.title}
                                            onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                            placeholder={`Enter title ${index + 1}`}
                                            disabled={user?.role === "user"}
                                        />
                                        {errors[`title${index + 1}`] && (
                                            <p className="text-sm text-red-500">{errors[`title${index + 1}`]}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="text-gray-600 text-[10px] lg:text-[15px]">subTitle {index + 1}:</label>
                                        <Input
                                            type="text"
                                            name={`subtitle${index + 1}`}
                                            value={item.subtitle}
                                            onChange={(e) => handleInputChange(index, "subtitle", e.target.value)}
                                            placeholder={`Enter subtitle ${index + 1}`}
                                            disabled={user?.role === "user"}
                                        />
                                        {errors[`subtitle${index + 1}`] && (
                                            <p className="text-sm text-red-500">{errors[`subtitle${index + 1}`]}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="text-gray-600 text-[10px] lg:text-[15px]">Description {index + 1}:</label>
                                        <Input
                                            type="text"
                                            name={`description${index + 1}`}
                                            value={item.description}
                                            onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                            placeholder={`Enter description ${index + 1}`}
                                            disabled={user?.role === "user"}
                                        />
                                        {errors[`description${index + 1}`] && (
                                            <p className="text-sm text-red-500">{errors[`description${index + 1}`]}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddInputSet}
                                disabled={user?.role === "user"}
                                className={`px-4 py-2 mt-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${user?.role === "user"
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[var(--primary-color)] hover:bg-[var(--primary-light-color)]'
                                    }`}


                            >
                                Add Input Set
                            </button>

                            {/* Image Upload */}
                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input
                                        type="file"
                                        name="image_blog_work"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={user?.role === "user"}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {formData.imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img
                                            loading="lazy"
                                            src={formData.imagePreview || "/placeholder.svg"}
                                            alt="Preview"
                                            className="w-16 h-16"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <Primary type="submit" disabled={user?.role === "user"} label={isOpenAddModel ? "Save" : "Update"} />
                                <Seconduray
                                    type="button"
                                    label={"Cancel"}
                                    onClick={() => {
                                        resetFormFields()
                                        isOpenAddModel ? setIsOpenAddModel(false) : setIsOpenModel(false)
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Blogpagesection

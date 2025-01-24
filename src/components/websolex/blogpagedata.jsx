// import React, { useEffect, useState } from "react"
// import { FaRegEdit } from "react-icons/fa"
// import { RiDeleteBin6Line } from "react-icons/ri"
// import { IoMdAdd } from "react-icons/io"
// import Input from "../ui/input"
// import Primary from "../ui/primary"
// import Seconduray from "../ui/seconduray"
// import Breadcrumb from "../ui/breadcrumb"
// import axios from "axios"
// import FeedbackMessage from "../ui/feedback"

// const Blogpagesection = () => {
//     const [isOpenModel, setIsOpenModel] = useState(false)
//     const [isOpenAddModel, setIsOpenAddModel] = useState(false)
//     const [imageFile, setImageFile] = useState(null)
//     const [imagePreview, setImagePreview] = useState(null)
//     const [leads, setLeads] = useState([])
//     const [selectedLead, setSelectedLead] = useState(null)
//     const [errors, setErrors] = useState({})
//     const [isOpenLastAll, setIsOpenLastAll] = useState(false)
//     const [feedback, setFeedback] = useState({ message: "", type: "" })
//     const [formData, setFormData] = useState([{ title: "", subtitle: "", description: "" }])

//     const handleClear = () => {
//         setFeedback({ message: "", type: "" })
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             setIsOpenLastAll(false)
//         }, 3000)
//     }, [isOpenLastAll])

//     useEffect(() => {
//         const fetchleads = async () => {
//             try {
//                 const res = await fetch("https://websolex-admin.vercel.app/api/blogpage", {
//                     method: "GET",
//                 })
//                 if (!res.ok) {
//                     setFeedback({
//                         message: `Error fetching blog data:${res.message}`,
//                         type: "error",
//                     })
//                 }

//                 const data = await res.json()
//                 setLeads(data)
//             } catch (error) {
//                 setFeedback({
//                     message: `Error fetching blog data:${error}`,
//                     type: "error",
//                 })
//             }
//         }
//         fetchleads()
//     }, [])

//     const validateForm = (data) => {
//         const newErrors = {}
//         if (!data.name || data.name.trim() === "") newErrors.name = "Name is required"
//         data.forEach((item, index) => {
//             if (!item.title || item.title.trim() === "") newErrors[`title${index + 1}`] = `Title ${index + 1} is required`
//             if (!item.subtitle || item.subtitle.trim() === "") newErrors[`subtitle${index + 1}`] = `SubTitle ${index + 1} is required`
//             if (!item.description || item.description.trim() === "")
//                 newErrors[`description${index + 1}`] = `Description ${index + 1} is required`
//         })
//         if (!imageFile) newErrors.image = "Image is required"
//         setErrors(newErrors)
//         return Object.keys(newErrors).length === 0
//     }

//     const handleInputChange = (index, field, value) => {
//         const newFormData = [...formData]
//         newFormData[index][field] = value
//         setFormData(newFormData)
//     }

//     const handleAddInputSet = () => {
//         setFormData([...formData, { title: "", subtitle: "", description: "" }])
//     }

//     const handleAddSave = async (e) => {
//         e.preventDefault()

//         const name = e.target.name.value
//         const formDataToSend = new FormData()
//         formDataToSend.append("name", name)

//         formData.forEach((item, index) => {
//             formDataToSend.append(`title${index + 1}`, item.title)
//             formDataToSend.append(`subtitle${index + 1}`, item.subtitle)
//             formDataToSend.append(`description${index + 1}`, item.description)
//         })

//         if (imageFile) formDataToSend.append("image_blog_work", imageFile)

//         // Validate form
//         if (!validateForm({ name, ...formData })) return

//         try {
//             const response = await axios.post(`https://websolex-admin.vercel.app/api/blogpage`, formDataToSend, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             })
//             if (response.status === 200) {
//                 setIsOpenAddModel(false)
//                 setFeedback({
//                     message: `Blog added successfully!`,
//                     type: "success",
//                 })
//                 setLeads([...leads, response.data.blogadd.savedblogadd])
//                 resetFormFields()
//             }
//         } catch (error) {
//             setFeedback({
//                 message: `Error: Failed to add blog. Please try again. ${error.response ? error.response.data : error.message}`,
//                 type: "error",
//             })
//         }
//     }

//     const handleEditSave = async (e) => {
//         e.preventDefault()
//         const name = e.target.name.value
//         const formDataToSend = new FormData()
//         formDataToSend.append("name", name)

//         formData.forEach((item, index) => {
//             formDataToSend.append(`title${index + 1}`, item.title)
//             formDataToSend.append(`subtitle${index + 1}`, item.subtitle)
//             formDataToSend.append(`description${index + 1}`, item.description)
//         })

//         if (imageFile) formDataToSend.append("image_blog_work", imageFile)

//         // Validate form
//         if (!validateForm({ name, ...formData })) return

//         try {
//             const response = await axios.put(
//                 `https://websolex-admin.vercel.app/api/blogpage/${selectedLead._id}`,
//                 formDataToSend,
//                 {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 },
//             )
//             if (response.status === 200) {
//                 setIsOpenModel(false)
//                 setFeedback({
//                     message: `Blog updated successfully!`,
//                     type: "success",
//                 })
//                 setLeads(leads.map((lead) => (lead._id === selectedLead._id ? response.data.updatedBlog : lead)))
//                 resetFormFields()
//             }
//         } catch (error) {
//             setFeedback({
//                 message: `Error: Failed to update blog. Please try again. ${error.response ? error.response.data : error.message}`,
//                 type: "error",
//             })
//         }
//     }

//     const resetFormFields = () => {
//         setFormData([{ title: "", subtitle: "", description: "" }])
//         setImageFile(null)
//         setImagePreview(null)
//         setErrors({})
//     }

//     const handleFileChange = (e) => {
//         const file = e.target.files[0]
//         if (file) {
//             setImageFile(file)
//             setImagePreview(URL.createObjectURL(file))
//         }
//     }

//     const recentLead = leads[leads.length - 1]

//     const handleEditClick = (lead) => {
//         setSelectedLead(lead)
//         setImageFile(lead.image)
//         setImagePreview(lead.image)
//         const newFormData = []
//         for (let i = 1; i <= 3; i++) {
//             if (lead[`title${i}`] && lead[`subtitle${i}`] && lead[`description${i}`]) {
//                 newFormData.push({
//                     title: lead[`title${i}`],
//                     subtitle: lead[`subtitle${i}`],
//                     description: lead[`description${i}`],
//                 })
//             }
//         }
//         setFormData(newFormData.length > 0 ? newFormData : [{ title: "", subtitle: "", description: "" }])
//         setIsOpenModel(true)
//     }

//     const handleDelete = async (id) => {
//         try {
//             await fetch(`https://websolex-admin.vercel.app/api/blogpage/${id}`, {
//                 method: "DELETE",
//             })
//             setLeads(leads.filter((lead) => lead._id !== id))
//             setFeedback({
//                 message: `Blog deleted successfully!`,
//                 type: "success",
//             })
//         } catch (error) {
//             setFeedback({
//                 message: `Error deleting blog. Please try again. ${error.response ? error.response.data : error.message}`,
//                 type: "error",
//             })
//         }
//     }

//     return (
//         <div className="w-full bg-gray-100 ">
//             {feedback.message && <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />}
//             <div className="flex flex-col items-start justify-between mb-6 lg:items-center lg:flex-row">
//                 <div>
//                     <h1 className='capitalize text-[26px] font-semibold  '>blog page</h1>
//                 </div>
//                 <Breadcrumb />
//             </div>

//             {/* Most Recent Lead */}
//             <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
//                 <div className="flex items-center justify-between w-full">
//                     <div className="py-6">
//                         <h1 className="capitalize text-[26px] font-semibold ">Most Recent added</h1>
//                     </div>
//                     <div className="flex items-center">
//                         <div className="relative cursor-pointer ">
//                             <button
//                                 className="flex items-center gap-3 rounded-lg px-6 py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000"
//                                 title="add"
//                                 onClick={() => setIsOpenAddModel(true)}
//                             >
//                                 <IoMdAdd /> add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
//                     <div className="p-2.5  flex-1">ID</div>
//                     <div className="p-2.5  flex-1">Image</div>
//                     <div className="p-2.5  flex-1">Name</div>
//                     <div className="p-2.5  flex-1">Action</div>
//                 </div>
//                 <div className="flex flex-col w-full">
//                     {recentLead ? (
//                         <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
//                             <div className="flex-1 p-2.5">1</div>
//                             <div className="flex-1 p-2.5">
//                                 <img
//                                     src={recentLead?.image || "/placeholder.svg"}
//                                     alt={recentLead?.name}
//                                     className="object-cover w-16 h-16 aspect-square"
//                                 />
//                             </div>
//                             <div className="flex-1 p-2.5">{recentLead?.name}</div>
//                             <div className="flex items-center flex-1 gap-2">
//                                 <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(recentLead)}>
//                                     <FaRegEdit />
//                                 </button>
//                                 <button className="text-red-500 hover:text-black" onClick={() => handleDelete(recentLead?._id)}>
//                                     <RiDeleteBin6Line />
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="p-4 text-center">
//                             <p>No recent lead added yet.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* All Leads */}
//             <div className="w-full p-5 bg-white rounded-md shadow-md">
//                 <h1 className="capitalize text-[26px] py-6 font-semibold">All added</h1>
//                 <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
//                     <div className="p-2.5  flex-1">ID</div>
//                     <div className="p-2.5  flex-1">Image</div>
//                     <div className="p-2.5  flex-1">Name</div>
//                     <div className="p-2.5  flex-1">Action</div>
//                 </div>
//                 <div className="flex flex-col w-full">
//                     {leads.length > 0 ? (
//                         leads.map((lead, index) => (
//                             <div key={index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
//                                 <div className="p-2.5  flex-1">{index + 1}</div>
//                                 <div className="p-2.5  flex-1">
//                                     <img
//                                         src={lead?.image || "/placeholder.svg"}
//                                         alt={lead?.name || "Lead Image"}
//                                         className="object-cover w-16 h-16 aspect-w-1 aspect-h-1"
//                                     />
//                                 </div>
//                                 <div className="p-2.5  flex-1">{lead?.name}</div>
//                                 <div className="flex items-center flex-1 gap-2">
//                                     <button className="text-gray-600 hover:text-black" onClick={() => handleEditClick(lead)}>
//                                         <FaRegEdit />
//                                     </button>
//                                     <button className="text-red-500 hover:text-black" onClick={() => handleDelete(lead?._id)}>
//                                         <RiDeleteBin6Line />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="p-4 text-center">
//                             <p>No leads found.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {(isOpenAddModel || isOpenModel) && (
//                 <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">
//                     <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 ">
//                         <h1 className="capitalize text-[26px] font-semibold mb-4 ">
//                             {isOpenAddModel ? "Add New Blog" : "Edit Blog"}
//                         </h1>
//                         <form className="flex flex-col gap-4" onSubmit={isOpenAddModel ? handleAddSave : handleEditSave}>
//                             <div className="flex flex-col w-full">
//                                 <label className="text-gray-600">Name:</label>
//                                 <Input
//                                     type="text"
//                                     name="name"
//                                     defaultValue={isOpenModel ? selectedLead.name : ""}
//                                     placeholder="Enter name"
//                                 />
//                                 {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
//                             </div>
//                             {formData.map((item, index) => (
//                                 <div key={index} className="flex flex-row gap-4">
//                                     <div className="flex flex-col w-full">
//                                         <label className="text-gray-600">Title {index + 1}:</label>
//                                         <Input
//                                             type="text"
//                                             name={`title${index + 1}`}
//                                             value={item.title}
//                                             onChange={(e) => handleInputChange(index, "title", e.target.value)}
//                                             placeholder={`Enter title ${index + 1}`}
//                                         />
//                                         {errors[`title${index + 1}`] && (
//                                             <p className="text-sm text-red-500">{errors[`title${index + 1}`]}</p>
//                                         )}
//                                     </div>
//                                     <div className="flex flex-col w-full">
//                                         <label className="text-gray-600">subTitle {index + 1}:</label>
//                                         <Input
//                                             type="text"
//                                             name={`subtitle${index + 1}`}
//                                             value={item.subtitle}
//                                             onChange={(e) => handleInputChange(index, "subtitle", e.target.value)}
//                                             placeholder={`Enter subtitle ${index + 1}`}
//                                         />
//                                         {errors[`subtitle${index + 1}`] && (
//                                             <p className="text-sm text-red-500">{errors[`subtitle${index + 1}`]}</p>
//                                         )}
//                                     </div>
//                                     <div className="flex flex-col w-full">
//                                         <label className="text-gray-600">Description {index + 1}:</label>
//                                         <Input
//                                             type="text"
//                                             name={`description${index + 1}`}
//                                             value={item.description}
//                                             onChange={(e) => handleInputChange(index, "description", e.target.value)}
//                                             placeholder={`Enter description ${index + 1}`}
//                                         />
//                                         {errors[`description${index + 1}`] && (
//                                             <p className="text-sm text-red-500">{errors[`description${index + 1}`]}</p>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                             <button
//                                 type="button"
//                                 onClick={handleAddInputSet}
//                                 className="px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                                 Add Input Set
//                             </button>

//                             {/* Image Upload */}
//                             <div className="flex flex-row w-full mb-3">
//                                 <div className="flex flex-col w-8/12">
//                                     <label className="text-gray-600">Image:</label>
//                                     <Input type="file" name="image_blog_work" accept="image/*" onChange={handleFileChange} />
//                                     {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
//                                 </div>
//                                 {imagePreview && (
//                                     <div className="flex justify-center mt-2">
//                                         <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-16 h-16" />
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex justify-between mt-4">
//                                 <Primary type="submit" label={isOpenAddModel ? "Save" : "Update"} />
//                                 <Seconduray
//                                     type="button"
//                                     label={"Cancel"}
//                                     onClick={() => (isOpenAddModel ? setIsOpenAddModel(false) : setIsOpenModel(false))}
//                                 />
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Blogpagesection
import React, { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { IoMdAdd } from "react-icons/io"
import Input from "../ui/input"
import Primary from "../ui/primary"
import Seconduray from "../ui/seconduray"
import Breadcrumb from "../ui/breadcrumb"
import axios from "axios"
import FeedbackMessage from "../ui/feedback"

const Blogpagesection = () => {
    const [isOpenModel, setIsOpenModel] = useState(false)
    const [isOpenAddModel, setIsOpenAddModel] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [leads, setLeads] = useState([])
    const [selectedLead, setSelectedLead] = useState(null)
    const [errors, setErrors] = useState({})
    const [isOpenLastAll, setIsOpenLastAll] = useState(false)
    const [feedback, setFeedback] = useState({ message: "", type: "" })
    const [formData, setFormData] = useState([{ title: "", subtitle: "", description: "" }]);


    const handleClear = () => {
        setFeedback({ message: "", type: "" })
    }

    useEffect(() => {
        setTimeout(() => {
            setIsOpenLastAll(false)
        }, 3000)
    }, [isOpenLastAll])

    useEffect(() => {
        const fetchleads = async () => {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/blogpage", {
                    method: "GET",
                })
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                const data = await res.json()
                console.log("Fetched leads data:", data);
                setLeads(data);
            } catch (error) {
                setFeedback({
                    message: `Error fetching blog data: ${error.message}`,
                    type: "error",
                })
            }
        }
        fetchleads()
    }, [])

    const validateBlogForm = (name, formData) => {
        const errors = {};
        if (!name.name || !name.name.trim()) errors.name = "Name is required";

        // Check if formData is an array before calling forEach
        if (Array.isArray(formData)) {
            formData.forEach((item, index) => {
                if (!item.title || !item.title.trim()) errors[`title${index + 1}`] = "Title is required";
                if (!item.subtitle || !item.subtitle.trim()) errors[`subtitle${index + 1}`] = "Subtitle is required";
                if (!item.description || !item.description.trim()) errors[`description${index + 1}`] = "Description is required";
            });
        } else {
            console.error("Expected formData to be an array but got:", formData);
        }

        if (!imageFile) errors.image = "Image is required";

        return errors;
    };



    const handleInputChange = (index, field, value) => {
        const newFormData = [...formData]
        newFormData[index][field] = value
        setFormData(newFormData)
    }

    const handleAddInputSet = () => {
        setFormData([...formData, { title: "", subtitle: "", description: "" }])
    }

    const handleAddSave = async (e) => {
        e.preventDefault()

        const name = e.target.name.value
        const formDataToSend = new FormData()
        formDataToSend.append("name", name)

        formData.forEach((item, index) => {
            formDataToSend.append(`title${index + 1}`, item.title)
            formDataToSend.append(`subtitle${index + 1}`, item.subtitle)
            formDataToSend.append(`description${index + 1}`, item.description)
        })

        if (imageFile) formDataToSend.append("image_blog_work", imageFile)

        // Validate form
        if (!validateBlogForm({ name, formData })) return

        try {
            const response = await axios.post(`https://websolex-admin.vercel.app/api/blogpage`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            if (response.status === 200) {
                setIsOpenAddModel(false)
                setFeedback({
                    message: `Blog added successfully!`,
                    type: "success",
                })
                setLeads((prevLeads) => [...prevLeads, response.data.blogadd.savedblogadd])
                resetFormFields()
            }
        } catch (error) {
            setFeedback({
                message: `Error: Failed to add blog. Please try again. ${error.response ? error.response.data : error.message}`,
                type: "error",
            })
        }
    }

    const handleEditSave = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const formDataToSend = new FormData()
        formDataToSend.append("name", name)

        formData.forEach((item, index) => {
            formDataToSend.append(`title${index + 1}`, item.title)
            formDataToSend.append(`subtitle${index + 1}`, item.subtitle)
            formDataToSend.append(`description${index + 1}`, item.description)
        })

        if (imageFile) formDataToSend.append("image_blog_work", imageFile)

        // Validate form
        if (!validateBlogForm({ name, formData })) return

        try {
            const response = await axios.put(
                `https://websolex-admin.vercel.app/api/blogpage/${selectedLead._id}`,
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            )
            if (response.status === 200) {
                setIsOpenModel(false)
                setFeedback({
                    message: `Blog updated successfully!`,
                    type: "success",
                })
                setLeads((prevLeads) =>
                    prevLeads.map((lead) => (lead._id === selectedLead._id ? response.data.updatedBlog : lead)),
                )
                resetFormFields()
            }
        } catch (error) {
            setFeedback({
                message: `Error: Failed to update blog. Please try again. ${error.response ? error.response.data : error.message}`,
                type: "error",
            })
        }
    }

    const resetFormFields = () => {
        setFormData([{ title: "", subtitle: "", description: "" }])
        setImageFile(null)
        setImagePreview(null)
        setErrors({})
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const recentLead = leads.length > 0 ? leads[leads.length - 1] : null

    const handleEditClick = (lead) => {
        setSelectedLead(lead)
        setImageFile(lead.image)
        setImagePreview(lead.image)
        setFormData(Array.isArray(lead.content) && lead.content.length > 0 ? lead.content : [{ title: "", subtitle: "", description: "" }]);

        setIsOpenModel(true)
        console.log("Edit form data:", lead.content)
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`https://websolex-admin.vercel.app/api/blogpage/${id}`, {
                method: "DELETE",
            })
            setLeads(leads.filter((lead) => lead._id !== id))
            setFeedback({
                message: `Blog deleted successfully!`,
                type: "success",
            })
        } catch (error) {
            setFeedback({
                message: `Error deleting blog. Please try again. ${error.response ? error.response.data : error.message}`,
                type: "error",
            })
        }
    }

    return (
        <div className="w-full bg-gray-100 ">
            {feedback.message && <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />}
            <div className="flex flex-col items-start justify-between mb-6 lg:items-center lg:flex-row">
                <div>
                    <h1 className="capitalize text-[26px] font-semibold  ">blog page</h1>
                </div>
                <Breadcrumb />
            </div>

            {/* Most Recent Lead */}
            <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                <div className="flex items-center justify-between w-full">
                    <div className="py-6">
                        <h1 className="capitalize text-[26px] font-semibold ">Most Recent added</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="relative cursor-pointer ">
                            <button
                                className="flex items-center gap-3 rounded-lg px-6 py-2 shadow-md border text-[var(--primary-color)] border-[var(--primary-color)] uppercase hover:bg-[var(--primary-color)] hover:text-white duration-1000"
                                title="add"
                                onClick={() => setIsOpenAddModel(true)}
                            >
                                <IoMdAdd /> add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                    <div className="p-2.5  flex-1">ID</div>
                    <div className="p-2.5  flex-1">Image</div>
                    <div className="p-2.5  flex-1">Name</div>
                    <div className="p-2.5  flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {recentLead ? (
                        <div className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                            <div className="flex-1 p-2.5">1</div>
                            <div className="flex-1 p-2.5">
                                <img
                                    src={recentLead?.image || "/placeholder.svg"}
                                    alt={recentLead?.name}
                                    className="object-cover w-16 h-16 aspect-square"
                                />
                            </div>
                            <div className="flex-1 p-2.5">{recentLead?.name}</div>
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
                <h1 className="capitalize text-[26px] py-6 font-semibold">All added</h1>
                <div className="text-gray-600 text-[10px] md:text-[16px] uppercase leading-[1.5] bg-gray-100 flex w-full">
                    <div className="p-2.5  flex-1">ID</div>
                    <div className="p-2.5  flex-1">Image</div>
                    <div className="p-2.5  flex-1">Name</div>
                    <div className="p-2.5  flex-1">Action</div>
                </div>
                <div className="flex flex-col w-full">
                    {leads.length > 0 ? (
                        leads.map((lead, index) => (
                            <div key={index} className="flex items-center w-full p-2.5 xl:p-3 border-b border-gray-200">
                                <div className="p-2.5  flex-1">{index + 1}</div>
                                <div className="p-2.5  flex-1">
                                    <img
                                        src={lead?.image || "/placeholder.svg"}
                                        alt={lead?.name || "Lead Image"}
                                        className="object-cover w-16 h-16 aspect-w-1 aspect-h-1"
                                    />
                                </div>
                                <div className="p-2.5  flex-1">{lead?.name}</div>
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
                    <div className="w-full p-5 bg-white rounded-md shadow-md md:p-8 md:w-2/3 ">
                        <h1 className="capitalize text-[26px] font-semibold mb-4 ">
                            {isOpenAddModel ? "Add New Blog" : "Edit Blog"}
                        </h1>
                        <form className="flex flex-col gap-4" onSubmit={isOpenAddModel ? handleAddSave : handleEditSave}>
                            <div className="flex flex-col w-full">
                                <label className="text-gray-600">Name:</label>
                                <Input
                                    type="text"
                                    name="name"
                                    defaultValue={isOpenModel ? selectedLead.name : ""}
                                    placeholder="Enter name"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>
                            {formData.map((item, index) => (
                                <div key={index} className="flex flex-row gap-4">
                                    <div className="flex flex-col w-full">
                                        <label className="text-gray-600">Title {index + 1}:</label>
                                        <Input
                                            type="text"
                                            name={`title${index + 1}`}
                                            value={item.title}
                                            onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                            placeholder={`Enter title ${index + 1}`}
                                        />
                                        {errors[`title${index + 1}`] && (
                                            <p className="text-sm text-red-500">{errors[`title${index + 1}`]}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="text-gray-600">subTitle {index + 1}:</label>
                                        <Input
                                            type="text"
                                            name={`subtitle${index + 1}`}
                                            value={item.subtitle}
                                            onChange={(e) => handleInputChange(index, "subtitle", e.target.value)}
                                            placeholder={`Enter subtitle ${index + 1}`}
                                        />
                                        {errors[`subtitle${index + 1}`] && (
                                            <p className="text-sm text-red-500">{errors[`subtitle${index + 1}`]}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <label className="text-gray-600">Description {index + 1}:</label>
                                        <Input
                                            type="text"
                                            name={`description${index + 1}`}
                                            value={item.description}
                                            onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                            placeholder={`Enter description ${index + 1}`}
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
                                className="px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Input Set
                            </button>

                            {/* Image Upload */}
                            <div className="flex flex-row w-full mb-3">
                                <div className="flex flex-col w-8/12">
                                    <label className="text-gray-600">Image:</label>
                                    <Input type="file" name="image_blog_work" accept="image/*" onChange={handleFileChange} />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                                {imagePreview && (
                                    <div className="flex justify-center mt-2">
                                        <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-16 h-16" />
                                    </div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                                <Primary type="submit" label={isOpenAddModel ? "Save" : "Update"} />
                                <Seconduray
                                    type="button"
                                    label={"Cancel"}
                                    onClick={() => (isOpenAddModel ? setIsOpenAddModel(false) : setIsOpenModel(false))}
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


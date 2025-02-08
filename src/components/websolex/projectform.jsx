import React from "react"
import { useState, useEffect } from "react"
import Secondary from "../ui/seconduray"
import Primary from "../ui/primary"
import Input from "../ui/input"
import FeedbackMessage from "../ui/feedback"



const FormWithApiData = () => {
    const [project, setProject] = useState({
        totalClients: "",
        completedProjects: "",
    })
    const [id, setId] = useState(null)
    const [feedback, setFeedback] = useState({ message: "", type: "" })
    const [isLoading, setIsLoading] = useState(true)

    const handleClear = () => {
        setFeedback({ message: "", type: "" })
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/project")
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }
                const data = await res.json()
                setProject(data)
                setId(data._id)
            } catch (error) {
                setFeedback({
                    message: `Error fetching project data: ${error instanceof Error ? error.message : String(error)}`,
                    type: "error",
                })
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, []) 
    console.log(project)

    const handleChange = (e) => {
        const { name, value } = e.target
        setProject((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const url = "https://websolex-admin.vercel.app/api/project"
            const method = id ? "PUT" : "POST"
            const body = id ? JSON.stringify({ id, ...project }) : JSON.stringify(project)

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const data = await res.json()
            if (!id) {
                setId(data.member._id)
            }

            setFeedback({
                message: `Project ${id ? "updated" : "created"} successfully`,
                type: "success",
            })
        } catch (error) {
            setFeedback({
                message: `Error ${id ? "updating" : "creating"} project: ${error instanceof Error ? error.message : String(error)}`,
                type: "error",
            })
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            {feedback.message && <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />}
            <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                <div className="w-full">
                    <label htmlFor="totalClients" className="block mb-3 text-sm font-medium text-black capitalize">
                        Total Clients
                    </label>
                    <Input
                        type="text"
                        name="totalClients"
                        placeholder="Total clients"
                        value={project.totalClients}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="mb-5">
                <label htmlFor="completedProjects" className="block mb-3 text-sm font-medium text-black capitalize">
                    Completed Projects
                </label>
                <Input
                    type="text"
                    name="completedProjects"
                    placeholder="Completed projects"
                    value={project.completedProjects}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-end gap-4">
                <Secondary label="Cancel" />
                <Primary label="Save" type="submit" disabled={isLoading} />
            </div>
        </form>
    )
}

export default FormWithApiData


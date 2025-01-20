import React, { useState, useEffect } from "react";
import Seconduray from "../ui/seconduray";
import Primary from "../ui/primary";
import Input from "../ui/input";
import FeedbackMessage from '../ui/feedback';
const FormWithApiData = () => {
    const [project, setproject] = useState({
        totalClients: "",
        completedProjects: "",
    });
    const [id, setid] = useState(null);

    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/project", {
                    method: "GET",
                });
                const data = await res.json();
                if (data && data.length > 0) {
                    setproject(data[0]);
                    setid(data[0]._id);
                }
            } catch (error) {
                setFeedback({
                    message: `Error fetching team members:${error}`,
                    type: 'error',
                });
            }
        };
        fetchdata();
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproject({
            ...project,
            [name]: value,
        });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (id) {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/project", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        ...project
                    }),
                });
                if (!res.ok) {
                    setFeedback({
                        message: `Error fetching team members:${res.message}`,
                        type: 'error',
                    });
                }
            } catch (error) {
                setFeedback({
                    message: `Error fetching team members:${error}`,
                    type: 'error',
                });
            }
        } else {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/project", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(project),
                });
                if (!res.ok) {
                    setFeedback({
                        message: `Error fetching team members:${res.message}`,
                        type: 'error',
                    });
                }
                const data = await res.json();
                setid(data.member._id);
            } catch (error) {
                setFeedback({
                    message: `Error fetching team members:${error}`,
                    type: 'error',
                });
            }
        }
    };
    return (
        <form onSubmit={handlesubmit} >
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                <div className="w-full">
                    <label
                        htmlFor="totalClients"
                        className="block mb-3 text-sm font-medium text-black capitalize"
                    >
                        Total Clients
                    </label>
                    <Input
                        type={'text'}
                        name={'totalClients'}
                        placeholder={"Total clients"}
                        value={project?.totalClients}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="completedProjects"
                    className="block mb-3 text-sm font-medium text-black capitalize"
                >
                    Completed Projects
                </label>
                <Input
                    type={"text"}
                    name={"completedProjects"}
                    placeholder={"Completed projects"}
                    value={project?.completedProjects}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-end gap-4">
                <Seconduray label="Cancel" />
                <Primary label="Save" type="submit" />
            </div>
        </form>
    );
};

export default FormWithApiData;

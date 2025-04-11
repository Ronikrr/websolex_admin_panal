import React, { useState, useEffect } from "react";
import Secondary from "../ui/seconduray";
import Primary from "../ui/primary";
import Input from "../ui/input";
import FeedbackMessage from "../ui/feedback";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, updateProject } from "../../Redux/slice/projectSlice";
import { useNavigate } from "react-router-dom";

const FormWithApiData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects: projectDetails } = useSelector((state) => state.project.data);
    // console.log(projectDetails)
    const projectFeedback = useSelector((state) => state.project.feedback);
    const { user } = useSelector((state) => state.auth?.user);
     useEffect(() => {
            if (!user) {
                navigate('/')
            }
        }, [user, navigate])
    // Local state for form input
    const [formData, setFormData] = useState({
        totalClients: "",
        completedProjects: ""
    });

    const [feedback, setFeedback] = useState({ message: "", type: "" });

    useEffect(() => {
        dispatch(fetchProject());
    }, [dispatch]);

    // Sync local state with Redux data
    useEffect(() => {
        if (projectDetails) {
            setFormData(projectDetails);
        }
    }, [projectDetails]);

    // Sync feedback messages
    useEffect(() => {
        if (projectFeedback) {
            setFeedback(projectFeedback);
        }
    }, [projectFeedback]);

    // Update local state on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Dispatch updated data to Redux only on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProject(formData));
    };

    // Clear feedback message
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}

            <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                <div className="w-full">
                    <label htmlFor="totalClients" className="block mb-3 text-sm font-medium text-black capitalize">
                        Total Clients
                    </label>
                    <Input
                        type="text"
                        name="totalClients"
                        placeholder="Total clients"
                        value={formData?.totalClients}
                        onChange={handleChange}
                        disabled={user?.role === 'user'}
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
                    value={formData?.completedProjects}
                    onChange={handleChange}
                    disabled={user?.role === 'user'}
                />
            </div>

            <div className="flex justify-end gap-4">
                <Secondary label="Cancel" />
                <Primary label="Save" type="submit" />
            </div>
        </form>
    );
};

export default FormWithApiData;

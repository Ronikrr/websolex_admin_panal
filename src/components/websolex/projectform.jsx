import React, { useState, useEffect } from "react";
import Secondary from "../ui/seconduray";
import Primary from "../ui/primary";
import Input from "../ui/input";
import FeedbackMessage from "../ui/feedback";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject, updateProject } from "../../Redux/slice/projectSlice";

const FormWithApiData = () => {
    const dispatch = useDispatch();
    const projectDetails = useSelector((state) => state.project.data);
    const projectFeedback = useSelector((state) => state.project.feedback);
    const [feedback, setFeedback] = useState({ message: "", type: "" });

    // Clear feedback message
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };

    // Fetch the project details on component mount
    useEffect(() => {
        dispatch(fetchProject());
    }, [dispatch]);

    // Sync the feedback from Redux state
    useEffect(() => {
        if (projectFeedback) {
            setFeedback(projectFeedback);
        }
    }, [projectFeedback]);

    // Handle input change and update project details in Redux store
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedProject = { ...projectDetails, [name]: value };
        dispatch(updateProject(updatedProject));
    };

    // Handle form submission to update project
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProject(projectDetails)); // Dispatch the updated project to Redux
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
                        value={projectDetails?.totalClients || ""}
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
                    value={projectDetails?.completedProjects || ""}
                    onChange={handleChange}
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

import React, { useEffect, useState } from "react";
import Seconduray from "../ui/seconduray";
import Primary from "../ui/primary";
import Input from "../ui/input";
import FeedbackMessage from '../ui/feedback';
import { useDispatch, useSelector } from "react-redux";
import { fetchStatics, updateStatics } from "../../Redux/slice/staticSlice";

const Static = () => {
    const dispatch = useDispatch();
    const staticsDetails = useSelector((state) => state.statics.statics);  // Corrected: 'statics' instead of 'data'
    const staticsFeedback = useSelector((state) => state.statics.feedback);
const [feedback, setFeedback] = useState({ message: '', type: '' });
    // Fetch the statics data when component mounts
    useEffect(() => {
        dispatch(fetchStatics());
    }, [dispatch]);
    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Only update the local state
        const updatedStatics = { ...staticsDetails, [name]: value };
        dispatch(updateStatics(updatedStatics)); // Consider dispatching this only on form submission, not on each change.
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStatics(staticsDetails));  // Dispatch when submitting the form
    };

    return (
        <form onSubmit={handleSubmit}>
            {staticsFeedback.message && (
                <FeedbackMessage message={staticsFeedback.message || feedback.message} type={staticsFeedback.type || feedback.type} onClear={handleClear} />
            )}

            <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                <div className="w-full">
                    <label
                        htmlFor="successfulproject"
                        className="block mb-3 text-sm font-medium text-black capitalize"
                    >
                        Successful Project
                    </label>
                    <Input
                        type="text"
                        name="successfulproject"
                        placeholder="Successful Project"
                        value={staticsDetails?.successfulproject || ""}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="mb-5">
                <label
                    htmlFor="joiningcomparies"
                    className="block mb-3 text-sm font-medium text-black capitalize"
                >
                    Joining Companies
                </label>
                <Input
                    type="text"
                    name="joiningcomparies"
                    placeholder="Joining Companies"
                    value={staticsDetails?.joiningcomparies || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="registeredcustomers"
                    className="block mb-3 text-sm font-medium text-black capitalize"
                >
                    Registered Customers
                </label>
                <Input
                    type="text"
                    name="registeredcustomers"
                    placeholder="Registered Customers"
                    value={staticsDetails?.registeredcustomers || ""}
                    onChange={handleInputChange}
                />
            </div>

            <div className="flex justify-end gap-4">
                <Seconduray label="Cancel" />
                <Primary label="Save" type="submit" />
            </div>
        </form>
    );
};

export default Static;

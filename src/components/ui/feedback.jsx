import React, { useEffect, useState } from "react";

const FeedbackMessage = ({ type, message, onClear }) => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message) {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false); // Start the fade-out animation
                setTimeout(() => {
                    onClear(); // Clear the message after fade-out ends
                }, 500); // Wait for the fade-out duration before calling onClear
            }, 5000); // Timeout duration (5 seconds)

            return () => clearTimeout(timer); // Clean up the timer when the component unmounts
        }
    }, [message, onClear]);

    if (!message) return null; // Render nothing if there's no message

    return (
        <div
            className={`fixed top-4 right-0 px-10 py-6 rounded shadow-lg capitalize transition-opacity duration-500 ${showMessage ? "opacity-100 animate-fadeIn" : "opacity-0 animate-fadeOut"
                } ${type === "success" ? "bg-green-500 text-green-100" : "bg-red-500 text-red-100"}`}
        >
            {message}
        </div>
    );
};

export default FeedbackMessage;

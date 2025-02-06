import React, { useEffect, useState } from "react";

const FeedbackMessage = ({ type, message, onClear }) => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message) {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);
                setTimeout(() => {
                    onClear();
                }, 500);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message, onClear]);

    if (!message) return null;

    return (
        <div
            className={`fixed top-4 right-0 px-10 py-6 rounded shadow-lg capitalize transition-opacity duration-500 ${showMessage ? "opacity-100 animate-fadeIn" : "opacity-0 animate-fadeOut"
                } ${type === "success"
                    ? "bg-green-500 text-green-100"
                    : "bg-red-500 text-red-100"
                }`}
        >
            {message}
        </div>
    );
};

export default FeedbackMessage;

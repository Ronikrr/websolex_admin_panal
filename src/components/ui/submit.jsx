// Submit.jsx
import React from "react";

const Submit = ({ label, value, onClick, disabled }) => {
    return (
        <button
            type="submit"
            value={value}
            onClick={onClick}
            disabled={disabled}
            className="w-full p-4 text-white transition border rounded-lg cursor-pointer border-[var(--border-color)] bg-[var(--primary-color)] hover:opacity-90"
        >
            {label || 'Submit'}
        </button>
    );
};

export default Submit;

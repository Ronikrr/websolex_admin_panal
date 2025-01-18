// Submit.jsx
import React from "react";

const Primary = ({ label, value, onClick, disabled }) => {
    return (
        <button
            type="submit"
            value={value}
            onClick={onClick}
            disabled={disabled}
            className="flex justify-center px-6 py-2 font-medium text-white border rounded border-[var(--border-color)] bg-[var(--primary-color)] hover:shadow-md hover:bg-[var(--primary-light-color)] border border-[var(--primary-color)] hover:text-[var(--primary-color)]"
        >
            {label || 'Submit'}
        </button>
    );
};

export default Primary;

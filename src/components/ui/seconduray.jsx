import React from "react";

const Seconduray = ({ label, value, onClick, disabled }) => {
    return (
        <button
            type="submit"
            value={value}
            onClick={onClick}
            disabled={disabled}
            className="flex justify-center px-6 py-2 font-medium text-black border rounded border-[rgb(266,232,240)] hover:shadow "
        >
            {label || 'Submit'}
        </button>
    );
};

export default Seconduray;

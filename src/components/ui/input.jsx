import React from 'react';

const Input = ({ type, defaultValue, disabled, name, value, onChange, placeholder }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            className='w-full rounded border border-[var(--border-color)] bg-[rgb(239,244,251)] py-3 px-4 text-black focus:border-[var(--border-color)] focus-visible:outline-none placeholder:capitalize '
        />
    );
};

export default Input;

import React from 'react';

const FormModule = ({ fields, errors, setIsOpenAddModel, onSubmit }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg">
                <span
                    className="absolute text-2xl font-bold cursor-pointer top-2 right-2"
                    onClick={() => setIsOpenAddModel(false)}
                >
                    &times;
                </span>

                <form onSubmit={onSubmit}>
                    {fields.map((field, index) => (
                        <div key={index} className="mb-4">
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={field.value}
                                onChange={field.onChange}
                                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[field.name] ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors[field.name] && <div className="mt-1 text-sm text-red-500">{errors[field.name]}</div>}
                        </div>
                    ))}
                    <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormModule;

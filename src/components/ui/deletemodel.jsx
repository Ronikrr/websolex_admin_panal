import React from 'react';


const Deletemodel = ({ isOpen, onClose, onConfirm, pagename }) => {
 

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full capitalize bg-black bg-opacity-50">
            <div className="w-full bg-white rounded-md shadow-md md:w-1/3">
                <div className="w-full p-5 md:p-8 text-center">
                    <h1 className="capitalize text-[26px] font-semibold mb-4">
                        Confirm delete
                    </h1>
                    <p>
                        Are you sure you want to delete
                        <span className="font-semibold"> {pagename || 'this lead'}</span> lead
                    </p>
                </div>
                <form className="flex flex-col mt-5">
                    <button
                        type="button"
                        className="px-6 py-4 border-t border-gray-300 hover:shadow-md hover:text-red-600"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="px-6 py-4 border-t border-gray-300 hover:shadow-md hover:text-blue-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Deletemodel;

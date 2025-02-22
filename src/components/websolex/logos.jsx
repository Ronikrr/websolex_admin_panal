import React, { useState } from "react";
import Breadcrumb from "../ui/breadcrumb";
import Secondary from "../ui/seconduray";
import Primary from "../ui/primary";

const UploadForm = () => {
  const [files, setFiles] = useState({
    logo: null,
    favicon: null,
    adminLogo: null,
    adminFavicon: null,
  });

  const [previews, setPreviews] = useState({
    logo: null,
    favicon: null,
    adminLogo: null,
    adminFavicon: null,
  });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
      setPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-between my-4 lg:flex-row">
        <h1 className="capitalize text-[26px] font-semibold">Websites Logos</h1>
        <Breadcrumb />
      </div>

      {/* Form Section */}
      <form>
        <div className="grid grid-cols-1 gap-5 mb-5 md:grid-cols-2">
          {["logo", "favicon", "adminLogo", "adminFavicon"].map((type) => (
            <div key={type} className="p-4 bg-white border rounded-lg shadow-sm">
              <label className="block mb-2 text-sm font-medium text-gray-700 capitalize">
                {type.replace(/([A-Z])/g, " $1")}
              </label>

              {/* Drag & Drop Area */}
              <div className="max-w-md mx-auto overflow-hidden rounded-lg md:max-w-xl">
                <div className="md:flex">
                  <div className="w-full p-3">
                    <div className="relative flex items-center justify-center h-48 transition-shadow duration-300 ease-in-out border-2 border-blue-500 rounded-lg shadow-lg bg-gray-50 hover:shadow-xl">
                      <div className="absolute flex flex-col items-center">
                        <img
                          alt="File Icon"
                          className="mb-3"
                          src="https://img.icons8.com/dusk/64/000000/file.png"
                        />
                        <span className="block font-semibold text-gray-500">Drag & drop your files here</span>
                        <span className="block mt-1 font-normal text-gray-400">or click to upload</span>
                      </div>
                      <input type="file" onChange={(e) => handleFileChange(e, type)} className="w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {previews[type] && (
                <img src={previews[type]} alt={`${type} Preview`} className="w-auto h-16 mt-3 rounded-lg shadow-md" />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <Secondary label="Cancel" />
          <Primary label="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UploadForm;

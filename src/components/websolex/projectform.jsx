import React, { useState, useEffect } from "react";
import Seconduray from "../ui/seconduray";
import Primary from "../ui/primary";
import Input from "../ui/input";

const FormWithApiData = () => {
    const [project, setproject] = useState({
        totalClients: "",
        completedProjects: "",
    });
    const [id, setid] = useState(null);
    const [showError, setShowError] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/project", {
                    method: "GET",
                });
                const data = await res.json();
                console.log(data);
                if (data && data.length > 0) {
                    setproject(data[0]);
                    setid(data[0]._id);
                }
            } catch (error) {
                setError(error.message);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        };
        fetchdata();
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproject({
            ...project,
            [name]: value,
        });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (id) {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/project", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        ...project
                    }),
                });
                const data = await res.json();
                console.log("project", data);
            } catch (error) {
                setError(error.message);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        } else {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/project", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(project),
                });
                const data = await res.json();
                console.log("project", data);
                setid(data.member._id);
            } catch (error) {
                setError(error.message);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            }
        }
    };
    return (
        <form onSubmit={handlesubmit} >
            {error && (
                <div
                    className={`fixed top-4 left-0 transform -translate-x-1/2 bg-red-500 text-white px-10 py-6 rounded shadow-lg transition-transform duration-500 ${showError
                            ? "translate-x-0  opacity-100"
                            : "-translate-x-[500px] opacity-0"
                        }`}
                >
                    {error}
                </div>
            )}
            <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                <div className="w-full">
                    <label
                        htmlFor="totalClients"
                        className="block mb-3 text-sm font-medium text-black capitalize"
                    >
                        Total Clients
                    </label>
                    <Input
                        type={'text'}
                        name={'totalClients'}
                        placeholder={"Total clients"}
                        value={project.totalClients}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="completedProjects"
                    className="block mb-3 text-sm font-medium text-black capitalize"
                >
                    Completed Projects
                </label>
                <Input
                    type={"text"}
                    name={"completedProjects"}
                    placeholder={"Completed projects"}
                    value={project.completedProjects}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-end gap-4">
                <Seconduray label="Cancel" />
                <Primary label="Save" type="submit" />
            </div>
        </form>
    );
};

export default FormWithApiData;

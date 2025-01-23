import React, { useState, useEffect } from "react";
import Seconduray from "../ui/seconduray";
import Primary from "../ui/primary";
import Input from "../ui/input";
import FeedbackMessage from '../ui/feedback';
const Static = () => {
    const [statics, setstatic] = useState({
        successfulproject: 0,
        joiningcomparies: 0,
        registeredcustomers: 0,
    });

    const [id, setid] = useState(null);

    const [feedback, setFeedback] = useState({ message: '', type: '' });

    const handleClear = () => {
        setFeedback({ message: "", type: "" });
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/setstatic", {
                    method: "GET",
                });
                const data = await res.json();
                if (data && data.length > 0) {
                    setstatic(data[0]);
                    setid(data[0]._id);
                }
            } catch (error) {
                setFeedback({
                    message: `Error fetching team members:${error}`,
                    type: 'error',
                });
            }
        };
        fetchdata();
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setstatic({
            ...statics,
            [name]: value,
        });
    };
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (id) {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/setstatic", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id,
                        ...statics
                    }),
                });
                if (!res.ok) {
                    setFeedback({
                        message: `Error fetching team members:${res.message}`,
                        type: 'error',
                    });
                }
            } catch (error) {
                setFeedback({
                    message: `Error fetching team members:${error}`,
                    type: 'error',
                });
            }
        } else {
            try {
                const res = await fetch("https://websolex-admin.vercel.app/api/setstatic", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(statics),
                });
                if (!res.ok) {
                    setFeedback({
                        message: `Error fetching team members:${res.message}`,
                        type: 'error',
                    });
                }
                const data = await res.json();
                setFeedback({
                    message: `data is added`,
                    type: 'success',
                });
                setid(data.member._id);

            } catch (error) {
                setFeedback({
                    message: `Error fetching team members:${error}`,
                    type: 'error',
                });
            }
        }
    };
    return (
        <form onSubmit={handlesubmit} >
            {feedback.message && (
                <FeedbackMessage message={feedback.message} type={feedback.type} onClear={handleClear} />
            )}
            <div className="flex flex-col gap-5 mb-5 sm:flex-row">
                <div className="w-full">
                    <label
                        htmlFor="totalClients"
                        className="block mb-3 text-sm font-medium text-black capitalize"
                    >
                        Successful Project
                    </label>
                    <Input
                        type={'text'}
                        name={'successfulproject'}
                        placeholder={"Successful Project"}
                        value={statics.successfulproject}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="completedProjects"
                    className="block mb-3 text-sm font-medium text-black capitalize"
                >
                    Joining Comparies
                </label>
                <Input
                    type={"text"}
                    name={"joiningcomparies"}
                    placeholder={"Joining Comparies"}
                    value={statics.joiningcomparies}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="completedProjects"
                    className="block mb-3 text-sm font-medium text-black capitalize"
                >
                    Registered Customers
                </label>
                <Input
                    type={"text"}
                    name={"registeredcustomers"}
                    placeholder={"Registered Customers"}
                    value={statics.registeredcustomers}
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

export default Static;

import { useEffect, useState } from 'react';

const LoginHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const response = await fetch('https://websolex-admin.vercel.app/login-history', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Admintoken_websolex')}`, 
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setHistory(data);
                    console.log(data)
                } else {
                    console.error('Failed to fetch login history');
                }
            } catch (error) {
                console.error('Error fetching login history:', error);
            }
        };
        fetchLoginHistory();
    }, []);


    return (
        <div className='w-full bg-gray-100 2xl:p-10 md:p-6' >
            <div className="w-full bg-gray-100 pt-0 md:pt-10 ">
                <div className="w-full p-5 bg-white rounded-md shadow-md mb-7">
                    <div className="flex items-center justify-between w-full">
                        <div className="py-6">
                            <h1 className="capitalize lg:text-[26px] font-semibold ">Most Recent added</h1>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-collapse border-gray-200">
                            {/* Table Header */}
                            <thead className="bg-gray-100 text-gray-600 text-[10px] md:text-[16px] uppercase">
                                <tr>
                                    <th className="p-2.5 xl:p-5 border border-gray-200 w-[75px]">#</th>
                                    <th className="p-2.5 xl:p-5 border border-gray-200 text-center">email</th>
                                    <th className="p-2.5 xl:p-5 border border-gray-200 text-center hidden lg:table-cell">login time</th>
                                </tr>
                            </thead>
                            {/* Table Body */}
                            <tbody>
                                {
                                    history.map((item, index) => (

                                        <tr key={item._id} className="text-center border-b border-gray-200">
                                            <td className="p-2.5 xl:p-3 border border-gray-200">{index + 1}</td>
                                            <td className="p-2.5 xl:p-3 border border-gray-200">
                                                {item.userId?.email}
                                            </td>
                                            <td
                                                className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                                title={""}
                                            >
                                                {new Date(item.loginTime).toLocaleString()}
                                            </td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default LoginHistory;

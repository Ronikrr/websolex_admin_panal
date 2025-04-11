import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const LoginHistory = () => {
    const [history, setHistory] = useState([]);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/login-history/${user?.user?.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('Admintoken_websolex')}`, 
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setHistory(data[data.length - 1]);
                    console.log(data)
                } else {
                    console.error('Failed to fetch login history');
                }
            } catch (error) {
                console.error('Error fetching login history:', error);
            }
        };
        fetchLoginHistory();
    }, [user]);


    return (
        <div className='w-full bg-gray-100 2xl:p-10 md:p-6' >
            <div className="w-full pt-0 bg-gray-100 md:pt-10 ">
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


                                <tr key={history._id} className="text-center border-b border-gray-200">
                                    <td className="p-2.5 xl:p-3 border border-gray-200">1</td>
                                            <td className="p-2.5 xl:p-3 border border-gray-200">
                                        {history.userId?.email}
                                            </td>
                                            <td
                                                className="p-2.5 xl:p-3 border border-gray-200 hidden lg:table-cell capitalize overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px] cursor-pointer"
                                                title={""}
                                            >
                                        {new Date(history.loginTime).toLocaleString()}
                                            </td>

                                        </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default LoginHistory;

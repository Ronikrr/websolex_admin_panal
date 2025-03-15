import { useEffect, useState } from 'react';

const LoginHistory = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const response = await fetch('http://localhost:8000/login-history', {
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
        <div>
            <h2>Login History</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Login Time</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.userId?.email || 'Unknown'}</td>
                            <td>{new Date(item.loginTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoginHistory;

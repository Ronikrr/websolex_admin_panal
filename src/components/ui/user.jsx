import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const user = useSelector((state) => state?.auth?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login'); // ✅ Redirect to websolex if logged in
        } 
    }, [user, navigate]);

    return null; // No need to render anything; redirection is enough
};

export default User;

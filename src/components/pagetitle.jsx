import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = ({ title }) => {
    const location = useLocation();

    // Function to capitalize each word
    const capitalizeTitle = (text) => {
        return text.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    useEffect(() => {
        document.title = `Websolex Admin | ${capitalizeTitle(title)}`;
    }, [location, title]);

    return null;
};

export default PageTitle;

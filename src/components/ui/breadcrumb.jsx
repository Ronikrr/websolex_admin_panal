import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const pathname = location.pathname.split('/').filter((x) => x);

    // Function to capitalize words and replace hyphens with spaces
    const capitalizeWords = (str) => {
        return str
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <nav aria-label="breadcrumb" className="text-black">
            <ol className="flex space-x-2">
                {/* Dashboard link */}
                <li>
                    <Link to="/" className="capitalize hover:underline">
                        Dashboard /
                    </Link>
                </li>
                {/* Dynamic breadcrumb links */}
                {pathname.map((segment, index) => {
                    const isLast = index === pathname.length - 1;
                    const to = `/${pathname.slice(0, index + 1).join('/')}`;
                    const displayName = capitalizeWords(decodeURIComponent(segment));

                    return (
                        <li key={to} className="flex items-center">
                            {isLast ? (
                                // Current page breadcrumb (no link)
                                <span
                                    aria-current="page"
                                    className="capitalize font-medium text-[var(--primary-color)]"
                                >
                                    {displayName}
                                </span>
                            ) : (
                                // Link to intermediate breadcrumb
                                <Link
                                    to={to}
                                        className="capitalize font-medium text-[var(--primary-color)] hover:underline"
                                >
                                    {displayName} /
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;

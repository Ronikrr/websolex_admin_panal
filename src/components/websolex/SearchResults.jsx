import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get("query");

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Search Results for: "{query}"</h1>
            {/* Fetch and display search results here */}
        </div>
    );
};

export default SearchResults;

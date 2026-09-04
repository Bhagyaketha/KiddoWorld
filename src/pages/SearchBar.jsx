import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/searchbar.css";

const SearchBar = () => {

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleSearch = (e) => {

        e.preventDefault();

        if (search.trim() === "") {
            return;
        }

        navigate(`/Shop?search=${encodeURIComponent(search)}`);

    };

    return (

        <form
            className="search-bar"
            onSubmit={handleSearch}
        >

            <input
                type="text"
                placeholder="Search toys, clothes..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <button type="submit">
                🔍
            </button>

        </form>

    );
};

export default SearchBar;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/css/SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// import '../assets/css/global.css'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim() === "")  return; // Don't navigate if search term is empty

        navigate(`/books?search=${encodeURIComponent(searchTerm)}&limit=9`);
    };

        return(
            <div id='search-container'>
                <form id="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder = "Search for books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    /> 
                    <button type="submit"><FontAwesomeIcon id="search-icon"icon={faMagnifyingGlass} color={'grey'} /></button>
                </form>
            </div>
        );
}
export default SearchBar;
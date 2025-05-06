import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/SearchBar.css'

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim() === "")  return; // Don't navigate if search term is empty
        const term = searchTerm;
        setSearchTerm(""); // reset search term

        navigate(`/books?search=${encodeURIComponent(term)}&limit=9`);
    };

        return(
            <div id='search-container'>
                <form id="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by title or author"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    /> 
                    <button type="submit" aria-label="Search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} id="search-icon" color="grey" />
                    </button>
                </form>
            </div>
        );
}
export default SearchBar;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import LibraryShelfList from "./LibraryShelfList";
import { ShelfName } from "../types";


function UserProfileLibrary() {
    var {user} = useParams(); // get which user's profile is loaded
    const [shelves, setShelves] = useState<string[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully  

    // get list of this users' bookshelves to display
    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get(`/shelf/${user}`)
        .then((response) => {
            var list:ShelfName[] = response.data
            const newlist = list.flatMap((item) => item.shelf_name);
            setShelves(newlist);
        }
        ).catch((error) => {
            console.error("❌ Shelves fetch error:", error);
            setError("Error loading shelf data. Please try again later.");
        }).finally(() => setLoading(false))
    }, []);


    return(
        <div>
            {loading ? (<p>Loading shelves...</p>) : (error) ? (<p style={{ color: "red" }}>{error}</p>) : 
                (<ul id="book-list-page">
                                {shelves.length > 0 ? (
                                    shelves.map((item:string) => (
                                        <LibraryShelfList shelfName={item}/>
                                    ))
                                ) : (
                                    !loading && !error && <p>No shelves found.</p>
                                )}
                </ul>)
            }    
        </div>
    );
}

export default UserProfileLibrary;
import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import {BookItem} from '../types'
import CategoryBookBox from "./CategoryBookBox";
import '../assets/css/CategoryBookListPage.css'
import '../assets/css/global.css'


function CategoryBookListPage() {
    // const category = "fiction"
    const {category} = useParams(); // Fetch category dynamically from URL
    const [searchParams] = useSearchParams();   // Handle search query
    const searchTerm = searchParams.get("search") || "";

    const [bookList, setBookList] = useState<BookItem[]>([]);
    const[loading, setLoading] = useState(true); // Add loading state
    const[error, setError] = useState<string | null>(null); // Handle errors gracefully

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchBooks = async () => {
            try {
                const queryParam = searchTerm ? `q=${searchTerm}` : `subject=${category || "fiction"}`;
                const response = await axios.get(`http://127.0.0.1:5000/search?${queryParam}`, {
                    headers: { "Content-Type": "application/json" }
                });
                setBookList(response.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load books. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [category, searchTerm]); // Re-fetch books when category or search term changes
    
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:5000/search?subject=${category}`,           
    //         {headers: {
    //         "Content-Type": "application/json"
    //     }
    //   })
    //     .then((response) => setBookList(response.data))
    //     .catch(console.error)
    //     }, [category]);


    return(
        <main>
            <div id="page-header">
            <h2>{searchTerm ? `Search results for "${searchTerm}"` : `${category || "Fiction"} Books`}</h2>
                        </div>

                        {loading && <p>Loading books...</p>} {/* Show loading state */}
                        {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message */}    

            {/* <ul id="book-list">
                {bookList.map((book:BookItem) => 
                    <CategoryBookBox title={book.title} author={book.author} work_ID={book.work_ID} img_S={book.img_S} img_M={book.img_M} img_L={book.img_L} description={book.description} reading_Time={book.reading_Time}/>)}
            </ul> */}

            <ul id="book-list">
                {bookList.length > 0 ? (
                    bookList.map((book: BookItem) => (
                        <CategoryBookBox
                            key={book.work_ID}
                            title={book.title}
                            author={book.author}
                            work_ID={book.work_ID}
                            img_S={book.img_S}
                            img_M={book.img_M}
                            img_L={book.img_L}
                            description={book.description}
                            reading_Time={book.reading_Time}
                        />
                    ))
                ) : (
                    !loading && !error && <p>No books found.</p>
                                    )}
            </ul>
        </main>
    );
}

export default CategoryBookListPage;
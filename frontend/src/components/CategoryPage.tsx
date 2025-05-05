import { useEffect, useState } from "react";
import { BookItem } from "../types";
import axios from "../../axiosConfig";
import BookListCard from "./BookListCard";
import { useParams } from "react-router-dom";
import CategoryNav from "./CategoryNav";
import CompStatus from "./CompStatus";
import '../assets/css/BookListPage.css'



function CategoryPage() {
    const { category } = useParams();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<BookItem[]>([]);

    const compStatus = sessionStorage.getItem("creatingComp");

    useEffect(() => {
        setLoading(true);
        setError('');
        
        // get category book list data from local storage, if it exists
        const storageKey = (category|| '');
        var storedList:BookItem[] = []
        const data = localStorage.getItem(storageKey);
        try { // category name is in local storage and either has data or it is undefined
            storedList = JSON.parse(localStorage.getItem(storageKey) || '[]');
        }
        catch (error) { //category name not in localstorage
            console.log('No data in local storage for category: ', category, error );
        }

        if (storedList.length > 0) { // data in category list localstorage
            setLoading(false); // remove loading status
            setBooks(storedList); // pull book list from local storage to display
        }
        else { // fetch book list data from backend
            axios.get(`/search?subject=${storageKey}&limit=9`, 
                { 
                    headers: { "Content-Type": "application/json" }
                })
                .then((response) => {
                    setBooks(response.data); // place book data in list for display
                    localStorage.setItem(storageKey, JSON.stringify(response.data)); // add book data to localstorage
                })
                .catch(console.error)
                .finally(() => setLoading(false))
        }  
    }, [category]) // trigger page reload on category change

       return(
        <main>
            <div id='book-list-page-nav'>
                <CategoryNav/>
                {compStatus ? (<CompStatus/>) : <></>}
            </div>

                {loading ? (<p>Loading books... </p>) 
                : (error) ? (<p style={{ color: "red" }}>{error}</p>)
                :  (
                    <ul id="book-list-page">
                                    {books && books.length > 0 ? (
                                        books.map((book: BookItem) => (
                                            <BookListCard
                                                key={book.work_id}
                                                title={book.title}
                                                author={book.author}
                                                work_id={book.work_id}
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
                )
            }
        </main>
    );
}

export default CategoryPage;
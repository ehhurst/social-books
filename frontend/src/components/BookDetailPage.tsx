
import '../assets/css/BookPage.css'
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { BookItem } from "../types";
import axios from 'axios'
import BookDetailBox from "./BookDetailBox";



function BookPage() {
    const[loading, setLoading] = useState(true); // Add loading state
    const[error, setError] = useState<string | null>(null); // Handle errors gracefully

    const [book, setBook] = useState<BookItem>();

    useEffect(() => {
        axios.get('https://openlibrary.org/works/OL45804W.json')
        .then((response) => setBook(response.data))
        .catch(console.error)
    }, [])

    return(
    <main>
        {book ? (
                    <BookDetailBox title={book.title} author={book.author} work_ID={book.work_ID} description={book.description} img_S={book.img_S} img_M={book.img_M} img_L={book.img_L} reading_Time={0} />
                ) : (
                    !loading && !error && <p>No books found.</p>
                                    )}
       

    </main>
    );
}

export default BookPage;
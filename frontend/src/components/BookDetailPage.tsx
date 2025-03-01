import BookBox from "./BookBox"
import '../assets/css/BookPage.css'
import { useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import { BookItem } from "../types";
import axios from 'axios'



function BookPage() {
    const {bookIsbn} = useParams();
    const [book, setBook] = useState([]);

    useEffect(() => {
        axios.get('/api/books/${bookName}')
        .then((response) => setBook(response.data))
        .catch(console.error)
    }, [bookIsbn])

    return(
    <main>
        {/* <BookBox isbn={book.isbn} title={book.title} author_name={book.author_name} description={book.description} num_pages={book.num_pages}/> */}

    </main>
    );
}

export default BookPage;
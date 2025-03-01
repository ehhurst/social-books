import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import {BookItem} from '../types'
import CategoryBookBox from "./CategoryBookBox";

function CategoryBookListPage() {
    const {category} = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`...api/${category}/books`)
        .then((response) => setBooks(response.data))
        .catch(console.error)
    }, [category]);


    return(
        <main>
            <ul id="book-list">
                {books.map((book:BookItem) => 
                    <CategoryBookBox isbn={book.isbn} title={book.title} author_name={book.author_name} description={book.description} readTime={book.readTime}/>)}
            </ul>
        </main>
    )

}

export default CategoryBookListPage;
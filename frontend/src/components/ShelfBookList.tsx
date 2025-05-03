import { Link } from "react-router-dom";
import { BookItem } from "../types";
import MinBookBox from "./MinBookBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

// displays one shelf and all of its associated books
function ShelfBookList({work_ids_list}:{work_ids_list:string[]}) {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully  
    const bookList:BookItem[] = []

    const findItem = ((array:BookItem[], work_id:string)=> array.find((item) => item.work_id == work_id));
    
    useEffect(() => {
        setLoading(true);
        setError('');

        // create list of books the user "likes", get book data for the liked books
        work_ids_list.forEach((item) => {
            axios.get(`/book/${item}`)
            .then((response) => {
                // don't display duplicates
                if(!findItem(bookList, response.data.work_id)) {
                    bookList.push(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to load liked books. Please try again later.');
            }).finally(() => {
                if (bookList.length == work_ids_list.length) {
                    setBooks(bookList);
                    setLoading(false);
                }
        })
        });
    }, []); // run on initial page load

    return(
    <ul id="shelf-book-list">
        {books.length > 0 ? (
            books.map((item:BookItem, index:number) => (
                <li key={index}>
                    <MinBookBox 
                    title={item.title} 
                    author={item.author} 
                    work_id={item.work_id} 
                    description={item.description} 
                    img_S={item.img_S} 
                    img_M={item.img_M} 
                    img_L={item.img_L}/>
                </li>))) : (<p>You don't have any books in this shelf yet, <Link to={'/categories/fiction'}>Add Books <FontAwesomeIcon icon={faArrowRight}/></Link> </p>)}
    </ul>);
}

export default ShelfBookList;
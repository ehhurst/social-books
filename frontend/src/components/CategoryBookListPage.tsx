import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import {BookItem} from '../types'
import CategoryBookBox from "./CategoryBookBox";
import '../assets/css/CategoryBookListPage.css'
import '../assets/css/global.css'


function CategoryBookListPage() {
    const category = ""
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/search?subject=${category}`,           
            {headers: {
            "Content-Type": "application/json"
        }
      })
        .then((response) => setBookList(response.data))
        .catch(console.error)
        }, [category]);


    return(
        <main>
            <div id="page-header">
                <h2>{category} Books</h2>
            </div>
            <ul id="book-list">
                {bookList.map((book:BookItem) => 
                    <CategoryBookBox title={book.title} author={book.author} work_ID={book.work_ID} img_S={book.img_S} img_M={book.img_M} img_L={book.img_L} description={book.description} reading_Time={book.reading_Time}/>)}
            </ul>
        </main>
    )

}

export default CategoryBookListPage;
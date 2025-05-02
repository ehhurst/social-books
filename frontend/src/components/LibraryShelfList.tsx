import { Link } from "react-router-dom";
import { BookItem, ShelfItem } from "../types";
import MinBookBox from "./MinBookBox";


function LibraryShelfList({shelvesList}:{shelvesList:ShelfItem[]}) {

    return(
    <ul id="shelf-list">
        <li id="shelf-item">
            {shelvesList.map((item:ShelfItem, index:number) => (
                <ul id="shelf_book_list">
                    <h3>{item.shelf_name}</h3>
                    {item.book_list.length > 0 ? (
                    item.book_list.map((book:BookItem, index:number) => (
                        <li key={index}>
                            <MinBookBox 
                                title={book.title} 
                                author={book.author} 
                                work_id={book.work_id} 
                                description={book.description} 
                                img_S={book.img_S} 
                                img_M={book.img_M} 
                                img_L={book.img_L}/>
                        </li>
                    ))) : (<p>You don't have any books in this shelf yet, <Link to={'/categories/fiction'}>Add Books</Link> </p>)}
            </ul>))}
        </li> ;
    </ul>);
}

export default LibraryShelfList;
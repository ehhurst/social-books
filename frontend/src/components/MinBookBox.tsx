import { Link } from "react-router-dom";
import { BookItem } from "../types";


function MinBookBox(book:BookItem) {
    return ( 
        <div className="book-box">
            <div id="book-info">
                <Link to={`/books/${book.work_id}`} state={book}>
                <img id="cover" src={book.img_L} alt={book.title}/>
                    <div className="book-details">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        </div>
                </Link>
            </div>
        </div>
  );
}

export default MinBookBox;
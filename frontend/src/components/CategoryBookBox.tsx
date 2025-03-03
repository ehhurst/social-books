import { BookItem } from "../types";
import { Link } from "react-router-dom";


function CategoryBookBox(props:BookItem) {
    return(
        <div id="category-book-box">
            <Link to={`${props.title}`}>
                <div id="book-image">
                    <img src={`https://covers.openlibrary.org/b/isbn/${props.isbn}-S.jpg`} alt="Book cover image"/>
                </div>
                <div id="book-info">
                    <div id='title-author'>
                        <h3>{props.title}</h3>
                        <h4>{props.author_name}</h4>
                    </div>
                    <p>{props.description}</p>
                </div>
            </Link>

        </div>
    );

}

export default CategoryBookBox;
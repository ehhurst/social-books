import { BookItem } from "../types";
import { Link } from "react-router-dom";

import '../assets/css/CategoryBookBox.css'
import '../assets/css/global.css'


function CategoryBookBox(props:BookItem) {
    const preview = props.description.slice(0, 150);


    return(
        <div id="category-book-box">
                <div id="book-image-container">
                    <Link id="image-link" to={`${props.title}`}>
                        <img src={`https://covers.openlibrary.org/b/isbn/${props.work_ID}-M.jpg`} alt="Book cover image"/>
                    </Link>
                </div>
                <div id="book-info-container">
                    <div id='title-author'>
                        <Link id="title-link" to={`${props.title}`}>
                            <h3>{props.title}</h3>
                        </Link>
                        <h4>by <Link id="author-link" to={`${props.author}`}>{props.author}</Link></h4>
                    </div>
                    <p>{preview} ...<Link id="description-link" to={`${props.title}`}>See more</Link></p>
                </div>
        </div>
    );

}

export default CategoryBookBox;
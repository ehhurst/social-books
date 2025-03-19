import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, Review } from "../types";

function Review(props:Review) {
    return(
    <div>
        <div id='book-image-container'>
            <div id='book-image-background'>
                <img src='' alt='Book-image'/>
            </div>
        </div>
        <div id='review-container'>
            <div id='book-info'>
                <h3>Title</h3>
                <p>by</p>
                <h4>author</h4>
            </div>
            <div id='user-info'>
                <FontAwesomeIcon icon='user-circle'/>
                <h4>{props.username}</h4>
                <div id='star-rating'>

                </div>
                <div id='review-text'>
                    {/* could also be p*/}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Review;
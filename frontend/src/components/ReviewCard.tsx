import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, Review } from "../types";
import StarRating from "./StarRating";
import '../assets/css/ReviewCard.css'
import { faPen, faTrash, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Displays posted reviews
function ReviewCard(review:Review) {
    const nav = useNavigate();
    const user = localStorage.getItem("username");
    const [message, setMessage] = useState('');
    console.log("review id" + review.review_id);

    function handleDelete() {
        setMessage('');
        axios.delete(`/users/${review.review_id}/reviews/delete`)
        .then((response) => {
            console.log(response.data)
            setMessage(`Review number ${review.review_id} deleted successfully!`)
            
            }).catch((error) => {
                console.error(error);
                setMessage("Error deleting review. Please try again later");
            }
        ).finally(() => nav('/reader-profile', {state: message }) // Redirect to profile page
        )
    }

    return( // ADD LIKED TODO
    <div className='container review'>
        <div id='review-content-top'>
            <div>
                <FontAwesomeIcon icon={faUserCircle}/>
                <h5>{review.username}</h5>
            </div>
            <StarRating rating={review.rating}/> {/*Whole number ratings only*/}
            {(user == review.username) ? 
            <div>
                <FontAwesomeIcon icon={faTrash} onClick={handleDelete} color={'var(--main-color)'}/>
                <FontAwesomeIcon icon={faPen} color={'var(--main-color)'}/>
            </div>
            :<></>
            }

        </div>
        <div>
            <p id='review-text'>
            {review.reviewText}
            </p>
        </div>
        
    </div>
    );
}

export default ReviewCard;
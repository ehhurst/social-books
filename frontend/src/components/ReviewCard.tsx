import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, Review, User } from "../types";
import StarRating from "./StarRating";
import { faPen, faTrash, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axiosConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import ReviewFormEdit from "./ReviewFormEdit";
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";
import '../assets/css/ReviewCard.css'


// Displays posted reviews
function ReviewCard(review:Review) {
    const navigate = useNavigate();
    const {user} = useParams();
    const token = sessionStorage.getItem('access_token');
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")

    const [bookData, setBookData] = useState<BookItem>();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    const successMessage = (message:string) => toast.success(message, toastConfig);
    const errorMessage = (message:string) => toast.error(message, toastConfig);

    useEffect(() => {
        axios.get(`/book/${review.work_id}`)
        .then((response) => {
            setBookData(response.data);
        }
        ).then(() => console.log("book data", bookData))
    }, [])


    function handleDelete() {
        axios.delete(`/reviews/${review.review_id}`)
        .then(() => {
            successMessage(`Successfully deleted review # ${review.review_id}!`);
            
            }).catch((error) => {
                console.error(error);
                errorMessage("Oops! Something went wrong and we were unable to delete your review. Please try again later.");
            }
        )
        // trigger page reload after success toast is displayed
        setTimeout(() => {
            navigate(0);
        }, 2000);
    }

    return( 
    <div className='container review'>
        {user ? (        
            <div id="book-cover-background">
                    <Link id="image-link" to={`/books/${bookData?.work_id}`} state={bookData}>
                        <img id="cover" src={bookData?.img_M} height={'115px'} alt="Book cover image"/>
                    </Link>
        </div>) : (<></>) }
        <div className='review-data'>
            <div id='review-content-top'>
            <Link to={`/${review.username}/profile`}>
                <FontAwesomeIcon className='user-icon' icon={faUserCircle} color={'var(--light-accent-color)'} />
                <h5>{review.username}</h5>  
            </Link>

            <StarRating rating={review.star_rating}/> {/*Whole number ratings only*/}
            {(currentUser.username == review.username) ? 
            <div>
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={handleDelete} color={'var(--main-color)'} />
                <FontAwesomeIcon className="edit-icon" icon={faPen} onClick={() => setOpen(o => !o)} color={'var(--main-color)'}/>
                <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                    <div className="modal">
                    <span id='review-details'> <ReviewFormEdit review_id={review.review_id} work_id={review.work_id} username={review.username} star_rating={review.star_rating} review_text={review.review_text} liked={review.liked}/> 
                    </span>
                    
                    </div>
                </Popup>
            </div>
            :<></>
            }
        </div>
        <div>
            <p id='review-text'>
            {review.review_text}
            </p>
        </div>
        </div>
    </div>
    );
}

export default ReviewCard;
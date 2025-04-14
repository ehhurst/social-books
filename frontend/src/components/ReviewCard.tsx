import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, Review } from "../types";
import StarRating from "./StarRating";
import '../assets/css/ReviewCard.css'
import { faPen, faTrash, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBook } from "../hooks/fetch";
import Popup from "reactjs-popup";
import ReviewFormEdit from "./ReviewFormEdit";

// Displays posted reviews
function ReviewCard(review:Review) {
    const nav = useNavigate();
    const user = localStorage.getItem("username");
    const [message, setMessage] = useState('');
    // const {work_id} = useParams();
    // console.log("param" , work_id);
    const [bookData, setBookData] = useState<BookItem>();
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    useEffect(() => {
        axios.get(`/book/${review.work_id}`).then((response) => {
            setBookData(response.data);

            console.log(response.data);
        }
        ).then(() => console.log("book data", bookData))


    }, [])


    function handleDelete() {
        setMessage('');
        axios.delete(`/reviews/${review.review_id}`)
        .then((response) => {
            console.log(response.data)
            setMessage(`Review number ${review.review_id} deleted successfully!`)
            
            }).catch((error) => {
                console.error(error);
                setMessage("Error deleting review. Please try again later");
            }
        ).finally(() => nav(0) // Reload the current page
        )
    }


    // const {data, loading, error} = getBook(`/book/${review.work_id}`);



    return( // ADD LIKED TODO
    <div className='container review'>
        <div id="">
            {/* <img src={data.img_M} alt='Book Cover Image' height={'50px'}/> */}
        </div>
        <div id='review-content-top'>
            <div>
                <FontAwesomeIcon icon={faUserCircle} onClick={() => nav(`${review.username}/profile`)}/>
                <h5>{review.username}</h5>  
            </div>
            <StarRating rating={review.star_rating}/> {/*Whole number ratings only*/}
            {(user == review.username) ? 
            <div>
                <FontAwesomeIcon icon={faTrash} onClick={handleDelete} color={'var(--main-color)'}/>
                <FontAwesomeIcon icon={faPen} onClick={() => setOpen(o => !o)} color={'var(--main-color)'}/>
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
            <p id='review-text'>a
            {review.review_text}
            </p>
        </div>
        
    </div>
    );
}

export default ReviewCard;
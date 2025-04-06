import { useLocation, useNavigate } from "react-router-dom";
import { BookItem, Review } from "../types";
import { FormEvent, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar, faHeart as filledHeart} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar, faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";


function ReviewFormEdit(review: Review) {
    const book:BookItem = useLocation().state; // gets book data passed in url
    const navigate = useNavigate();

    // retrieve book details from localstorage
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("access_token");

    const [rating, setRating] = useState(review.star_rating);
    const [ratingHover, setRatingHover] = useState(null);
    const [liked, setLiked] = useState(review.liked);
    const [likedHover, setLikedHover] = useState(false);
    const [reviewText, setReviewText] = useState(review.review_text);
    const [message, setMessage] = useState("");

  
    const handleSubmit = async (event: FormEvent) => {
      event.preventDefault();
      console.log(reviewText)
  
      if (!token || !username || !book) {
        setMessage("Missing user or book info.");
        return;
      }
      const updatedReview = {work_id: book.work_id, star_rating: rating, review_text: reviewText, liked: liked}
  
      try {
        const response = await axios.put(
          `/reviews/${review.review_id}`, updatedReview, 
          {
            headers: {
              "Authorization": `Bearer ${token}`, 
              "Content-Type": "application/json",
            },
          }
        );
        setMessage("Review Edited Successfully!");
        console.log("response" , response.data);
        console.log(updatedReview);
        // navigate(0); // Redirect after success
      } catch (err) {
        console.error(err);
        setMessage("Failed to submit review.");
      }
    };

    return(
        <div id="new-review-card">
                <div id='book-image-background'>
                    <img src={book.img_M} alt="Book cover image" height={'170px'}/>
                </div>
                <div id='new-review-content'>
                    <div id='title-container'>
                        <h2>My Review for {book.title}</h2>
                        <FontAwesomeIcon className="x" icon={faXmark} size={'lg'} onClick={() => navigate(0)}/>
                    </div>
                    
                    <form
                        className="review-form"
                        method="post"
                        onSubmit={handleSubmit}>
                            <div id='icon-input'>
                            <div className="star-rating">
                                <p>Rating: </p>
                                {[...Array(5)].map((star, index) => {
                                    const currentRating = index + 1;
                                    return (
                                        <label>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={currentRating}
                                                onClick={() => setRating(currentRating)}
                                            />
                                            {currentRating <= (ratingHover || rating) ? 
                                            <FontAwesomeIcon 
                                            className="star"
                                            icon={filledStar} 
                                            size={'xl'}
                                            color={"var(--dark-accent-color)"}
                                            onMouseEnter={() => setRatingHover(currentRating)}
                                            onMouseLeave={() => setRatingHover('')}/> 
                                            : <FontAwesomeIcon 
                                            className="star"
                                            icon={emptyStar} 
                                            size={'xl'}
                                            color={"var(--dark-accent-color)"}
                                            onMouseEnter={() => setRatingHover(currentRating)}
                                            onMouseLeave={() => setRatingHover('')}/>}
                                        </label>
                                    );
                                })}
                                </div>
                            <div className="liked">
                                <p>Liked: </p>
                                    <label>
                                        <input
                                            type="radio"
                                            name="liked"
                                            onClick={(e) => setLiked(!liked)}
                                        />
                                        {(liked || likedHover) ? 
                                        <FontAwesomeIcon 
                                            className="heart"
                                            icon={filledHeart} 
                                            size={'xl'}
                                            color={"var(--dark-accent-color)"}
                                            onMouseEnter={() => setLikedHover(true)}
                                            onMouseLeave={() => setLikedHover(false)}/> 
                                                : <FontAwesomeIcon 
                                                className="heart"
                                                icon={emptyHeart} 
                                                size={'xl'}
                                                color={"var(--dark-accent-color)"}
                                                onMouseEnter={() => setLikedHover(true)}
                                                onMouseLeave={() => setLikedHover(false)}/>}
                                    </label>
 
                            </div>
                            </div>
                            <textarea name='inputText' placeholder="" value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
                        <button className='primary'>Submit</button>
                    </form>
                {message && <p>{message}</p>}</div>
            </div>
    );
};

export default ReviewFormEdit;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, User } from "../types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "../../axiosConfig";
import { faStar as filledStar, faHeart as filledHeart} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar, faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import '../assets/css/ReviewForm.css'
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";


function ReviewForm() {
    const book:BookItem = useLocation().state; // gets book data passed in url
    const navigate = useNavigate();

    // retrieve book details from localstorage
    const token = sessionStorage.getItem('access_token');
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")

    const [rating, setRating] = useState(0);
    const [ratingHover, setRatingHover] = useState(0);
    const [liked, setLiked] = useState(false);
    const [likedHover, setLikedHover] = useState(false);
    const [reviewText, setReviewText] = useState('');

    const successMessage = () => toast.success('Review posted successfully!', toastConfig);
    const errorMessage = (message:string) => toast.error(message, toastConfig);

    const [submitError, setSubmitError] = useState<string | null>(null); // NEW

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setSubmitError(null); // Clear previous errors

    if (!token || !currentUser.username) {
      navigate('/login');
      return;
    }

    if (!rating) {
      const msg = 'Error: Star Rating is required. Please provide a rating for this book and try again.';
      errorMessage(msg);
      setSubmitError(msg);
      return;
    }

    if (!reviewText) {
      const msg = 'Error: Review text is required. Please provide your review for this book and try again.';
      errorMessage(msg);
      setSubmitError(msg);
      return;
    }

    const review = {
      work_id: book.work_id,
      star_rating: rating,
      review_text: reviewText,
      liked: liked
    };

    try {
      await axios.post("/reviews", review, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      successMessage();
      setTimeout(() => navigate(0), 2000);
    } catch (err) {
      const msg = 'Failed to submit review';
      setSubmitError(msg);
      errorMessage('Oops! Something went wrong and we were not able to post your review. Please try again later.');
    }
  };

  return (
    <div id="new-review-card">
      <div id="book-image-background">
        <img src={book.img_M} alt="Book cover image" height={'170px'} />
      </div>
      <div id="new-review-content">
        <div id="title-container">
          <h2>My Review for {book.title}</h2>
          <FontAwesomeIcon className="x" icon={faXmark} size="lg" onClick={() => navigate(0)} />
        </div>

        <form className="review-form" method="post" onSubmit={handleSubmit}>
          <div id="icon-input">
            <div className="star-rating">
              <p>Rating: </p>
              {[...Array(5)].map((_, index) => {
                const currentRating = index + 1;
                return (
                  <label key={`star-${index}`}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => setRating(currentRating)}
                    />
                    <FontAwesomeIcon
                      className="star"
                      icon={currentRating <= (ratingHover || rating) ? filledStar : emptyStar}
                      size="xl"
                      color="var(--dark-accent-color)"
                      onMouseEnter={() => setRatingHover(currentRating)}
                      onMouseLeave={() => setRatingHover(0)}
                    />
                  </label>
                );
              })}
            </div>

            <div className="liked">
              <div className="like-tooltip-container">
                <p>Liked: </p>
                <label>
                  <input
                    type="checkbox"
                    name="liked"
                    checked={liked}
                    onChange={() => setLiked(!liked)}
                  />
                  <FontAwesomeIcon
                    className="heart"
                    icon={liked || likedHover ? filledHeart : emptyHeart}
                    size="xl"
                    color="var(--dark-accent-color)"
                    onMouseEnter={() => setLikedHover(true)}
                    onMouseLeave={() => setLikedHover(false)}
                  />
                </label>
                <span className="tooltip-text">Indicate if you enjoyed this read by liking it.</span>
              </div>
            </div>
          </div>

          <textarea
            name="inputText"
            placeholder=""
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button className="primary">Submit</button>
          {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;

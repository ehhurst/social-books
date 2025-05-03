import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem } from "../types";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import axios from "../../axiosConfig";
import { faStar as filledStar, faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar, faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import '../assets/css/ReviewForm.css';

function ReviewForm() {
    const book: BookItem = useLocation().state;
    const navigate = useNavigate();

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("access_token");

    const [rating, setRating] = useState<number | null>(null);
    const [ratingHover, setRatingHover] = useState<number | null>(null);
    const [liked, setLiked] = useState<boolean>(false);
    const [likedHover, setLikedHover] = useState<boolean>(false);
    const [reviewText, setReviewText] = useState<string>('');
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!token || !username || !book) {
            setMessage("Missing user or book info.");
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
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setMessage("Review submitted!");
            navigate(0);
        } catch (err: any) {
            console.error(err);
            const errorMsg = err?.response?.data?.error || "Failed to submit review.";
            setMessage(errorMsg);
          }
          
    };

    return (
        <div id="new-review-card">
            <div id="book-image-background">
                <img src={book.img_M} alt={`${book.title} cover`} height="170px" />
            </div>
            <div id="new-review-content">
                <div id="title-container">
                    <h2>My Review for {book.title}</h2>
                    <FontAwesomeIcon
                        className="x"
                        icon={faXmark}
                        size="lg"
                        onClick={() => navigate(0)}
                        aria-label="close"
                        role="img"
                        />

                </div>

                <form className="review-form" method="post" onSubmit={handleSubmit}>
                    <div id="icon-input">
                        <div className="star-rating">
                            <p>Rating: </p>
                            {[...Array(5)].map((_, index) => {
                                const currentRating = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={currentRating}
                                            checked={rating === currentRating}
                                            onChange={() => setRating(currentRating)}
                                        />
                                        <FontAwesomeIcon
                                            className="star"
                                            icon={currentRating <= (ratingHover || rating || 0) ? filledStar : emptyStar}
                                            size="xl"
                                            color="var(--dark-accent-color)"
                                            onMouseEnter={() => setRatingHover(currentRating)}
                                            onMouseLeave={() => setRatingHover(null)}
                                        />
                                    </label>
                                );
                            })}
                        </div>

                        <div className="liked">
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
                                    aria-label="like"
                                    role="img"
                                />
                            </label>
                        </div>
                    </div>

                    <textarea
                        name="inputText"
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <button className="primary">Submit</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default ReviewForm;

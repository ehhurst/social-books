import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Retrieve user & book details from localStorage
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("access_token");
  const olid = localStorage.getItem("currentBookOLID"); // Set when user selects a book

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !username || !olid) {
      setMessage("Missing user or book info.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/users/reviews/add",
        {
          star_rating: rating,
          review_text: reviewText,
          olid: olid,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Review submitted!");
      navigate("/books"); // Redirect after success
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit review.");
    }
  };

  return (
    <main>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating (1-5):</label>
        <input
          id="rating"
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />

        <label htmlFor="reviewText">Review:</label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}

export default ReviewForm;

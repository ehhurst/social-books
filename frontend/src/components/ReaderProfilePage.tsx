import axios from "../../axiosConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  getReviewsForUser } from "../hooks/fetch";
import ReviewCard from "./ReviewCard";
import { Review } from "../types";

function ReaderProfilePage() {
  const nav = useNavigate();
  const message:string = useLocation().state; // gets book data passed in url
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("access_token");

  async function handleDelete() {
    try {
      axios.delete("/users/delete", {
        headers : {
          "Authorization": `Bearer ${token}`, 
        }
      });
      const response = await axios.delete('/users/delete', {
        headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      }
      });
      console.log(response.data);
      localStorage.removeItem("username");
      localStorage.removeItem("access_token");
      nav("/"); // Redirect to homepage after account deletion
    } catch (error) {
      console.error(error);
    }
  }

  const {reviewData, loading, error} = getReviewsForUser(`/user/reviews`);
  console.log("reviews" ,reviewData)

  return(
    <main>
        <h2>Welcome to your profile {username}!</h2>
        <div>
            <h3>My Reviews: </h3>
            {(message != '') ? 
              <div id='delete-msg'>{message}</div> : <div></div>}

            {loading && <p>Loading reviews...</p>} {/* Show loading state */}
            {error && <p style={{ color: "var(--error-color)" }}>{error}</p>} {/* Show error message */}  
            <ul id="review-list">
                {reviewData != undefined && reviewData.length > 0 ? (
                    reviewData.map((review: Review) => (
                        <ReviewCard
                            key={review.review_id}
                            review_id={review.review_id}
                            work_id={review.work_id}
                            username={review.username}
                            rating={review.rating}
                            reviewText={review.reviewText}
                            liked={review.liked}
                        />
                    ))
                ) : (!loading && !error && <p>No reviews yet. <Link id='reviews-cta' to={'/books'}>Get started <FontAwesomeIcon icon={faArrowRight}/></Link></p>
                                    )}
            </ul>
        </div>

        <button onClick={handleDelete}>Delete My Account</button>
    </main>
    );
}


export default ReaderProfilePage;

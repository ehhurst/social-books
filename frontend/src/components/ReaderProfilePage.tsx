import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  getReviewsForUser } from "../hooks/fetch";
import ReviewCard from "./ReviewCard";
import { Review } from "../types";

function ReaderProfilePage() {
  const nav = useNavigate();
  const username = localStorage.getItem("username");
  const [userData, setUserData] = useState();

  useEffect(() => {

    axios.get(`/users/get/${username}`, {
        headers: { "Content-Type": "application/json" }
    })
    .then((response) => setUserData(response.data))
    .catch((error) => console.error("❌ Book Fetch Error:", error)
    )

    console.log(userData);
  }, []);

  

  // useEffect(() => {
  //   if (!username) {
  //     nav("/login"); // redirect if user is not logged in
  //   }
  // }, [username, nav]);

  async function handleDelete() {
    try {
      const response = await axios.delete(`/users/delete-user/${username}`);
      await axios.delete(`/users/delete-reader-profile/${username}`)
      console.log(response.data);
      localStorage.removeItem("username");
      localStorage.removeItem("access_token");
      nav("/"); // Redirect to homepage after account deletion
    } catch (error) {
      console.error(error);
    }
  }

  const {reviewData, loading, error} = getReviewsForUser(`/users/${username}/reviews`);
  console.log("reviews" ,reviewData)

  return(
    <main>
        <h2>Welcome to your profile {username}!</h2>
        <div>
            <h3>My Reviews: </h3>
            {loading && <p>Loading reviews...</p>} {/* Show loading state */}
            {error && <p style={{ color: "var(--error-color)" }}>{error}</p>} {/* Show error message */}  
            <ul id="review-list">
                {reviewData != undefined && reviewData.length > 0 ? (
                    reviewData.map((review: Review) => (
                        <ReviewCard
                            review_id={review.review_id}
                            work_id={review.work_id}
                            username={review.username}
                            rating={review.rating}
                            reviewText={review.reviewText}
                            liked={review.liked}
                        />
                    ))
                ) : (!loading && !error && <p>No reviews yet. <Link to={'/books'}>Get started <FontAwesomeIcon icon={faArrowRight}/></Link></p>
                                    )}
            </ul>
        </div>

        <button onClick={handleDelete}>Delete My Account</button>
    </main>
    );
}


export default ReaderProfilePage;

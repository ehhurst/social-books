import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookItem, ReviewForm, ReviewStatus } from "../types";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { faStar as filledStar, faHeart as filledHeart} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar, faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";

import '../assets/css/CreateReview.css'



function CreateReview(props:BookItem) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({rating: -1, reviewText: '', liked: null});

    const [rating, setRating] = useState(null);
    const [ratingHover, setRatingHover] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likedHover, setLikedHover] = useState(false);
    const [reviewText, setReviewText] = useState('');
    


    function handleFormChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
        const {name, value} = event.target
        switch(name) {
            case 'rating' : setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value)}));
                break;
            case 'reviewText' : setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                break;
            case 'liked': setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                break;
            default:
                break;
        }
    }


    // client side form validation
    const[formError, setFormError] = useState("");
    const[formStatus, setFormStatus] = useState("");

    function validateForm():boolean {
        if (rating === -1 || reviewText === "" || liked === null) {
            setFormError("Star rating, review text, and liked values are required to create a review. Please try agian.");
            return false; 
        }
        else {
            setFormError('');
            return true;
        }
    }

    const submitReview = async (form:ReviewForm) => {
        const review = JSON.stringify({username: "", work_id: props.work_id, review_id: "", reviewForm : form});
        const reviewStatus:ReviewStatus = await axios.post('', review, 
            { headers : { "Content-Type" : "application/json" }})
            .then((response) => {return response.data})
            .catch((error) => console.log(error))

        console.log("Status:" , reviewStatus)
        return reviewStatus;
    }

    

    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        const formIsValid = validateForm();
        if (!formIsValid) {
            setFormStatus("ERROR");
        }
        else {
            setFormStatus("PENDING");
            const review = await submitReview({
                rating : rating, 
                reviewText : reviewText, 
                liked: liked
            })

            if (review) {
                setFormStatus("OK");
                navigate(`/books/${props.work_id}`, {state: props}) // include state??
            }
            else {
                setFormStatus("ERROR POSTING REVIEW")
                console.log("Error posting review");
            }
        }
    }

    return(
        <div id="new-review-card">
                <div id='book-image-background'>
                    <img src={props.img_M} alt="Book cover image" height={'170px'}/>
                </div>
                <div id='new-review-content'>
                    <div id='title-container'>
                        <h2>My Review for {props.title}</h2>
                        <FontAwesomeIcon className="x" icon={faXmark} size={'lg'} onClick={() => navigate(0)}/>
                    </div>
                    
                    <form
                        className="review-form"
                        onSubmit={() => handleSubmit}
                        method="post">
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
                                {/* <div className="liked">
                                <label>
                                    <input
                                        type="radio"
                                        name="liked"
                                        onClick={() => setLiked(!liked)}
                                        />
                                        <p>Liked: </p>
                                        <FontAwesomeIcon className='heart' icon={faHeart}
                                            size={"lg"}
                                            color={(liked || likedHover) ? "var(--dark-accent-color))": "var(--light-accent-color)"}
                                            onMouseEnter={() => setLikedHover(true)}
                                            onMouseLeave={() => setLikedHover(false)}  
                                            />
                                </label>
                            </div> */}
                            <div className="liked">
                                <p>Liked: </p>
                                    <label>
                                        <input
                                            type="radio"
                                            name="liked"
                                            onClick={() => setLiked(!liked)}
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
                            <input type="submit" value="submit"/>
                    </form>
                </div>
    


            </div>

    );
};

export default CreateReview;
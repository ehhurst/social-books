import Star from "./Star";

const StarRating = ({rating} :{rating: number}) => {
    const maxStars = 5;
    const starsArray = Array.from({ length: maxStars }, (_, index) => index < rating);

    return(
        <div>
            {starsArray.map((filled, index) => (
            <Star key={index} filled={filled} />))}
        </div>
    );
};

export default StarRating;
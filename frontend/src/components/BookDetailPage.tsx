import '../assets/css/BookPage.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import BookDetailBox from "./BookDetailBox";
import { BookItem } from "../types";
import ReviewCard from './ReviewCard';
import { useParams } from 'react-router-dom';

function BookDetailPage() {
    const {workID} = useParams();
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Handle errors gracefully
    const [book, setBook] = useState<BookItem | null>(null);
    useEffect(() => {
        axios.get('https://openlibrary.org/works/OL45804W.json')
            .then((response) => setBook(response.data))
            .catch(console.error);
    }, []);
    console.log(book);


    const review = {
        reviewId: "1235342",
        username: "test",
        work_ID: "12342",
        rating: 3,
        reviewText: "best ever",
        liked: true,
    }

    return (<main>
        {book ? (<BookDetailBox title={book.title} author={book.author} work_id={book.work_id} description={book.description} img_S={book.img_S} img_M={book.img_M} img_L={book.img_L} reading_Time={0}/>) : (!loading && !error && <p>No books found.</p>)}
        <ReviewCard review_id={review.reviewId} work_id={workID} username={review.username} rating={review.rating} reviewText={review.reviewText} liked={review.liked}/>

    </main>);
}
export default BookDetailPage;

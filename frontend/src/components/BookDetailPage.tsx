import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookItem } from "../types";
import axios from "axios";
import BookDetailBox from "./BookDetailBox";
import "../assets/css/BookPage.css";

function BookDetailPage() {
    const { olid } = useParams(); // Get book ID from URL
    const [book, setBook] = useState<BookItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {

        console.log("OLID from params:", olid); // Log OLID

        if (!olid) {
            setError("Invalid Book ID");
            setLoading(false);
            return;
        }

        const url = `https://openlibrary.org/works/${olid}.json`;
        console.log("Fetching from:", url); // Log full URL

        axios.get(`https://openlibrary.org/works/${olid}.json`)
            .then((response) => {
                const bookData = response.data;
                
                // Extracting title, authors, and description safely
                const title: string = bookData.title || "Unknown Title";
                const author: string = bookData.authors?.[0]?.author?.key 
                    ? `https://openlibrary.org${bookData.authors[0].author.key}`
                    : "Unknown Author";
                const description: string = typeof bookData.description === "string" 
                    ? bookData.description 
                    : bookData.description?.value || "No description available.";

                setBook({
                    title,
                    author,
                    work_ID: olid || "Unknown_ID",  // Ensure work_ID is always a string
                    description,
                    img_S: `https://covers.openlibrary.org/b/olid/${olid}-S.jpg`,
                    img_M: `https://covers.openlibrary.org/b/olid/${olid}-M.jpg`,
                    img_L: `https://covers.openlibrary.org/b/olid/${olid}-L.jpg`,
                    reading_Time: 0
                });

                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch book details");
                setLoading(false);
            });
    }, [olid]);

    const handleReviewClick = () => {
        if (olid) {
            localStorage.setItem("currentBookOLID", olid); // Store OLID
            navigate("/review"); // Navigate to review form
        }
    };

    return (
        <main>
            {loading && <p>Loading book details...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {book && (
                <>
                    <BookDetailBox 
                        title={book.title} 
                        author={book.author} 
                        work_ID={book.work_ID}  // ✅ Now always a string
                        description={book.description} 
                        img_S={book.img_S}
                        img_M={book.img_M}
                        img_L={book.img_L}
                        reading_Time={0}
                    />
                    <button onClick={handleReviewClick} className="primary">
                        Write a Review
                    </button>
                </>
            )}
        </main>
    );
}

export default BookDetailPage;

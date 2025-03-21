import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { BookItem } from '../types';
import CategoryBookBox from "./CategoryBookBox";
import '../assets/css/CategoryBookListPage.css';
import '../assets/css/global.css';

function CategoryBookListPage() {
  const { category } = useParams(); // From route
  const [searchParams] = useSearchParams(); // From ?search=query
  const searchTerm = searchParams.get("search") || "";

  const [bookList, setBookList] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchBooks = async () => {
      try {
        const queryParam = searchTerm
          ? `q=${searchTerm}`
          : `subject=${category || "fiction"}`;

        const response = await axios.get(
          `http://127.0.0.1:5000/search?${queryParam}&limit=9`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("🔍 Raw backend data:", response.data);

        const mappedBooks = response.data.map((book: any) => {
            const workID = book.Work_ID || "UNKNOWN";  // Match backend field
          
            return {
              title: book.title || "Unknown Title",
              author: book.author || "Unknown Author",
              work_ID: workID,
              img_S: book.img_S || "https://via.placeholder.com/100x150?text=No+Cover",
              img_M: book.img_M || "https://via.placeholder.com/200x300?text=No+Cover",
              img_L: book.img_L || "https://via.placeholder.com/300x450?text=No+Cover",
              description: book.description || "No description available.",
              reading_Time: Math.floor(Math.random() * 100),
            };
          });
          

        console.log("✅ Mapped Books:", mappedBooks);
        setBookList(mappedBooks);
      } catch (error) {
        console.error("❌ Book Fetch Error:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category, searchTerm]);

  return (
    <main>
      <div id="page-header">
        <h2>
          {searchTerm
            ? `Search results for "${searchTerm}"`
            : `${category || "Fiction"} Books`}
        </h2>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul id="book-list">
        {bookList.length > 0 ? (
          bookList.map((book: BookItem) => (
            <CategoryBookBox
              key={`${book.work_ID}-${book.title}`} // Unique key
              title={book.title}
              author={book.author}
              work_ID={book.work_ID}
              img_S={book.img_S}
              img_M={book.img_M}
              img_L={book.img_L}
              description={book.description}
              reading_Time={book.reading_Time}
            />
          ))
        ) : (
          !loading && !error && <p>No books found.</p>
        )}
      </ul>
    </main>
  );
}

export default CategoryBookListPage;

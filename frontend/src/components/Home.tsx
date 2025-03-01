import { useState } from "react";
import axios from "axios";

function Home() {
  const [isbn, setIsbn] = useState("");
  const [bookData, setBookData] = useState<{ title?: string; author?: string; error?: string } | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/parse", {
        [isbn]: { title: "Sample Title", author: "Sample Author" }  // Simulating book data
      });
      setBookData(response.data);
    } catch (error) {
      setBookData({ error: "Failed to fetch book details" });
    }
  };

  return (
    <div>
      <h1>Enter Book ISBN</h1>
      <input 
        type="text" 
        value={isbn} 
        onChange={(e) => setIsbn(e.target.value)} 
        placeholder="Enter ISBN"
      />
      <button onClick={handleSubmit}>Get Book Info</button>

      {bookData && (
        <div>
          {bookData.error ? (
            <p style={{ color: "red" }}>{bookData.error}</p>
          ) : (
            <p>Title: {bookData.title}, Author: {bookData.author}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;

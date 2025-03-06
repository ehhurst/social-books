import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import '../assets/css/global.css'
import '../assets/css/Home.css'



function Home() {
  const nav = useNavigate();
  // const [isbn, setIsbn] = useState("");
  // const [bookData, setBookData] = useState<{ title?: string; author?: string; error?: string } | null>(null);

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post("http://127.0.0.1:5000/parse", {
  //       [isbn]: { title: "Sample Title", author: "Sample Author" }  // Simulating book data
  //     });
  //     setBookData(response.data);
  //   } catch (error) {
  //     setBookData({ error: "Failed to fetch book details" });
  //   }
  // };

  return (
    <main>
      <div id="home-container-top">
        <div id='hero-image-container'>
          <img src="" alt="Image of books"/>
          <h1>Welcome to ShelfLife</h1>
          <h2>Connect through your reading journey</h2>
        </div>
      </div>
        
      <div id='home-container-bottom'>
        <div id="description-review-container">
            <div id='site-description-container'>
            
            <h3><FontAwesomeIcon icon={faBookOpen}/> ShelfLife</h3>
            <p> is...Site description paragraph goes here</p>
          </div>
          <div id="example-review-container-background">
            <div id="example-review-container">
              <div id="book-image-container">
                <img src="https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg" alt="Book cover" width={"75px"}/>
              </div>
              <div>
                <h3>The Great Gatsby</h3>
                <h4>F. Scott Fitzgerald</h4>
                <div id="review-content">
                  <h4>UserName</h4>
                  <p>Stars</p>
                  <p>Review content..</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="cta-buttons">
          <p>Ready to get started?</p>
          <div>
            <button className='primary' onClick={() => nav("login")}>Sign In</button>
            <button className='secondary' onClick={() => nav("register")}>Register</button>
          </div>
        </div>
      </div> 
      
    </main>

    // <div>
    //   <h1>Enter Book ISBN</h1>
    //   <input 
    //     type="text" 
    //     value={isbn} 
    //     onChange={(e) => setIsbn(e.target.value)} 
    //     placeholder="Enter ISBN"
    //   />
    //   <button onClick={handleSubmit}>Get Book Info</button>

    //   {bookData && (
    //     <div>
    //       {bookData.error ? (
    //         <p style={{ color: "red" }}>{bookData.error}</p>
    //       ) : (
    //         <p>Title: {bookData.title}, Author: {bookData.author}</p>
    //       )}
    //     </div>
    //   )}
    // </div>
  );
}

export default Home;

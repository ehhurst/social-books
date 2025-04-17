import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import '../assets/css/global.css'
import '../assets/css/Home.css'
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { getBook } from "../hooks/fetch";

function Home() {
  const nav = useNavigate();
  const token = sessionStorage.getItem('access_token');

  const {data, loading, error} = getBook(`book/OL468431W`);
  
  return (
    <main>
      <div id='home-container-top'>
        <h1>Welcome to ShelfLife</h1>
        <h2>Connect through your reading journey</h2>
      </div>
      <div id='home-container-bottom'>
        <div id="description-review-container">
          <div id='site-description-container'>
            <h3><FontAwesomeIcon icon={faBookOpen}/> ShelfLife</h3>
            <p> a place for readers to log, review, and discover books and connect with others through discussions and competitions.</p>
          </div>
          <div id="example-review-container-background">
            {(loading && !error) ? <div>Loading review data</div> : 
            <div id="example-review-container">
              <div id="book-image-container">
                <img src="https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg" alt="Book cover" height={'120px'}/>
              </div>
              <div id="review-info">
                <div>
                  <h3>The Great Gatsby</h3>
                  <p id='by'>by</p>
                  <h4>F. Scott Fitzgerald</h4>
                </div>
                <div id="review-content">
                  <h5 id="username">UserName</h5>
                    <div id="star-rating">
                      <FontAwesomeIcon icon={faStar} color={"var(--dark-accent-color"} size={"xs"}/>
                      <FontAwesomeIcon icon={faStar} color={"var(--dark-accent-color"} size={"xs"}/>
                      <FontAwesomeIcon icon={faStar} color={"var(--dark-accent-color"} size={"xs"}/>
                      <FontAwesomeIcon icon={faStar} color={"var(--dark-accent-color"} size={"xs"}/>
                      <FontAwesomeIcon icon={faStarHalf} color={"var(--dark-accent-color"} size={"xs"}/>
                    </div>
                    <p id='review-content'>One of the most influential novels of the last century, Fitzgerald's The Great Gatsby takes the mask off the Art Deco era's glamorous facade.</p>
                </div>
              </div>
            </div>
} {(error) ? <div>Error loading review</div>: <></>}
          </div>
            
        </div>
        {(!token) ? <div id="cta-buttons">
          <p>Ready to get started?</p>
          <div>
            <button className='primary' onClick={() => nav("login")}>Sign In</button>
            <button className='secondary' onClick={() => nav("register")}>Register</button>
          </div>
        </div>: <></>}
      </div> 
      
    </main>
  );
}

export default Home;

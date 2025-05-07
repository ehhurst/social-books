import { faBookOpen } from "@fortawesome/free-solid-svg-icons/faBookOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../assets/css/global.css'
import '../assets/css/Home.css'


function Home() {
  const nav = useNavigate();
  const token = sessionStorage.getItem('access_token');
  
  return (
    <main>
      <div id='home-container-top'>
        <h1>Welcome to ShelfLife</h1>
        <p>Connect through your reading journey</p>
      </div>
      <div id='home-container-bottom'>
        <div id="description-review-container">
          <div id='site-description-container'>
            <h2><FontAwesomeIcon icon={faBookOpen}/> ShelfLife</h2>
            <p> a place for readers to log, review, and discover books and connect with others through discussions and competitions.</p>
          </div>
          <div id="example-review-container-background">
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

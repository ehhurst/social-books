import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ReviewForm from './ReviewForm';
import AddBookToShelf from './AddBookToShelf';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { toast } from 'react-toastify';
import { BookItem, User } from '../types';
import { toastConfig } from '../utils/toastConfig';
import axios from '../../axiosConfig';
import '../assets/css/BookDetailCard.css'



function BookDetailCard(props: {book:BookItem, avgRating:String}) {
    // modal controls for create review popup
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    
    // modal controls for add to library popup
    const [openLib, setOpenLib] = useState(false);
    const closeModalLib = () => setOpen(false);
    const token = sessionStorage.getItem('access_token');
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")

    const successMessage = () => toast.success(`Marked ${props.book.title} by ${props.book.author} as read.`, toastConfig);
    const errorMessage = () => toast.error(`Oops! We're having trouble adding "${props.book.title}" to your list of read books. Please try again later.`, toastConfig);
      
    // user adds a book to their list of read books
    function handleAddToList() {
        const data = props.book.work_id

        axios.post(`/shelf/Books I've Read`, { work_id: data} , {
            headers: { "Content-Type": "application/json" ,  "Authorization": `Bearer ${token}`}
        })
        .then((response) => {
            console.log(response.data);
            successMessage();
        })
        .catch((error) => {
            errorMessage();
            console.error("❌ Error adding book to read list:", error);
        });
    }
    

    return(
        <div className="container book-detail-box">
                <div id='book-image-background'>
                    <img src={props.book.img_M} alt='Book Cover Image' height={'220px'}/>
                </div>
            <div id="book-info">
                <h1>{props.book.title}</h1>
                <p id='by'>by</p>
                <h2>{props.book.author}</h2>
                <p id='description'>{props.book.description}</p>
            </div>
            <div id="cta-and-stats">
                <div id='stats-container'>
                    <table>
                        <tbody>
                            <tr>
                                <td>Average Rating</td>
                                <td>{props.avgRating} <FontAwesomeIcon icon={faStar} color={'var(--default-font-color)'}/></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                {(currentUser.username) ? 
                <div id='cta-container'>                
                {token? ( <button type="button" className="primary" onClick={() => setOpenLib(o => !o)}>+Add to Library</button>) : (<>/</>)}
                <Popup open={openLib} closeOnDocumentClick onClose={closeModalLib} modal>
                        <div className="modal">
                        <span id='review-details'> <AddBookToShelf closeModal={() => setOpenLib(false) } /></span>
                        </div>
                    </Popup>
                    <button className='secondary' onClick={handleAddToList}>Mark as Read</button>
                    <button type="button" className="primary" onClick={() => setOpen(o => !o)}>+ New Review</button>

                    <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                        <div className="modal">
                        <span id='review-details'> <ReviewForm/></span>
                        </div>
                    </Popup>

                </div> 
                : <></>}
            </div>
        </div>
    );
}

export default BookDetailCard;

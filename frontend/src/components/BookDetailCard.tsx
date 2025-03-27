// import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/css/BookDetailCard.css'
import { BookItem } from '../types';
import { faStar, faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import CreateReview from './CreateReview';
import { useState } from 'react';

function BookDetailCard(props: {book:BookItem, avgRating:String}) {
    const nav = useNavigate();

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
      

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
                        <tr>
                            <td>Estimated Read Time</td>
                            <td>{props.book.reading_Time} hours</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div id='cta-container'>
                <button className='secondary'>Mark as Read</button>
                <button type="button" className="primary" onClick={() => setOpen(o => !o)}>+ New Review</button>

                <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
                    <div className="modal">
                    <span id='review-details'> <CreateReview 
                                title={props.book.title} 
                                author={props.book.author} 
                                work_id={props.book.work_id} 
                                description={props.book.description} 
                                img_S={props.book.img_S} 
                                img_M={props.book.img_M}
                                img_L={props.book.img_L}/> 
                    </span>
                    
                    </div>
                </Popup>
            </div>
        </div>
    </div>
    );
}

export default BookDetailCard;

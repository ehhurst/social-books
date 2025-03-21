// import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/BookDetailBox.css'

import { BookItem } from '../types';

function BookDetailBox(props:BookItem) {
    // const nav = useNavigate();


    return(
    <div id="book-container">
        <div id="book-image">
            <div>
                <img src={`https://covers.openlibrary.org/b/id/6498519-M.jpg`} alt='Book Cover Image'/>
            </div>
        </div>
        <div id="book-info-container">
            <h1>{props.title}</h1>
            <p>by</p>
            <h2>{props.author}</h2>
            <p id='description'>{props.description}</p>
        </div>
        <div id="book-buttons-and-stats">
            <div id='stats-container'>
                <table>
                    <tbody>
                        <tr>
                            <td>Average Rating</td>
                            <td>4.5</td>
                            <td>Estimated Read Time</td>
                            <td>{props.reading_Time}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <button className='secondary'>Mark as Read</button>
            <button className='primary'>New Review</button>

        </div>

    </div>
    );
}

export default BookDetailBox;
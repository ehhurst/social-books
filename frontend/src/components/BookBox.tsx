import '../assets/css/BookBox.css'
import { useState } from 'react';
import { BookItem } from '../types';

function BookBox(props:BookItem) {
    //avg adult reads 1 page per minute
    // get num pages per hour
    function calcReadTime() {
        if (props.readTime % 60 === 0) {
            return (props.readTime)
        }
        const mod = props.readTime %60;
        const hrs = props.readTime / 60;
    }

    const isbn = props.isbn; 
    return(
    <div id="container">
        <div id="book-image">
            <div>
                <img src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`} alt='Book Cover Image'/>
            </div>
        </div>
        <div id="book-description">
            <h1>{props.title}</h1>
            <h2>{props.author_name}</h2>
            <p>{props.description}</p>
        </div>
        <div id="book-buttons-and-stats">
            <div id='stats-container'>
                <table>
                    <tr>
                        <td>Average Rating</td>
                        <td>4.5</td>
                    </tr>
                    
                    <tr>
                        <td>Estimated Read Time</td>
                        <td>{calcReadTime()}</td>
                    </tr>
                </table>

            </div>
            <button className='secondary'>Mark as Read</button>
            <button className='primary'>New Review</button>

        </div>

    </div>
    );
}

export default BookBox;
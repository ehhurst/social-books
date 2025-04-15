import { useEffect, useState } from "react";
import { BookItem, Review, Reviews } from "../types";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/UserLikesList.css'

function UserLikesList({likedBookIds}:{likedBookIds:string[]}) {
    const [likedBooks, setLikedBooks] = useState<BookItem[]>([])
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully
    const likedList:BookItem[] = []

    const findItem = ((array:BookItem[], work_id:string)=> array.find((item) => item.work_id == work_id));


    useEffect(() => {
        setLoading(true);
        setError('');

        // create list of books the user "likes", get book data for the liked books
        likedBookIds.forEach((item) => {
            axios.get(`/book/${item}`)
            .then((response) => {
                if(!findItem(likedList, response.data.work_id)) {
                    likedList.push(response.data)
                }
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to load liked books. Please try again later.');
            }).finally(() => {
                if (likedList.length == likedBookIds.length) {
                    setLikedBooks(likedList);
                    setLoading(false);
                }
        })
        });
    }, []); // run on initial page load


    return(
        <div id='liked-container'>
             {loading && <p>Loading...</p>} {/* Show loading state */}
             {error && <p style={{ color: "var(--error-color)" }}>{error}</p>} {/* Show error message */}  
             <ul>
            {likedBooks.length !== 0 ?(
               likedBooks.map((item:BookItem) => 
                <Link id="image-link" to={`/books/${item.work_id}`} state={item}>
                    <img id="cover" src={item.img_L} alt={`${item.title} book cover image`}/>
                </Link>
  ) 
            )
            :
             (!loading && !error && <p>No likes yet.</p>
                                )}
        </ul>

        </div>

    );
}

export default UserLikesList;
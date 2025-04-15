import { useEffect, useState } from "react";
import { BookItem } from "../types";
import axios from "../../axiosConfig";


function UserProfileList() {
    const [favorites, setFavorites] = useState<BookItem[]>([]);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        axios.get('', {            
            headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
          },}).then((response) => {
            console.log(response.data)
            setFavorites(response.data)
          }).catch((error) => console.log(error))
    });

    return(
        <div>
            <p>Favorite Books</p>
            <div id='favorites-container'>
                <p>Fav list goes here</p>
            </div>

        </div>
    );
}

export default UserProfileList;
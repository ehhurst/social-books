import { useNavigate, useParams } from "react-router-dom";
import ShelfBookList from "./ShelfBookList";
import { useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { BookItem, User } from "../types";
import { Bounce, toast } from "react-toastify";

function ShelfBookPage() {
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    const {user, shelfname} = useParams();
    const nav = useNavigate();
    const [books, setBooks] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(true); // add loading state
    const [error, setError] = useState(''); // handle errors gracefully
    const [hasError, setHasError] = useState(false);
    const token = sessionStorage.getItem("access_token");

    const deleteError = () => 
        toast.error("We're having trouble deleting your shelf. Please try again later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });

    const successMessage = () => 
        toast.success(`Shelf ${shelfname} deleted successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });


    // get books in this shelf
    useEffect(() => {
        setLoading(true);
        setError('');

        axios.get(`/shelf/${shelfname}`, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        })
        .then((response) => {
            setBooks(response.data)
        console.log(response.data)
        })
        .catch((error) => {
            console.error("❌ Book Fetch Error:", error);
            setError("Error loading book data. Please try again later.");
        }).finally(() => setLoading(false));






    }, []);

    async function handleDelete() {
        if (shelfname === "Favorites" || "Books I've Read") {
            deleteError();
        }

        setHasError(false);
        try {
            const response = await axios.delete(`/shelf/${shelfname}`, 
                {
                headers: {"Authorization": `Bearer ${token}`}
            });
            console.log(response.data);
            successMessage();
            nav(-1);
        }
        catch (error) {
            deleteError();
            console.error("❌ Error Deleting Shelf:", error);
        }
}

    

    
    
    return(
        <main>
            
            <h2>{shelfname}</h2>
            {/* only the owner of this shelf can delete it*/}
            {user == currentUser.username ? ( <button id="clear" onClick={handleDelete}>Delete Shelf</button>) : <></>}
            {/* <ShelfBookList book_list={books}/> */}
        </main>
    );
}

export default ShelfBookPage;
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import { BookItem, User } from "../types";
import { toast } from "react-toastify";
import MinBookBox from "./MinBookBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLessThan, faPen } from "@fortawesome/free-solid-svg-icons";
import '../assets/css/ShelfBookPage.css'
import useShelfBooks from "../hooks/useShelfBooks";
import { toastConfig } from "../utils/toastConfig";


function ShelfBookPage() {
    const {user, shelfname} = useParams();
    const navigate = useNavigate();

    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    const token = sessionStorage.getItem("access_token");

    const deleteShelfError = () => toast.error("We're having trouble deleting your shelf. Please try again later", toastConfig);
    const RemoveBookError = (title:string) => toast.error(`We're having trouble removing ${title} from your shelf. Please try again later.`, toastConfig);
    const successMessage = () => toast.success(`Successfully deleted bookshelf "${shelfname}" from your library.`, toastConfig);
    const removeBookSuccessMessage = () => toast.success(`Book removed successfully`, toastConfig);

    const {shelfBooksList, loadingBookshelf, bookshelfError} = useShelfBooks(user!, shelfname!);
    if (bookshelfError !== '') { toast.error(`Failed to load shelf: ${shelfname}. Please try again later.`)};

    // deletes a book shelf
    async function handleDelete() {
        if (shelfname == "Favorites" || shelfname == "Books I've Read") {
            deleteShelfError();
            return;
        }

        try {
            const response = await axios.delete(`/shelf/${shelfname}`, 
                {
                headers: {"Authorization": `Bearer ${token}`}
            });
            successMessage();
            navigate(`/${user}/profile`);
        }
        catch (error) {
            deleteShelfError();
            console.error("❌ Error Deleting Shelf:", error);
        }
    }


    // remove a book from a shelf
    async function handleRemove(book:BookItem) {
        try {
            await axios.delete(`/shelf/${shelfname}/${book.work_id}`, {headers: {"Authorization": `Bearer ${token}`}}
            ).then((response) => {
            removeBookSuccessMessage();
            navigate(0);
            })
        }
        catch (error) {
            RemoveBookError(book.title);
            console.error("❌ Error Deleting Book:", error);
        }
    };

    return(
        <main>
            <div id="shelf-header-container">
                <button id="back-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faLessThan} size={'xs'}/> Back</button>
            {/* only the owner of this shelf can delete it*/}
            {user == currentUser.username ? ( 
                <span>
                    <h2>{shelfname}</h2>
                    {shelfname !== "Favorites" &&  shelfname !== "read-books" ? (
                            <button className="delete" onClick={handleDelete}>Delete Shelf</button> 
                    ) : (<h2><Link to={`/${user}/profile`} >{user}</Link>'s Shelf: {shelfname}</h2>)}
                </span>
                ) : <h2><Link to={`/${user}/profile`} >{user}</Link>'s Shelf: {shelfname}</h2>}
            </div>

            <div id="shelf-body-container">
                {loadingBookshelf ? (<p>Loading books...</p>) : (bookshelfError) ? (<p style={{ color: "red" }}>{bookshelfError}</p>) : 
                                        <ul className="shelf-book-list">
                                            {shelfBooksList.length !== 0 ?(
                                                shelfBooksList.map((book:BookItem) => 
                                                    <li>
                                                                        <MinBookBox
                                                                        key={book.work_id}
                                                                        title={book.title}
                                                                        author={book.author}
                                                                        work_id={book.work_id}
                                                                        img_S={book.img_S}
                                                                        img_M={book.img_M}
                                                                        img_L={book.img_L}
                                                                        description={book.description}
                                                                        reading_Time={book.reading_Time}
                                                                    />
                                                                    {user === currentUser.username ? ( <button className="delete" onClick={() => handleRemove(book)}>Remove from Shelf</button>) : (<></>)}
                                                        </li>  
                                                                ))
                                : (!loadingBookshelf && !bookshelfError && <p>There are no books in this shelf yet. <Link to={'/categories/fiction'}>Add books <FontAwesomeIcon icon={faArrowRight}/></Link></p>
                                                    )}

                                            </ul>
                                            }   
            </div>  
        </main>
    );
}


export default ShelfBookPage;
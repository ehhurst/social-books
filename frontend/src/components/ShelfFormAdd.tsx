import { faArrowLeftLong, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import axios from "../../axiosConfig";
import '../assets/css/ShelfFormAdd.css';
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";


function ShelfFormAdd() {
    const navigate = useNavigate();
    const [shelfName, setShelfName] = useState('');
    const token = sessionStorage.getItem('access_token');
    const [errorMessage, setErrorMessage] = useState("");
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");

    const successMessage = () => toast(`Successfully added bookshelf "${shelfName}" to your library.`, toastConfig);
    const errorMessagePopup = () => toast.error(errorMessage, toastConfig);
    
    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        if (shelfName === "") {
            setErrorMessage("Shelf name is required. Please try again");
            return;
        }
        try {
            await axios.post("/shelf", {
                shelfName
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then(() => {
                successMessage();

            }).finally(() => navigate(`/${currentUser.username}/library/${shelfName}`));
            } catch (error) {
                console.error("Error creating bookshelf" ,error);
                setErrorMessage("Error creating book shelf. Please try again later.");
                errorMessagePopup();
            }
    }

    return(
        <main>
            <button id="back-button" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeftLong} size={'xs'}/> Back</button>
            <form id="create-shelf"
                method="post"
                onSubmit={handleSubmit}>
                    <h2>Create Shelf</h2>
                    <label>Shelf Name: 
                      <input type="text" name="shelf-name" value={shelfName} onChange={(event) => setShelfName(event.target.value)}></input>  
                    </label>
                    <section>
                        {errorMessage && (
                            <p id='error-message' aria-live='assertive'>
                                <FontAwesomeIcon icon={faTriangleExclamation} /> {errorMessage}
                            </p>
                        )}
                    </section>
                    <button className="primary">Submit</button>
            </form>
        </main>
    )

}

export default ShelfFormAdd;
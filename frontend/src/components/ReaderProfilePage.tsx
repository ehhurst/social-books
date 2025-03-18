import axios from "axios";
import { useNavigate } from "react-router-dom";


function ReaderProfilePage() {
    const nav = useNavigate();
    const username = JSON.parse(localStorage.getItem('username') || "");


    async function handleSubmit() {
        await axios.delete(`http://34.238.53.95/api/users/delete/${username}`)
        .then((response) => {
            console.log(response.data)
        }).catch((error) => console.log(error))     
    }

    return(
    <main>
        <button onClick={handleSubmit}>Delete My Account</button>
    </main>
    );
}

export default ReaderProfilePage;

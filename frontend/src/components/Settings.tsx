import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../types";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";


function Settings(user:User) {
    const token = localStorage.getItem("access_token")
    const [open, setOpen] = useState(false);
    const closeSettingsModal = () => setOpen(false);
    const nav = useNavigate();

    async function handleDelete() {
        try {
          axios.delete("/users/delete", {
            headers : {
              "Authorization": `Bearer ${token}`, 
            }
          });
          const response = await axios.delete('/users/delete', {
            headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json",
          }
          });
          console.log(response.data);
          localStorage.removeItem("username");
          localStorage.removeItem("access_token");
          nav("/"); // Redirect to homepage after account deletion
        } catch (error) {
          console.error(error);
        }
      }
    
    

    return(
        <div id='settings-container'>
            <h2>Settings</h2>
            <div id="user-data">
            <FontAwesomeIcon id='user-icon' icon={faUserCircle} size={'xl'}/>
            <h3>{user.username}</h3>

        <button onClick={() => setOpen(o => !o)}>Delete My Account</button> 
        <Popup open={open} closeOnDocumentClick onClose={closeSettingsModal} modal>
            <div className="modal">
              <p id='error-message'>Are you sure you would like to delete your account? This cannot be undone. </p>
              <button id='back' onClick={closeSettingsModal}>No, don't delete my account.</button>
              <button id='confirm' onClick={handleDelete}>Yes, I would like to delete my account.</button>
            </div>
          </Popup>
        
            </div>
        </div>
    );
}

export default Settings;
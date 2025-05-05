import { FormEvent, useEffect, useState } from "react";
import '../assets/css/UserProfile.css'

import { User } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import YearlyProgressChart from "./YearlyProgressChart";
import useShelfBooks from "../hooks/useShelfBooks";
import LibraryShelfList from "./LibraryShelfList";
import axios from "../../axiosConfig";
import { toast } from "react-toastify";
import { toastConfig } from "../utils/toastConfig";



function UserProfile() {
    const nav = useNavigate();
    const [goal, setGoal] = useState(0);
    const token = sessionStorage.getItem("access_token");
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");
    var {user} = useParams(); // get which user's profile is loaded
    let year = new Date().getFullYear();
    const successMessage = () => toast.success(`Successfully updated your reading goals!`, toastConfig);
    const errorMessage = () => toast.error(`Error: We're having trouble updating your goals right now. Please try again later.`, toastConfig);
    // get the user's list of favorite books 
    const {shelfBooksList:readBooksList } = useShelfBooks(user!, "Books I've Read");

    const isCurrentUserProfile = (user === currentUser.username);
    let title = 'My';
    if (!isCurrentUserProfile) {
      title= user + "'s"
    };

    // get the user's reading goal and update graph on page reload
    useEffect(() => {
        axios.get(`${user}/goals`
        ).then((response) => {
            response.data === -1 ? setGoal(0) : setGoal(response.data);
            

        }).catch((error) => console.log(error));
    }, [])

    
    const submitGoal = async (event:FormEvent) => {
        event.preventDefault();

        try { axios.put(
            "/goals",
            goal ,
            {
                headers: {
                  "Authorization": `Bearer ${token}`, 
                  "Content-Type": "application/json",
                },
              }
          ).then((response) => {
                setGoal(response.data.goal);
                
                const updatedUser:User = {
                    username: currentUser.username,
                    first_name: currentUser.first_name,
                    last_name: currentUser.last_name,
                    goal: response.data.goal
                }
                sessionStorage.setItem('User', JSON.stringify(updatedUser));
                setGoal(response.data.goal);
                successMessage();
            }
            ).catch((error) => {
                errorMessage();
                console.log(error);
            }).finally(() => {
                // trigger page reload after success toast is displayed
                setTimeout(() => {
                    nav(0);
                }, 2000);
            })
        } catch {(error: any) => console.log(error)}
    }
    
    return(
         <span>
            <div id='goals'>
                <YearlyProgressChart progress={readBooksList.length} goal={goal} />
                {isCurrentUserProfile ? (                
                    <form id="set-goals">
                        <label htmlFor="goal">{title} reading goal for {year}: </label>
                            <input type="number" id="goal" name="goal" min="0" max="100" value={goal} onChange={(e) => setGoal(parseInt(e.target.value ))}/>
                            <input type="submit" onClick={submitGoal} />
                    </form>  
            ) :(<></>)}
            </div>
                
                <LibraryShelfList shelfName={"Favorite Books"}/>       
        </span>
    );
}

export default UserProfile;
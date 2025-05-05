import { faCircleUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../types";
import '../assets/css/UserNetwork.css'

function UserNetwork({ followers, following }:{initialState: string, followers:User[], following: User[]}) {
    const [selected, setSelected] = useState("Followers");
    var {user} = useParams(); // get which user's profile is loaded
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}");

    const isCurrentUserProfile = (user === currentUser.username);
    let title1 = 'You are';
    let title2 = "You have"
    if (!isCurrentUserProfile) {
      title1= user + " is"
      title2 = user + " has"
    };
    return (
        <div>
            <ul id="network-nav">
                <li id={(selected == 'Followers')? "selected" : "unselected"} onClick={() => setSelected('Followers')}>Followers</li>
                <li id={(selected == 'Following')? "selected" : "unselected"} onClick={() => setSelected('Following')}>Following</li>
            </ul>
            <div>
                {(selected == 'Following') ?
                <ul id="following-list">
                {following.length > 0 ? 
                following.map((user: User, index:number) => (
                    <Link to={`/${user.username}/profile`}>
                    <li key={index}>
                        <p>
                            <FontAwesomeIcon icon={faUserCircle}/>
                            {user.username}
                        </p>
                    </li>
                </Link>
                ))
                : <p>{title1} not following anyone.</p>
                } 
            </ul> :
            
               (selected == 'Followers') ?
               
                <ul id="followers-list">
                    {followers.length > 0 ? 
                    followers.map((user: User, index:number) => (
                        <Link to={`/${user.username}/profile`}><li key={index}>
                            <p>
                                <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>{user.username}
                            </p>
                        </li></Link>
                    ))
                    : <p>{title2} no followers.</p>
                    } 
                </ul>
                : <></> }
            </div>
        </div>
    );
}


export default UserNetwork;
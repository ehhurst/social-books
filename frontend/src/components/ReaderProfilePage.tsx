import axios from "../../axiosConfig";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { faArrowRight, faGear, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  getReviewsForUser } from "../hooks/fetch";

import UserReviewsList from "./UserReviewsPage";
import UserLikesList from "./UserLikesList";
import '../assets/css/ReaderProfilePage.css'
import { User } from "../types";
import UserNetwork from "./UserNetwork";
import YearlyProgressChart from "./YearlyProgressChart";

function ReaderProfilePage() {
  const nav = useNavigate();



  const message:string = useLocation().state; 
  const currentUser = localStorage.getItem("username");
  const token = localStorage.getItem("access_token");
  const [selected, setSelected] = useState('Profile');
  let currentUsersProfile = true;
  // useEffect(() => {nav(0)}, [])

  //looking at this users profile page vs anothers
  const {user} = useParams();
  let title = 'My';
  if (user != currentUser) {
    currentUsersProfile = false;

    title= user + "'s"};
  
    console.log("whose profile? " , currentUsersProfile);

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

  const {reviewData, loading, error} = getReviewsForUser(`/user/reviews`);
  console.log("reviews" ,reviewData)
  const likedBookIds = (reviewData.filter(review => review.liked)).flatMap(item => item.work_id)
  console.log("liked id's:", likedBookIds);

  const [followers, setFollowers] = useState<User[]>([]); // list of users that are following the user
  const [following, setFollowing] = useState<User[]>([]); // list of users that this user is following
  useEffect(() => {
    axios.get(`/${user}/followers`)
    .then((response) => {
      console.log("FOLLOWERS" , response.data);
      setFollowers(response.data)}
    ).catch((error) => console.log(error))

    axios.get(`/${user}/following`)
    .then((response) => {
      console.log("FOLLOWING" , response.data);
      setFollowing(response.data)}
    ).catch((error) => console.log(error))
  },[]);



  
function handleFollow() {
  axios.post(`/follow`, user,  {headers: {
    "Authorization": `Bearer ${token}`, 
    "Content-Type": "application/json",
  }},)
  .then(response => console.log(response.data)).catch((error) => console.log(error)).finally(() => nav(0))
}
  
let year = new Date().getFullYear();



  return(
    <div id="profile-page-container">
      <div id='settings'>
        {currentUsersProfile ? <FontAwesomeIcon icon={faGear} size={'xl'}/> : <></>} {/* TODO add OCL*/}
      </div>

     

      <div id='profile-header-content'>
        <div id='user-container'>
          <div id='user'>
            <FontAwesomeIcon icon={faUserCircle} size={'xl'}/>
            <h2>{user}</h2> 
          </div>
          <YearlyProgressChart props={[1, 2]} />

          {!currentUsersProfile ? <button className='primary' onClick={handleFollow}>Follow</button> :<></>} {/*Only display follow button on other user's profiles */}
        </div>
        
        <div id='header-stats'>
          <div className='stats'>
            <h3>{reviewData.length}</h3>
            <p>Books Read</p>
          </div>
          <div className='stats'>
            <h3>{reviewData.length}</h3>
            <p>{year} Goal</p>
          </div>
          <div className='stats' onClick={() => setSelected('Reviews')}>
            <h3>{reviewData.length}</h3>
            <p>Reviews</p>
          </div>
          <div className='stats' onClick={() => setSelected('Network')}>
            <h3>{following.length}</h3>
            <p>Following</p>
          </div>
          <div className='stats followers' onClick={() => setSelected('Network')}>
          <h3>{followers.length}</h3>
            <p>Followers</p>
          </div>
        </div>
      </div>
      <div id='profile-nav'>
        <ul>
          <li id={(selected == 'Profile')? "selected" : "unselected"} onClick={() => setSelected('Profile')}>Profile</li>
          <li id={(selected == 'Library')? "selected" : "unselected"} onClick={() => setSelected('Library')}>Library</li>
          <li id={(selected == 'Reviews')? "selected" : "unselected"} onClick={() => setSelected('Reviews')}>Reviews</li>
          <li id={(selected == 'Likes')? "selected" : "unselected"} onClick={() => setSelected('Likes')}>Likes</li>
          <li id={(selected == 'Network')? "selected" : "unselected"} onClick={() => setSelected('Network')}>Network</li>
        </ul>
      </div>
      <div id='profile-body-content'>
        {title} {selected}:
        {(selected == 'Profile') ?
        <></>
        : (selected == 'Library') ?
        <></>
        : (selected == 'Reviews') ? 
        <UserReviewsList reviewData={reviewData} loading={loading} error={error}/>
        : (selected == 'Likes') ?
        <UserLikesList likedBookIds={likedBookIds}/>
        : (selected == 'Network') ? 
        <UserNetwork initialState={selected} followers={followers} following={following} />
        :
        <></>}
      </div>

        

        {/* <button onClick={handleDelete}>Delete My Account</button>  */}

    </div>

    );
}


export default ReaderProfilePage;

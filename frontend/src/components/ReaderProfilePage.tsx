import axios from "../../axiosConfig";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { faArrowRight, faGear, faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  getReviewsForUser } from "../hooks/fetch";
import UserLikesList from "./UserLikesList";
import '../assets/css/ReaderProfilePage.css'
import { User } from "../types";
import UserNetwork from "./UserNetwork";
// import YearlyProgressChart from "./YearlyProgressChart";
import Popup from "reactjs-popup";
import Settings from "./Settings";
import UserReviewsPage from "./UserReviewsPage";


function ReaderProfilePage() {
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);



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
  axios.post(`/follow`, user,  
    {headers: {
      "Authorization": `Bearer ${token}`, 
      "Content-Type": "application/json",
    }},)
  .then(response => console.log("here", response.data))
  .catch((error) => console.log(error)).finally(() => nav(0))
}
  
let year = new Date().getFullYear();



  return(
    <div id="profile-page-container">
      <div id='settings'>
        {currentUsersProfile ? <FontAwesomeIcon icon={faGear} size={'xl'} onClick={() => setOpen(o => !o)}/> : <></>} {/* TODO add OCL*/}
          <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
            <div className="modal">
              <span id='settings'> <Settings username={""} first_name={""} last_name={""} access_token={""} /></span>
            </div>
          </Popup>
      </div>

      <div id='profile-header-content'>
        <div id='user-container'>
          <div id='user'>
            <FontAwesomeIcon icon={faUserCircle} size={'xl'}/>
            <h2>{user}</h2> 
          </div>
          {/* <YearlyProgressChart props={[1, 2]} /> */}

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
        <UserReviewsPage reviewData={reviewData} loading={loading} error={error}/>
        : (selected == 'Likes') ?
        <UserLikesList likedBookIds={likedBookIds}/>
        : (selected == 'Network') ? 
        <UserNetwork initialState={selected} followers={followers} following={following} />
        :
        <></>}
      </div>

        
    </div>

    );
}


export default ReaderProfilePage;

import { useEffect, useState } from 'react';
import '../assets/css/CompetitionItem.css'
import { BookItem, ContestItem, ContestParticipant, User } from '../types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig';

function CompetitionDetailPage() {
  const navigate = useNavigate();
  const {name} = useParams();
  const competition:ContestItem = {
    contest_name: '',
    book_count: 0,
    end_date: '',
    organizer: ''
  }
  
  const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")
  const token = sessionStorage.getItem("access_token");

  var userParticipating = false; // Replace with real logic
  const [books, setBooks] = useState<BookItem[]>([]);
  const [leaderboard, setLeaderBoard] = useState<ContestParticipant[]>([]);
  
  useEffect(() => {
    // axios call to get contest books
    axios.get(`/contest/${name}/books`).then((response) => {
      console.log(response.data);
      setBooks(response.data);
    }
    );

    //get contest participants, check if the current user is participating
    axios.get(`/contest/${name}/participants`).then((response) => {
      console.log(response.data);
      setLeaderBoard(response.data);
    }).finally(() => console.log("leaderboard" , leaderboard))

    

    if(leaderboard.find((participant) => participant.username === currentUser.username)) {
      console.log("HERE")
      userParticipating = true;

    }


  }, []);

  function handleJoin() {

    // Join competition logic goes here

  }


  return (
    <div className="competition-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="competition-header">
        <div className="info">
          <h2>{competition.contest_name}</h2>

          <p className="organized-by">Organized by <Link to={`/${competition.organizer}/profile`}>{competition.organizer}</Link></p>
          <div className="meta">
            <span>Ends: {competition.end_date}</span>
            <span>Participants: {leaderboard.length}</span>
          </div>
        </div>
        {!userParticipating && <button className="primary join-btn" onClick={() => handleJoin}>Join</button>}
      </div>

      <div className="books-section">
        <h3>Books</h3>
        <div className="book-list">
          {books.map((book, index) => (
            <div className="book-box" key={index}>
              <Link to={`/books/${book.work_id}`} state={book}> {/* link to book's page */ }
                <img src={book.img_L} alt={book.title} />
                <div className="book-details">
                  <h4>{book.title}</h4>
                  <p>{book.author}</p>
                  {/*mark book as completed or show completed status here */}
                  {userParticipating && (
                    <button className="secondary">Mark as Completed</button>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Username</span>
          <span>Progress</span>
        </div>
        <div className="leaderboard-list">
          {leaderboard.map((user:ContestParticipant, index) => (
            <div
              key={index}
              className={`user-card ${user.username === currentUser.username ? 'highlight' : ''}`}
            >
              <span className="rank">#{index + 1}</span>
              <span className="username"><Link to={`/${user.username}/profile`}>{user.username}</Link></span>
              <span className="progress">
                {user.completed_books.length > 0 ? (
                  user.completed_books.length / competition.book_count * 100
                ) : (0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetailPage;
import { useEffect, useState } from 'react';
import '../assets/css/CompetitionItem.css';
import { BookItem, ContestItem, User } from '../types';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ContestParticipant = {
  completed_books: BookItem[];
  username: string;
};

function CompetitionDetailPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const data: ContestItem = useLocation().state;
  const currentUser: User = JSON.parse(sessionStorage.getItem('User') || '{}');
  const token = sessionStorage.getItem('access_token');

  const [books, setBooks] = useState<BookItem[]>([]);
  const [leaderboard, setLeaderBoard] = useState<ContestParticipant[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [bookError, setBookError] = useState('');
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
  const [leaderboardError, setLeaderboardError] = useState('');
  const [userParticipating, setUserParticipating] = useState(false);
  const [completedBooks, setCompletedBooks] = useState<string[]>([]);

  useEffect(() => {
    setLoadingBooks(true);
    setBookError('');
    axios
      .get(`contest/${name}/books`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('Error loading contest books:', error);
        setBookError("We're having trouble loading this competition's books.");
      })
      .finally(() => setLoadingBooks(false));
  }, [name]);

  useEffect(() => {
    fetchLeaderboard();
  }, [name]);

  const fetchLeaderboard = () => {
    setLoadingLeaderboard(true);
    setLeaderboardError('');
    axios
      .get(`contest/${name}/participants`)
      .then((response) => {
        const participants = response.data.participant_list;
        setLeaderBoard(participants);
        const found = participants.some(
          (p: ContestParticipant) => p.username === currentUser.username
        );
        setUserParticipating(found);

        const currentUserData = participants.find((p) => p.username === currentUser.username);
        if (currentUserData) {
          const completed = currentUserData.completed_books.map((b) => b.work_id);
          setCompletedBooks(completed);
        }
      })
      .catch((error) => {
        console.error('Error loading participants:', error);
        setLeaderboardError('Trouble loading leaderboard.');
      })
      .finally(() => setLoadingLeaderboard(false));
  };

  const handleJoin = () => {
    axios
      .post(
        `/contest/${data.contest_name}/add_participant`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setUserParticipating(true);
        fetchLeaderboard();
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          setUserParticipating(true);
          fetchLeaderboard();
        } else {
          console.error('Error joining competition:', error);
        }
      });
  };

  const markAsComplete = async (work_id: string) => {
    try {
      const response = await axios.post(
        `/contest/mark/${data.contest_name}/${work_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Book marked as completed!");

      setCompletedBooks((prev) => [...prev, work_id]);
      setTimeout(() => {
        fetchLeaderboard();
      }, 300);
    } catch (error) {
      console.error('Error marking book as complete:', error);
      toast.error("Failed to mark book as completed.");
    }
  };

  return (
    <div className="competition-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="competition-header">
        <div className="info">
          <h2>{data.contest_name}</h2>
          <p className="organized-by">
            Organized by{' '}
            <Link to={`/${data.organizer}/profile`}>{data.organizer}</Link>
          </p>
          <div className="meta">
            <span>Ends: {data.end_date}</span>
            <span>Participants: {leaderboard.length}</span>
          </div>
        </div>

        {!userParticipating && token && (
          <button className="primary join-btn" onClick={handleJoin}>
            Join
          </button>
        )}
        {userParticipating && (
          <p className="joined-message">✅ You’ve joined this competition!</p>
        )}
      </div>

      <div className="books-section">
        <h3>Books</h3>
        {loadingBooks ? (
          <p>Loading books...</p>
        ) : bookError ? (
          <p style={{ color: 'red' }}>{bookError}</p>
        ) : (
          <div className="book-list">
            {books.length > 0 ? (
              books.map((book, index) => (
                <div className="book-box" key={index}>
                  <Link to={`/books/${book.work_id}`} state={book}>
                    <img src={book.img_L} alt={book.title} />
                    <div className="book-details">
                      <h4>{book.title}</h4>
                      <p>{book.author}</p>
                    </div>
                  </Link>
                  {userParticipating && (
                    <button
                      className={`secondary ${completedBooks.includes(book.work_id) ? 'disabled-button' : ''}`}
                      onClick={() => markAsComplete(book.work_id)}
                      disabled={completedBooks.includes(book.work_id)}
                    >
                      {completedBooks.includes(book.work_id)
                        ? 'Completed'
                        : 'Mark as Completed'}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        )}
      </div>

      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Username</span>
          <span>Progress</span>
        </div>
        <div className="leaderboard-list">
          {leaderboard.map((user: ContestParticipant, index) => (
            <div
              key={index}
              className={`user-card ${
                user.username === currentUser.username ? 'highlight' : ''
              }`}
            >
              <span className="rank">#{index + 1}</span>
              <span className="username">
                <Link to={`/${user.username}/profile`}>{user.username}</Link>
              </span>
              <span className="progress">
                {user.completed_books.length > 0
                  ? Math.round(
                      (user.completed_books.length / data.book_count) * 100
                    )
                  : 0}
                %
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompetitionDetailPage;

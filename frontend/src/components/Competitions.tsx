import React from 'react';
import '../assets/css/Competitions.css';

const Competitions = () => {
  const userParticipating = true; // Replace with real logic
  const currentUser = 'you';

  const books = [
    {
      title: '1984',
      author: 'George Orwell',
      image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    },
    {
      title: 'Brave New World',
      author: 'Aldous Huxley',
      image: 'https://covers.openlibrary.org/b/id/8775116-L.jpg',
    },
  ];

  const leaderboard = [
    { username: 'reader1', progress: 80 },
    { username: 'reader2', progress: 60 },
    { username: 'you', progress: 40 },
  ];

  return (
    <div className="competition-container">
      <button onClick={() => window.history.back()} className="back-button">
        ← Back
      </button>

      <div className="competition-header">
        <div className="info">
          <h2>Spring Reading Challenge</h2>
          <p className="description">
            Read as many books as you can this spring!
          </p>
          <p className="organized-by">Organized by the Book Club</p>
          <div className="meta">
            <span>Ends: May 30, 2025</span>
            <span>Participants: 32</span>
          </div>
        </div>
        {!userParticipating && <button className="primary join-btn">Join</button>}
      </div>

      <div className="books-section">
        <h3>Books</h3>
        <div className="book-list">
          {books.map((book, index) => (
            <div className="book-box" key={index}>
              <img src={book.image} alt={book.title} />
              <div className="book-details">
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                {userParticipating && (
                  <button className="secondary">Mark as Completed</button>
                )}
              </div>
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
          {leaderboard.map((user, index) => (
            <div
              key={index}
              className={`user-card ${user.username === currentUser ? 'highlight' : ''}`}
            >
              <span className="rank">#{index + 1}</span>
              <span className="username">{user.username}</span>
              <span className="progress">{user.progress}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Competitions;

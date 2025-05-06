import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { ContestItem } from "../types";
import '../assets/css/CompetitionsPage.css';

function CompetitionsPage() {
  const nav = useNavigate();
  const [competitions, setCompetitions] = useState<ContestItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    const getCompetitions = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/contest/info');
        const contestList = response.data.contest_list;
        setCompetitions(contestList);
      } catch (error) {
        console.error("Error loading contests", error);
        setError('Error loading book competitions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getCompetitions();
  }, []);

  return (
    <main id="competitions-list">
      <div id="header">
        <h2>Competitions</h2>
        {token && (
          <button
            className="primary create-comp"
            onClick={() => {
              nav('/competitions/create');
              sessionStorage.setItem('creatingComp', JSON.stringify(true));
            }}
          >
            Create Competition
          </button>
        )}
      </div>

      <ul id="book-list-page">
        {loading ? (
          <p>Loading competitions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : competitions.length > 0 ? (
          competitions.map((competition: ContestItem) => (
            <li key={competition.contest_name}>
              <Link
                to={`/competitions/${competition.contest_name}`}
                state={competition}
              >
                <div className="competition-item">
                  <div className="contest-info">
                    <h3>{competition.contest_name}</h3>
                    <p>Organized by {competition.organizer}</p>
                  </div>
                  <p>Ends: {new Date(competition.end_date).toLocaleDateString()}</p>
                  <p>Number of books: {competition.book_count}</p>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p>No book contests have been added yet.</p>
        )}
      </ul>
    </main>
  );
}

export default CompetitionsPage;

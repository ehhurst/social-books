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
  <section id="header">
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
  </section>

  <section id="competition-grid">
    {loading ? (
      <p>Loading competitions...</p>
    ) : error ? (
      <p>{error}</p>
    ) : competitions.length > 0 ? (
      <ul id="book-list-page">
        {competitions.map((competition) => (
          <li key={competition.contest_name}>
            <Link to={`/competitions/${competition.contest_name}`} state={competition}>
              <div className="competition-item">
                <h3>{competition.contest_name}</h3>
                <div className="contest-info">
                  <p>Organized by {competition.organizer}</p>
                  <p>Ends: {new Date(competition.end_date).toLocaleDateString()}</p>
                  <p>Books: {competition.book_count}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p>No competitions available.</p>
    )}
  </section>
</main>
  );
}

export default CompetitionsPage;

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { ContestItem } from "../types";
import '../assets/css/CompetitionsPage.css'

function CompetitionsPage() {
  const nav = useNavigate();
  const [competitions, setCompetitions] = useState<ContestItem[]>([]);

  useEffect(() => {
    axios.get(`/contest/info`).then((response) => {
      console.log(response.data);
      setCompetitions(response.data);
    }).catch((error) => console.error(error))
  }, []);

  return(
    <main id='competitions-list'>
      <div id="header">
        <h2>Competitions</h2>
      <button className="primary create-comp" onClick={() => {nav('/competitions/create'); 
        sessionStorage.setItem('creatingComp', JSON.stringify(true));
      }}>Create Competition</button>
      </div>
      
      <ul id="book-list-page">
        {competitions && competitions.length > 0 ? (
          competitions.map((competition:ContestItem) => 
          <li key={competition.contest_name}>
            <Link to={`/competitions/${competition.contest_name}`}>
            <div className="competition-item">
              <div className="contest-info">
              <h2>{competition.contest_name}</h2>
              <p>Organized by {competition.organizer}</p>
            </div>
            <p>Ends on: {competition.end_date.toString()}</p>
            <p>Number of books: {competition.book_count}</p>
            <button className='secondary'>Join</button>
          </div>
          </Link>
            
            
          </li>
          )
        ) : (<p>Error loading competitions. Please try again later</p>)}

      </ul>
    </main>
  );
}

export default CompetitionsPage;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompetitionsPage() {
  const nav = useNavigate();

  return(
    <main id='competitions-list'>
      <h2>Competitions</h2>
      <button className="primary" onClick={() => {nav('/competitions/create'); 
        sessionStorage.setItem('creatingComp', JSON.stringify(true));
      }}>Create Competition</button>
      <li> 

      </li>
    </main>
  )
}

export default CompetitionsPage;
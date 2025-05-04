import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCompetitions } from "../Contexts/CompetitionContext";


function CompetitionsSection() {
    const {user} = useParams();
    const navigate = useNavigate();

    const {competitions, loading, error, fetchCompetitions} = useCompetitions();

    // const participant = fetchParticipant();

    useEffect(() => {
      fetchCompetitions();
    }, [fetchCompetitions]);


    return(
        <div id='profile-competitions'>
            <div>
            {/* competitions the user is participating in go here, if no competitions, browse comp page */}
            
            </div>
            <div>
                <p>My Competitions: </p>
            {/* competitions the user has created go here */}
            <button className="primary" onClick={() => navigate('/competitions/create')}>+ Create Reading Competition</button>
            </div>
            

        </div>
    );

}
export default CompetitionsSection;
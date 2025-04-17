import { FormEvent, useContext, useEffect, useState } from "react";
import YearlyProgressChart from "./YearlyProgressChart";
import axios, { AxiosError } from "axios";


function UserProfile() {
    const [goal, setGoal] = useState(0);
    const token = localStorage.getItem("access_token");


    useEffect(() => {
        axios.get('/goals', {headers: {"Authorization": `Bearer ${token}`}}
            ).then((response) => {
                response.data == -1 ? setGoal(0) : setGoal(response.data);
                console.log("CONVERTED RESP ", goal);
        }).catch((error) => {
            console.error(error);
            console.log("ERROR RESPON " , error.response.status)
        })
    }, [])

    let year = new Date().getFullYear();

    const submitGoal = async (event:FormEvent) => {
        event.preventDefault();
        console.log("prior to form submit" , goal)

        // check token expiration and that user is logged in


        try {
            axios.put('/goals', goal, {headers: {"Authorization":`Bearer ${token}`}}
            ).then((response) => console.log(response)).catch((error) => {
                console.log(error);
                console.log(error.response.status)
            })
        } catch {(error: any) => console.log(error)}
    }
    
    


    return(
         <div>
            <div id="reader-goals">
                <div className='stats'>
                    {(goal == 0)? (
                        <form id="set-goals">
                            <label htmlFor="goal">My reading goal for {year}: </label>
                            <input type="number" id="goal" name="goal" min="0" max="100" value={goal} onChange={(e) => setGoal(parseInt(e.target.value))}/>
                            <input type="submit" onClick={submitGoal} />
                        </form>
                    )
                    : (<h3></h3>)}{/* add number of books read */}
                    <p>Books Read</p>

                </div>
                <YearlyProgressChart props={[1, goal]} /> 
            </div>
            <div id="top-five-list">

            </div>
            <div id='read-list'>
                <p>Books i've read:</p>
            </div>
              
    </div>
    );
}

export default UserProfile;
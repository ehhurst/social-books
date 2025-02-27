import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../assets/css/global.css'
import '../assets/css/Login.css'
import { useState, FormEvent } from 'react';

function Login() {
    const [formData, setFormData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        if (formData === "") {setErrorMessage("Username is required. Please enter your username.")}
        else {
            setErrorMessage("") //not needed?
            const result = await axios.post("api/login", event, { // need type for result ?
                headers: {
                        "Content-type": "application/json",
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    navigate("/reader-profile");

                })
                .catch((error) => console.log(error));
        } 
    }

    return(
        <div id='container'>
            <div id='login-form'>
                <form
                onSubmit={(event)=>handleSubmit(event)}
                method='post'>
                    <label htmlFor='username'>Username</label>
                        <input 
                            type='text'
                            name='username'
                            id='username'
                            autoComplete='on'
                            value={formData}
                            onChange={(event) => setFormData(event.target.value)}
                            />

                    <section>
                        {errorMessage !== "" ? 
                        <><p id='error-message' aria-live='assertive'>{errorMessage}</p>
                        </> : <></> } 
                    </section>
                    <button className='primary'>Sign In</button>
            </form>
            <div id='alt'>
                <p>Don't have an account? </p>
                <Link to='/register'>Sign Up</Link>
            </div>
            </div>
            

        </div>
    );
}

export default Login;
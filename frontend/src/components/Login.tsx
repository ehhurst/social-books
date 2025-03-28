import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/global.css'
import '../assets/css/Login.css'


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const [formData, setFormData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        if (username === "" || password === "") {
            setErrorMessage("Username and password are required.");
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:5000/auth/login", {
                username,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            localStorage.setItem("access_token", response.data.access_token); 
            localStorage.setItem("username", username);
            
            navigate("/reader-profile");
        } catch (error) {
            console.error(error);
            setErrorMessage("Invalid username or password. Please try again.");
        }
    }

    return(
        <main>
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
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            />
                    <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            autoComplete='on'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                    <section>
                        {errorMessage !== "" ? 
                        <><p id='error-message' aria-live='assertive'><FontAwesomeIcon icon={faTriangleExclamation}/> {errorMessage} </p>
                        </> : <></> } 
                    </section>
                    <button className='primary'>Sign In</button>
                </form>
                <div id='alt'>
                    <p>Don't have an account? </p>
                    <Link to='/register'>Sign Up</Link>
                </div>
            </div>

        </main>
    );
}

export default Login;

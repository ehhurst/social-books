import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/global.css';
import '../assets/css/Login.css';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage("Both username and password are required.");
            return;
        }

        try {
            const response = await axios.post(
              "http://127.0.0.1:5000/auth/register",
              { username, password },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
          
            const loginRes = await axios.post(
              "http://127.0.0.1:5000/auth/login",
              { username, password },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
          
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("username", username);
            navigate("/reader-profile");
          
        } catch (error: any) {
            console.error(error);
            setErrorMessage(
              error.response?.data?.error || "Registration failed. Try again."
            );
        }
    }

    return (
        <main>
            <div id='login-form'>
                <form onSubmit={handleSubmit} method='post'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        id='username'
                        autoComplete='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        autoComplete='new-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <section>
                        {errorMessage && (
                            <p id='error-message' aria-live='assertive'>
                                <FontAwesomeIcon icon={faTriangleExclamation} /> {errorMessage}
                            </p>
                        )}
                    </section>

                    <button className='primary'>Register</button>
                </form>

                <div id='alt'>
                    <p>Already have an account?</p>
                    <Link to='/login'>Sign In</Link>
                </div>
            </div>
        </main>
    );
}

export default Register;

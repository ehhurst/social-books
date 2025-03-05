import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/global.css'
import '../assets/css/Login.css'


function Login() {
    const [formData, setFormData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        if (formData === "") {setErrorMessage("Username is required. Please enter your username.")}
        else {
            setErrorMessage("") 
            await axios.get(`http://127.0.0.1:5000/users/get/${formData}`, {
                headers: {
                            "Content-type": "application/json",
                        }
                }).then((response) => {
                    console.log(response.data);
                    localStorage.setItem('username', JSON.stringify(response.data));
                    navigate("/reader-profile");

                }).catch((error) => {
                    console.log(error); 
                    setFormData("");
                    setErrorMessage("The username you entered is not connected to an account. Please try again.")
                });
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
                            value={formData}
                            onChange={(event) => setFormData(event.target.value)}
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
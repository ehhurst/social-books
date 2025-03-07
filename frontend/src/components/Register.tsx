import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/global.css'
import '../assets/css/Login.css'


function Register() {
    const [formData, setFormData] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    async function handleSubmit(event:FormEvent) {
        event.preventDefault();
        if (formData === "") {setErrorMessage("Username is required. Please enter your username.")}
        else {
            setErrorMessage("") 
            await axios.post(`http://127.0.0.1:5000/users/add/${formData}`)

                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem('username', JSON.stringify(response.data));
                    navigate("/reader-profile");
                    // console.log(JSON.parse(localStorage.getItem('username') || "")) remove later
                })
                .catch((error) => {
                    console.log(error); 
                    setFormData("");
                    setErrorMessage("The username you entered is already connected to an account. Please try to sign in instead.")
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
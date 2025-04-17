import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import AppLogo from '../assets/images/logo.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import SearchBar from "./SearchBar";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { AuthStore } from '../Contexts/AuthContext';
import { User } from '../types';

function AppHeader() {
    const nav = useNavigate();
    const par = useParams();
    const token = sessionStorage.getItem('access_token');
    const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")


    useEffect(() => {
        if (!token && !par) {
            logOut();
        }
    }, [token, ])


    
    function logOut(){
        sessionStorage.removeItem('User');
        sessionStorage.removeItem("access_token");
        nav('/login');
    }

    return (<header className="app-header">
            <Link to="/">
                <img src={AppLogo} alt="Logo"/>
            </Link>
            <div className='header-content'>
                <SearchBar />  
                <NavBar />
                {(!token) ? 
                <div>
                    <button className='primary' onClick={() => nav('/login')}>Sign In</button>
                    <button className='secondary' onClick={() => nav('/register')}>Register</button>
                </div>
                : <div id='user-info'>
                    <Link to={`${currentUser.username}/profile`}><FontAwesomeIcon id='user-icon' icon={faUserCircle} size={'xl'}/></Link>
                    <p>Welcome, {currentUser.first_name}</p>
                    <Link to={'/login'} onClick={logOut}>Logout</Link>
                </div>}
            </div>
        </header>);
}
export default AppHeader;

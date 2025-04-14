import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import AppLogo from '../assets/images/logo.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import SearchBar from "./SearchBar";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';

function AppHeader() {
    const nav = useNavigate();
    const par = useParams();
    console.log("params" , par);
    const username = localStorage.getItem("username");
    console.log("username" ,username);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!token && !par) {
            logOut();
        }
    }, [token, ])

    
    function logOut(){
        localStorage.removeItem("username");
        localStorage.removeItem("access_token");
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
                    <Link to={'/reader-profile'}><FontAwesomeIcon id='user-icon' icon={faUserCircle} size={'xl'}/></Link>
                    <p>Welcome, {username}</p>
                    <Link to={'/login'} onClick={logOut}>Logout</Link>
                </div>}
            </div>
        </header>);
}
export default AppHeader;

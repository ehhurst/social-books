import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import AppLogo from '../assets/images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import SearchBar from "./SearchBar";
import { useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';
import UserLoginStatus from './UserLoginStatus';

function AppHeader() {
    const nav = useNavigate();
    const token = sessionStorage.getItem('access_token');


    useEffect(() => {
        if (!token) {
            sessionStorage.removeItem("creatingComp");
            logOut();
        }
    }, [])
    
    function logOut(){
        sessionStorage.removeItem('User');
        sessionStorage.removeItem("access_token");
        localStorage.removeItem("createComp");
        nav('/login');
    }

    return (<header className="app-header">
            <Link to="/">
                <img src={AppLogo} alt="Logo"/>
            </Link>
            <div className='header-content'>
                <SearchBar />  
                <HamburgerMenu/>
                <NavBar />
                <UserLoginStatus/>
            </div>
        </header>);
}
export default AppHeader;

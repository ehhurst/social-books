import '../assets/css/global.css';
import '../assets/css/AppHeader.css';
import AppLogo from '../assets/images/logo.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import SearchBar from "./SearchBar";
import { useEffect } from 'react';
import HamburgerMenu from './HamburgerMenu';
import UserLoginStatus from './UserLoginStatus';
import { logout } from './utils/UserActions';

function AppHeader() {
    const par = useParams();
    const token = sessionStorage.getItem('access_token');


    useEffect(() => {
        if (!token && !par) {
            logout();
        }
    }, [token])

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

import '../assets/css/global.css'
import '../assets/css/AppHeader.css'
import AppLogo from '../assets/images/logo.svg'
import {Link, useNavigate} from 'react-router-dom'
import NavBar from './NavBar';


function AppHeader() {
    const nav = useNavigate();

    return(
        <header>
            <Link to="/">
                <img src={AppLogo}
                alt="Logo"/>
            </Link>
            <div>
                <p id="search">Search Bar Goes Here</p>
                <NavBar/>
                <button className='primary' onClick={() => nav("login")}>Sign In</button>
                <button className='secondary' onClick={() => nav("register")}>Register</button>
            </div>
        </header>
    );
}

export default AppHeader;
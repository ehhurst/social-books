import '../assets/css/global.css'
import '../assets/css/AppHeader.css'
import AppLogo from '../assets/images/logo.svg'
import {Link} from 'react-router-dom'
import NavBar from './NavBar';


function AppHeader() {
    return(
        <header>
            <div id='header-container-left'>
                <Link to="/">
                    <img src={AppLogo}
                    alt="Logo"/>
                </Link>
            </div>
            <div id='header-container-right'>
                <NavBar/>
                <button id='primary'>Sign In</button>
                <button id='secondary'>Register</button>
            </div>
        </header>
    );
}

export default AppHeader;
import '../assets/css/global.css'
import '../assets/css/AppHeader.css'
import AppLogo from '../assets/images/logo.svg'
import {Link} from 'react-router-dom'
import NavBar from './NavBar';


function AppHeader() {
    return(
        <header>
            <Link to="/">
                <img src={AppLogo}
                alt="Logo"/>
            </Link>
            <div>
                <p>Search Bar Goes Here</p>
                <NavBar/>
                <button className='primary'>Sign In</button>
                <button className='secondary'>Register</button>
            </div>
        </header>
    );
}

export default AppHeader;
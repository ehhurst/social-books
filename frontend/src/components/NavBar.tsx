import {Link} from 'react-router-dom'
import '../assets/css/NavBar.css'

function NavBar() {
    return(       
        <nav id='primary-nav'>
            <ul>
                <li><Link to='/'>Home</Link>         <p> | </p></li>
                <li><Link to='/categories/fiction'>Browse Books</Link>        <p> | </p> </li>
                <li><Link to='/competitions'>Competitions</Link>  </li>
            </ul>
        </nav>     
 
    );
}

export default NavBar;
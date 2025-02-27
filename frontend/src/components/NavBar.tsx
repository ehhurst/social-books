import {Link} from 'react-router-dom'

function NavBar() {
    return(            
    <ul>
        <li><Link to='/'>Home</Link>        <p> | </p></li>
        <li><Link to='#'>Books</Link>       <p> | </p> </li>
        <li><Link to='#'>Book Clubs</Link>  <p> | </p></li>
        <li><Link to='#'>Competitions</Link><p> | </p></li>
        <li><Link to='#'>Contact</Link>               </li>
    </ul>
    );
}

export default NavBar;
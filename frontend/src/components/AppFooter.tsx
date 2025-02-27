import {Link} from 'react-router-dom'
import '../assets/css/AppFooter.css'
import '../assets/css/global.css'

function AppFooter() {
    return(
        <footer>
            <ul>
                <li><Link to='/'>Home           </Link><p> | </p></li>
                <li><Link to='#'>Books         </Link><p> | </p> </li>
                <li><Link to='#'>Book Clubs     </Link><p> | </p></li>
                <li><Link to='#'>Competitions   </Link><p> | </p></li>
                <li><Link to='#'>Contact        </Link>          </li>
            </ul>
        </footer>
    );
}

export default AppFooter;
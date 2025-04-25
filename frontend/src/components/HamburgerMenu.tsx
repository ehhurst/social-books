import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/HamburgerMenu.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserLoginStatus from './UserLoginStatus';


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="hamburger-menu">
      <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} color='var(--light-primary-color)'/>
      </div>
      <div className={`menu-content ${isOpen ? 'show' : ''}`}>
        <UserLoginStatus/>
        <Link to='/'>Home</Link>  
        <Link to='/categories/fiction'>Browse Books</Link>       
        <Link to='/competitions'>Competitions</Link> 
      </div>
    </div>
  );
};

export default HamburgerMenu;
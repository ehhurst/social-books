import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/HamburgerMenu.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserLoginStatus from './UserLoginStatus';
import { User } from '../types';


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentUser:User = JSON.parse(sessionStorage.getItem('User') || "{}")

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutsideModal = (event:MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
    };
  }, []);

  return (
    <div id="hamburger-menu" ref={menuRef}>
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
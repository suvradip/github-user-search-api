import React from 'react';
import './Navbar.scss';
import logo from '../../images/logo.svg';

const Navbar = () => {
   return (
      <nav className='navbar navbar-light bg-light'>
         <a href='/'>
            <img src={logo} width='auto' height='60px' alt='demo logo' />
         </a>
         <div className='info'>
            <h5>GitHub user searching</h5>
            <span>via the GitHub API</span>
         </div>
      </nav>
   );
};

export default Navbar;

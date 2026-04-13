import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

interface UserData {
  username: string
  email: string
}

interface NavigationProps {
  user: UserData | null
  onLogout: () => void
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <NavLink to='/' className='navbar-logo' onClick={closeMenu}>
          Restaurant Management
        </NavLink>

        <button
          type='button'
          className='mobile-menu-button'
          aria-label='Toggle navigation menu'
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-open' : ''}`}>
          <li className='nav-item'>
            <NavLink to='/' className='nav-link' onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/menu' className='nav-link' onClick={closeMenu}>
              Menu
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/orders' className='nav-link' onClick={closeMenu}>
              Orders
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/about' className='nav-link' onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/contact' className='nav-link' onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
          <li className='nav-item user-info'>
            <div className='user-section'>
              <span className='username'>User: {user?.username}</span>
              <button onClick={onLogout} className='logout-btn'>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

import React from 'react'
import { Link } from 'react-router-dom'
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
  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          🍽️ Restaurant Management
        </Link>
        <ul className='nav-menu'>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/menu' className='nav-link'>
              Menu
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/orders' className='nav-link'>
              Orders
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-link'>
              About
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/contact' className='nav-link'>
              Contact
            </Link>
          </li>
          <li className='nav-item user-info'>
            <div className='user-section'>
              <span className='username'>👤 {user?.username}</span>
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

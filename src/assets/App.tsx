import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './component/Navigation'
import Login from './pages/Login'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Orders from './pages/Orders'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

interface UserData {
  username: string
  email: string
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData: UserData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  // Show main app if authenticated
  return (
    <Router>
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}

export default App

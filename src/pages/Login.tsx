import React, { useState } from 'react'
import './Login.css'

interface LoginProps {
  onLogin: (userData: { username: string; email: string }) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Dummy credentials for demonstration
  const DUMMY_USERS = [
    { username: 'admin', password: 'admin123', email: 'admin@restaurant.com' },
    { username: 'user', password: 'user123', email: 'user@restaurant.com' },
    { username: 'manager', password: 'manager123', email: 'manager@restaurant.com' },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const user = DUMMY_USERS.find(
        (u) => u.username === username && u.password === password
      )

      if (user) {
        // Successful login
        onLogin({ username: user.username, email: user.email })
        setUsername('')
        setPassword('')
      } else {
        setError('Invalid username or password. Please try again.')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <div className='login-header'>
          <h1>🍽️ Restaurant Management System</h1>
          <p>Welcome Back</p>
        </div>

        <form onSubmit={handleLogin} className='login-form'>
          <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter your username'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              required
            />
          </div>

          {error && <div className='error-message'>{error}</div>}

          <button type='submit' disabled={isLoading} className='login-btn'>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='demo-credentials'>
          <h3>Demo Credentials:</h3>
          <ul>
            <li><strong>Admin:</strong> username: admin | password: admin123</li>
            <li><strong>User:</strong> username: user | password: user123</li>
            <li><strong>Manager:</strong> username: manager | password: manager123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login

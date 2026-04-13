import React, { useEffect, useState } from 'react'
import Card from '../component/Card'
import Loading from '../component/Loading'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

interface MenuItem {
  id: number
  name: string
  category: string
  description: string
  price: string
  available: boolean
}

const formatCurrency = (value: string) => {
  const amount = Number.parseFloat(value)
  if (Number.isNaN(amount)) return `Rs ${value}`

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE}/menu`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unable to load menu items')
        }
        return res.json()
      })
      .then((data) => {
        setMenuItems(data)
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  return (
    <div className='page-container'>
      <h1>Menu</h1>
      {loading && <Loading />}
      {error && <div className='error-block'>{error}</div>}
      {!loading && !error && (
        <div className='menu-items'>
          {menuItems.length === 0 && <div className='empty-state'>No menu items available.</div>}
          {menuItems.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              subtitle={item.category}
              badge={item.available ? 'Available' : 'Unavailable'}
              badgeClassName={item.available ? 'badge-available' : 'badge-unavailable'}
              footer={formatCurrency(item.price)}
            >
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu

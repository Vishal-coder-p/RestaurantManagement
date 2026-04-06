import React, { useEffect, useState } from 'react'
import Loading from '../component/Loading'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

interface Order {
  id: number
  customer: string
  items: string
  status: string
  total: string
  date: string
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE}/orders`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unable to load order list')
        }
        return res.json()
      })
      .then((data) => {
        setOrders(data)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className='page-container'>
      <h1>Orders</h1>
      {loading && <Loading />}
      {error && <div className='error-block'>{error}</div>}
      {!loading && !error && (
        <>
          {orders.length === 0 ? (
            <div className='empty-state'>No orders available yet.</div>
          ) : (
            <table className='orders-table'>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.items}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>₹{order.total}</td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}

export default Orders

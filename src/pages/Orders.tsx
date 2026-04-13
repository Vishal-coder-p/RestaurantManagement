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

const formatCurrency = (value: string) => {
  const amount = Number.parseFloat(value)
  if (Number.isNaN(amount)) return `Rs ${value}`

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}

const formatDate = (dateText: string) => {
  const date = new Date(dateText)
  if (Number.isNaN(date.getTime())) return dateText

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(date)
}

const statusClassName = (status: string) => `status-badge status-${status.toLowerCase().replace(/\s+/g, '-')}`

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE}/orders`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unable to load order list')
        }
        return res.json()
      })
      .then((data) => {
        setOrders(data)
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
      <h1>Orders</h1>
      {loading && <Loading />}
      {error && <div className='error-block'>{error}</div>}
      {!loading && !error && (
        <>
          {orders.length === 0 ? (
            <div className='empty-state'>No orders available yet.</div>
          ) : (
            <div className='orders-table-wrapper'>
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
                        <span className={statusClassName(order.status)}>{order.status}</span>
                      </td>
                      <td>{formatCurrency(order.total)}</td>
                      <td>{formatDate(order.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Orders

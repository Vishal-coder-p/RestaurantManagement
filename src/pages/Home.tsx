import React, { useEffect, useState } from 'react'
import Card from '../component/Card'
import Loading from '../component/Loading'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

interface RestaurantData {
  name: string
  hero: string
  description: string
  stats: { id: number; label: string; value: number }[]
}

const Home: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const url = `${API_BASE}/restaurant`
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load restaurant data')
        }
        return res.json()
      })
      .then((data) => {
        setRestaurant(data)
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
      {loading && <Loading />}
      {error && <div className='error-block'>{error}</div>}
      {!loading && !error && restaurant && (
        <>
          <h1>{restaurant.name}</h1>
          <p>{restaurant.description}</p>
          <div className='intro-content'>
            <p>{restaurant.hero}</p>
          </div>

          <div className='summary-grid'>
            {restaurant.stats.map((stat) => (
              <Card key={stat.id} title={stat.label} footer={`${stat.value}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home

import React from 'react'
import paneerTikkaImage from '../assets/paneer-tikka.jpg'
import butterChickenImage from '../assets/butter-chicken.jpg'
import chocoLavaImage from '../assets/choco-lava.jpg'

const Dashboard: React.FC = () => {
  const overviewCards = [
    { label: "Today's Sales", value: 'Rs 52,300', colorClass: 'home-stat-green' },
    { label: 'Pending Orders', value: '08', colorClass: 'home-stat-orange' },
    { label: 'Tables Occupied', value: '12 / 20', colorClass: 'home-stat-blue' },
    { label: 'Low Stock Alerts', value: '05', colorClass: 'home-stat-red' },
  ]

  const inventoryItems = [
    { name: 'Chicken Breast', status: 'Low Stock', statusClass: 'home-status-red' },
    { name: 'Tomato Sauce', status: 'Low Stock', statusClass: 'home-status-red' },
    { name: 'Basil Leaves', status: 'Expiring Soon', statusClass: 'home-status-amber' },
  ]

  const topDishes = [
    { name: 'Paneer Tikka', status: 'Low Stock', statusClass: 'home-status-green', image: paneerTikkaImage },
    { name: 'Butter Chicken', status: 'Expiring Soon', statusClass: 'home-status-amber', image: butterChickenImage },
    { name: 'Chocolate Lava Cake', status: 'Completed', statusClass: 'home-status-blue', image: chocoLavaImage },
  ]

  const recentOrders = [
    { id: '#1023', customer: 'Anil Sharma', amount: 'Rs 540', status: 'Preparing', statusClass: 'home-status-green' },
    { id: '#1022', customer: 'Priya Verma', amount: 'Rs 820', status: 'Out for Delivery', statusClass: 'home-status-green' },
    { id: '#1021', customer: 'Rahul Sen', amount: 'Rs 680', status: 'Completed', statusClass: 'home-status-blue' },
  ]

  const customerReviews = [
    { text: 'Great food and service!', reviewer: 'Neha' },
    { text: 'Good ambience.', reviewer: 'Rajesh' },
  ]

  const salesBars = [11, 16, 24, 13, 19, 15, 29, 17, 10, 22, 18, 23]
  const salesLine = [12, 18, 27, 29, 24, 20, 22, 30, 35, 33, 34, 37]

  return (
    <div className='home-dashboard'>
      <section className='home-main-grid'>
        <div className='home-left-column'>
          <div className='home-stat-grid'>
            {overviewCards.map((card) => (
              <article key={card.label} className={`home-stat-card ${card.colorClass}`}>
                <p>{card.label}</p>
                <h2>{card.value}</h2>
              </article>
            ))}
          </div>

          <article className='home-panel home-sales-panel'>
            <div className='home-panel-header'>
              <h3>Sales Overview</h3>
              <div className='home-period-tabs'>
                <span className='active'>Daily</span>
                <span>Weekly</span>
                <span>Monthly</span>
              </div>
            </div>
            <p className='home-sales-total'>Rs 1,25,400 <span>This Week</span></p>
            <div className='home-chart-frame'>
              <div className='home-chart-y-axis'>
                <span>35</span>
                <span>20</span>
                <span>10</span>
              </div>
              <div className='home-chart'>
                {salesBars.map((height, idx) => (
                  <div key={idx} className={`home-chart-bar ${idx % 2 === 0 ? 'blue' : 'orange'}`} style={{ height: `${height * 3}px` }} />
                ))}
                <svg className='home-chart-line' viewBox='0 0 100 40' preserveAspectRatio='none' aria-hidden='true'>
                  <polyline
                    points={salesLine
                      .map((point, index) => `${(index / (salesLine.length - 1)) * 100},${40 - point}`)
                      .join(' ')}
                  />
                  {salesLine.map((point, index) => (
                    <circle
                      key={`point-${index}`}
                      cx={(index / (salesLine.length - 1)) * 100}
                      cy={40 - point}
                      r='0.9'
                    />
                  ))}
                </svg>
              </div>
            </div>
          </article>

          <div className='home-row-grid'>
            <article className='home-panel'>
              <div className='home-panel-header'>
                <h3>Inventory Alerts</h3>
                <span className='home-menu-dot'>...</span>
              </div>
              <div className='home-list'>
                {inventoryItems.map((item) => (
                  <div key={item.name} className='home-list-row'>
                    <span>{item.name}</span>
                    <span className={`home-chip ${item.statusClass}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className='home-panel'>
              <div className='home-panel-header'>
                <h3>Top Dishes</h3>
                <span className='home-menu-dot'>...</span>
              </div>
              <div className='home-list'>
                {topDishes.map((dish) => (
                  <div key={dish.name} className='home-list-row home-dish-row'>
                    <div className='home-dish-info'>
                      <img src={dish.image} alt={dish.name} className='home-dish-image' />
                      <span>{dish.name}</span>
                    </div>
                    <span className={`home-chip ${dish.statusClass}`}>{dish.status}</span>
                    <span className='home-dish-arrow'>&gt;</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <div className='home-right-column'>
          <article className='home-panel'>
            <h3>Order Summary</h3>
            <div className='home-summary-grid'>
              <div className='home-summary-card active'>
                <p>Dine-In</p>
                <strong>5</strong>
              </div>
              <div className='home-summary-card'>
                <p>Takeaway</p>
                <strong>3</strong>
              </div>
              <div className='home-summary-card'>
                <p>Delivery</p>
                <strong>2</strong>
              </div>
            </div>
          </article>

          <article className='home-panel'>
            <div className='home-panel-header'>
              <h3>Recent Online Orders</h3>
              <span className='home-menu-dot'>...</span>
            </div>
            <div className='home-list'>
              {recentOrders.map((order) => (
                <div key={order.id} className='home-list-row home-order-row'>
                  <span className='home-order-id'>{order.id}</span>
                  <span>{order.customer}</span>
                  <span>{order.amount}</span>
                  <span className={`home-chip ${order.statusClass}`}>{order.status}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className='home-bottom-grid'>
        <article className='home-panel'>
          <div className='home-panel-header'>
            <h3>Staff Attendance</h3>
            <span className='home-menu-dot'>...</span>
          </div>
          <div className='home-attendance-grid'>
            <div className='home-attendance-card present'>
              <strong>15</strong>
              <p>Present</p>
            </div>
            <div className='home-attendance-card absent'>
              <strong>2</strong>
              <p>Absent</p>
            </div>
          </div>
        </article>

        <article className='home-panel'>
          <div className='home-panel-header'>
            <h3>Customer Reviews</h3>
            <span className='home-menu-dot'>...</span>
          </div>
          {customerReviews.map((review) => (
            <div key={review.reviewer} className='home-review-row'>
              <span className='home-review-stars'>{'★'.repeat(5)}</span>
              <p>
                {review.text} - {review.reviewer}
              </p>
            </div>
          ))}
        </article>
      </section>
    </div>
  )
}

export default Dashboard

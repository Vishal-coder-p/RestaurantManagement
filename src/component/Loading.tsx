import React from 'react'
import './Loading.css'

const Loading: React.FC = () => {
  return (
    <div className='loading-state'>
      <div className='spinner' />
      <span>Loading restaurant data...</span>
    </div>
  )
}

export default Loading

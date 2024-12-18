import React from 'react'
import { Link } from 'react-router-dom'
import './Ucard.scss'

const Ucard = ({ item: { id, cover, name, time } }) => {
  return (
    <div className='MovieBox'>
      <div className='img'>
        <img src={cover} alt={name} />
      </div>
      <div className='text'>
        <h3>{name}</h3>
        <span>{time}</span>
        <Link to={`/singlepage/${id}`} className='btn-play'>
          <i className='fa fa-play'></i> Play Now
        </Link>
      </div>
    </div>
  )
}

export default Ucard



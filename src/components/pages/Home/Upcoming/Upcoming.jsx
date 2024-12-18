import React, { useState } from 'react'
import { upcome } from '../../../../dummyData'
import Ucard from './Ucard'
import './Upcoming.scss'

const Upcoming = () => {
  const [items] = useState(upcome)

  return (
    <section className='upcome'>
      <div className='container'>
        <div className='heading flexSB'>
          <h1>Upcoming Movies</h1>
          <button className='btn-more'>View All</button>
        </div>
        <div className='content grid'>
          {items.map((item) => (
            <Ucard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Upcoming





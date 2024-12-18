import React, { useState } from 'react'
import "./trending.scss"
import { trending } from '../../../../dummyData'
import Home from '../Home'

export const Trending = () => {
  const [items] = useState(trending)
  return (
    <>
      <section className='trending'>
        <Home items={items} />
      </section>
    </>
  )
}

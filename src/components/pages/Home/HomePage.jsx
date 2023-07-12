import React, { useState } from 'react'
import Homes from './Homes'
import { Upcoming } from './Upcoming/Upcoming'
import { latest, recommended, upcome } from '../../../dummyData'
import { Trending } from './Latest/Trending'

export const HomePage = () => {
  const [items, setitems] = useState(upcome);
  const [item, setitem] = useState(latest);
  const [rec, setrec] = useState(recommended);
  
  return (
    <>
      
      <Homes />
      <Upcoming items ={items} title='Upcomming Movies '/>
       <Upcoming items ={item} title='Latest Movies  '/>  
      <Trending /> 
      <Upcoming items = {rec} title='Recomended Movies '/>

    </>
  )
}



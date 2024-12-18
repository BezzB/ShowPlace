import React, { useState } from 'react'
import Homes from './Homes'
import { Upcoming } from './Upcoming/Upcoming'
import { latest, recommended, upcome } from '../../../dummyData'
import { Trending } from './Latest/Trending'

export const HomePage = () => {
  const [upcomingMovies] = useState(upcome);
  const [latestMovies] = useState(latest);
  const [recommendedMovies] = useState(recommended);
  
  return (
    <>
      <Homes />
      <Upcoming items={upcomingMovies} title="Upcoming Movies" />
      <Upcoming items={latestMovies} title="Latest Movies" />
      <Trending /> 
      <Upcoming items={recommendedMovies} title="Recommended Movies" />
    </>
  )
}

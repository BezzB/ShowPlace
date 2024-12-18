import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { homeData, recommended } from '../../dummyData'
import { Upcoming } from '../pages/Home/Upcoming/Upcoming'
import "./style.scss"

export const SinglePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedMovies] = useState(recommended)

  useEffect(() => {
    setIsLoading(true)
    try {
      const movieItem = homeData.find((item) => item.id === parseInt(id))
      if (movieItem) {
        setItem(movieItem)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Error loading movie:', error)
      navigate('/')
    } finally {
      setIsLoading(false)
    }
  }, [id, navigate])

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  if (!item) {
    return null
  }

  return (
    <section className='singlePage'>
      <div className='singleHeading'>
        <h1>{item.name}</h1>
        <span> | {item.time} | </span>
        <span>HD</span>
      </div>
      <div className='container'>
        <video src={item.video} controls></video>
        <div className='para'>
          <h3>Date: {item.date}</h3>
          <p>{item.desc}</p>
          <p>Get access to the direct Project Overview with this report. Just by a quick glance, you’ll have an idea of the total tasks allotted to the team, number of milestones given & completed, total Links created for the project and the total time taken by all the users. Each section would elaborate the data further, if chosen.</p>
          <p>Get access to the direct Project Overview with this report. Just by a quick glance, you’ll have an idea of the total tasks allotted to the team, number of milestones given & completed, total Links created for the project and the total time taken by all the users. Each section would elaborate the data further, if chosen.</p>
          <p>Get access to the direct Project Overview with this report. Just by a quick glance, you’ll have an idea of the total tasks allotted to the team, number of milestones given & completed, total Links created for the project and the total time taken by all the users. Each section would elaborate the data further, if chosen.</p>
        </div>
        <div className='soical'>
          <h3>Share : </h3>
          <img src='https://img.icons8.com/color/48/000000/facebook-new.png' alt='' />
          <img src='https://img.icons8.com/fluency/48/000000/twitter-circled.png' alt='' />
          <img src='https://img.icons8.com/fluency/48/000000/linkedin-circled.png' alt='' />
        </div>
        <div className='recommended'>
          <h3>Recommended Movies</h3>
          <Upcoming items={recommendedMovies} title="" />
        </div>
      </div>
    </section>
  )
}
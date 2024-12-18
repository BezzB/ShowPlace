import React from 'react'
import { useParams } from 'react-router-dom'
import { homeData } from '../../dummyData'
import '../../styles/components/SinglePage.scss'

export const SinglePage = () => {
  const { id } = useParams()
  const [item] = homeData.filter((item) => item.id === parseInt(id))

  return (
    <div className='single-page'>
      <div className='page-header'>
        <div className='header-content'>
          <h1>{item.name}</h1>
          <div className='meta-info'>
            <span><i className='fa fa-clock'></i> {item.time}</span>
            <span><i className='fa fa-star'></i> {item.rating}/5</span>
            <span><i className='fa fa-film'></i> {item.genres}</span>
          </div>
        </div>
      </div>

      <div className='main-content'>
        <div className='video-container'>
          <video src={item.video} controls></video>
        </div>

        <div className='movie-info'>
          <h3>About {item.name}</h3>
          <p>{item.desc}</p>

          <div className='info-grid'>
            <div className='info-item'>
              <h4>Starring</h4>
              <p>{item.starring}</p>
            </div>
            <div className='info-item'>
              <h4>Tags</h4>
              <p>{item.tags.join(', ')}</p>
            </div>
          </div>
        </div>

        <div className='social-share'>
          <h3>Share this movie</h3>
          <div className='social-buttons'>
            <button title="Share on Facebook">
              <i className='fab fa-facebook' style={{ color: '#3b5998' }}></i>
            </button>
            <button title="Share on Twitter">
              <i className='fab fa-twitter' style={{ color: '#1da1f2' }}></i>
            </button>
            <button title="Share on WhatsApp">
              <i className='fab fa-whatsapp' style={{ color: '#25d366' }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
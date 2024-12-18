import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { homeData } from '../../../dummyData'
import Home from './Home'
import './HomePage.scss'

export const HomePage = () => {
  const [items] = useState(homeData)
  const [featuredMovie, setFeaturedMovie] = useState(null)

  useEffect(() => {
    // Get a random movie for the featured section
    const randomIndex = Math.floor(Math.random() * items.length)
    setFeaturedMovie(items[randomIndex])
  }, [items])

  if (!featuredMovie) return null

  return (
    <div className="home-page">
      <section className="hero-section" style={{ 
        backgroundImage: `url(${featuredMovie.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="overlay">
          <div className="hero-content">
            <h1>{featuredMovie.name}</h1>
            <div className="meta">
              <span className="rating">
                <i className="fa fa-star"></i> {featuredMovie.rating}/5
              </span>
              <span className="time">
                <i className="fa fa-clock"></i> {featuredMovie.time}
              </span>
              <span className="genre">
                <i className="fa fa-film"></i> {featuredMovie.genres}
              </span>
            </div>
            <p className="description">{featuredMovie.desc}</p>
            <div className="actions">
              <Link to={`/singlepage/${featuredMovie.id}`} className="btn btn-primary">
                <i className="fa fa-play me-2"></i> Watch Now
              </Link>
              <button className="btn btn-secondary">
                <i className="fa fa-info-circle me-2"></i> More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="trending-section">
        <div className="container">
          <h2 className="section-title">Trending Now</h2>
          <Home items={items.slice(0, 10)} />
        </div>
      </section>

      <section className="popular-section">
        <div className="container">
          <h2 className="section-title">Popular on ShowPlace</h2>
          <Home items={items.slice(5, 15)} />
        </div>
      </section>

      <section className="genres-section">
        <div className="container">
          <h2 className="section-title">Browse by Genre</h2>
          <div className="genres-grid">
            {['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Romance'].map((genre) => (
              <div key={genre} className="genre-card">
                <h3>{genre}</h3>
                <span>Explore {genre} Movies</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

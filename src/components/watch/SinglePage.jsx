import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { tmdbService } from '../../services/tmdb.service'
import { getImageUrl } from '../../config/tmdb.config'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/components/SinglePage.scss'

export const SinglePage = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [streamUrl, setStreamUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const movieData = await tmdbService.getMovieDetails(id)
        setMovie(movieData)
        setStreamUrl(`https://vidsrc.xyz/embed/movie/${id}`)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (!movie) return <div className="error-message">Movie not found</div>

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  }

  return (
    <div className='single-page'>
      <div className='backdrop' style={{
        backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`
      }}>
        <div className='backdrop-overlay'></div>
      </div>

      <div className='content-wrapper'>
        <div className='header-section'>
          <div className='poster'>
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          </div>
          
          <div className='movie-details'>
            <h1>{movie.title}</h1>
            <div className='meta-info'>
              <span className="release-date">
                <i className='fas fa-calendar'></i>
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="runtime">
                <i className='fas fa-clock'></i>
                {formatRuntime(movie.runtime)}
              </span>
              <span className="rating">
                <i className='fas fa-star'></i>
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>

            <div className='genres'>
              {movie.genres.map(genre => (
                <Link key={genre.id} to={`/genre/${genre.id}`} className="genre-tag">
                  {genre.name}
                </Link>
              ))}
            </div>

            <p className='tagline'>{movie.tagline}</p>
            <p className='overview'>{movie.overview}</p>

            <div className='action-buttons'>
              <button className='btn-play'>
                <i className='fas fa-play'></i> Play Now
              </button>
              <button className='btn-trailer'>
                <i className='fas fa-film'></i> Watch Trailer
              </button>
              <button className='btn-watchlist'>
                <i className='fas fa-plus'></i> Add to Watchlist
              </button>
            </div>
          </div>
        </div>

        <div className='tabs-section'>
          <div className='tabs'>
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab ${activeTab === 'cast' ? 'active' : ''}`}
              onClick={() => setActiveTab('cast')}
            >
              Cast & Crew
            </button>
            <button 
              className={`tab ${activeTab === 'media' ? 'active' : ''}`}
              onClick={() => setActiveTab('media')}
            >
              Media
            </button>
            <button 
              className={`tab ${activeTab === 'similar' ? 'active' : ''}`}
              onClick={() => setActiveTab('similar')}
            >
              Similar Movies
            </button>
          </div>

          <div className='tab-content'>
            {activeTab === 'overview' && (
              <div className='video-section'>
                <div className='video-container'>
                  <iframe
                    src={streamUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    title={movie.title}
                  ></iframe>
                </div>

                <div className='movie-info'>
                  <div className='info-grid'>
                    <div className='info-item'>
                      <h4>Status</h4>
                      <p>{movie.status}</p>
                    </div>
                    <div className='info-item'>
                      <h4>Budget</h4>
                      <p>${movie.budget?.toLocaleString()}</p>
                    </div>
                    <div className='info-item'>
                      <h4>Revenue</h4>
                      <p>${movie.revenue?.toLocaleString()}</p>
                    </div>
                    <div className='info-item'>
                      <h4>Original Language</h4>
                      <p>{movie.original_language?.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className='production-companies'>
                    <h4>Production Companies</h4>
                    <div className='companies-grid'>
                      {movie.production_companies?.map(company => (
                        <div key={company.id} className='company'>
                          {company.logo_path ? (
                            <img 
                              src={getImageUrl(company.logo_path)} 
                              alt={company.name} 
                            />
                          ) : (
                            <span>{company.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cast' && (
              <div className='cast-grid'>
                {movie.credits?.cast?.slice(0, 12).map(person => (
                  <div key={person.id} className='cast-card'>
                    <img 
                      src={getImageUrl(person.profile_path)} 
                      alt={person.name}
                    />
                    <h4>{person.name}</h4>
                    <p>{person.character}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Media and Similar Movies tabs content */}
          </div>
        </div>

        <div className='social-share'>
          <h3>Share this movie</h3>
          <div className='social-buttons'>
            <button title="Share on Facebook">
              <i className='fab fa-facebook'></i>
            </button>
            <button title="Share on Twitter">
              <i className='fab fa-twitter'></i>
            </button>
            <button title="Share on WhatsApp">
              <i className='fab fa-whatsapp'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { tmdbService } from '../../services/tmdb.service'
import { getImageUrl } from '../../config/tmdb.config'
import LoadingSpinner from '../common/LoadingSpinner'
import '../../styles/components/SinglePage.scss'

export const SinglePage = () => {
  const { mediaType, id } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        let data
        if (mediaType === 'movie') {
          data = await tmdbService.getMovieDetails(id)
        } else {
          data = await tmdbService.getTVShowDetails(id)
        }
        setContent(data)
      } catch (err) {
        setError('Error loading content')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [mediaType, id])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="error-message">{error}</div>
  if (!content) return <div className="error-message">Content not found</div>

  const title = mediaType === 'movie' ? content.title : content.name
  const releaseDate = mediaType === 'movie' ? content.release_date : content.first_air_date
  const runtime = mediaType === 'movie' 
    ? `${content.runtime} min`
    : `${content.number_of_seasons} Season${content.number_of_seasons !== 1 ? 's' : ''}`

  return (
    <div className='single-page'>
      <div className='backdrop'>
        {content.backdrop_path && (
          <img 
            src={getImageUrl(content.backdrop_path, 'original')} 
            alt={title} 
          />
        )}
        <div className='overlay'></div>
      </div>

      <div className='content'>
        <div className='poster'>
          {content.poster_path && (
            <img 
              src={getImageUrl(content.poster_path)} 
              alt={title} 
            />
          )}
        </div>

        <div className='details'>
          <h1>{title}</h1>
          
          <div className='meta'>
            {releaseDate && (
              <span className='year'>{new Date(releaseDate).getFullYear()}</span>
            )}
            <span className='runtime'>{runtime}</span>
            {content.vote_average !== undefined && (
              <span className='rating'>
                <i className='fas fa-star'></i>
                {content.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          {content.genres && (
            <div className='genres'>
              {content.genres.map(genre => (
                <span key={genre.id} className='genre'>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {content.overview && (
            <div className='overview'>
              <h3>Overview</h3>
              <p>{content.overview}</p>
            </div>
          )}

          {content.credits?.cast && (
            <div className='cast'>
              <h3>Cast</h3>
              <div className='cast-list'>
                {content.credits.cast.slice(0, 5).map(actor => (
                  <div key={actor.id} className='cast-member'>
                    {actor.profile_path ? (
                      <img 
                        src={getImageUrl(actor.profile_path)} 
                        alt={actor.name} 
                      />
                    ) : (
                      <div className='no-image'>
                        <i className='fas fa-user'></i>
                      </div>
                    )}
                    <span>{actor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
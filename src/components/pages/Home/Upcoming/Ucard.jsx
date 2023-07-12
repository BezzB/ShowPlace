import React from 'react'

export const Ucard = ({item:{id, cover, name, time}}) => {
  return (
    <>
     <div className="MovieBox">
      <div className="img">
        <img src={cover} alt="" />
      </div>
      <div className="text">
        <h3>{name}</h3>
        <span>{time} </span >
        <button className='btn btn-danger'>
          <i className='fa fa-play'> Play</i>
        </button>
      </div>
     </div>
    </>
  )
}



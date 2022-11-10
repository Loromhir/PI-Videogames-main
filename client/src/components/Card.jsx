import React from 'react'
import '../styles/Cards.css'

const Card = ({name, image,genre,rating}) => {
  
  const start= '*';
  const index = Math.floor(rating)
  
    return (
    <div className='card'>
        <img src={image} alt={name} className='image-card' />
        <div className='card-text'>
            <div className='card-name'>{name}</div>
            <ul className='genre-card'>{genre.join(',')}</ul>
            <div className='stars'>
                {
                    [...Array(Math.floor(rating))].map((i)=> {<div key= {i}>⭐</div>})
                }
            </div>
        </div>
    </div>
  )
}

export default Card
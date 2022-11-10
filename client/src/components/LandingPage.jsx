import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

const LandingPage = () => {
  return (
    <div className='container'>
      <div>
        <Link to = '/home'>
          <button className='btn'>START!</button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
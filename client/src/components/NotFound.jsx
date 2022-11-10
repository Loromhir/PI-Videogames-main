import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/notFound.css'
const NotFound = () => {
  return (
    <div className="containerNF">
        <h1>NOT FOUND</h1>
    <Link to = "/home"><button className="homeNF ">HOME</button></Link>
    </div>
)
}

export default NotFound
import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {getVideogames, getGenre, savePage, getPlatforms} from '../redux/actions/index.js'
import Card from '../components/Card.jsx'
import NavBar from '../components/NavBar'
import Paginated from '../components/Paginated'
import '../styles/home.css'
import gif from "./loading.gif"
import img from "./placeHolder.jpg"
import notF from "./notF.png"

const Home = () => {

  const dispatch = useDispatch()
  const videogamesFilter = useSelector((state)=> state.videogamesFilter)
  const allVideogames = useSelector((state)=> state.videogames)
  const pages = useSelector((state)=> state.pages)

  const [order, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(pages);
  const [videogamePerPage, setVideogamesPerPage] = useState(12);
  const indexOfLastVideogame = currentPage * videogamePerPage
  const indexOfFirstVideogame= indexOfLastVideogame - videogamePerPage
  const currentVideogames = videogamesFilter.slice(indexOfFirstVideogame, indexOfLastVideogame)

  const paginated = (pageNum)=>{
    setCurrentPage(pageNum)
  }

  useEffect(()=>{
    dispatch(getGenre())
    dispatch(getVideogames())
    dispatch(getPlatforms())
  }, [dispatch])

  const handlePage= (e)=>{
    dispatch(savePage(currentPage))
  }


  return (
    <div>
    <div className='container'>
      <div className='title'> VIDEOGAMES </div>
      <Link to ='/create'> <button className='btn-home'>Create</button> </Link>
      <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder}/>
    </div>
    <div className='paginated'>
        <Paginated videogamePerPage= {videogamePerPage}
                   videogamesFilter= {videogamesFilter.length}
                   paginated={paginated}
                   currentPage={currentPage}
        />
    </div>
    <div className='cards'>
        {videogamesFilter[0] === 'otra cosa' ?
        <img src = {notF} alt = 'not found' width='610 px'/> : 
        currentVideogames?.map((e)=>{
          return (
            <div className='card-home'>
              <Link className='link' onClick={(e)=> handlePage(e)} to= {`/detail/${e.id}`}>
                <Card onMauseOver={{scale: 1.5}} jey={e.id} name = {e.name} image= {e.image? e.image: <img src= {img} width='310 px' height='200 px'/>} genre = {e.genres.map((e)=> e.name)} rating={e.rating}/>
              </Link>

            </div>
          )
        })
          
        }
    </div>

        {videogamesFilter.length === 0 && allVideogames.length ===0 && 
        <img src={gif} alt= 'Loading...' width='610px'/>};
        {(allVideogames.length > 0 && videogamesFilter.length === 0 )? 
         <  img src = {notF} alt= "not found " width="610px"   />
        :
        <span></span>}
   </div>
  )
}

export default Home
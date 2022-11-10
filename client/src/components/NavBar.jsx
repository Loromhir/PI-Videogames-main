import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {filterByGenre, filterCreated, orderByName, orderByRating, getGenre, getVideogames, cleanFilter} from '../redux/actions/index.js'
import SearchBar from './SearchBar.jsx';
import '../styles/navBar.css'

const NavBar = ({setCurrentPage, setOrder}) => {
  
  const dispatch= useDispatch();
  const videogameFilter= useSelector((state)=>state.videogameFilter)
  const genre= useSelector((state)=> state.genre.sort(
    (a, b)=>{
        if(a.name > b.name){return 1}
        if(a.name < b.name){return -1}
        return 0
    }))
  
const handleClick = (e)=>{
    e.preventDefault();
    dispatch(cleanFilter());
    dispatch(getVideogames());
    dispatch(getGenre());
}

const handleFilterCreated= (e)=>{
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1);
}

const handleSort = (e)=>{
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenated ${e.target.value}`)
}

const handleRatingSort = (e)=>{
    dispatch(orderByRating(e.target.value))
    setCurrentPage(1)
    setOrder(`ordenated ${e.target.value}`)
}

const handleFilterByGenre= (e)=>{
    dispatch(filterByGenre(e.target.value))
    setCurrentPage(1)
}

    return (
    <div className='navBar'>
        <div className='header'>
            <button onClick={e=>{handleClick(e)}}>Reload</button>
            <div className='filters'>
                <select onChange={e=>{handleSort(e)}}>
                    <option className='select'>Order Aphabetically</option>
                    <option value="asc">Order by: A-Z</option>
                    <option value="desc">Order by: Z-A</option>
                </select>
                <select onChange={e=>{handleRatingSort(e)}}>
                    <option value="all">Sort by RATING</option>
                    <option value="ratingMin">Sort by Min Rating</option>
                    <option value="ratingMax">Sort by Max Rating</option>
                </select>
                <select onChange={(e)=>{handleFilterCreated(e)}}>
                    <option value="all">Original/Custom</option>
                    <option value="api">Original Videogames</option>
                    <option value="db">Custom Videogames</option>
                </select>
                <select onChange={(e=>{handleFilterByGenre(e)})}>
                    {genre.map((e)=>(<option value={e.name}>{e.name}</option>))}
                </select>
                <div className='searchbar-navBar'>
                    <SearchBar setCurrentPage={setCurrentPage}/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default NavBar
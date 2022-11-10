import React from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {getDtail, cleanFilter} from '../redux/actions/index.js';
import '../styles/detail.css'

const Detail = (props) => {
  const dispatch= useDispatch()
  const detail = useSelector((state)=> state.detail)

  useEffect(()=>{
    dispatch(getDtail(props.match.params.id))
    return ()=>{
        dispatch(cleanFilter())
    }
  },[dispatch])
  
    return (
    <div className='background'>
        <div className='continer'>
            <div className='card-detail'>
                {
                    detail.length > 0 ?
                    <div className='columns'>
                        <img src={detail[0].image} alt="image not submited" width ="610px" height="auto"  />
                    <div className='text'>
                        <div className='name-detail'>{detail[0].name}</div>
                        <div className='stars'>
                            { [...Array(math.floor(detail[0].rating))].map((i)=> { <div key={i}>⭐</div>}
                            )}
                        </div>
                        <div className='released'>Released: {detail[0].released || detail.createdAt}</div>
                        { detail[0].platforms ? <div className='platforms-detail'>{`platforms: ${detail[0].platforms.joim(',')}`}</div> :
                           <div></div> }
                       <div className="genres-detail">Genres: {`  ${detail[0].genres.map((e)=>e.name).join(", ")}`  }</div>

                        <div>Description: {detail[0].description}</div>
                    </div>
                    </div> : <p className='loading'>Loading...</p>
                }
            </div>
        </div>
    </div>
  )
}

export default Detail
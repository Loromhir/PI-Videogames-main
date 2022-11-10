import React from 'react'

const Paginated = (videogamePerPage,videogameFilter, paginated, currentPage) => {
    const pageNumbers= [];

    for(let i = 1; i<= Math.ceil(videogameFilter/videogamePerPage); i++){
        pageNumbers.push(i)
    }
    const handlePrev = ()=>{
        if(currentPage<= 1) return;
        paginated(currentPage - 1); 
    }
    const handleNext= ()=>{
        if(currentPage >= pageNumbers.length) return;
        paginated(currentPage + 1)
    }
  return (
    <div className='setBtn'>
        {currentPage === 1 ? <div></div> : 
         <span className='arrows' onClick={()=>{handlePrev()}}>{'<'}</span>
         }
         <span className='paginated'>
            {pageNumbers && pageNumbers.map(number=>(
                pageNumbers.length === 1 ? <span></span> : 
                number < currentPage -2 || number > currentPage +2 ? <span>.</span>:
                <span className={number === currentPage ? 'negrita' : 'standar'}
                onClick={()=>{paginated(number)}} key= {number}>{number}</span>
            ))}
         </span>
         {
            pageNumbers && currentPage === pageNumbers.length ? <div></div> :
            <span className='arrows' onClick={()=>{handleNext()}}>{'>'}</span>
         }
    </div>
  )
}

export default Paginated
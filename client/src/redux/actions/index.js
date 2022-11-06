import axios from 'axios;'

export function getVideogames(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3000/videogame');
        await dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
};

export function getGenre(){
    return async function(dispatch){
        try{
            let info= await axios.get('http://localhost:3001/genre')
        }
    }
}
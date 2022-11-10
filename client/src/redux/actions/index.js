import axios from 'axios'

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
            let info= await axios.get('http://localhost:3000/genre')
            return dispatch({ type: 'GET_GENRE', payload: info.data})
        }
        catch(err){ 
            console.log(err);
        }
    }
}

export function getPlatforms(){
    return async (dispatch)=>{
        const res = await axios.get('http://localhost:3000/videogame');
        const allPlatformsRaw= [];
        res.data.forEach((game)=>{
           game.platforms.forEach((platform)=>{
               allPlatformsRaw.push(platform);
           });
        });
    
        const uniquePlatforms = new Set(allPlatformsRaw);
        console.log(uniquePlatforms);

        let arrayPlatforms= [... uniquePlatforms];

        console.log(arrayPlatforms);
        return dispatch({
            type: 'GET_PLATFORMS',
            payload: arrayPlatforms
        });
    };
}

export function getDetail(id){
    return async function(dispatch){
        try{
            let json= await axios.get(`http://localhost:3000/videogame/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            });
        }catch(err){ console.log(err)};
    };
}

export function cleanFilter(){
    return {
        type: 'CLEAN_FILTER',
        payload: []
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        const res = await axios.post(
            'http://localhost:3000/videogame', 
        payload)
        console.log(res);
        return res;
    }
}

export function getNameVideogames(name){
    return async function(dispatch){
        let json = await axios.get/(`http//localhost:3000/videogame?name=${name}`);
        console.log(json);
        if(json.data === 'otra cosa')
        return dispatch({
            type: 'NO_NAME',
            payload: json.data
        });

        return dispatch({
            type: 'GET_NAME_VIDEOGAMES',
            payload: json.data
        });
    }
}

export function filterByGenre(payload){
    return{
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload) {
    return {
      type: "FILTER_CREATED",
      payload,
    };
  }
  
  export function orderByDefault(payload) {
    return {
      type: "ORDER_BY_DEFAULT",
      payload,
    };
  }
  export function orderByName(payload) {
    return {
      type: "ORDER_BY_NAME",
      payload,
    };
  }
  
  export function orderByRating(payload) {
    return {
      type: "ORDER_BY_RATING",
      payload,
    };
  }
  
  export function savePage(payload) {
    return function (dispatch) {
      return dispatch({
        type: "SAVE_PAGE",
        payload,
      });
    };
  }
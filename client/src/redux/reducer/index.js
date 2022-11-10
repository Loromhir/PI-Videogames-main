const initialState = {
  videogames: [],
  videogamesFilter: [],
  platforms: [],
  detail: [],
  status: [],
  pages: 1,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      return {
        ...state,
        videogames: action.payload,
        videogamesFilter: action.payload,
      };
    case "GET_GENRE":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "CLEAN_FILTER":
      return {
        ...state,
        detail: action.payload,
        videogames: action.payload,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
        videogamesFilter: action.payload,
      };
    case "NO_NAME":
      return {
        ...state,
        videogamesFilter: [action.payload],
      };
    case "FILTER_BY_GENRE":
      const allVideogames = state.videogames;
      const filterAllGenres =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((e) =>
              e.genres.map((el) => el.name).includes(action.payload)
            );
      return {
        ...state,
        videogamesFilter: filterAllGenres,
      };
    case "FILTER_CREATED":
      let filterCreated;
      if (action.payload === "all") {
        filterCreated = state.videogames;
      } else if (action.payload === "api") {
        filterCreated = state.videogames.filter((e) => !e.createdInDb);
      } else if (action.payload === "db") {
        filterCreated = state.videogames.filter((e) => e.createdInDb);
      }
      return {
        ...state,
        videogamesFilter: filterCreated,
      };
    case "ORDER_BY_NAME":
      let one = [...state.videogamesFilter];
      action.payload === "asc"
        ? one.sort(function (a, b) {
            if (a.name.toLoweCase() > b.name.toLoweCase()) {
              return 1;
            }
            if (b.name.toLoweCase() > a.name.toLoweCase()) {
              return -1;
            }
            return 0;
          })
        : one.sort(function (a, b) {
            if (a.name.toLoweCase() > b.name.toLoweCase()) {
              return -1;
            }
            if (b.name.toLoweCase() > a.name.toLoweCase()) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        videogamesFilter: one,
      };
    case "ORDER_BY_RATING":
      let sortedArray =
        action.payload === "ratingMin"
          ? state.videogamesFilter.sort(function (a, b) {
              if (a.reting > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogamesFilter.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videogamesFilter: sortedArray,
      };
    case "SAVE_PAGE":
      return {
        ...state,
        platforms: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
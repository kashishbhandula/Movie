import { combineReducers } from "redux";
import {
  ADD_MOVIES,
  ADD_FAVOURITE,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
  ADD_SEARCH_RESULT
} from "../actions";

const intialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false,
};
export function movies(state = intialMoviesState, action) {
  // if (action.type === ADD_MOVIES) {
  //   return {
  //     ...state,
  //     list:action.movies

  //   };
  // }
  // return state;
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };

    case ADD_FAVOURITE:
      return {
        ...state,
        favourites: [action.movies, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITES:
      const filteredArray = state.favourites.filter(
        (movie) => movie.Title !== action.movie.Title
      );
      return {
        ...state,
        favourites: filteredArray,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.val,
      };
    default:
      return state;
  }
}

const initialSearchState = {
  result: [],
  showSearchResults: false,
};

export function search(state = initialSearchState, action) {
  switch(action.type)
  {
    case ADD_SEARCH_RESULT:{
      return{
        ...state,
        result:action.movie,
        showSearchResults:true

      }
    }
    default:
      return state;
  }
}

const initialRootState={
  movies:intialMoviesState,
  search:initialSearchState

}

export default function rootReducer(state=initialRootState, action) {
  return {

    movies: movies(state.movies,action),
    search: search(state.search,action)

  };
}
// export default combineReducers({
//   movies: movies,
//   search: search
// });

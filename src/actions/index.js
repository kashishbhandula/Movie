export const ADD_MOVIES = "ADD_MOVIES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";
export const REMOVE_FROM_FAVOURITES="REMOVE_FROM_FAVOURITES";
export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const ADD_SEARCH_RESULT= "ADD_SEARCH_RESULT";

export function addMovies(movies) {
  return {
    type: "ADD_MOVIES",
    movies,
  };
}
export function addFavourite(movies) {
  return {
    type: "ADD_FAVOURITE",
    movies,
  };
}
export function removeFromFavourites(movie) {
  return {
    type: "REMOVE_FROM_FAVOURITES",
    movie,
  };
}
export function setShowFavourites(val) {
  return {
    type: "SET_SHOW_FAVOURITES",
    val,
  };
}
export function handleMovieSearch(movie)
{
  const Your_Key="34c5e939";
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${Your_Key}&t=${movie}`;
  return  function(dispatch)
  {
    fetch(url)
    .then(
      response=>response.json()
    )
    .then(movie=>{
       console.log(movie);
      //  dispatch(addMovieSearchResultmovie);
    })
  }
 
  
}
export function addMovieSearchResult(movie)
{
  return{
    type:ADD_SEARCH_RESULT,
    movie
  }
}

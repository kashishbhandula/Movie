import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    store.subscribe(() => {
      console.log("updated");
      this.forceUpdate();
    });

    store.dispatch(addMovies(data));
    console.log("State", this.props.store.getState());
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      return true;
    }
    return false;
  };
  onChangeTab=(val)=>{
    this.props.store.dispatch(setShowFavourites(val));
  }
  render() {
    const {movies}=this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    console.log("Render");
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites}?'':'active-tabs'`} onClick={()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites}?'active-tabs':''`} onClick={()=>this.onChangeTab(true)}>Favourite</div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  key={index}
                  dispatch={this.props.store.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
                />
              );
            })}
          </div>
        </div>
        <div>
          { displayMovies.length===0 ? <div className="no-movies">No Movies to display</div>:null}
        </div>
      </div>
    );
  }
}

export default App;

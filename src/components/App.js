import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies, setShowFavourites } from "../actions";
import { StoreContext } from "../index";
import { connect } from "../index";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(addMovies(data));
    // console.log("State", this.props);
  }
  isMovieFavourite = (movie) => {
    const { movies } = this.props;
    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      return true;
    }
    return false;
  };
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies, search } = this.props;
    const { list, favourites, showFavourites } = movies;
    {
      console.log(list);
    }
    const displayMovies = showFavourites ? favourites : list;
    console.log("Render");

    return (
      <div className="App">
        <Navbar search={search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites}?'':'active-tabs'`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites}?'active-tabs':''`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourite
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  key={index}
                  dispatch={this.props.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
                />
              );
            })}
          </div>
        </div>
        <div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No Movies to display</div>
          ) : null}
        </div>
      </div>
    );
  }
}
// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies, setShowFavourites } from "../actions";
import { StoreContext } from "../index";

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
  onChangeTab = (val) => {
    this.props.store.dispatch(setShowFavourites(val));
  };
  render() {
    const { movies, search } = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;
    {
      console.log(list);
    }
    const displayMovies = showFavourites ? favourites : list;
    console.log("Render");
    return (
      <StoreContext.Consumer>
        {(store) => {
          return (
            <div className="App">
              <Navbar search={search} dispatch={store.dispatch} />
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
                        dispatch={store.dispatch}
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
        }}
      </StoreContext.Consumer>
    );
  }
}

export default App;

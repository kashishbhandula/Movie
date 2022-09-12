import React from "react";
import { handleMovieSearch,addMovieToList} from "../actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
  }
  handleAddToMovies=(movie)=>{
    // console.log("result11",movie);
    this.props.dispatch(addMovieToList(movie));
    
  }
  handleChange = (e) => {
    // const {search}=this.props;
    // console.log(search);
    this.setState({
      searchText: e.target.value,
    });
  };
  handleSearch = () => {
    const { searchText } = this.state;
    const { result } = this.props.search;
    this.props.dispatch(handleMovieSearch(searchText));
  };
  render() {
    const { result, showSearchResults } = this.props.search;
    // {
    //   console.log("result",result);
    // }

    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>
          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={result.Poster} alt="search-pic"/>
                <div className="movie-info">
                  <span>{result.Title}</span>
                  <button onClick={()=>this.handleAddToMovies(result)}>
                    Add To Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Navbar;

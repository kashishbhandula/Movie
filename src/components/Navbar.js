import React from "react";
import { handleMovieSearch } from "../actions";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
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
    const{result}=this.props.search;
    this.props.dispatch(handleMovieSearch(searchText));
  };
  render() {
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>
        </div>
      </div>
    );
  }
}
export default Navbar;

import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super(props);
    
    this.search.bind(this);
    this.handleTermChange.bind(this);
  }

  search(searchTerm) {
    this.props.onSearch();
  }

  handleTermChange(event) {
    this.search(event.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
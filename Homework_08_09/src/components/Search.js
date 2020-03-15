import React from 'react';

class Search extends React.Component {
  render() {
    const searchText = this.props.searchText;
    const searchChange = e => this.props.searchChange(e.target.value);
    return (
      <input type='text' placeholder='Search' 
        value={searchText}
        onChange={searchChange}></input>
    )
  }
}


export default Search;
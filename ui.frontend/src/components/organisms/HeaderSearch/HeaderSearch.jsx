import React from 'react';

const HeaderSearch = (props) => {
  console.log("Search ",props);
  return (<div className="search">{props.title}</div>);
}

  
export default HeaderSearch;
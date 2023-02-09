import React from 'react';
import { useState, useEffect } from 'react';
import { Input, Button } from '../../atoms'
import { SelectOption } from '../../molecules';
import { getData } from '../../../utils/server';
import { AEM_URLS } from '../../../utils/constants';

/**
 * 
 * Requirements
 * 
 * 
 * 1- content structure- site a, site b site c

2- create a component which is having dialogue of nested multifield

3- each item in the multifield has text and multiple path field in each item

4- create a sling model for nested multifield 

5- React-  left- dropdown -title of items

   -select offers from drpdown type in search and submit

-- UI will post data to sling servlet  with keyword that has been searched and the all the path

6- write a sling servlet which will search the text at all the path for that categories and return to UI  
 * 
 * 
 * 
 * 
 */

const SearchOther = (props) => {
  const modifiedProps = {...JSON.parse(props.text)}
  const {
    categories = [],
    input = {},
    button = {},
    sitePathData
  } = modifiedProps;

  const text = button.text;
  
  const [category, setCategory] = useState(categories[0] && categories[0].value);
  const [filteredLinkList, setFilteredLinkList] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);
  const [selectionClick, setSelectionClick] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const keywords = [];

  for(let keyword in sitePathData) {
    keywords.push(keyword);
  }

  const filterSearchResults = () => {
    const filteredResults = keywords.filter(key => {
      if(key.toLowerCase().indexOf(query.trim().toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  
    if(selectionClick) {
      setFilteredLinkList(sitePathData[query]);    
    }
    if(!query || selectionClick) {
      setFilteredValues([]);
      setSelectionClick(false);
      return;
    }
    
    if(filteredResults.length > 0) {
      setFilteredValues(filteredResults);
    } else {
      setFilteredValues(['Not found by the query keyword']);
    }
  }

  const submitFunction = () => {
    let url = AEM_URLS.SEARCH_OFFERS;
    url += '?';
    if(query) {
      url += `searchKeyword=${query}`
    }
    if(filteredLinkList.length) {
      url += `&paths=${filteredLinkList.join(',')}`
    }
    getData(url)
      .then(res => {
        setSearchResults(res.data);
      })
  };
  
  const onInputChange = (value) => {
    setQuery(value);
  };

  const onSelectOption = e => {
    setSelectionClick(true);
    setQuery(e.target.innerText);
  };

  const selectCategory = val => {
    setCategory(val);
  }

  useEffect(() => {
    filterSearchResults();
  }, [query]);

  return (<>
    <SelectOption options={categories} onChange={selectCategory} />

    <Input onChange={onInputChange} name={input.name} value={query} placeholder={input.placeholder} />
    <Button text={text} onClick={submitFunction} />

    {filteredValues.length > 0 && (
      <div className={"filtered-results"}>
        <ul>
          {filteredValues.map((val, idx) => {
            return (<li key={idx} onClick={(e) => onSelectOption(e)}>{val}</li>)
          })}
        </ul>
      </div>
    )}
    <hr />
    <div className={'search-results'}>
    { searchResults.length > 0 && searchResults.map((res, idx) => {
      return (<div className={"search-result-wrapper"} key={idx}>
        <img src={res.thumbnail} className={'thumbnail-image'} alt={res.title} />
        <a href={`${res.path}.html`}>{res.title}</a>
        {res.description && (
          <p>{res.description}</p>
        )}
      </div>)
    })}
    </div>
  </>);
}

export default SearchOther;
import React from 'react';
import { useState, useEffect } from 'react';
import { Input, Button } from '../../atoms'
import { SelectOption } from '../../molecules';

//
import {MOCK_SEARCH_RESULT} from '../../../utils/mockResponse';

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
  const {
    options = [],
    input = {},
    button: {
      text
    }
  } = props;
  
  const [query, setQuery] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);
  const [selectionClick, setSelectionClick] = useState(false);

  const filterSearchResults = () => {
    //TODO: API call and response mapping here, temporary fix with mock response
    if(!query || selectionClick) {
      setFilteredValues([]);
      setSelectionClick(false);
      return;
    }
    const filteredResults = MOCK_SEARCH_RESULT.data.filter(dt => {
      if(dt.name.toLowerCase().indexOf(query.trim().toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    
    if(filteredResults.length > 0) {
      setFilteredValues(filteredResults);
    } else {
      setFilteredValues([
        {name: 'Not found by the query keyword'}
      ]);
    }
  }

  const submitFunction = () => {
    console.log('Redirect search path');
  };
  
  const onInputChange = (value) => {
    setQuery(value);
  };

  const onSelectOption = e => {
    setSelectionClick(true);
    setQuery(e.target.innerText);
  }

  useEffect(() => {
    filterSearchResults();
  }, [query]);

  return (<>
    <SelectOption options={options} />

    <Input onChange={onInputChange} name={input.name} value={query} placeholder={input.placeholder} />
    <Button text={text} onClick={submitFunction} />

    {filteredValues.length > 0 && (
      <div className={"filtered-results"}>
        <ul>
          {filteredValues.map((val, idx) => {
            return (<li key={idx} onClick={(e) => onSelectOption(e)}>{val.name}</li>)
          })}
        </ul>
      </div>
    )}
  </>);
}

export default SearchOther;
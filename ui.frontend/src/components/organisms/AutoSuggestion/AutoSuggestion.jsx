import React, { useEffect, useState } from "react";
import { Input, Accordion } from "../../atoms";
import { setLocal, getLocal } from '../../../utils';
import {LOCAL_STORAGE_KEYS} from '../../../utils/constants';

const AutoSuggestion = (props) => {
  const {
    hotels = [],
    inputPlaceholder,
    searchFormTitle,
    recentSearchText,
  } = props;

  const [query, setQuery] = useState("");
  const [recentSearch, setRecentSearch] = useState("");
  const [modifiedHotelsList, setModifiedHotelsList] = useState({});
  const [showResults, setShowResults] = useState(false);

  const onInputChange = (value) => {
    setQuery(value);
    const val = value.trim().toLowerCase();
    let filteredResults = {};
    resetModifiedHotelsFullList();
    if(val) {
      for(let cont in modifiedHotelsList) {
        if(cont.toLowerCase().indexOf(val) > -1) {
          filteredResults[cont] = {...modifiedHotelsList[cont]};
        } else {
          for(let country in modifiedHotelsList[cont]) {
            if(country.toLowerCase().indexOf(val) > -1) {
              filteredResults[cont] = filteredResults[cont] ? {...filteredResults[cont]} : {};
              filteredResults[cont][country] = [...modifiedHotelsList[cont][country]];
            } else {
              filteredResults[cont] = filteredResults[cont] ? {...filteredResults[cont]} : {};
              modifiedHotelsList[cont][country].forEach(hotel => {
                if(hotel.toLowerCase().indexOf(val) > -1) {
                  if(filteredResults[cont][country]) {
                    filteredResults[cont][country] = [...filteredResults[cont][country], hotel];
                  } else {
                    filteredResults[cont][country] = [hotel];
                  }
                }
              })
            }
          }
        }
      }
      setModifiedHotelsList({...filteredResults});
    }
  };

  const highLightSelection = val => {
    let quer = query.trim();
    if(!quer) {
      return (<>{val}</>)
    }
    var regex = new RegExp("(" + query + ")", "gi");
    let updatedSearch = val.replace(regex, "<b>$1</b>");
    
    return (<span dangerouslySetInnerHTML={{__html: updatedSearch}}></span>);
  }

  const handleSearchClick = (hotelName) => {
    setQuery(hotelName);
    setRecentSearch(hotelName);
    setLocal(LOCAL_STORAGE_KEYS.RECENT_SEARCH, hotelName);
    setShowResults(false);
  };

  const onInputFocus = (value) => {
    setQuery(value);
    setShowResults(true);
  };

  useEffect(() => {
    const lastSearch = getLocal(LOCAL_STORAGE_KEYS.RECENT_SEARCH);
    if (lastSearch) {
      setRecentSearch(lastSearch);
    }
  });

  const resetModifiedHotelsFullList = () => {
    if(hotels && hotels.length) {
      const modHotel = {};
      hotels.forEach(hotel => {
        if(modHotel[hotel.continent]) {
          if(modHotel[hotel.continent][hotel.country]) {
            modHotel[hotel.continent][hotel.country].push(hotel.name);
          } else {
            modHotel[hotel.continent][hotel.country] = [hotel.name];
          }
        } else {
          modHotel[hotel.continent] = {};
          modHotel[hotel.continent][hotel.country] = [hotel.name];

        }
      });
      setModifiedHotelsList({...modHotel});
    }
  }

  useEffect(() => {
    resetModifiedHotelsFullList();
  }, [hotels]);

  return (<>
    <div className={"cp-auto-suggest"}>
      {searchFormTitle && (
        <h3>{searchFormTitle}</h3>
      )}
      <Input placeholder={props.inputPlaceholder}
        value={query}
        onChange={onInputChange}
        onFocus={onInputFocus}
        placeholder={inputPlaceholder}
        name={'recent-search'}
      />
      {(showResults && recentSearch && recentSearchText) && (
        <div>
          <h4>{recentSearchText}</h4>
          <p>{recentSearch}</p>
        </div>
      )}
      {
        showResults && Object.keys(modifiedHotelsList).length > 0 && Object.keys(modifiedHotelsList).map((cont, idx) => {
          return (<Accordion title={cont} key={idx} isDefaultOpen={idx === 0}>
            {Object.keys(modifiedHotelsList[cont]).map((country, countryIdx) => {
              return (
               <div key={countryIdx}>
                  {country}
                  {modifiedHotelsList[cont][country].map((hot, hotIdx) => {
                    return (<p key={hotIdx} onClick={() => handleSearchClick(hot)}>{highLightSelection(hot)}</p>)
                  })}
               </div> 
              )
            })}
          </Accordion>)
        })
      }
    </div>
  </>);
}

export default AutoSuggestion;
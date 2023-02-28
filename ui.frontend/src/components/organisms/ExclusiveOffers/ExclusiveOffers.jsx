import React from 'react';
import { useState, useEffect } from 'react';
import { getData } from '../../../utils/server';
import { AEM_URLS } from '../../../utils/constants';
import './style.scss';
// const ExclusiveOffers = (props)=>{
//     return(<>
//     <div>Tag Based Search</div>
//     </>)

// };

function ExclusiveOffers(props) {
    const {
        heading = "",
        viewalltext="",
        viewalltextlink=""
      } = props;
      console.log(props);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        getData(AEM_URLS.EXCLUSIVE_OFFERS)
        .then(res => {
            setData(res.data);
            console.log(res.data);
        })
    }, []);

  
    return (
        <>
        <div className="tag">
        <h1>{heading}</h1>
        <a href={viewalltextlink}>{viewalltext}</a>
        </div>
      <div className="tag-search">
        
          {data.map((item,idx) => (
            
            <div className="tag-search-item" key={idx}>
            {item.membersonly==="true" ? <h4 className="members">Members Only</h4> : ""}
          
            <img src={item.thumbnail} className="tag-thumbnail"/>
            <h3 className="tag-title">{item.tagTitle}</h3>
            <a href={`${item.path}`}>{item.title}</a>
            <h3 className="description">{item.description}</h3>
            <h5 className="location">{item.locationId}</h5>
            
            </div>
          ))}
          
        
      </div>
    </>);
  }
export default ExclusiveOffers;
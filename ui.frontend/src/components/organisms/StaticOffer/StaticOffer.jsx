import React from "react";
import { StaticOfferTemplate } from "../../molecules";
const StaticOffer = (props) => {
  const {

    offers=[]

  }=props;

    return ( <>
   {  offers.map((res)=>{
         return (<StaticOfferTemplate title={res.title} description={res.description} source={res.image}/>);
              })
  
    }
    </> );
}
 
export default StaticOffer;



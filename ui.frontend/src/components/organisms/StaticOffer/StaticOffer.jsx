import React from "react";
import { StaticOfferTemplate } from "../../molecules";
const StaticOffer = (props) => {
  const {
    offers = []
  } = props;

  return (<>
    {offers.length > 0 && (
      <div className={'cp-static-offer'}>
        {offers.map((res, idx) => {
          return (<StaticOfferTemplate title={res.title} key={idx} description={res.description} source={res.image} />);
        })}
      </div>
    )
    }
  </>);
}

export default StaticOffer;

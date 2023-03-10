import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import './style.scss';
import { EXCHANGE_RATES } from '../../../utils/graphqlQueries';
import {
  SelectOption,
  CheckInDateRangePicker,
  InfiniteScrollList,
  PopupModal,
  Carousel,
} from '../../molecules';
import { Button } from '../../atoms';
import { getIntl } from '../../../utils';
import json from './mockJson';

const Helloworld = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [onDemandCurrency, setOnDemandCurrency] = useState(null);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [scrollItems, setScrollItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const videosRef = useRef([]);

  //Setting up translation for file
  const [tl, setTl] = useState({});
  useEffect(() => {
    (async () => setTl(await getIntl()))();
  }, []);
  //-----------------------------

  const { data, loading, error } = useQuery(EXCHANGE_RATES, {
    variables: {
      currency: 'USD'
    }
  });

  const [checkCurrency, { data: calledData, loading: calledLoading }] = useLazyQuery(EXCHANGE_RATES, {
    variables: {
      currency: onDemandCurrency
    }
  });

  useEffect(() => {
    if (data) {
      const curr = [];
      data.rates.forEach(({ currency }) => {
        curr.push(currency);
      });
      setCurrencies(curr)
    }
  }, [data]);

  const getINRValue = (rates) => {
    let retRate = '';
    rates.forEach(({ currency, rate }) => {
      if (currency === 'INR') {
        retRate = parseFloat(rate).toFixed(2);
      }
    });
    return retRate;
  }

  const getExchangeRates = () => {
    if (loading) {
      return (<div>Loading Exchange Rates...</div>)
    }
    if (error) {
      return (<div>Error fetching rates!!!</div>)
    }
    return (
      <div>
        <p>
          1 USD = {getINRValue(data.rates)} INR
          </p>
      </div>
    );
  };

  const getExchangeRatesOnDemand = () => {
    if (!currencies.length) {
      return null;
    }
    const chkCurr = (e) => {
      setOnDemandCurrency(e.target.value)
      checkCurrency();
    };

    const optionsMap = [{
      text: '- Select Currency -',
      value: ""
    }];
    currencies.forEach(curr => {
      optionsMap.push({
        value: curr,
        text: curr
      });
    });

    return (<div>
      <SelectOption
        withLabel={true}
        id="currencies-exchange"
        labelText="Select the currency to check against INR"
        options={optionsMap}
        value={""}
        onChange={chkCurr}
        fieldName="currencies-exchange"
      />
      {calledLoading && (<div>Loading exchange Rates for {onDemandCurrency}, please wait!</div>)}
      {calledData && calledData.rates.length && (<div>
        <p>
          1 {onDemandCurrency} = {getINRValue(calledData.rates)} INR
          </p>
      </div>)}
    </div>)
  };

  const infScrollList = useRef(null);

  const fetchData = (currentPage) => {
    if (scrollItems.length >= json.length) {
      setHasMorePages(false);
      return;
    } else {
      setIsLoading(true);
      setTimeout(() => {
        let initialLength = (json.length <= (10 * (currentPage + 1))) ? json.length : (10 * (currentPage + 1));
        let firstJson = [...scrollItems];
        for (let i = (10 * currentPage); i < initialLength; i++) {
          firstJson.push(json[i]);
        }
        setIsLoading(false);
        setScrollItems(firstJson);
      }, 2000);
    }
  }

  useEffect(() => {
    let initialLength = 10;
    let firstJson = [];
    for (let i = 0; i < initialLength; i++) {
      firstJson.push(json[i]);
    }
    setScrollItems(firstJson);
  },[]);

  const displayPopup = (show) => {
    setShowPopup(show);
  };
  const primaryBtnAction = () => {
    console.log('pruimary action to be performed');
    displayPopup(false);
  }
  const secondaryBtnAction = () => {
    console.log('seconday btn action to be performed');
    displayPopup(false);
  };

  const getCarouselItems = () => {
    const lessJSON = [json[0], json[1], json[2], json[3], json[4], json[5]];
    const videoExtns = ['mp4', 'wmv'];

    const checkVideo = (fileName) => {
      const extn = fileName.split('.').pop();
      return videoExtns.indexOf(extn) > -1;
    }

    const items = lessJSON.map((item, idx) => {
      return (
        <div className={'person-item-wrapper'} key={idx}>
          <div className="picture-wrapper">
            {checkVideo(item.picture) ?
              (<video ref={cont => {
                videosRef.current[idx] = cont;
              }} id={`person-item-video-${idx}`} muted="muted">
                <source src={item.picture} type="video/mp4" />
              </video>) : <img src={item.picture} alt={item.name} />}
          </div>
          <div className="content-wrapper">
            <div className="person-name">{item.name}</div>
            <div className="person-age">Age: {item.age}</div>
            <div className="person-balance">Balance: {item.balance}</div>
          </div>
        </div>
      )
    });
    return items;
  };

  const slideShift = (slideNo) => {
    videosRef.current.forEach(vid => {
      if(vid) {
        vid.pause();
      }
    })
    if(videosRef.current[slideNo]) {
      videosRef.current[slideNo].play();
    }
  }

  return (
    <>
      <div className="helloWorld">{props.text}</div>
      <hr />
      <h3>Check in Date Range picker demo</h3>
      <CheckInDateRangePicker />
      <hr />
      <h3>Translation Demo</h3>
      Translated: {tl.throttled}
      <hr />
      <h3>Graphql Query Demo</h3>
      <div className="exchange-rates">{getExchangeRates()}</div>
      <div className="exchange-rate-ondemand">{getExchangeRatesOnDemand()}</div>
      <hr />
      <h3>Infinite Scroll Demo</h3>
      <div className="infinite-scroll" ref={infScrollList}>
        <InfiniteScrollList
          next={fetchData}
          hasMore={hasMorePages}
          loader={isLoading}
          el={infScrollList}
        >
          {scrollItems.length > 0 && scrollItems.map((item, index) => {
            return <div key={index}>{item ? item.name : ''}</div>;
          })}
          {isLoading && (<div>Loading ....</div>)}
          {!hasMorePages && (<div>***** No More Results *****</div>)}
        </InfiniteScrollList>
      </div>
      <hr />
      <h3>PopupModal Demo</h3>
      <Button text="click to open popup" onClick={() => displayPopup(true)} />
      {showPopup && (<PopupModal
        closePopupCallback={() => displayPopup(false)}
        primaryBtnLabel="OK"
        secondaryBtnLabel="Cancel"
        primaryBtnCallback={primaryBtnAction}
        secondaryBtnCallback={secondaryBtnAction}
        popupTitle={"Popup Title"}
      >
        <div>
          This is popup modal content
        </div>
      </PopupModal>)
      }
      <hr />
      <h3>Carousel Demo</h3>
      <Carousel
        autoplay={true}
        autoPlayWithProgressBar={true}
        secondsPerSlide={4}
        onSlideChangeCallback={slideShift}
      >
        {getCarouselItems()}
      </Carousel>
    </>
  );
}


export default Helloworld;
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import './style.scss';
import { EXCHANGE_RATES } from '../../../utils/graphqlQueries';

const Helloworld = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [onDemandCurrency, setOnDemandCurrency] = useState(null);
  const { data, loading, error } = useQuery(EXCHANGE_RATES, {
    variables: {
      currency: 'USD'
    }
  });

  const [checkCurrency, { data: calledData }] = useLazyQuery(EXCHANGE_RATES, {
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
    const chkCurr = (val) => {
      setOnDemandCurrency(val)
      checkCurrency();
    };

    return (<div>
      Select the currency to check against INR
      <select onChange={e => chkCurr(e.target.value)}>
        <option value="" defaultValue="">- Select Currency -</option>
        {currencies.map((curr, idx) => {
          return (<option key={idx} value={curr}>{curr}</option>)
        })}
      </select>
      {calledData && calledData.rates.length && (<div>
        <p>
          1 {onDemandCurrency} = {getINRValue(calledData.rates)} INR
          </p>
      </div>)}
    </div>)
  };

  return (
    <>
      <div className="helloWorld">{props.text}</div>
      <div className="exchange-rates">{getExchangeRates()}</div>
      <div className="exchange-rate-ondemand">{getExchangeRatesOnDemand()}</div>
    </>
  );
}


export default Helloworld;
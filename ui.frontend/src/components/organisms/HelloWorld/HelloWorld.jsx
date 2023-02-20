import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import './style.scss';
import { EXCHANGE_RATES } from '../../../utils/graphqlQueries';
import {
  SelectOption,
  CheckInDateRangePicker
} from '../../molecules';
import { getIntl } from '../../../utils';

const Helloworld = (props) => {
  const [currencies, setCurrencies] = useState([]);
  const [onDemandCurrency, setOnDemandCurrency] = useState(null);

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

  return (
    <>
      <div className="helloWorld">{props.text}</div>
      <hr />
      <CheckInDateRangePicker />
      <hr />
      Translated: {tl.throttled}
      <hr />
      <div className="exchange-rates">{getExchangeRates()}</div>
      <div className="exchange-rate-ondemand">{getExchangeRatesOnDemand()}</div>
    </>
  );
}


export default Helloworld;
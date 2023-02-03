import { gql } from '@apollo/client';

export const EXCHANGE_RATES = gql`
    query GetExchangeRates($currency: String!) {
        rates(currency: $currency) {
            currency
            rate
            name
        }
    }
`;

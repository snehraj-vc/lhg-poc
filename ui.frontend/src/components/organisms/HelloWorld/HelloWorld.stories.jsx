import React from 'react';
import HelloWorld from './HelloWorld';
import {ApolloProvider} from '@apollo/client';
import {client} from '../../../utils/client';

export default {
    title: 'Atoms/HelloWorld',
    component: HelloWorld,
    // argsTypes: {
    //     text: {
    //         control: 'text'
    //     }
    // }
}

const Template = (args) => (
    <ApolloProvider client={client}>
        <HelloWorld text="my text" />
    </ApolloProvider>
);

export const PlainText = Template.bind({})

// PlainText.args = {
//     text: 'Hello',
//     cqPath: 'adsa',
//     richText: false
// }
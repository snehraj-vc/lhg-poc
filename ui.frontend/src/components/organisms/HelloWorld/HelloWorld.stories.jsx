import React from 'react';
import HelloWorld from './HelloWorld';

export default {
    title: 'Atoms/HelloWorld',
    component: HelloWorld,
    // argsTypes: {
    //     text: {
    //         control: 'text'
    //     }
    // }
}

const Template = (args) => <HelloWorld text="my text" />

export const PlainText = Template.bind({})

// PlainText.args = {
//     text: 'Hello',
//     cqPath: 'adsa',
//     richText: false
// }
import React from 'react';
import Text from './Text';

export default {
    title: 'Atoms/Text',
    component: Text,
    argsTypes: {}
}

const Template = (args) => <Text {...args} />;

export const PlainText = Template.bind({});

PlainText.args = {
    text: 'Hello',
    richText: false
}

export const RichText = Template.bind({});

RichText.args = {
    text: '<p>Hello</p>',
    richText: true
}
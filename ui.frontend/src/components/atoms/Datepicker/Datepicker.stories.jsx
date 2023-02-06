import React from 'react';
import Datepicker from './Datepicker';

export default {
    title: 'Atoms/Datepicker',
    component: Datepicker,
    argsTypes: {}
}

const Template = (args) => <Datepicker {...args} />;

export const DatepickerCustom = Template.bind({});

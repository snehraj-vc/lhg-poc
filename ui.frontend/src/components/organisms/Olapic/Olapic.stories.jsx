import React from 'react';
import Olapic from './Olapic';

export default {
    title: 'Organism/Olapic',
    component: Olapic,
    argsTypes: {}
}

const Template = (args) => <Olapic {...args} />;

export const OlapicComp = Template.bind({});

OlapicComp.args = {
    id: "olapic_specific_widget",
    scriptLink: "https://photorankstatics-a.akamaihd.net/743d2e78a76dedeb07e0745158547931/static/frontend/latest/build.min.js",
    widgetName: "olapic_specific_widget",
    instance: "4017de735bd205099a2ece082829be73",
    apikey: "cfba7d3b691826a3758e420e817cffa5d5cfd447f40aa7ec16678610bdf4ebbf",
    async: "async"
}
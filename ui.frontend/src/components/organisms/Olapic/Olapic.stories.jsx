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
    html: '<div id="olapic_specific_widget"></div><script type="text/javascript" src="https://photorankstatics-a.akamaihd.net/743d2e78a76dedeb07e0745158547931/static/frontend/latest/build.min.js" data-olapic="olapic_specific_widget" data-instance="4017de735bd205099a2ece082829be73" data-apikey="cfba7d3b691826a3758e420e817cffa5d5cfd447f40aa7ec16678610bdf4ebbf" async="async"></script>',
}
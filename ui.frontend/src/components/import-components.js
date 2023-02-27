/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
import withAsyncImport from "../utils/withAsyncImport";
import {MapTo} from '@adobe/aem-react-editable-components';
import './pages/Page/Page';
import './pages/OffersPage/OffersPage';
import './helperComponents/Container/Container';
import './helperComponents/ExperienceFragment/ExperienceFragment';


import {
    CarouselV1IsEmptyFn
} from '@adobe/aem-core-components-react-spa/dist/isEmptyFunctions';

import {
    TitleV2IsEmptyFn
} from '@adobe/aem-core-components-react-base/dist/isEmptyFunctions';

import {
    ContainerV1, ContainerV1IsEmptyFn,
    TabsV1, TabsV1IsEmptyFn,
    AccordionV1,AccordionV1IsEmptyFn,
} from '@adobe/aem-core-components-react-spa';

import {
    BreadCrumbV2,BreadCrumbV2IsEmptyFn,
    ButtonV1,ButtonV1IsEmptyFn,
    ImageV2,ImageV2IsEmptyFn,
    TeaserV1,TeaserV1IsEmptyFn,
    DownloadV1,DownloadV1IsEmptyFn,
    SeparatorV1,SeparatorV1IsEmptyFn,
    ListV2,ListV2IsEmptyFn
} from '@adobe/aem-core-components-react-base';

//lazyload / code splitting examples of external components
const TitleV2 = withAsyncImport(() => import(`@adobe/aem-core-components-react-base/dist/authoring/title/v2/TitleV2`));
const CarouselV1 = withAsyncImport(() => import(`@adobe/aem-core-components-react-spa/dist/container/carousel/v1/CarouselV1`));


MapTo('lhg-lms/components/download')(DownloadV1, {isEmpty: DownloadV1IsEmptyFn});
MapTo('lhg-lms/components/list')(ListV2, {isEmpty: ListV2IsEmptyFn});
MapTo('lhg-lms/components/separator')(SeparatorV1, {isEmpty: SeparatorV1IsEmptyFn});

MapTo('lhg-lms/components/button')(ButtonV1, {isEmpty: ButtonV1IsEmptyFn});
MapTo('lhg-lms/components/teaser')(TeaserV1, {isEmpty: TeaserV1IsEmptyFn});
MapTo('lhg-lms/components/image')(ImageV2, {isEmpty: ImageV2IsEmptyFn});
MapTo('lhg-lms/components/title')(TitleV2, {isEmpty: TitleV2IsEmptyFn});


MapTo('lhg-lms/components/breadcrumb')(BreadCrumbV2, {isEmpty: BreadCrumbV2IsEmptyFn});


MapTo('lhg-lms/components/tabs')(TabsV1, {isEmpty: TabsV1IsEmptyFn});
MapTo('lhg-lms/components/accordion')(AccordionV1, {isEmpty: AccordionV1IsEmptyFn});
MapTo('lhg-lms/components/carousel')(CarouselV1, {isEmpty: CarouselV1IsEmptyFn});
MapTo('lhg-lms/components/container')(ContainerV1, {isEmpty: ContainerV1IsEmptyFn});

const importComponent = ({
    feCompPath,
    compName,
    aemCompMap,
    customPropCheck,
}) => {
    const frontendComponent = withAsyncImport(() => feCompPath);
    const configComponent = {
        emptyLabel: compName,
        isEmpty: (props) => {
            return customPropCheck ? customPropCheck(props) : !props;
        }

    }
    MapTo(aemCompMap)(frontendComponent, configComponent);
};


// All Components mapping would be done in below settings.
const customCompsSettings = [{
    feCompPath: import(`../components/atoms/Text/Text`),
    aemCompMap: 'lhg-lms/components/text',
    compName: 'Text',
    customPropCheck: (props) => (!props || !props.text || props.text.trim().length < 1)
}, {
    feCompPath: import(`../components/organisms/HelloWorld/HelloWorld`),
    aemCompMap: 'lhg-lms/components/helloworld',
    compName: 'Hello World',
    customPropCheck: (props) => (!props || !props.text || props.text.trim().length < 1)
}, {
    feCompPath: import(`../components/organisms/Navigation/Navigation`),
    aemCompMap: 'lhg-lms/components/navigation',
    compName: 'Navigation'
}, {
    feCompPath: import(`../components/organisms/LanguageNavigation/LanguageNavigation`),
    aemCompMap: 'lhg-lms/components/languagenavigation',
    compName: 'LanguageNavigation'
}, {
    feCompPath: import(`../components/molecules/Sso/Sso`),
    aemCompMap: 'lhg-lms/components/sso',
    compName: 'Sso'
}, {
    feCompPath: import(`../components/organisms/HeaderSearch/HeaderSearch`),
    aemCompMap: 'lhg-lms/components/headersearch',
    compName: 'HeaderSearch'
},
{
    feCompPath: import(`../components/organisms/SearchOther/SearchOther`),
    aemCompMap: 'lhg-lms/components/searchother',
    compName: 'SearchOther'
},
{
    feCompPath: import(`../components/organisms/Olapic/Olapic`),
    aemCompMap: 'lhg-lms/components/olapic',
    compName: 'Olapic'
},
{
    feCompPath: import(`../components/organisms/SearchOther/SearchOther`),
    aemCompMap: 'lhg-lms/components/searchother',
    compName: 'NestedSearch'
}, {
    feCompPath: import(`../components/organisms/AuthModule/AuthModule`),
    aemCompMap: 'lhg-lms/components/register',
    compName: 'RegisterForm'
},{
    feCompPath: import(`../components/organisms/StaticOffer/StaticOffer`),
    aemCompMap: 'lhg-lms/components/staticoffer',
    compName: 'StaticOffer'
},{
    feCompPath: import(`../components/organisms/AutoSuggestion/AutoSuggestion`),
    aemCompMap: 'lhg-lms/components/autosuggest',
    compName: 'AutoSuggestion'
}, {
    feCompPath: import(`../components/helperComponents/Intl/Intl`),
    aemCompMap: 'lhg-lms/components/intl',
    compName: 'Internationalization',
    customPropCheck: (props) => (!props || !props.intl)
},
{
    feCompPath: import(`../components/organisms/ExclusiveOffers/ExclusiveOffers`),
    aemCompMap: 'lhg-lms/components/exclusiveoffers',
    compName: 'ExclusiveOffers'
}
];


customCompsSettings.forEach(comp => {
    importComponent({
        feCompPath: comp.feCompPath,
        aemCompMap: comp.aemCompMap,
        compName: comp.compName,
        customPropCheck: comp.customPropCheck
    })
});

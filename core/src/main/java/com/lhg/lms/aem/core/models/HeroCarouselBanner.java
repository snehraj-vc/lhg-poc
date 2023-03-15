/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.lhg.lms.aem.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import java.util.ArrayList;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = HeroCarouselBanner.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class HeroCarouselBanner implements ComponentExporter {
    private static final Logger logger = LoggerFactory.getLogger(HeroCarouselBanner.class);
    protected static final String RESOURCE_TYPE = "lhg-lms/components/herocarouselbanner";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String secondsPerSlide;

    public String getSecondsPerSlide() {
        return secondsPerSlide;
    }

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String bannerTextPosition;

    public String getBannerTextPosition() {
        return bannerTextPosition;
    }

    @ChildResource
    @Named("carouselitems")
    private Resource carouselItemsResource;
    private ArrayList<CarouselItem> carouselItemsService = new ArrayList<>();


    /*@ChildResource
    @Named("ribboneffectitems")
    private Resource ribbonEffectItemsResource;
    private ArrayList<RibbonEffectItem> ribbonEffectItemsService = new ArrayList<>();*/

    @PostConstruct
    protected void init() {
        if (carouselItemsResource!= null){
            Iterable<Resource> multi = carouselItemsResource.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                CarouselItem model = new CarouselItem();
                model.setTitle(valueMap.get("title",String.class));
                model.setDescription(valueMap.get("description",String.class));
                model.setCtaText(valueMap.get("ctaText",String.class));
                model.setCtaLink(valueMap.get("ctaLink",String.class));
                model.setDesktopMedia(valueMap.get("desktopMedia",String.class));
                model.setMobileMedia(valueMap.get("mobileMedia",String.class));

                carouselItemsService.add(model);
            }}


       /* if (ribbonEffectItemsResource!= null){
            Iterable<Resource> multi = ribbonEffectItemsResource.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                RibbonEffectItem model = new RibbonEffectItem();
                model.setListFrom(valueMap.get("listFrom",String.class));


                ribbonEffectItemsService.add(model);
            }}*/

    }
    public ArrayList<CarouselItem> getCarouselItems(){
        return carouselItemsService;
    }
   /* public ArrayList<RibbonEffectItem> getRibbonEffectItems(){
        return ribbonEffectItemsService;
    }*/
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
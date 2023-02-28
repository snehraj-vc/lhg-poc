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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import java.util.ArrayList;

@Model(adaptables = {SlingHttpServletRequest.class, Resource.class},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL,
        adapters = {ComponentExporter.class},
        resourceType = CustomCarousel.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CustomCarousel implements ComponentExporter {
    private static final Logger LOG = LoggerFactory.getLogger(CustomCarousel.class);

    protected static final String RESOURCE_TYPE = "lhg-lms/components/customcarousel";
    @ChildResource
    @Named("customcarousel")
    private Resource serviceResource;
    private ArrayList<CustomCarouselDTO> service = new ArrayList<>();
    @PostConstruct
    protected void init() {
        if (serviceResource!= null){
      Iterable<Resource> multi = serviceResource.getChildren();
        for (Resource multiResource : multi){
            ValueMap valueMap = multiResource.getValueMap();
            CustomCarouselDTO model = new CustomCarouselDTO();
            model.setTitle(valueMap.get("title",String.class));
            model.setDescription(valueMap.get("description",String.class));
            model.setVideopath(valueMap.get("videopath",String.class));
            service.add(model);
        }}
    }
    public ArrayList<CustomCarouselDTO> getCustomcarousel(){
        return service;
    }

  //  @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}

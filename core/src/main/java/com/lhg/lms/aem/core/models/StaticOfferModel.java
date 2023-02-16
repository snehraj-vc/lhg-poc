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
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import java.util.ArrayList;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = StaticOfferModel.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class StaticOfferModel implements ComponentExporter {
    private static final Logger LOG = LoggerFactory.getLogger(StaticOfferModel.class);

    protected static final String RESOURCE_TYPE = "lhg-lms/components/staticoffer";

    @ChildResource
    @Named("offers")
    private Resource serviceResource;

    private ArrayList<StaticOfferDTO> service = new ArrayList<>();
    @PostConstruct
    protected void init() {
        Iterable<Resource> multi = serviceResource.getChildren();
        for (Resource multiResource : multi){
            ValueMap valueMap = multiResource.getValueMap();
            StaticOfferDTO model = new StaticOfferDTO();
            model.setTitle(valueMap.get("title",String.class));
            model.setDescription(valueMap.get("description",String.class));
            model.setImage(valueMap.get("image",String.class));
            service.add(model);
        }
    }
    public ArrayList<StaticOfferDTO> getOffers(){
        return service;
    }


  //  @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}

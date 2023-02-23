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

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = ExclusiveOffers.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ExclusiveOffers implements ComponentExporter {
    private static final Logger logger = LoggerFactory.getLogger(ExclusiveOffers.class);
    protected static final String RESOURCE_TYPE = "lhg-lms/components/exclusiveoffers";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String heading;

    public String getHeading() {
        return heading;
    }
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String viewalltext;

    public String getViewalltext() {
        return viewalltext;
    }
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String viewalltextlink;

    public String getViewalltextlink() {
        return viewalltextlink;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
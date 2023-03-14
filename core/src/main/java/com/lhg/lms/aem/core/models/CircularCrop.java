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
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = CircularCrop.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CircularCrop implements ComponentExporter {
    private static final Logger logger = LoggerFactory.getLogger(CircularCrop.class);
    protected static final String RESOURCE_TYPE = "lhg-lms/components/circularcrop";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String text;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String description;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String image;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String altertext;

    public String getText() {
        return text;
    }

    public String getImage() {
        return image;
    }

    public String getAltertext() {
        return altertext;
    }

    public String getDescription() {
        return description;
    }


    @PostConstruct
    protected void init(){

    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
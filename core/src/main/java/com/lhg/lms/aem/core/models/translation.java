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
import com.day.cq.i18n.I18n;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.i18n.ResourceBundleProvider;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.osgi.service.component.annotations.Reference;

import javax.inject.Inject;
import java.util.Dictionary;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.ResourceBundle;


@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = translation.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class translation implements ComponentExporter {
    @Reference(target="(component.name=org.apache.sling.i18n.impl.JcrResourceBundleProvider)")
    private ResourceBundleProvider resourceBundleProvider;
    @Inject
    SlingHttpServletRequest request;
    private Page currentpage;
    @SlingObject
    private Resource currentResource;
    protected static final String RESOURCE_TYPE = "lhg-lms/components/helloworld";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected Dictionary<String,String> text;
    @SlingObject
    private ResourceResolver resolver;
    @Inject
    public Dictionary<String,String> getText() {
        Dictionary<String,String> values = new Hashtable<>();
        PageManager pageManager = resolver.adaptTo(PageManager.class);
        currentpage = pageManager.getContainingPage(currentResource);
        if(request != null){
            ResourceBundle resourceBundle =  request.getResourceBundle(currentpage.getLanguage());
            I18n i18n = new I18n(resourceBundle);
            Enumeration<String> enumeration = resourceBundle.getKeys();
            // print all the keys
            while (enumeration.hasMoreElements()) {
                String key = enumeration.nextElement();
                values.put(key,(String) (resourceBundle.getObject(key)));
            }
        }
        return values;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
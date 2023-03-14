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
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;


@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = BrilliantHeader.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BrilliantHeader implements ComponentExporter {
    private static final Logger logger = LoggerFactory.getLogger(BrilliantHeader.class);
    protected static final String RESOURCE_TYPE = "lhg-lms/components/brilliantheader";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String brilliantimage;

    public String getBrilliantimage() {
        return brilliantimage;
    }

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String login;

    public String getLogin() {
        return login;
    }
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String loginurl;

    public String getLoginurl() {
        return loginurl;
    }
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String hamburgericon;

    public String getHamburgericon() {
        return hamburgericon;
    }

    @ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL, name = "menuitems")

    private Resource menuitems;

    private ArrayList<MenuItems> menuItems=new ArrayList<>();
    @PostConstruct
    protected void init() {
        if (menuitems!= null){
            Iterable<Resource> multi = menuitems.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                MenuItems items=new MenuItems();
                items.setItemText(valueMap.get("itemtext",String.class));
                items.setItemLink(valueMap.get("itemlink",String.class));
                menuItems.add(items);
            }}
    }

    public ArrayList<MenuItems> getMenuItems() {
        return menuItems;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
class MenuItems {
    private String itemText;
    private String itemLink;

    public String getItemText() {
        return itemText;
    }

    public String getItemLink() {
        return itemLink;
    }

    public void setItemText(String itemText) {
        this.itemText = itemText;
    }

    public void setItemLink(String itemLink) {
        this.itemLink = itemLink;
    }
}
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
import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = BrilliantFooter.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BrilliantFooter implements ComponentExporter {
    private static final Logger logger = LoggerFactory.getLogger(BrilliantFooter.class);
    protected static final String RESOURCE_TYPE = "lhg-lms/components/brilliantfooter";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String brandLogoPath;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String brandLogoAltText;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String contactInfo;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String findUs;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String copyrightText;

    public String getFindUs() {
        return findUs;
    }

    public String getContactInfo() {
        return contactInfo;
    }
    public String getBrandLogoPath() {
        return brandLogoPath;
    }

    public String getBrandLogoAltText() {
        return brandLogoAltText;
    }
    public String getCopyrightText() {
        return copyrightText;
    }


    @ChildResource
    @Named("brandslist")
    private Resource brandsListResource;
    private ArrayList<BrandsList> brandsListService = new ArrayList<>();

    @ChildResource
    @Named("socialiconslist")
    private Resource socialIconsListResource;
    private ArrayList<SocialIconsList> socialIconsListService = new ArrayList<>();

    @ChildResource
    @Named("secondlevellist")
    private Resource SecondLevelListResource;
    private ArrayList<SecondLevelList> secondLevelListService = new ArrayList<>();

    @ChildResource
    @Named("thirdlevellist")
    private Resource ThirdLevelListResource;
    private ArrayList<ThirdLevelList> thirdLevelListService = new ArrayList<>();
    @PostConstruct
    protected void init() {
        if (brandsListResource!= null){
            Iterable<Resource> multi = brandsListResource.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                BrandsList model = new BrandsList();
                model.setLogoPath(valueMap.get("logoPath",String.class));
                model.setAltText(valueMap.get("altText",String.class));
                brandsListService.add(model);
            }}

        if (socialIconsListResource!= null){
            Iterable<Resource> multi = socialIconsListResource.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                SocialIconsList model = new SocialIconsList();
                model.setLogoPath(valueMap.get("logoPath",String.class));
                model.setAltText(valueMap.get("altText",String.class));
                socialIconsListService.add(model);
            }}

        if (SecondLevelListResource!= null){
            Iterable<Resource> multi = SecondLevelListResource.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                SecondLevelList model = new SecondLevelList();
                model.setItemPath(valueMap.get("itemPath",String.class));
                model.setItemText(valueMap.get("itemText",String.class));
                secondLevelListService.add(model);
            }}

        if (ThirdLevelListResource!= null){
            Iterable<Resource> multi = ThirdLevelListResource.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                ThirdLevelList model = new ThirdLevelList();
                model.setItemPath(valueMap.get("itemPath",String.class));
                model.setItemText(valueMap.get("itemText",String.class));
                thirdLevelListService.add(model);
            }}
    }
    public ArrayList<BrandsList> getBrandsList(){
        return brandsListService;
    }
    public ArrayList<SocialIconsList> getSocialIconsList(){
        return socialIconsListService;
    }
    public ArrayList<SecondLevelList> getSecondLevelList(){
        return secondLevelListService;
    }
    public ArrayList<ThirdLevelList> getThirdLevelList(){
        return thirdLevelListService;
    }
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}
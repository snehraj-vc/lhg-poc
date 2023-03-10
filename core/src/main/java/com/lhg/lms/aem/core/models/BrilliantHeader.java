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


import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class},
        adapters = {ComponentExporter.class},
        resourceType = BrilliantHeader.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class BrilliantHeader implements ComponentExporter {
    private static final Logger logger = LoggerFactory.getLogger(BrilliantHeader.class);
    protected static final String RESOURCE_TYPE = "lhg-lms/components/brilliantheader";
//    private static final String LANG_EN = "EN";
//    private static final String LANG_ZH_HK = "ZH_HK";
//    private static final String LANG_ZH_CN = "ZH_CN";

    @Inject
    private ResourceResolver resourceResolver;

//    private String currentPageURI;
//    private String otherPageURI;
    private String languageUrls;
//    private String zh_hkURI;
//    private String zh_cnURI;

    @ScriptVariable
    private Page currentPage;
    @Inject
    private SlingHttpServletRequest request;


//    private String currentPageUri;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String enTitle;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String zhhkTitle;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String zhcnTitle;
//
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String enLabel;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String zhhkLabel;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String zhcnLabel;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String enPath;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String zhhkPath;
//    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
//    private String zhcnPath;
//    private String enFallbackurl="/content/lhg-lms/en/home";
//    private String zhFallbackurl="/content/lhg-lms/zh_hk/home";
//    private String zh_cnFallbackurl="/content/lhg-lms/zh_cn/home";

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
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String createaccountlabel;

    public String getCreateaccountlabel() {
        return createaccountlabel;
    }
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String createaccountlink;

    public String getCreateaccountlink() {
        return createaccountlink;
    }
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String createaccounticonalt;

    public String getCreateaccounticonalt() {
        return createaccounticonalt;
    }
    private String languages;
    private ArrayList<String> languageItems=new ArrayList<>();
    @ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL, name = "menuitems")

    private Resource menuitems;

    @ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL, name = "languagetoggle")

    private Resource languageToggleItems;

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
        logger.info("toggle1");

        if(languageToggleItems != null){
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            JsonArray array = new JsonArray();
            //currentPageUri = currentPage.getPath().concat(".html");
            String currentPagePathUrl = currentPage.getPath();
            String currentPageLanguage = String.valueOf(currentPage.getLanguage().toString().toLowerCase());
            logger.info("currentPagePathUrl : {}",currentPagePathUrl);
            logger.info("currentPageLanguage : {}",currentPageLanguage);

            Iterable<Resource> multiLanguage = languageToggleItems.getChildren();
            for (Resource multiLanguageResource : multiLanguage){
                ValueMap valueMap = multiLanguageResource.getValueMap();
                LanguageToggle languageToggle=new LanguageToggle();
                languageToggle.setLanguageLabel(valueMap.get("languageLabel",String.class));
                languageToggle.setLanguagePath(valueMap.get("languagePath",String.class));
                languageToggle.setLanguageTitle(valueMap.get("languageTitle",String.class));
                languageToggle.setLanguageConstant(valueMap.get("languageConstant",String.class));

                    if (StringUtils.isNotEmpty(languageToggle.getLanguageLabel())
                            && languageToggle.getLanguageLabel().equalsIgnoreCase(languageToggle.getLanguageConstant())) {
                        //String multiListResourceLanguage = String.valueOf(currentPage.getLanguage());
                        /*currentPageURI = currentPagePathUrl.concat(".html");*/
                        logger.info("languageToggle.getLanguageLabel() : {}",languageToggle.getLanguageLabel());
                        languageUrls = currentPagePathUrl.replace("/"+currentPageLanguage, "/"+languageToggle.getLanguageLabel()).concat(".html");
                        //otherPageURI = languageurlgenerator(currentPagePathUrl,currentPageURI, languageToggle.getLanguagePath()).concat(".html");
                        logger.info("otherPageURI : {}", languageUrls);

                        HeaderLanguage language = new HeaderLanguage();
                        language.setTitle(languageToggle.getLanguageTitle());
                        language.setLink(languageUrls);
//
                        array.add(gson.toJson(language, HeaderLanguage.class));
                    }
            }
            languages = gson.toJson(array, JsonArray.class);
        }

    }
//    private String languageurlgenerator(String currentPage ,String sourcePath, String destinationPath){
//        logger.info("currentPage :::: {}", currentPage);
//        logger.info("sourcePath :::: {}", sourcePath);
//        logger.info("destinationPath :::: {}", destinationPath);
//        String redirectURI=null;
//        if (sourcePath != null) {
//            redirectURI = currentPage.replace(sourcePath, destinationPath);
//        }
//        return redirectURI;
//    }

    public ArrayList<MenuItems> getMenuItems() {
        return menuItems;
    }
//    public String getEnTitle() {
//        return enTitle;
//    }
//    public String getEnURI() {
//        return enURI;
//    }
//    public String getZhhkTitle() {
//        return zhhkTitle;
//    }
//    public String getZh_hkURI() {
//        return zh_hkURI;
//    }
//    public String getZhcnTitle() {
//        return zhcnTitle;
//    }
//    public String getZh_cnURI() {
//        return zh_cnURI;
//    }

    public String getLanguages() {
        return languages;
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

class HeaderLanguage {
    private String title;
    private String link;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}

class LanguageToggle{
    private String languageLabel;
    private String languagePath;
    private String languageTitle;
    private String languageConstant;

    public void setLanguageLabel(String languageLabel) {
        this.languageLabel = languageLabel;
    }

    public String getLanguageLabel() {
        return languageLabel;
    }

    public void setLanguagePath(String languagePath) {
        this.languagePath = languagePath;
    }

    public String getLanguagePath() {
        return languagePath;
    }

    public void setLanguageTitle(String languageTitle) {
        this.languageTitle = languageTitle;
    }

    public String getLanguageTitle() {
        return languageTitle;
    }

    public void setLanguageConstant(String languageConstant) {
        this.languageConstant = languageConstant;
    }

    public String getLanguageConstant() {
        return languageConstant;
    }
}
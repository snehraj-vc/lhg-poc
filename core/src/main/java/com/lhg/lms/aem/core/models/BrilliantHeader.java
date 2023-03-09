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
    private static final String LANG_EN = "EN";
    private static final String LANG_ZH_HK = "ZH_HK";
    private static final String LANG_ZH_CN = "ZH_CN";

    @Inject
    private ResourceResolver resourceResolver;

    private String enURI;
    private String zh_hkURI;
    private String zh_cnURI;

    @ScriptVariable
    private Page currentPage;
    @Inject
    private SlingHttpServletRequest request;


    private String currentPageUri;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String enTitle;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String zhhkTitle;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String zhcnTitle;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String enLabel;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String zhhkLabel;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String zhcnLabel;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String enPath;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String zhhkPath;
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    private String zhcnPath;
    private String enFallbackurl="/content/lhg-lms/en/home";
    private String zhFallbackurl="/content/lhg-lms/zh_hk/home";
    private String zh_cnFallbackurl="/content/lhg-lms/zh_cn/home";



    private String redirectURI;

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

        if (StringUtils.isNotEmpty(enLabel) && enLabel.equalsIgnoreCase(LANG_EN)) {
            if (zhFallbackurl == null || zhFallbackurl.isEmpty() || zhhkPath == null || zhhkPath.isEmpty()) {
                redirectURI = null;
            }

            currentPageUri=currentPage.getPath().concat(".html");
            String currentPagePathUrl = currentPage.getPath();
            String urlLocal= String.valueOf(currentPage.getLanguage());
            if(urlLocal.equalsIgnoreCase(LANG_EN)){
                enURI=currentPagePathUrl.concat(".html");
                zh_hkURI=languageurlgenerator(currentPagePathUrl,enPath,zhhkPath).concat(".html");
                zh_cnURI=languageurlgenerator(currentPagePathUrl,enPath,zhcnPath).concat(".html");

                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                JsonArray array = new JsonArray();
                HeaderLanguage en = new HeaderLanguage();
                en.setTitle(enTitle);
                en.setLink(enURI);
                HeaderLanguage zh_hk = new HeaderLanguage();
                zh_hk.setTitle(zhhkTitle);
                zh_hk.setLink(zh_hkURI);
                HeaderLanguage zh_cn = new HeaderLanguage();
                zh_cn.setTitle(zhcnTitle);
                zh_cn.setLink(zh_cnURI);
                array.add(gson.toJson(en, HeaderLanguage.class));
                array.add(gson.toJson(zh_hk, HeaderLanguage.class));
                array.add(gson.toJson(zh_cn, HeaderLanguage.class));
                languages = gson.toJson(array, JsonArray.class);
                logger.info("languages :::: {}", languages);
            }

        }

        if (StringUtils.isNotEmpty(zhhkLabel) && zhhkLabel.equalsIgnoreCase(LANG_ZH_HK)) {
            if (enFallbackurl == null || enFallbackurl.isEmpty() || enPath == null || enPath.isEmpty()) {
                redirectURI = null;
            }


            currentPageUri=currentPage.getPath().concat(".html");
            String currentPagePathUrl = currentPage.getPath();
            String urlLocal= String.valueOf(currentPage.getLanguage());
            if(urlLocal.equalsIgnoreCase(LANG_ZH_HK)){
                zh_hkURI=currentPagePathUrl.concat(".html");
                enURI=languageurlgenerator(currentPagePathUrl,zhhkPath,enPath).concat(".html");
                zh_cnURI=languageurlgenerator(currentPagePathUrl,zhhkPath,zhcnPath).concat(".html");

                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                JsonArray array = new JsonArray();
                HeaderLanguage en = new HeaderLanguage();
                en.setTitle(enTitle);
                en.setLink(enURI);
                HeaderLanguage zh_hk = new HeaderLanguage();
                zh_hk.setTitle(zhhkTitle);
                zh_hk.setLink(zh_hkURI);
                HeaderLanguage zh_cn = new HeaderLanguage();
                zh_cn.setTitle(zhcnTitle);
                zh_cn.setLink(zh_cnURI);
                array.add(gson.toJson(en, HeaderLanguage.class));
                array.add(gson.toJson(zh_hk, HeaderLanguage.class));
                array.add(gson.toJson(zh_cn, HeaderLanguage.class));
                languages = gson.toJson(array, JsonArray.class);
                logger.info("languages :::: {}", languages);

            }
        }

        if (StringUtils.isNotEmpty(zhcnLabel) && zhcnLabel.equalsIgnoreCase(LANG_ZH_CN)) {
            if (enFallbackurl == null || enFallbackurl.isEmpty() || enPath == null || enPath.isEmpty()) {
                redirectURI = null;
            }


            currentPageUri=currentPage.getPath().concat(".html");
            String currentPagePathUrl = currentPage.getPath();
            String urlLocal= String.valueOf(currentPage.getLanguage());
            if(urlLocal.equalsIgnoreCase(LANG_ZH_CN)){
                zh_cnURI=currentPagePathUrl.concat(".html");
                enURI=languageurlgenerator(currentPagePathUrl,zhcnPath,enPath).concat(".html");
                zh_hkURI=languageurlgenerator(currentPagePathUrl,zhcnPath,zhhkPath).concat(".html");

                Gson gson = new GsonBuilder().setPrettyPrinting().create();
                JsonArray array = new JsonArray();
                HeaderLanguage en = new HeaderLanguage();
                en.setTitle(enTitle);
                en.setLink(enURI);
                HeaderLanguage zh_hk = new HeaderLanguage();
                zh_hk.setTitle(zhhkTitle);
                zh_hk.setLink(zh_hkURI);
                HeaderLanguage zh_cn = new HeaderLanguage();
                zh_cn.setTitle(zhcnTitle);
                zh_cn.setLink(zh_cnURI);
                array.add(gson.toJson(en, HeaderLanguage.class));
                array.add(gson.toJson(zh_hk, HeaderLanguage.class));
                array.add(gson.toJson(zh_cn, HeaderLanguage.class));
                languages = gson.toJson(array, JsonArray.class);
                logger.info("languages :::: {}", languages);
            }
        }

    }
    private String languageurlgenerator(String currentPage ,String sourcePath, String destinationPath){
        if (sourcePath != null) {
            redirectURI = currentPage.replace(sourcePath, destinationPath);
        }
        return redirectURI;
    }

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
    public HeaderLanguage(){}

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
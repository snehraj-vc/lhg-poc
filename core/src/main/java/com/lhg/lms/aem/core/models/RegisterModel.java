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
        resourceType = RegisterModel.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class RegisterModel implements ComponentExporter {
    private static final Logger LOG = LoggerFactory.getLogger(RegisterModel.class);

    protected static final String RESOURCE_TYPE = "lhg-lms/components/register";

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String formid;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String className;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String formTitle;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String xApiKey;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String registerButtonLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String firstNameInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String firstNameInputPlaceholder;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String middleNameInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String middleNameInputPlaceholder;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String lastNameInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String lastNameInputPlaceholder;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String passwordInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String passwordInputPlaceholder;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String dobInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String cityInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String cityInputPlaceholder;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String countryInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String countryInputPlaceholder;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String emailInputLabel;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String emailInputPlaceholder;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String dobLocale;

    @SlingObject
    private ResourceResolver resourceResolver;

    @ChildResource
    @Named("salutations")
    private Resource serviceResource;

    private ArrayList<ServiceModelDTO> service = new ArrayList<>();
    @PostConstruct
    protected void init() {
        Iterable<Resource> multi = serviceResource.getChildren();
        for (Resource multiResource : multi){
            ValueMap valueMap = multiResource.getValueMap();
            ServiceModelDTO model = new ServiceModelDTO();
            model.setSalutationvalue(valueMap.get("salutationvalue",String.class));
            model.setSalutationtext(valueMap.get("salutationtext",String.class));
            service.add(model);
        }


    }



    public String getFormid(){
        return formid;
    }
    public String getClassName() {
        return className;
    }
    public String getFormTitle() {
        return formTitle;
    }
    public String getxApiKey() {
        return xApiKey;
    }
    public String getRegisterButtonLabel() {
        return registerButtonLabel;
    }
    public String getFirstNameInputLabel() {
        return firstNameInputLabel;
    }
    public String getFirstNameInputPlaceholder() {
        return firstNameInputPlaceholder;
    }
    public String getMiddleNameInputLabel() {
        return middleNameInputLabel;
    }
    public String getMiddleNameInputPlaceholder() {
        return middleNameInputPlaceholder;
    }
    public String getLastNameInputLabel(){
        return lastNameInputLabel;
    }
    public String getLastNameInputPlaceholder() {
        return lastNameInputPlaceholder;
    }
    public String getPasswordInputLabel(){
        return passwordInputLabel;
    }
    public String getPasswordInputPlaceholder() {
        return passwordInputPlaceholder;
    }
    public String getDobInputLabel(){
        return dobInputLabel;
    }
    public String getCityInputLabel() {
        return cityInputLabel;
    }
    public String getCityInputPlaceholder(){
        return cityInputPlaceholder;
    }
    public String getCountryInputLabel() {
        return countryInputLabel;
    }
    public String getCountryInputPlaceholder(){
        return countryInputPlaceholder;
    }
    public String getEmailInputLabel() {
        return emailInputLabel;
    }
    public String getEmailInputPlaceholder(){
        return emailInputPlaceholder;
    }
    public String getDobLocale() {
        return dobLocale;
    }
    public ArrayList<ServiceModelDTO> getSalutations(){
        return service;
    }

  //  @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }

}

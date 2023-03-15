package com.lhg.lms.aem.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
class LanghamHotels {
    private final Logger logger = LoggerFactory.getLogger(LanghamHotels.class);
    @ValueMapValue
    private String brandLogoPath;
    @ValueMapValue
    private String brandLogoAltText;

    public String getBrandLogoPath() {
        return brandLogoPath;
    }

    public String getBrandLogoAltText() {
        return brandLogoAltText;
    }

    public void setBrandLogoPath(String brandLogoPath) {
        this.brandLogoPath = brandLogoPath;
    }

    public void setBrandLogoAltText(String brandLogoAltText) { this.brandLogoAltText = brandLogoAltText; }
   /* @Inject
    private ArrayList<BrandsList> brandsListItems;
    public ArrayList<BrandsList> getBrandsList() {
        return brandsList;
    }
    public void setBrandsList(ArrayList<BrandsList> brandsList) {
        this.brandsList = brandsList;
    }*/

    @ChildResource(injectionStrategy = InjectionStrategy.OPTIONAL, name = "brandslist")
    private Resource brandslist;

    private ArrayList<BrandsList> brandsListItems=new ArrayList<>();


    @PostConstruct
    protected void init(){
        logger.info("brandLogoAltText::::::::::");
        logger.info(brandLogoAltText);
        if (brandslist!= null){
            Iterable<Resource> multi = brandslist.getChildren();
            for (Resource multiResource : multi){
                ValueMap valueMap = multiResource.getValueMap();
                BrandsList items=new BrandsList();
                items.setAltText(valueMap.get("altText",String.class));
                items.setLogoPath(valueMap.get("logoPath",String.class));
                brandsListItems.add(items);
            }}
    }
    public ArrayList<BrandsList> getBrandsList() {
        return brandsListItems;
    }

}

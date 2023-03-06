package com.lhg.lms.aem.core.models;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

/*@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)*/
class BrandsList {
    @ValueMapValue
    private String logoPath;
    @ValueMapValue
    private String altText;

    public String getLogoPath() {
        return logoPath;
    }

    public String getAltText() {
        return altText;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }
}

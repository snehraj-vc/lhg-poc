package com.lhg.lms.aem.core.models;

class CarouselItem {

    private String title;
    private String description;
    private String ctaText;
    private String ctaLink;
    private String desktopMedia;
    private String mobileMedia;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
    public String getCtaText() {
        return ctaText;
    }
    public String getCtaLink() {
        return ctaLink;
    }
    public String getDesktopMedia() {
        return desktopMedia;
    }
    public String getMobileMedia() {
        return mobileMedia;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setCtaText(String ctaText) {
        this.ctaText = ctaText;
    }
    public void setCtaLink(String ctaLink) {
        this.ctaLink = ctaLink;
    }
    public void setDesktopMedia(String desktopMedia) {
        this.desktopMedia = desktopMedia;
    }
    public void setMobileMedia(String mobileMedia) {
        this.mobileMedia = mobileMedia;
    }
}

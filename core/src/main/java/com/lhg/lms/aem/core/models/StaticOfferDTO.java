package com.lhg.lms.aem.core.models;


public class StaticOfferDTO {

    private String title;
    private String description;
    private String image;

    protected void init() {
    }


    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
    public String getImage() {
        return image;
    }



    public void setTitle(String val) {
        title = val;
    }

    public void setDescription(String value) {
        description = value;
    }

    public void setImage(String value) {
        image = value;
    }


}

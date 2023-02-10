package com.lhg.lms.aem.core.models;


public class ServiceModelDTO {

    private String salutationvalue;


    private String salutationtext;

    private String gendervalue;

    private String gendertext;


    protected void init() {

    }


    public String getSalutationvalue() {
        return salutationvalue;
    }

    public String getSalutationtext() {
        return salutationtext;
    }



    public void setSalutationvalue(String value) {
        salutationvalue = value;
    }

    public void setSalutationtext(String value) {
        salutationtext = value;
    }


}

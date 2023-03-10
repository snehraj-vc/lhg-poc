package com.lhg.lms.aem.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FirstSearch {
    private final Logger logger = LoggerFactory.getLogger(FirstSearch.class);

    @ValueMapValue
    private String title;
    @Inject
    private List<SecondSearch> secondMF;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<SecondSearch> getSecondMF() {
        return secondMF;
    }

    public void setSecondMF(List<SecondSearch> secondMF) {
        this.secondMF = secondMF;
    }

    @PostConstruct
    protected void init(){
        logger.info("Inner Multifield");
        logger.info(title);
    }

}

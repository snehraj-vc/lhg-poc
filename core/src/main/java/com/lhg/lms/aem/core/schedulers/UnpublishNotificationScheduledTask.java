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
package com.lhg.lms.aem.core.schedulers;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import com.day.cq.commons.Externalizer;
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import com.fasterxml.jackson.databind.ser.std.CalendarSerializer;
import com.lhg.lms.aem.core.services.config.UnpublishNotificationSchedulerTaskConfig;
import com.lhg.lms.aem.core.services.config.UnpublishSchedulerVariablesConfig;
import org.apache.commons.lang.CharEncoding;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.json.JSONException;
import org.json.JSONObject;
import org.eclipse.jetty.http.MetaData;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.*;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.request.*;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.Designate;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.servlet.ServletException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.*;
import org.apache.sling.api.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import static javax.servlet.jsp.PageContext.PAGE;


/**
 * A simple demo for cron-job like tasks that get executed regularly.
 * It also demonstrates how property values can be set. Users can
 * set the property values in /system/console/configMgr
 */
@Designate(ocd=UnpublishNotificationSchedulerTaskConfig.class)
@Component(service=Runnable.class, immediate = true, configurationPolicy = ConfigurationPolicy.REQUIRE)
public class UnpublishNotificationScheduledTask implements Runnable {

    private Value[] email;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    private String myParameter;
    private String schedulerExpression;
    private String resourceResolverFactorySubService;
    private String getEmailProperty;
    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private MessageGatewayService messageService;

    @Activate
    protected void activate(UnpublishNotificationSchedulerTaskConfig config, UnpublishSchedulerVariablesConfig schedulerConfig) {
        myParameter = config.myParameter();
        schedulerExpression = config.scheduler_expression();
        resourceResolverFactorySubService = schedulerConfig.resourceResolverFactorySubService();
        getEmailProperty = schedulerConfig.getEmailProperty();
    }

    @Override
    public void run() {
        logger.info("SimpleScheduledTask is now running, myParameter='{}'", myParameter);

        //sendUnpublishAlert();
        try {
            getPagesWithProperties();
        } catch (RepositoryException | ParseException e) {
            throw new RuntimeException(e);
        }
    }

    protected void sendUnpublishAlert(String pageTitle, String pagePath, String userId, ResourceResolver resolver, MessageGateway<HtmlEmail> messageGateway) {
        logger.info("Entering Service Implementation");
        Value[] email = null;
        UserManager userManager = resolver.adaptTo(UserManager.class);

        //logger.info("userManager: "  + userManager);

        try {
            //logger.info("Inside Try Block");
            Authorizable auth = userManager.getAuthorizable(userId);
            email = auth.getProperty(getEmailProperty);
            logger.info("\n--- User email = " + Arrays.stream(email).findFirst().toString());
            //logger.info("\n--- User, Principal="+auth.getID()+","+auth.getPrincipal().getName());
        } catch (RepositoryException e) {
            throw new RuntimeException(e);
        }

        messageGateway = messageService.getGateway(HtmlEmail.class);
        try {

            String userEmail = Arrays.stream(email).findFirst().get().getString();

            if (StringUtils.isBlank(userEmail)) {
                logger.info("3");
                return;
            }
            logger.info("userEmail");
         /*   logger.info(userEmail);
            HtmlEmail htmlEmail = new HtmlEmail();
            htmlEmail.setCharset(CharEncoding.UTF_8);
            htmlEmail.addTo(userEmail);
            htmlEmail.setSubject("Scheduler Unpublish Alert Mail Sent");
            htmlEmail.setMsg("Scheduler Unpublish Alert Body");
            htmlEmail.setHtmlMsg("<!DOCTYPE html><html><head></head><body><p>Page Title :"+pageTitle +"</p><p>Content AEM Path : "+pagePath +"</p></body></html>");
            messageGateway.send(htmlEmail);
            logger.info("Mail Sent ");*/
        } catch (Exception e) {
            // cannot send email. print some error
            logger.info("cannot send email. print some error:::::::::" + e.toString());
            e.printStackTrace();
        }
    }

    protected void getPagesWithProperties() throws RepositoryException, ParseException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String reminderDays = null;
        String pagePath = null;
        String pageTitle = null;
        String userId = null;
        logger.info("ResourceResolverFactory.SUBSERVICE :::: " + ResourceResolverFactory.SUBSERVICE);
        paramMap.put(ResourceResolverFactory.SUBSERVICE, resourceResolverFactorySubService);//

        ResourceResolver resolver = null;
        MessageGateway<HtmlEmail> messageGateway = null;
        try {
            logger.info("resourceResolverFactorySubService :::: " + resourceResolverFactorySubService);
            logger.info("resourceResolverFactory.getServiceResourceResolver(paramMap) :::: " + resourceResolverFactory.getServiceResourceResolver(paramMap));
            resolver = resourceResolverFactory.getServiceResourceResolver(paramMap);
            logger.info("resolver :::: " + resolver);
        } catch (LoginException e) {
            logger.info("Exception :::: " + e.getMessage());
            throw new RuntimeException(e);
        }

        logger.info("11111 :::: ");
        String[] paths = {"/content/lhg-lms/us/en", "/content/lhg-lms/us/fr"};
        //logger.info("22222 :::: ");
        Session session = resolver.adaptTo(Session.class);
        //logger.info("33333 :::: ");
        QueryBuilder queryBuilder = resolver.adaptTo(QueryBuilder.class);
        //logger.info("44444 :::: ");
        //List<Map<String, String>> pages = new ArrayList<>();
        //logger.info("55555 :::: ");
        Map<String, String> map = new HashMap<>();
        int Count = 1;
        for (int i = 0; i < paths.length; i++) {
            String groupPathKey = Count + "_group." + i + "_path";
            String groupPathValue = paths[i].toString();
            map.put(groupPathKey, groupPathValue);
        }

        //for (String path : paths) {
        //logger.info("66666 :::: ");
        // Map<String, String> map = new HashMap<>();

          /*  map.put("1_group.1_path", "/content/lhg-lms/us/en");
            map.put("1_group.2_path", "/content/lhg-lms/us/fr");*/
        map.put("1_group.p.or", "true");
        map.put("type", "cq:Page");
        //map.put("path", path);
        map.put("property", "jcr:content/@offTime");
        map.put("property.operation", "exists");
        map.put("relativedaterange.property", "jcr:content/offTime");
        //map.put("relativedaterange.lowerBound", "1d");
        map.put("relativedaterange.upperBound", myParameter + "d");
        map.put("p.limit", "-1");

        Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
        SearchResult result = query.getResult();

        logger.info("result Hits:: " + result.getTotalMatches());
        for (Hit hit : result.getHits()) {
            Resource resource = null;
            try {
                resource = hit.getResource();
                logger.info("resource hit:: " + resource);
                logger.info("resource.getResourceType():: " + resource.getResourceType());
            } catch (RepositoryException e) {
                throw new RuntimeException(e);
            }
            if (resource.getResourceType().equals("cq:Page")) {
                Page page = resource.adaptTo(Page.class);
                //logger.info("page:::::::: "+page);
                Map<String, String> pageProperties = new HashMap<>();
                pageProperties.put("title", page.getTitle());
                pageTitle = page.getTitle();
                //logger.info("title:::::::::: " + page.getTitle());
                pageProperties.put("description", page.getDescription());
                //logger.info("description: " + page.getDescription());
                pageProperties.put("path", page.getPath());
                //pagePath=page.getContentResource().getPath();
                logger.info("path Content path::::::::::::::: " + page.getPath());
                //logger.info("page.getContentResource().getPath()::::::::::::::: " + page.getContentResource().getPath());

                Externalizer externalizer = resolver.adaptTo(Externalizer.class);
                // String myExternalizedUrl = externalizer.authorLink(resolver, page.getPath()) + ".html";
                pagePath = externalizer.authorLink(resolver, page.getPath()) + ".html";
                logger.info("externalizer pagePath::::::::::::::: " + pagePath);
                logger.info("getLastModifiedBy::::::::::::::: " + page.getLastModifiedBy().toString());
                userId = page.getLastModifiedBy().toString();
                logger.info("getOffTime::::::::::::::: " + page.getOffTime().toString());


                //pages.add(pageProperties);
                Node pageNode = page.adaptTo(Node.class);
                if (pageNode.hasNode("jcr:content")) {
                    //logger.info("jcr:content");
                    Node contentNode = pageNode.getNode("jcr:content");
                    //  logger.info("Image node {}",contentNode.getPath());

                    if (contentNode != null) {
                        reminderDays = contentNode.getProperty("reminderDays").getValue().toString();
                        //logger.info("reminderDays:::::: " + reminderDays);
                    }
                }

                sendUnpublishAlert(pageTitle, pagePath, userId, resolver, messageGateway);
                //Reminder Days Logic Start
                /*
                int daysToRemind = Integer.parseInt(reminderDays);

                Date getOffTime = page.getOffTime().getTime();
                //logger.info("Parsed GetTime getOffTime::::::::::::::: " + getOffTime);
                Date currentDate = Calendar.getInstance().getTime();
                //logger.info("currentDate ::::::::::::::: " + currentDate );
                Calendar cal = Calendar.getInstance();
                cal.setTime(getOffTime);
                cal.add(Calendar.DATE, -daysToRemind);
                Date dateBeforeDaysToRemind = cal.getTime();

                    //logger.info("getOffTime - reminderDays::::::::::::::: " +  dateBeforeDaysToRemind);
                    if(getOffTime.after(currentDate) || getOffTime.equals(currentDate))
                    {
                        if(dateBeforeDaysToRemind.before(currentDate) || dateBeforeDaysToRemind.equals(currentDate)){
                            //logger.info("Send Reminder Mail:::::: ");
                            sendUnpublishAlert(pageTitle,pagePath, userId, resolver, messageGateway);
                        }else{
                            logger.info("Don't Send Reminder Mail:::::: ");
                        }
                    }
                }else{
                    logger.info("Not A Page ::::::::::::::: " + resource.getResourceType());
                }
                */
                //Reminder Days Logic END
            }
        }

            paramMap = null;
            queryBuilder = null;
            messageGateway = null;
            if (session != null && session.isLive()) {
                session.logout();
            }

            if (resolver != null && resolver.isLive()) {
                resolver.close();
            }
        }
    }


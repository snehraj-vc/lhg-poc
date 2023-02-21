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
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import com.fasterxml.jackson.databind.ser.std.CalendarSerializer;
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
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.metatype.annotations.AttributeDefinition;
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



/**
 * A simple demo for cron-job like tasks that get executed regularly.
 * It also demonstrates how property values can be set. Users can
 * set the property values in /system/console/configMgr
 */
@Designate(ocd=UnpublishNotificationScheduledTask.Config.class)
@Component(service=Runnable.class, immediate = true)
public class UnpublishNotificationScheduledTask implements Runnable  {

    private Value[] email;

    @ObjectClassDefinition(name="UnpublishNotificationScheduledTask",
            description = "Simple demo for cron-job like task with properties")
    public static @interface Config {

        @AttributeDefinition(name = "Cron-job expression")
        String scheduler_expression() default "0 * * * * ?";

        @AttributeDefinition(name = "Concurrent task",
                description = "Whether or not to schedule this task concurrently")
        boolean scheduler_concurrent() default false;

        @AttributeDefinition(name = "A parameter",
                description = "Can be configured in /system/console/configMgr")
        String myParameter() default "";
    }

    private final Logger logger = LoggerFactory.getLogger(getClass());

    private String myParameter;

    @Reference
    private ResourceResolverFactory resourceResolverFactory;

    @Reference
    private MessageGatewayService messageService;

    @Override
    public void run() {
        logger.info("SimpleScheduledTask is now running, myParameter='{}'", myParameter);

        //sendUnpublishAlert();
        try {
            getPagesWithProperties();
        } catch (RepositoryException | ParseException e) {
            throw new RuntimeException(e);
        }

       /* logger.info("000000 :::: ");
        Map<String, Object> param = new HashMap<>();
        logger.info("11111 :::: ");
        param.put(ResourceResolverFactory.SUBSERVICE, "UnpublishAlertSchedulerSubService");
        logger.info("2222222 :::: ");
        try {
            logger.info("333333 :::: ");
            ResourceResolver resolver = resourceResolverFactory.getServiceResourceResolver(param);
            logger.info("resolver :::: {}", resolver);
        } catch (LoginException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }*/
    }

    @Activate
    protected void activate(final Config config) {
        myParameter = config.myParameter();
    }

    protected void sendUnpublishAlert(String pagePath, String userId, ResourceResolver resolver, MessageGateway<HtmlEmail> messageGateway) {
        logger.info("Entering Service Implementation");
        Value[] email = null;
      /*  Map<String, Object> paramMap = new HashMap<String, Object>();

        paramMap.put(ResourceResolverFactory.SUBSERVICE, "UnpublishAlertSchedulerSubService");
        ResourceResolver resolver = null;*/

       /* try {
            resolver = resourceResolverFactory.getServiceResourceResolver(paramMap);
        } catch (LoginException e) {
            throw new RuntimeException(e);
        }*/
        //logger.info("Try block executed ");

        //logger.info("resolver"  + resolver);
        UserManager userManager =resolver.adaptTo(UserManager.class);
        //logger.info("userManager: "  + userManager);

        try {
            //logger.info("Inside Try Block");
            Authorizable auth = userManager.getAuthorizable(userId);
            email = auth.getProperty("./profile/email");
            logger.info("\n--- User email = "+ Arrays.stream(email).findFirst().toString());
            //logger.info("\n--- User, Principal="+auth.getID()+","+auth.getPrincipal().getName());
        } catch (RepositoryException e) {
            throw new RuntimeException(e);
        }

        messageGateway = messageService.getGateway(HtmlEmail.class);
        try {

            String userEmail = Arrays.stream(email).findFirst().get().getString();

            if(StringUtils.isBlank(userEmail)) {
                logger.info("3");
                return;
            }
            /*  logger.info("userEmail");
            logger.info(userEmail);
            HtmlEmail htmlEmail = new HtmlEmail();
            htmlEmail.setCharset(CharEncoding.UTF_8);
            htmlEmail.addTo(userEmail);
            htmlEmail.setSubject("Scheduler Unpublish Alert Mail Sent");
            htmlEmail.setMsg("Scheduler Unpublish Alert Body");
            htmlEmail.setHtmlMsg("<!DOCTYPE html><html><head></head><body><p>Content AEM Path : "+pagePath +"</p></body></html>");
            messageGateway.send(htmlEmail);*/
            logger.info("Mail Sent ");
        } catch(Exception e) {
            // cannot send email. print some error
            logger.info("cannot send email. print some error:::::::::" + e.toString());
            e.printStackTrace();
        }
    }

    protected void getPagesWithProperties() throws RepositoryException, ParseException {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        String reminderDays = null;
        String pagePath = null;
        String userId = null;
        paramMap.put(ResourceResolverFactory.SUBSERVICE, "UnpublishAlertSchedulerSubService");
        ResourceResolver resolver = null;
        MessageGateway<HtmlEmail> messageGateway = null;
        try {
            resolver = resourceResolverFactory.getServiceResourceResolver(paramMap);
        } catch (LoginException e) {
            throw new RuntimeException(e);
        }

        logger.info("11111 :::: ");
        String[] paths = { "/content/lhg-lms/us/en" };
        //logger.info("22222 :::: ");
        Session session = resolver.adaptTo(Session.class);
        //logger.info("33333 :::: ");
        QueryBuilder queryBuilder = resolver.adaptTo(QueryBuilder.class);
        //logger.info("44444 :::: ");
        //List<Map<String, String>> pages = new ArrayList<>();
        //logger.info("55555 :::: ");
        for (String path : paths) {
            //logger.info("66666 :::: ");
            Map<String, String> map = new HashMap<>();

            map.put("type", "cq:Page");
            map.put("path", path);
            map.put("property", "jcr:content/@offTime");
            map.put("property.operation", "exists");
            map.put("p.limit", "-1");

            Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
            SearchResult result = query.getResult();

            logger.info("result Hits:: "+result.getTotalMatches());
            for (Hit hit : result.getHits()) {
                Resource resource = null;
                try {
                    resource = hit.getResource();
                    logger.info("resource hit:: "+resource);
                    logger.info("resource.getResourceType():: "+resource.getResourceType());
                } catch (RepositoryException e) {
                    throw new RuntimeException(e);
                }
                if(resource.getResourceType().equals("cq:Page")){
                    Page page = resource.adaptTo(Page.class);
                    //logger.info("page:::::::: "+page);
                    Map<String, String> pageProperties = new HashMap<>();
                    pageProperties.put("title", page.getTitle());
                    //logger.info("title:::::::::: " + page.getTitle());
                    pageProperties.put("description", page.getDescription());
                    //logger.info("description: " + page.getDescription());
                    pageProperties.put("path", page.getPath());
                    pagePath=page.getPath();
                    logger.info("path::::::::::::::: " + page.getPath());

                    logger.info("getLastModifiedBy::::::::::::::: " + page.getLastModifiedBy().toString());
                    userId=page.getLastModifiedBy().toString();
                    logger.info("getOffTime::::::::::::::: " + page.getOffTime().toString());



                    //pages.add(pageProperties);
                Node pageNode = page.adaptTo(Node.class);
                if (pageNode.hasNode("jcr:content")) {
                    //logger.info("jcr:content");
                    Node contentNode=pageNode.getNode("jcr:content");
                  //  logger.info("Image node {}",contentNode.getPath());

                    if (contentNode != null) {
                        reminderDays = contentNode.getProperty("reminderDays").getValue().toString();
                        //logger.info("reminderDays:::::: " + reminderDays);
                    }
                }

                //logic

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
                            sendUnpublishAlert(pagePath, userId, resolver, messageGateway);
                        }else{
                            logger.info("Don't Send Reminder Mail:::::: ");
                        }
                    }
                }else{
                    logger.info("Not A Page ::::::::::::::: " + resource.getResourceType());
                }

            }
        }

        paramMap = null;
        resolver = null;
        session = null;
        queryBuilder = null;
        messageGateway = null;
    }
}

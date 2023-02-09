package com.lhg.lms.aem.core.servlets;

import org.apache.commons.lang3.CharEncoding;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.mail.HtmlEmail;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.osgi.PropertiesUtil;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import org.eclipse.jetty.http.MetaData;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Session;
import java.util.Iterator;
import java.util.Locale;

@Component(immediate = true)
public final class NotificationWorkflowProcess implements WorkflowProcess {

    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationWorkflowProcess.class);
    @Reference
    private MessageGatewayService messageService;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {

        LOGGER.info("Entering NotificationWorkflowProcess Handler");

        ResourceResolver resolver = workflowSession.adaptTo(ResourceResolver.class); // or get admin resolver here
        UserManager userManager = resolver.adaptTo(UserManager.class);

        MessageGateway<HtmlEmail> messageGateway = messageService.getGateway(HtmlEmail.class);
        try {
            LOGGER.info("Try Block");
            String initiator = workItem.getWorkflow().getInitiator();
            String pagePath = workItem.getContentPath().toString();

            Authorizable authorizable = userManager.getAuthorizable(initiator);
            LOGGER.info("1");
            LOGGER.info(initiator.toString());
            LOGGER.info(authorizable.toString());

            String userEmail = PropertiesUtil.toString(authorizable.getProperty("profile/email"), "");
            LOGGER.info("2");
            if(StringUtils.isBlank(userEmail)) {
                LOGGER.info("3");
                return;
            }
            LOGGER.info("userEmail");
            LOGGER.info(userEmail);
            HtmlEmail email = new HtmlEmail();
            email.setCharset(CharEncoding.UTF_8);
            email.addTo(userEmail);
            email.setSubject("Content Not Approved");
            email.setMsg("text email body: ");
            email.setHtmlMsg("<!DOCTYPE html><html><head></head><body><p>Content AEM Path : "+pagePath+"</p></body></html>");
            messageGateway.send(email);
        } catch(Exception e) {
            // cannot send email. print some error
            LOGGER.info(e.toString());
            e.printStackTrace();
        }
    }
}
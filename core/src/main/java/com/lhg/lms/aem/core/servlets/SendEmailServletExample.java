package com.lhg.lms.aem.core.servlets;
import com.day.cq.mailer.MessageGateway;
import com.day.cq.mailer.MessageGatewayService;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.json.JSONException;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.servlet.Servlet;
import java.io.IOException;

import static org.apache.sling.api.servlets.ServletResolverConstants.SLING_SERVLET_PATHS;

@Component(
        service = { Servlet.class },
        property = {
                SLING_SERVLET_PATHS + "=/bin/sendemail"
        }
)
public class SendEmailServletExample extends SlingAllMethodsServlet {

    private static final Logger LOGGER = LoggerFactory.getLogger(SendEmailServletExample.class);

    @Reference
    private MessageGatewayService messageGatewayService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
        JSONObject jsonResponse = new JSONObject();
        boolean sent = false;
        try {
            String[] recipients = { "rajatsharma.suresh@verticurl.com" };
            sendEmail("This is an test email",
                    "This is the email body", recipients);
            response.setStatus(200);
            sent = true;
        } catch (EmailException e) {
            response.setStatus(500);
        }
        try {
            jsonResponse.put("result", sent ? "done" : "something went wrong");
        } catch (JSONException e) {
            LOGGER.info(e.toString());
            e.printStackTrace();
        }
        response.getWriter().write(jsonResponse.toString());
    }

    private void sendEmail(String subjectLine, String msgBody, String[] recipients) throws EmailException {
        Email email = new HtmlEmail();
        for (String recipient : recipients) {
            email.addTo(recipient, recipient);
        }
        email.setSubject(subjectLine);
        email.setMsg(msgBody);
        MessageGateway<Email> messageGateway = messageGatewayService.getGateway(HtmlEmail.class);
        if (messageGateway != null) {
            LOGGER.debug("sending out email");
            messageGateway.send((Email) email);
        } else {
            LOGGER.error("The message gateway could not be retrieved.");
        }
    }
}

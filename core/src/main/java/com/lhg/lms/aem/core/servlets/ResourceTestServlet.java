package com.lhg.lms.aem.core.servlets;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.propertytypes.ServiceDescription;

import javax.servlet.Servlet;
import java.io.IOException;

@Component(service= Servlet.class,configurationPolicy = ConfigurationPolicy.REQUIRE)

@SlingServletResourceTypes(
        resourceTypes = "lhg-lms/components/page",
        methods = HttpConstants.METHOD_GET,
        extensions="txt"
)
@ServiceDescription("lhg - Resource Based Servlet")
public class ResourceTestServlet extends SlingSafeMethodsServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet (SlingHttpServletRequest req , SlingHttpServletResponse resp) throws IOException {
        Resource resource= req.getResource();
        ValueMap valueMap= resource.getValueMap();
        String title= valueMap.get("firstName",String.class);
        String id= valueMap.get("user-id",String.class);
//        resp.getWriter().write("Title :: {} "+ title);
        resp.getWriter().write("Title :: {} "+ title + "\n Id :: {} "+id);
    }
}

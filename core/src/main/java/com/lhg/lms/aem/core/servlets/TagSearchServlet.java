package com.lhg.lms.aem.core.servlets;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component(service= Servlet.class)

@SlingServletResourceTypes(
        resourceTypes = "sling/servlet/default",
        selectors ="tag",
        methods = HttpConstants.METHOD_GET,
        extensions="tagjson"
)
public class TagSearchServlet extends SlingSafeMethodsServlet {
    private static final long serialVersionUID = 1L;
    private final Logger logger = LoggerFactory.getLogger(TagSearchServlet.class);

    private transient QueryBuilder queryBuilder;
    @Reference
    private ResourceResolverFactory resolverFactory;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        logger.info("00000");
        String tagId = request.getParameter("tagId");
        String[] paths = request.getParameter("paths").split(",");
//          String[] paths = {"/content/lhg-lms/us/en/home"};
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put(ResourceResolverFactory.SUBSERVICE, "lhgService");
        logger.info("11111");
        ResourceResolver resolver = null;
        try {
            try {
                resolver = resolverFactory.getServiceResourceResolver(paramMap);
            } catch (LoginException e) {
                throw new RuntimeException(e);
            }
            logger.info("22222");
            Session session = resolver.adaptTo(Session.class);
            QueryBuilder queryBuilder = resolver.adaptTo(QueryBuilder.class);

            List<Map<String, String>> pages = new ArrayList<>();
            for (String path : paths) {
                Map<String, String> map = new HashMap<>();
                map.put("path", path);
                map.put("type", "cq:Page");
                map.put("1_property", "jcr:content/@cq:tags");
                map.put("1_property.value", tagId);
                logger.info("33333");
                Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
                SearchResult result = query.getResult();

                for (Hit hit : result.getHits()) {
                    Resource resource = null;
                    try {
                        resource = hit.getResource();
                    } catch (RepositoryException e) {
                        throw new RuntimeException(e);
                    }
                    logger.info("4444");
                    Page page = resource.adaptTo(Page.class);
                    Map<String, String> pageProperties = new HashMap<>();
                    pageProperties.put("title", page.getTitle());
                    pageProperties.put("description", page.getDescription());
                    pageProperties.put("path", page.getPath());
                    Node pageNode = page.adaptTo(Node.class);

                    if (pageNode.hasNode("jcr:content/image")) {
                        logger.info("Image1 Found");
                        Node imageNode=pageNode.getNode("jcr:content/image");
                        logger.info("Image node {}",imageNode.getPath());
                        logger.info("Image node {}",imageNode.getPath());
                        logger.info("Image1");
                        if (imageNode != null) {
                            String fileReference = imageNode.getProperty("fileReference").getString();
                            logger.info("Image2");
                            pageProperties.put("thumbnail", fileReference);
                            logger.info("Image3");
                        }
                    }
                    pages.add(pageProperties);

                }
            }

            Gson gson = new Gson();
            String json = gson.toJson(pages);
            response.getWriter().write(json);
            logger.info("55555");

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

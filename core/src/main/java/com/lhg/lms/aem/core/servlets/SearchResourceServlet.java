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
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.servlets.annotations.SlingServletResourceTypes;
import org.osgi.service.component.annotations.Component;

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
        resourceTypes = "lhg-lms/components/page",
        selectors ="data",
        methods = HttpConstants.METHOD_GET,
        extensions="json"
)
public class SearchResourceServlet extends SlingSafeMethodsServlet {
    private static final long serialVersionUID = 1L;

    private transient QueryBuilder queryBuilder;


    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response)
            throws ServletException, IOException {

        String keyword = "offers";
        String[] paths = { "/content/sitea", "/content/siteb", "/content/lhg-lms" };

        Session session = request.getResourceResolver().adaptTo(Session.class);

        QueryBuilder queryBuilder = request.getResourceResolver().adaptTo(QueryBuilder.class);

        List<Map<String, String>> pages = new ArrayList<>();
        for (String path : paths) {
            Map<String, String> map = new HashMap<>();
            map.put("type", "cq:Page");
            map.put("path", path);
            map.put("fulltext", keyword);
            map.put("p.limit", "-1");

            Query query = queryBuilder.createQuery(PredicateGroup.create(map), session);
            SearchResult result = query.getResult();

            for (Hit hit : result.getHits()) {
                Resource resource = null;
                try {
                    resource = hit.getResource();
                } catch (RepositoryException e) {
                    throw new RuntimeException(e);
                }
                Page page = resource.adaptTo(Page.class);
                Map<String, String> pageProperties = new HashMap<>();
                pageProperties.put("title", page.getTitle());
                pageProperties.put("description", page.getDescription());
                pageProperties.put("path", page.getPath());
                pages.add(pageProperties);
            }
        }

        Gson gson = new Gson();
        String json = gson.toJson(pages);
        response.getWriter().write(json);
    }
}

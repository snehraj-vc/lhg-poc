package com.lhg.lms.aem.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;

import javax.inject.Inject;
import java.util.List;


@Model(adaptables = SlingHttpServletRequest.class,
        adapters = {ComponentExporter.class},
        resourceType = Search.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class Search implements ComponentExporter {
    protected static final String RESOURCE_TYPE = "lhg-lms/components/headersearch";
    @Inject
    private List<FirstSearch> firstMF;

    public List<FirstSearch> getFirstMF() {
        return firstMF;
    }

    public void setFirstMF(List<FirstSearch> firstMF) {
        this.firstMF = firstMF;
    }
    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}

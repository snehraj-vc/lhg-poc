package com.lhg.lms.aem.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class,
adapters = {ComponentExporter.class},
resourceType = OlaPicModel.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class OlaPicModel {
	
protected static final String RESOURCE_TYPE = "lhg-lms/components/olapic";
    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String id;
    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String scriptLink;
    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String widgetName;
    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String instance;
    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String apikey;
    
    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
    protected String async;

    
	public String getId() {
		return id;
	}

	public String getScriptLink() {
		return scriptLink;
	}

	public String getWidgetName() {
		return widgetName;
	}

	public String getInstance() {
		return instance;
	}

	public String getApikey() {
		return apikey;
	}

	public String getAsync() {
		return async;
	}

	public String getExportedType() {
		return RESOURCE_TYPE;
	}

}

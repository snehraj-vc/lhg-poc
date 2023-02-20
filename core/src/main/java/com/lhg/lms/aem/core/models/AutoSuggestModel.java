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
resourceType = AutoSuggestModel.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class AutoSuggestModel implements ComponentExporter {

	protected static final String RESOURCE_TYPE = "lhg-lms/components/autosuggest";

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	protected String title;

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	protected String placeholderText;

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	protected String json;

	public String getTitle() {
		return title;
	}

	public String getPlaceholderText() {
		return placeholderText;
	}

	public String getJson() {
		return json;
	}

	@Override
	public String getExportedType() {
		return RESOURCE_TYPE;
	}

}

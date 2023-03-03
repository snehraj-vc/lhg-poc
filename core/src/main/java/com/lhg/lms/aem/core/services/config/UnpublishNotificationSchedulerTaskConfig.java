package com.lhg.lms.aem.core.services.config;

import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 *
 *
 * This is the configuration class that takes properties for a scheduler to run
 */
@ObjectClassDefinition(name = "UnpublishNotificationScheduledTask", description = "Unpublish Notification scheduler configuration")
public @interface UnpublishNotificationSchedulerTaskConfig {

    /**
     * This method will return the name of the Scheduler
     *
     * @return {@link String}
     */
    @AttributeDefinition(
            name = "Scheduler name",
            description = "Name of the scheduler",
            type = AttributeType.STRING)
    public String schdulerName() default "Unpublish Notification scheduler configuration";

    /**
     * This method returns the Cron expression which will decide how the scheduler will run
     *
     * @return {@link String}
     */
    @AttributeDefinition(
            name = "Cron-job expression",
            description = "Cron expression used by the scheduler",
            type = AttributeType.STRING)
    String scheduler_expression() default "0 0 0 * * ?";  //0 0 0 * * ? - everyday at midnight, 0 */5 * ? * * - every 5 min

    @AttributeDefinition(name = "Concurrent task",
            description = "Whether or not to schedule this task concurrently")
    boolean scheduler_concurrent() default false;

    /**
     * This method returns a custom parameter just to show case the functionality
     *
     * @return {@link String}
     */
    @AttributeDefinition(name = "Reminder Days",
            description = "Can be configured in /system/console/configMgr",
            type = AttributeType.STRING)
    String myParameter() default "4";

}
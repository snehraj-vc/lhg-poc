package com.lhg.lms.aem.core.services.config;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.AttributeType;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

/**
 *
 *
 * This is the configuration class that takes variables properties for a scheduler to run
 */
@ObjectClassDefinition(name="UnpublishSchedulerVariablesConfig",
        description = "")
public @interface UnpublishSchedulerVariablesConfig {

    /* @AttributeDefinition(name = "Cron-job expression")
     String scheduler_expression() default "0 * * * * ?";

     @AttributeDefinition(name = "Concurrent task",
             description = "Whether or not to schedule this task concurrently")
     boolean scheduler_concurrent() default false;

     @AttributeDefinition(name = "A parameter",
             description = "Can be configured in /system/console/configMgr")
     String myParameter() default "";
     */
    @AttributeDefinition(name = "ResourceResolverFactorySubService",
            description = "",
            type = AttributeType.STRING)
    String resourceResolverFactorySubService() default "lhgService";//UnpublishAlertSchedulerSubService

    @AttributeDefinition(name = "Get Email Property",
            description = "",
            type = AttributeType.STRING)
    String getEmailProperty() default "./profile/email";


}
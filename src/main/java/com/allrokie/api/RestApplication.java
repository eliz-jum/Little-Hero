package com.allrokie.api;

import io.swagger.jaxrs.config.BeanConfig;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by siulkilulki on 07.05.16.
 */
@ApplicationPath( "/v1" )
public class RestApplication extends Application
{
    private Set<Class<?>> classes = new HashSet<>();

    public RestApplication()
    {
        initSwagger();
    }

    private void initSwagger()
    {
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion( "1.0" );
        beanConfig.setSchemes(new String[]{"http"});
        beanConfig.setHost("localhost:8080");
        beanConfig.setBasePath("/v1");
        beanConfig.setResourcePackage("com.allrokie.api");
        beanConfig.setScan(true);
    }



    @Override
    public Set<Class<?>> getClasses() {
        classes.add(ChildsResource.class);

        classes.add(io.swagger.jaxrs.listing.ApiListingResource.class);
        classes.add(io.swagger.jaxrs.listing.SwaggerSerializers.class);

        return classes;
    }
}
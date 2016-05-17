package com.allrokie.api;

import io.swagger.jaxrs.config.BeanConfig;
import org.jboss.resteasy.plugins.interceptors.CorsFilter;

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
    public RestApplication()
    {
        initSwagger();
    }

    private void initSwagger()
    {
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion( "1.0" );
        beanConfig.setTitle( "Little Hero REST API" );
        beanConfig.setSchemes(new String[]{"http"});
        beanConfig.setHost("localhost:8080");
        beanConfig.setBasePath("/v1");
        beanConfig.setResourcePackage("com.allrokie.api");
        beanConfig.setScan(true);
    }

    @Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> classes = new HashSet<>();

        classes.add(ChildsResource.class);
        classes.add(AvatarsResource.class);
        classes.add(TasksResource.class);
        classes.add(TutorsResource.class);

        classes.add(io.swagger.jaxrs.listing.ApiListingResource.class);
        classes.add(io.swagger.jaxrs.listing.SwaggerSerializers.class);

        return classes;
    }

    @Override
    public Set<Object> getSingletons() {
        final HashSet<Object> singletons = new HashSet<Object>();
        CorsFilter corsFilter = new CorsFilter();
        corsFilter.getAllowedOrigins().add("*");
        corsFilter.setAllowedHeaders( "Origin, X-Requested-With, Content-Type, Accept" );

        singletons.add( corsFilter );

        return singletons;
    }
}
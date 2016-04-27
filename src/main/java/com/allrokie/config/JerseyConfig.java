package com.allrokie.config;

import com.allrokie.api.ChildEndpoint;
import com.allrokie.filters.CORSFilter;
import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.listing.ApiListingResource;
import io.swagger.models.Info;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

/**
 * Created by siulkilulki on 23.03.16.
 */
@Configuration
public class JerseyConfig extends ResourceConfig
{
    public JerseyConfig()
    {
        register( ChildEndpoint.class );
        register( CORSFilter.class );
        configureSwagger();
    }

    private void configureSwagger()
    {
        register( ApiListingResource.class );
        BeanConfig beanConfig = new BeanConfig();
        beanConfig.setVersion( "1.0" );
        beanConfig.setTitle( "LittleHero REST API" );
        beanConfig.setSchemes( new String[] { "http" } );
        beanConfig.setHost( "localhost:8080" );
        beanConfig.setBasePath( "/" );
        beanConfig.setResourcePackage( "com.allrokie.api" );
        beanConfig.setPrettyPrint( true );
        beanConfig.setScan( true );
    }
}

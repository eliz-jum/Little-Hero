package com.allrokie.server.config;

import com.allrokie.server.api.SampleEndpoint;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

/**
 * Created by siulkilulki on 23.03.16.
 */
@Configuration
public class JerseyConfig extends ResourceConfig
{
    public JerseyConfig(){
        register( SampleEndpoint.class );
    }
}

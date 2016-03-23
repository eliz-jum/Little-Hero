package com.allrokie.server.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * Created by siulkilulki on 23.03.16.
 */

@Path( "/sample" )
public class SampleEndpoint
{
    @GET
    @Path( "/" )
    @Produces("text/plain")
    public String sample(){
        return "Sample";
    }
}

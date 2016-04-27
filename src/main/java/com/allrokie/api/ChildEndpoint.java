package com.allrokie.api;

import com.allrokie.database.MemoryDB;
import com.allrokie.model.Child;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Collection;

/**
 * Created by siulkilulki on 23.03.16.
 */

@Path( "/childs" )
@Api( value = "/childs", description = "Operations about childs using static java array" )
public class ChildEndpoint
{
    private MemoryDB memoryDB = new MemoryDB();

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get childs collection", notes = "Get childs collection", response = Child.class)
    public Collection<Child> getChildCollection()
    {
        return memoryDB.getChilds();
    }

    @GET
    @Path( "/{childId}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get child", notes = "Get child", response = Child.class)
    public Child getChild(@PathParam( "childId" ) int id)
    {
        return memoryDB.getChild( id );
    }
}
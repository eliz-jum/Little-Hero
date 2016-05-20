package com.allrokie.api;

import com.allrokie.dao.ChildDao;
import com.allrokie.model.Child;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.List;

/**
 * Created by siulkilulki on 23.03.16.
 */

@Path( "/childs" )
@Api( value = "/childs", description = "Operations about childs" )
public class ChildsResource
{
    @Inject
    ChildDao dao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get childs collection", notes = "Get childs collection" )
    @Transactional
    public Response getChilds()
    {
        List<Child> all = dao.findAll();

        all.forEach( i -> i.getAvatars().size() );
        return Response.ok( all ).build();
    }

    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create child", notes = "none" )
    @Transactional
    public Response newChild( Child child, @Context UriInfo uriInfo )
    {
        dao.create( child );
        URI createdChildUri = uriInfo.getAbsolutePathBuilder().path( String.valueOf( child.getId() ) ).build();
        return Response.created( createdChildUri ).build();
    }

    //PUT

    @GET
    @Path( "/{id}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get child", notes = "Get child based on /{id}" )
    @Transactional
    public Response getChild( @PathParam( "id" ) long id )
    {
        Child child = dao.find( id );
        child.getAvatars().size();
        return Response.ok( child ).build();
    }

    @DELETE
    @Path( "/{id}" )
    @ApiOperation( value = "Delete child" )
    @Transactional
    public Response deleteChild( @PathParam( "id" ) long id )
    {
        Child child = dao.find( id );
        child.getAvatars().size();
        dao.remove( child );

        return Response.status( Response.Status.NO_CONTENT ).build();
    }
}
package com.allrokie.api;

import com.allrokie.dao.ItemDao;
import com.allrokie.model.Item;
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

/**
 * Created by siulkilulki on 28.05.16.
 */
@Path( "/items" )
@Api( value = "/items", description = "Operations about items" )
public class ItemsResource
{


    @Inject
    ItemDao itemDao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @Transactional
    public Response getItems()
    {
        return Response.ok( itemDao.findAll() ).build();
    }


    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create item" )
    @Transactional
    public Response newItem( Item item, @Context UriInfo uriInfo )
    {
        itemDao.create( item );

        URI createdItemUri = uriInfo.getAbsolutePathBuilder().path( item.getName() ).build();
        return Response.created( createdItemUri ).build();
    }

    @GET
    @Path( "/{name}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get item" )
    @Transactional
    public Response getItem( @PathParam( "name" ) String itemName )
    {
        return Response.ok( itemDao.find( itemName ) ).build();
    }

    @DELETE
    @Path( "/{name}" )
    @ApiOperation( value = "Delete item" )
    @Transactional
    public Response deleteItem( @PathParam( "name" ) String itemName )
    {
        Item item = itemDao.find( itemName );
        itemDao.remove( item );

        return Response.status( Response.Status.NO_CONTENT ).build();
    }
}

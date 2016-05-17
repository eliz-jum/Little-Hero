package com.allrokie.api;

import com.allrokie.dao.AvatarsDao;
import com.allrokie.dao.ChildDao;
import com.allrokie.model.Avatar;
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
 * Created by siulkilulki on 11.05.16.
 */
@Path( "/childs/{childId}/avatars" )
@Api( value = "/childs/{childId}/avatars", description = "Operations about childs" )
public class AvatarsResource
{
    @Inject
    AvatarsDao avatarsDao;
    @Inject
    ChildDao childDao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get avatars collection" )
    @Transactional
    public Response getAvatars( @PathParam( "childId" ) long childId )
    {
        Child child = childDao.find( childId );
        List<Avatar> avatars = child.getAvatars();
        return Response.ok( avatars ).build();
    }

    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create avatar" )
    @Transactional
    public Response newAvatar( Avatar avatar, @Context UriInfo uriInfo )
    {
        avatarsDao.create( avatar );
        URI createdChildUri = uriInfo.getAbsolutePathBuilder().path( String.valueOf( avatar.getId() ) ).build();
        return Response.created( createdChildUri ).build();
    }

    //PUT

    @GET
    @Path( "/{avatarId}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get avatar", notes = "Get avatar based on /{avatarId}", response = Avatar.class )
    @Transactional
    public Response getAvatar( @PathParam( "avatarId" ) long id )
    {
        Avatar avatar = avatarsDao.find( id );
        avatar.getTasks().size();
        avatar.getCanBePurchasedItems().size();
        avatar.getCanBePutOnItems().size();
        avatar.getWornItems().size();
        return Response.ok( avatar ).build();
    }
}

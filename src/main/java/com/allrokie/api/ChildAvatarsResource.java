package com.allrokie.api;

import com.allrokie.dao.AvatarDao;
import com.allrokie.dao.ChildDao;
import com.allrokie.dao.TutorDao;
import com.allrokie.json_object_creators.AvatarJson;
import com.allrokie.model.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.inject.Inject;
import javax.persistence.Query;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Path( "/childs/{childId}/avatars" )
@Api( value = "/childs/id/avatars", description = "Operations about avatars" )
public class ChildAvatarsResource
{
    @Inject
    AvatarDao avatarDao;
    @Inject
    ChildDao childDao;
    @Inject
    TutorDao tutorDao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get avatars collection" )
    @Transactional
    public Response getAvatars( @PathParam( "childId" ) long childId )
    {
        /*Child child = childDao.find( childId );
        child.getAvatars().size();
        List<Avatar> avatars = child.getAvatars();
        avatars.forEach( avatar -> {
            avatar.getTasks().size();
            avatar.getCanBePurchasedItems().size();
            avatar.getCanBePutOnItems().size();
            avatar.getWornItems().size();
        } );*/

        Query q = avatarDao.getEntityManager().createQuery( "SELECT a FROM Avatar a WHERE a.child.id = :id" );
        q.setParameter( "id", childId );

        List<Avatar> avatars = (List<Avatar>) q.getResultList();
        avatars.forEach( avatar -> {
            avatar.getTasks().size();
            avatar.getCanBePurchasedItems().size();
            avatar.getCanBePutOnItems().size();
            avatar.getWornItems().size();
            avatar.getChild().getId();
            avatar.getTutor().getId();
        } );

        return Response.ok( AvatarJson.createChildAvatarsArray( avatars ) ).build();
    }

    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create avatar" )
    @Transactional
    public Response newAvatar( Map<String, Object> json, @PathParam( "childId" ) long childId, @Context UriInfo uriInfo )
    {

        Avatar avatar = new Avatar();

        avatar.setTasks( new ArrayList<>() );

        avatar.setCanBePurchasedItems( (List<Item>) json.get( "canBePurchasedItems" ) );
        avatar.setCanBePutOnItems( (List<Item>) json.get( "canBePutOnItems" ) );
        avatar.setWornItems( (List<Item>) json.get( "wornItems" ) );
        avatar.setLevel( (int) json.get( "level" ) );
        avatar.setName( (String) json.get( "name" ) );
        avatar.setExperience( (int) json.get( "experience" ) );
        avatar.setHealth( (int) json.get( "health" ) );
        avatar.setMoney( (int) json.get( "money" ) );

        int tutorId = (int) json.get( "tutorId" );
        long id = (long) tutorId;
        Tutor tutor = tutorDao.find( id );
        tutor.getAvatars().size();
        tutor.getTasks().size();

        avatar.setTutor( tutor );

        Child child = childDao.find( childId );
        child.getAvatars().size();

        avatar.setChild( child );

        avatarDao.create( avatar );

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
        Avatar avatar = avatarDao.find( id );

        avatar.getTasks().size();
        avatar.getCanBePurchasedItems().size();
        avatar.getCanBePutOnItems().size();
        avatar.getWornItems().size();

        return Response.ok( AvatarJson.createChildAvatar( avatar ) ).build();
    }

    @DELETE
    @Path( "/{avatarId}" )
    @ApiOperation( value = "Get avatar" )
    @Transactional
    public Response deleteAvatar( @PathParam( "avatarId" ) long id )
    {
        Avatar avatar = avatarDao.find( id );

        avatar.getTasks().size();
        avatar.getCanBePurchasedItems().size();
        avatar.getCanBePutOnItems().size();
        avatar.getWornItems().size();

        avatarDao.remove( avatar );

        return Response.status( Response.Status.NO_CONTENT ).build();
    }

}
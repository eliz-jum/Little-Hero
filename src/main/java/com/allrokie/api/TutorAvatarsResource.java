package com.allrokie.api;

import com.allrokie.dao.AvatarsDao;
import com.allrokie.dao.TutorsDao;
import com.allrokie.json_object_creators.AvatarJson;
import com.allrokie.model.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.inject.Inject;
import javax.persistence.Query;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Path( "/tutors/{tutorId}/avatars" )
@Api( value = "/tutors/{tutorId}/avatars", description = "Operations about tutors" )
public class TutorAvatarsResource
{
    @Inject
    AvatarsDao avatarsDao;
    @Inject
    TutorsDao tutorsDao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get avatars collection" )
    @Transactional
    public Response getAvatars( @PathParam( "tutorId" ) long childId )
    {
        Query q = avatarsDao.getEntityManager().createQuery( "SELECT a FROM Avatar a WHERE a.tutor.id = :id" );
        q.setParameter( "id", childId );
        List<Avatar> avatars = (List<Avatar>) q.getResultList();

        //TODO: Do i need below?
        avatars.forEach( avatar -> {
            avatar.getTasks().size();
            avatar.getCanBePurchasedItems().size();
            avatar.getCanBePutOnItems().size();
            avatar.getWornItems().size();
        } );

        return Response.ok( AvatarJson.createChildTutorsArray( avatars ) ).build();
    }

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

        return Response.ok( AvatarJson.createTutorAvatar( avatar ) ).build();
    }
}
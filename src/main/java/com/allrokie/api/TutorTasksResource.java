package com.allrokie.api;

import com.allrokie.dao.AvatarsDao;
import com.allrokie.dao.TasksDao;
import com.allrokie.dao.TutorsDao;
import com.allrokie.model.Avatar;
import com.allrokie.model.Task;
import com.allrokie.model.Tutor;
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
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by siulkilulki on 19.05.16.
 */
@Path( "/tutors/{tutorId}/avatars" )
@Api( value = "/tutors/tutorId/avatars", description = "Operations about avatars" )
public class TutorTasksResource
{
    @Inject
    AvatarsDao avatarsDao;
    @Inject
    TutorsDao tutorsDao;
    @Inject
    TasksDao tasksDao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get avatars collection" )
    @Transactional
    public Response getAvatars( @PathParam( "tutorId" ) long tutorId )
    {
        Query q = avatarsDao.getEntityManager().createQuery( "SELECT a FROM Avatar a WHERE a.tutor.id = :id" );
        q.setParameter( "id", tutorId );
        List<Avatar> avatars = (List<Avatar>) q.getResultList();
        avatars.forEach( avatar -> {
            avatar.getTasks().size();
            avatar.getCanBePurchasedItems().size();
            avatar.getCanBePutOnItems().size();
            avatar.getWornItems().size();
        } );

        return Response.ok( avatars ).build();
    }

    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create task" )
    @Transactional
    public Response createTask( Map<String, Object> json, @PathParam( "tutorId" ) long tutorId,
                                @Context UriInfo uriInfo )
    {
        Task task = new Task();

        int avatarId = (int) json.get( "avatarId" );
        long id = (long) avatarId;
        Avatar avatar = avatarsDao.find( id );
        avatar.getTasks().size();
        avatar.getCanBePurchasedItems().size();
        avatar.getCanBePutOnItems().size();
        avatar.getWornItems().size();
        task.setAvatar( avatar );


        task.setMoney( (int) json.get( "money" ) );
        task.setExperiencePoints( (int) json.get( "experiencePoints" ) );
        task.setDifficulty( (int) json.get( "difficulty" ) );
        task.setArchived( (boolean) json.get( "archived" ) );
        task.setCompleted( (boolean) json.get( "completed" ) );

        task.setCreatedTimestamp( new Date().getTime() );

        task.setCompletedTimestamp( 0 );

        Tutor tutor = tutorsDao.find( tutorId );
        tutor.getAvatars().size();
        tutor.getTasks().size();
        task.setTutor( tutor );

        tasksDao.create( task );

        URI createdTaskUri = uriInfo.getAbsolutePathBuilder().path( String.valueOf( task.getId() ) ).build();

        return Response.created( createdTaskUri ).build();
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

        return Response.ok( avatar ).build();
    }

    @DELETE
    @Path( "/{taskId}" )
    @ApiOperation( value = "Delete task" )
    @Transactional
    public Response deleteTask( @PathParam( "taskId" ) long id )
    {
        tasksDao.remove( tasksDao.find( id ) );

        return Response.status( Response.Status.NO_CONTENT ).build();
    }
}

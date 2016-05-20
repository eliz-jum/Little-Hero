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

@Path( "/childs/{childId}/avatars/{avatarsId}/tasks" )
@Api( value = "/childs/id/avatars", description = "Operations about avatars" )
public class AvatarTasksResource
{
    @Inject
    AvatarsDao avatarsDao;
    @Inject
    TasksDao tasksDao;
    @Inject
    TutorsDao tutorsDao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get avatar tasks collection" )
    @Transactional
    public Response getAvatarTasks( @PathParam( "avatarsId" ) long avatarsId )
    {
        Query q = tasksDao.getEntityManager().createQuery( "SELECT t FROM Task t WHERE t.avatar.id = :id" );
        q.setParameter( "id", avatarsId );
        List<Task> tasks = (List<Task>) q.getResultList();

        return Response.ok( tasks ).build();
    }


    //TODO: Delete as it is probably not needed
    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create task" )
    @Transactional
    public Response createTask( Map<String, Object> json, @PathParam( "avatarsId" ) long avatarsId,
                                @Context UriInfo uriInfo )
    {
        Task task = new Task();

        int tutorId = (int) json.get( "tutorId" );
        long id = (long) tutorId;
        Tutor tutor = tutorsDao.find( id );
        tutor.getAvatars().size();
        tutor.getTasks().size();
        task.setTutor( tutor );


        task.setMoney( (int) json.get( "money" ) );
        task.setExperiencePoints( (int) json.get( "experiencePoints" ) );
        task.setDifficulty( (int) json.get( "difficulty" ) );
        task.setArchived( (boolean) json.get( "archived" ) );
        task.setCompleted( (boolean) json.get( "completed" ) );

        task.setCreatedTimestamp( new Date().getTime() );

        task.setCompletedTimestamp( 0 );

        Avatar avatar = avatarsDao.find( avatarsId );

        avatar.getTasks().size();
        avatar.getCanBePurchasedItems().size();
        avatar.getCanBePutOnItems().size();
        avatar.getWornItems().size();
        task.setAvatar( avatar );

        tasksDao.create( task );

        URI createdTaskUri = uriInfo.getAbsolutePathBuilder().path( String.valueOf( task.getId() ) ).build();

        return Response.created( createdTaskUri ).build();
    }

    @GET
    @Path( "/{taskId}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get task", response = Task.class )
    @Transactional
    public Response getTask( @PathParam( "taskId" ) long id )
    {
        Query q = tasksDao.getEntityManager().createQuery( "SELECT t FROM Task t WHERE t.id = :id" );
        q.setParameter( "id", id );
        Task task = (Task) q.getSingleResult();

        return Response.ok( task ).build();
    }

    //TODO: Delete as it is probably not needed
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

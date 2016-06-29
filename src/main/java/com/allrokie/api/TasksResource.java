package com.allrokie.api;

import com.allrokie.dao.AvatarDao;
import com.allrokie.dao.TaskDao;
import com.allrokie.dao.TutorDao;
import com.allrokie.json_object_creators.TaskJson;
import com.allrokie.model.Avatar;
import com.allrokie.model.Task;
import com.allrokie.model.Tutor;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.jaxrs.PATCH;

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
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by siulkilulki on 29.06.16.
 */
@Path( "/v1/tasks" )
@Api( value = "Tasks", description = "Operations about tasks" )
public class TasksResource
{
    @Inject
    TaskDao taskDao;
    @Inject
    TutorDao tutorDao;
    @Inject
    AvatarDao avatarDao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get tasks collection" )
    @Transactional
    public Response getTasks( @QueryParam( "avatarId" ) long avatarId, @QueryParam( "tutorId" ) long tutorId,
                              @Context UriInfo uriInfo )
    {
        List<Task> tasks;
        if( avatarId != 0 && tutorId != 0 )
        {
            Query q = taskDao.getEntityManager().createQuery( "SELECT t FROM Task t WHERE t.tutor.id = :tutorId " +
                    "AND t.avatar.id = :avatarId" );
            q.setParameter( "tutorId", tutorId );
            q.setParameter( "avatarId", avatarId );
            tasks = (List<Task>) q.getResultList();
        } else if( avatarId == 0 && tutorId != 0 )
        {
            Query q = taskDao.getEntityManager().createQuery( "SELECT t FROM Task t WHERE t.tutor.id = :id" );
            q.setParameter( "id", tutorId );
            tasks = (List<Task>) q.getResultList();
        } else if( avatarId != 0 && tutorId == 0 )
        {
            Query q = taskDao.getEntityManager().createQuery( "SELECT t FROM Task t WHERE t.avatar.id = :id" );
            q.setParameter( "id", avatarId );
            tasks = (List<Task>) q.getResultList();
        } else {
            tasks = taskDao.findAll();
        }

        return Response.ok( TaskJson.createTasksArray( tasks ) ).build();
    }

    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create task" )
    @Transactional
    public Response createTask( Map<String, Object> json, @Context UriInfo uriInfo )
    {
        Task task = new Task();

        int avatarId = (int) json.get( "avatarId" );
        long id = (long) avatarId;
        Avatar avatar = avatarDao.find( id );
        avatar.getTasks().size();
        avatar.getCanBePurchasedItems().size();
        avatar.getCanBePutOnItems().size();
        avatar.getWornItems().size();
        task.setAvatar( avatar );


        task.setMoney( (int) json.get( "money" ) );
        task.setExperiencePoints( (int) json.get( "experiencePoints" ) );
        task.setDifficulty( (int) json.get( "difficulty" ) );
        task.setContent( (String) json.get( "content" ) );

        task.setArchived( false );
        task.setCompleted( false );

        task.setCreatedTimestamp( new Date().getTime() );

        task.setCompletedTimestamp( 0 );

        int tutorId = (int) json.get( "tutorId" );
        long tutorId1 = (long) tutorId;
        Tutor tutor = tutorDao.find( tutorId1 );
        tutor.getAvatars().size();
        tutor.getTasks().size();
        task.setTutor( tutor );

        taskDao.create( task );

        URI createdTaskUri = uriInfo.getAbsolutePathBuilder().path( String.valueOf( task.getId() ) ).build();

        return Response.created( createdTaskUri ).build();
    }

    @PATCH
    @Path( "/{taskId}" )
    @Consumes( MediaType.APPLICATION_JSON )
    @Produces( MediaType.APPLICATION_JSON )
    @Transactional
    @ApiOperation( value = "Update task", response = Task.class)
    public Response updateTask( ArrayList<Map<String, Object>> json, @PathParam( "taskId" ) long id )
    {

        Task task = taskDao.find( id );
        // TODO: 29.05.16 change to sth cleaner
        for( Map<String, Object> command : json )
        {
            String operation = (String) command.get( "op" );
            if( operation.equals( "replace" ) )
            {
                String path = (String) command.get( "path" );
                boolean isCompleted = (boolean) command.get( "value" );
                switch( path )
                {
                    case "/isCompleted":
                        task.setCompleted( isCompleted );
                        break;
                    default:
                        return Response.status( Response.Status.BAD_REQUEST ).build();
                }

            }
        }

        taskDao.update( task );
        return Response.ok( TaskJson.createTask( task ) ).build();
    }

    @GET
    @Path( "/{taskId}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get task", response = Task.class )
    @Transactional
    public Response getTask( @PathParam( "taskId" ) long id )
    {
        Task task = taskDao.find( id );

        return Response.ok( TaskJson.createTask( task ) ).build();
    }

    @DELETE
    @Path( "/{taskId}" )
    @ApiOperation( value = "Delete task" )
    @Transactional
    public Response deleteTask( @PathParam( "taskId" ) long id )
    {
        taskDao.remove( taskDao.find( id ) );

        return Response.status( Response.Status.NO_CONTENT ).build();
    }
}

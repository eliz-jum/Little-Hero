package com.allrokie.api;

import com.allrokie.dao.TutorDao;
import com.allrokie.model.Tutor;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Path( "/v1/tutors" )
@Api( value = "Tutors", description = "Operations about tutors" )
public class TutorsResource
{
    @Inject
    TutorDao dao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get tutors collection" )
    @Transactional
    public Response getTutors()
    {
        List<Tutor> all = dao.findAll();

        all.forEach( i -> {
            i.getAvatars().size();
            i.getTasks().size();
        } );
        return Response.ok( all ).build();
    }

    @POST
    @Path( "/" )
    @Consumes( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Create tutor" )
    @Transactional
    public Response newTutor( Map<String, Object> json, @Context UriInfo uriInfo )
    {
        Tutor tutor = new Tutor();

        tutor.setLogin( (String) json.get( "login" ) );
        tutor.setPassword( (String) json.get( "password" ) );
        tutor.setName( (String) json.get( "name" ) );
        tutor.setMail( (String) json.get( "mail" ) );
        tutor.setAvatars( new ArrayList<>() );
        tutor.setTasks( new ArrayList<>() );

        dao.create( tutor );
        URI createdTutorUri = uriInfo.getAbsolutePathBuilder().path( String.valueOf( tutor.getId() ) ).build();
        return Response.created( createdTutorUri ).build();
    }

    //PUT

    @GET
    @Path( "/{id}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get tutor based on /{id}" )
    @Transactional
    public Response getTutor( @PathParam( "id" ) long id )
    {
        Tutor tutor = dao.find( id );
        tutor.getAvatars().size();
        tutor.getTasks().size();

        return Response.ok( tutor ).build();
    }

    @DELETE
    @Path( "/{id}" )
    @ApiOperation( value = "Delete tutor" )
    @Transactional
    public Response deleteTutor( @PathParam( "id" ) long id )
    {
        Tutor tutor = dao.find( id );
        tutor.getAvatars().size();
        tutor.getTasks().size();
        dao.remove( tutor );

        return Response.status( Response.Status.NO_CONTENT ).build();
    }
}

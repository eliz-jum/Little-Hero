package com.allrokie.api;

import com.allrokie.dao.TutorsDao;
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
import java.util.List;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Path( "/tutors" )
@Api( value = "/tutors", description = "Operations about tutors" )
public class TutorsResource
{
    @Inject
    TutorsDao dao;

    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON)
    @ApiOperation( value = "Get tutors collection")
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
    public Response newTutor( Tutor tutor, @Context UriInfo uriInfo )
    {
        dao.create( tutor );
        URI createdTutorUri = uriInfo.getAbsolutePathBuilder().path( String.valueOf( tutor.getId() ) ).build();
        return Response.created( createdTutorUri ).build();
    }

    //PUT

    @GET
    @Path( "/{id}" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get tutor based on /{id}")
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
    @ApiOperation( value = "Delete child" )
    @Transactional
    public Response deleteChild( @PathParam( "id" ) long id )
    {
        Tutor tutor = dao.find( id );
        tutor.getAvatars().size();
        tutor.getTasks().size();
        dao.remove( tutor );

        return Response.status( Response.Status.NO_CONTENT ).build();
    }
}

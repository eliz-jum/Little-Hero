package com.allrokie.api;

import com.allrokie.dao.ChildDao;
import com.allrokie.model.Child;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Random;

/**
 * Created by siulkilulki on 23.03.16.
 */

@Path( "/childs" )
@Api( value = "/childs", description = "Operations about childs using static java array" )
public class ChildsResource
{
    @Inject
    ChildDao dao;


    @GET
    @Path( "/" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get childs collection", notes = "Get childs collection", response = Child.class )
    @Transactional
    public Response getUsers()
    {
        List<Child> all = dao.findAll();

        all.forEach( i -> {

            i.getName();
            i.getId();
        } );
        return Response.ok( all ).build();
    }

    @GET
    @Path( "/create" )
    @Produces( MediaType.APPLICATION_JSON )
    @ApiOperation( value = "Get child", notes = "Get child", response = Child.class )
    @Transactional
    public Response newUser()
    {
        Child child = new Child();
        child.setSurname( "ktos" );
        child.setName( String.valueOf( new Random().nextInt() ) );

        dao.create( child );
        return Response.ok().build();
    }
}
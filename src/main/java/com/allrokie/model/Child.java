package com.allrokie.model;

import io.swagger.annotations.ApiModelProperty;

/**
 * Created by siulkilulki on 27.04.16.
 */
public class Child
{
    private int id;
    private String name;
    private String surname;

    public int getId()
    {
        return id;
    }

    @ApiModelProperty(value = "Child id", required = true)
    public void setId( int id )
    {
        this.id = id;
    }



    public Child( int id, String name, String surname )
    {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }

    @ApiModelProperty(value = "Child name", required = true)
    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    @ApiModelProperty(value = "Child surname", required = true)
    public String getSurname()
    {
        return surname;
    }

    public void setSurname( String surname )
    {
        this.surname = surname;
    }
}

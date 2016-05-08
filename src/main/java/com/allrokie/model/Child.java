package com.allrokie.model;

//import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

/**
 * Created by siulkilulki on 27.04.16.
 */
@Entity
@Table
public class Child
{

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private long id;

    @Column
    private String name;

    @Column
    private String surname;

    public Child()
    {
    }

    public long getId()
    {
        return id;
    }

    //@ApiModelProperty( value = "Child id", required = true )
    public void setId( int id )
    {
        this.id = id;
    }

    //@ApiModelProperty( value = "Child name", required = true )
    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    //@ApiModelProperty( value = "Child surname", required = true )
    public String getSurname()
    {
        return surname;
    }

    public void setSurname( String surname )
    {
        this.surname = surname;
    }
}

package com.allrokie.model;

import com.sun.istack.internal.NotNull;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.List;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Entity
@Table
public class Avatar
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    @NotBlank
    private String name;

    //jakieś itemy

    @OneToMany
    private List<Task> tasks;

    @ManyToOne
    @NotNull
    private Child owner;

    @ManyToOne
    @NotNull
    private Tutor tutor;

    public Avatar()
    {
    }

    @ApiModelProperty(name = "Avatar id", required = true)
    public long getId()
    {
        return id;
    }

    @ApiModelProperty(name = "Avatar name", required = true)
    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    @ApiModelProperty(name = "Avatar tasks")
    public List<Task> getTasks()
    {
        return tasks;
    }

    public void setTasks( List<Task> tasks )
    {
        this.tasks = tasks;
    }

    @ApiModelProperty(name = "Avatar owner", required = true)
    public Child getOwner()
    {
        return owner;
    }

    public void setOwner( Child owner )
    {
        this.owner = owner;
    }

    @ApiModelProperty(name = "Avatar owner", required = true)
    public Tutor getTutor()
    {
        return tutor;
    }

    public void setTutor( Tutor tutor )
    {
        this.tutor = tutor;
    }


}

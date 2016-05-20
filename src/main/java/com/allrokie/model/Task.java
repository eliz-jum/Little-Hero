package com.allrokie.model;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Entity
@Table
public class Task implements Serializable
{
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Column
    private int difficulty;//zielony żółty czerowny

    @Column
    private int experiencePoints;

    @Column
    @NotBlank
    private boolean completed;

    @Column
    @NotBlank
    private boolean archived;

    @Column
    private long createdTimestamp;

    @Column
    private long completedTimestamp;

    @Column
    private int money;

    @ManyToOne
    private Tutor tutor;

    @ManyToOne
    private Avatar avatar;

    public Task()
    {
    }

    public long getId()
    {
        return id;
    }

    @ApiModelProperty( value = "Task difficulty" )
    public int getDifficulty()
    {
        return difficulty;
    }

    public void setDifficulty( int difficulty )
    {
        this.difficulty = difficulty;
    }

    @ApiModelProperty( value = "Task experience points" )
    public int getExperiencePoints()
    {
        return experiencePoints;
    }

    public void setExperiencePoints( int experiencePoints )
    {
        this.experiencePoints = experiencePoints;
    }

    @ApiModelProperty( value = "Task completed or not" )
    public boolean isCompleted()
    {
        return completed;
    }

    public void setCompleted( boolean completed )
    {
        this.completed = completed;
    }

    @ApiModelProperty( value = "Task created timestamp" )
    public long getCreatedTimestamp()
    {
        return createdTimestamp;
    }

    public void setCreatedTimestamp( long createdTimestamp )
    {
        this.createdTimestamp = createdTimestamp;
    }

    @ApiModelProperty( value = "Task completed timestamp" )
    public long getCompletedTimestamp()
    {
        return completedTimestamp;
    }

    public void setCompletedTimestamp( long addedTimestamp )
    {
        this.completedTimestamp = addedTimestamp;
    }

    @ApiModelProperty( value = "Task archived or not" )
    public boolean isArchived()
    {
        return archived;
    }

    public void setArchived( boolean archived )
    {
        this.archived = archived;
    }

    @ApiModelProperty( value = "Task money reward" )
    public int getMoney()
    {
        return money;
    }

    public void setMoney( int money )
    {
        this.money = money;
    }

    @ApiModelProperty( value = "Task owner" )
    public Tutor getTutor()
    {
        return tutor;
    }

    public void setTutor( Tutor owner )
    {
        this.tutor = owner;
    }

    @ApiModelProperty( value = "Task avatar" )
    public Avatar getAvatar()
    {
        return avatar;
    }

    public void setAvatar( Avatar avatar )
    {
        this.avatar = avatar;
    }
}
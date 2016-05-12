package com.allrokie.model;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Entity
@Table
public class Task
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    private Tutor owner;

    @ManyToOne
    private Avatar avatar;

    public Task()
    {
    }

    @ApiModelProperty(name = "Task id", required = true)
    public long getId()
    {
        return id;
    }

    @ApiModelProperty(name = "Task difficulty")
    public int getDifficulty()
    {
        return difficulty;
    }

    public void setDifficulty( int difficulty )
    {
        this.difficulty = difficulty;
    }

    @ApiModelProperty(name = "Task experience points")
    public int getExperiencePoints()
    {
        return experiencePoints;
    }

    public void setExperiencePoints( int experiencePoints )
    {
        this.experiencePoints = experiencePoints;
    }

    @ApiModelProperty(name = "Task completed or not")
    public boolean isCompleted()
    {
        return completed;
    }

    public void setCompleted( boolean completed )
    {
        this.completed = completed;
    }

    @ApiModelProperty(name = "Task created timestamp")
    public long getCreatedTimestamp()
    {
        return createdTimestamp;
    }

    public void setCreatedTimestamp( long createdTimestamp )
    {
        this.createdTimestamp = createdTimestamp;
    }

    @ApiModelProperty(name = "Task completed timestamp")
    public long getCompletedTimestamp()
    {
        return completedTimestamp;
    }

    public void setCompletedTimestamp( long addedTimestamp )
    {
        this.completedTimestamp = addedTimestamp;
    }

    @ApiModelProperty(name = "Task archived or not")
    public boolean isArchived()
    {
        return archived;
    }

    public void setArchived( boolean archived )
    {
        this.archived = archived;
    }

    @ApiModelProperty(name = "Task money reward")
    public int getMoney()
    {
        return money;
    }

    public void setMoney( int money )
    {
        this.money = money;
    }

    @ApiModelProperty(name = "Task owner")
    public Tutor getOwner()
    {
        return owner;
    }

    public void setOwner( Tutor owner )
    {
        this.owner = owner;
    }

    @ApiModelProperty(name = "Task avatar")
    public Avatar getAvatar()
    {
        return avatar;
    }

    public void setAvatar( Avatar avatar )
    {
        this.avatar = avatar;
    }
}
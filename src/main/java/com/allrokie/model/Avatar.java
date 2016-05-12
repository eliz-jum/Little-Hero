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
    @GeneratedValue( strategy = GenerationType.AUTO )
    private long id;

    @Column
    @NotBlank
    private String name;

    @OneToMany
    private List<Item> wornItems;

    @OneToMany
    private List<Item> boughtItems; //bought items but not worn

    @OneToMany
    private List<Item> avaliableItems;

    @OneToMany
    private List<Task> tasks;

    @ManyToOne
    @NotNull
    private Child owner;

    @ManyToOne
    @NotNull
    private Tutor tutor;

    @Column
    private int level;

    @Column
    private int money;

    @Column
    private int health;

    @Column
    private int experience;

    public Avatar()
    {
    }

    @ApiModelProperty( name = "Avatar id", required = true )
    public long getId()
    {
        return id;
    }

    @ApiModelProperty( name = "Avatar name", required = true )
    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    @ApiModelProperty( name = "Avatar tasks" )
    public List<Task> getTasks()
    {
        return tasks;
    }

    public void setTasks( List<Task> tasks )
    {
        this.tasks = tasks;
    }

    @ApiModelProperty( name = "Avatar owner", required = true )
    public Child getOwner()
    {
        return owner;
    }

    public void setOwner( Child owner )
    {
        this.owner = owner;
    }

    @ApiModelProperty( name = "Avatar owner", required = true )
    public Tutor getTutor()
    {
        return tutor;
    }

    public void setTutor( Tutor tutor )
    {
        this.tutor = tutor;
    }

    @ApiModelProperty( name = "Avatar items" )
    public List<Item> getWornItems()
    {
        return wornItems;
    }

    public void setWornItems( List<Item> wornItems )
    {
        this.wornItems = wornItems;
    }

    @ApiModelProperty( name = "Avatar bought items" )
    public List<Item> getBoughtItems()
    {
        return boughtItems;
    }

    public void setBoughtItems( List<Item> boughtItems )
    {
        this.boughtItems = boughtItems;
    }

    @ApiModelProperty( name = "Avatar avaliable items" )
    public List<Item> getAvaliableItems()
    {
        return avaliableItems;
    }

    public void setAvaliableItems( List<Item> avaliableItems )
    {
        this.avaliableItems = avaliableItems;
    }

    @ApiModelProperty( name = "Avatar items level", required = true )
    public int getLevel()
    {
        return level;
    }

    public void setLevel( int level )
    {
        this.level = level;
    }

    @ApiModelProperty( name = "Avatar money" )
    public int getMoney()
    {
        return money;
    }

    public void setMoney( int money )
    {
        this.money = money;
    }

    @ApiModelProperty(name = "Avatar health")
    public int getHealth()
    {
        return health;
    }

    public void setHealth( int health )
    {
        this.health = health;
    }

    @ApiModelProperty(name = "Avatar experience")
    public int getExperience()
    {
        return experience;
    }

    public void setExperience( int experience )
    {
        this.experience = experience;
    }
}
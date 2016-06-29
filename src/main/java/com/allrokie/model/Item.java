package com.allrokie.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * Created by siulkilulki on 12.05.16.
 */
@Entity
@Table
@ApiModel( value = "Item", description = "Item resource representation" )

public class Item implements Serializable
{
    @Id
    @Column( name = "name" )
    private String name;

    @Column
    private int money;

    @Column
    private int level;

    @Column
    private String clazz;//enum

    @Column
    private String type;

    public Item()
    {
    }

    @ApiModelProperty( value = "Item name" )
    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    @ApiModelProperty( value = "Item money" )
    public int getMoney()
    {
        return money;
    }

    public void setMoney( int money )
    {
        this.money = money;
    }

    @ApiModelProperty( value = "Item level" )
    public int getLevel()
    {
        return level;
    }

    public void setLevel( int level )
    {
        this.level = level;
    }

    @ApiModelProperty( value = "Item class" )
    public String getClazz()
    {
        return clazz;
    }

    public void setClazz( String clazz )
    {
        this.clazz = clazz;
    }

    @ApiModelProperty( value = "Item type" )
    public String getType()
    {
        return type;
    }

    public void setType( String type )
    {
        this.type = type;
    }
}

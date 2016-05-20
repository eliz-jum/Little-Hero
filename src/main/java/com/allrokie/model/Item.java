package com.allrokie.model;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by siulkilulki on 12.05.16.
 */
@Entity
@Table
public class Item implements Serializable
{
    @Id
    @Column( name = "name", updatable = false, nullable = false )
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

    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    public int getMoney()
    {
        return money;
    }

    public void setMoney( int money )
    {
        this.money = money;
    }

    public int getLevel()
    {
        return level;
    }

    public void setLevel( int level )
    {
        this.level = level;
    }

    public String getClazz()
    {
        return clazz;
    }

    public void setClazz( String clazz )
    {
        this.clazz = clazz;
    }

    public String getType()
    {
        return type;
    }

    public void setType( String type )
    {
        this.type = type;
    }
}

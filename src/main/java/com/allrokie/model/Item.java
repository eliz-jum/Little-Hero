package com.allrokie.model;

import javax.persistence.*;

/**
 * Created by siulkilulki on 12.05.16.
 */
@Entity
@Table
public class Item
{
    @Id
    private String name;

    @Column
    private int money;

    @Column
    private int level;

    @Column
    private String clazz;//enum

    @Column
    private String type;


}

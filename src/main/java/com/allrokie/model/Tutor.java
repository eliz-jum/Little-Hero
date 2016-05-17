package com.allrokie.model;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Entity
@Table
public class Tutor implements Serializable
{
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column(name = "id", updatable = false, nullable = false)
    private long id;

    @Column
    private String login;

    @Column
    @NotBlank
    private String password; //TODO: change to byte array later

    @Column
    private String name;

    @Column
    @Email
    private String mail;

    @OneToMany
    private List<Avatar> avatars;

    @OneToMany
    private List<Task> tasks;

    public Tutor()
    {
    }

    public long getId()
    {
        return id;
    }

    @ApiModelProperty( value = "Tutor login" )
    public String getLogin()
    {
        return login;
    }

    public void setLogin( String login )
    {
        this.login = login;
    }

    @ApiModelProperty( value = "Tutor password" )
    public String getPassword()
    {
        return password;
    }

    public void setPassword( String password )
    {
        this.password = password;
    }

    @ApiModelProperty( value = "Tutor name" )
    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    @ApiModelProperty( value = "Tutor mail" )
    public String getMail()
    {
        return mail;
    }

    public void setMail( String mail )
    {
        this.mail = mail;
    }

    @ApiModelProperty( value = "Tutor avatars" )
    public List<Avatar> getAvatars()
    {
        return avatars;
    }

    public void setAvatars( List<Avatar> avatars )
    {
        this.avatars = avatars;
    }

    @ApiModelProperty( value = "Tutor tasks" )
    public List<Task> getTasks()
    {
        return tasks;
    }

    public void setTasks( List<Task> tasks )
    {
        this.tasks = tasks;
    }
}

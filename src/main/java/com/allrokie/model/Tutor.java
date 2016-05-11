package com.allrokie.model;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.List;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Entity
@Table
public class Tutor
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    @NotBlank
    private String login;

    @Column
    @NotBlank
    private String password; //TODO: change to byte array later

    @Column
    private String name;

    @Column
    private String surname;

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

    @ApiModelProperty(name = "Tutor id", required = true)
    public long getId()
    {
        return id;
    }

    @ApiModelProperty(name = "Tutor login", required = true)
    public String getLogin()
    {
        return login;
    }

    public void setLogin( String login )
    {
        this.login = login;
    }

    @ApiModelProperty(name = "Tutor password", required = true)
    public String getPassword()
    {
        return password;
    }

    public void setPassword( String password )
    {
        this.password = password;
    }

    @ApiModelProperty(name = "Tutor name")
    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    @ApiModelProperty(name = "Tutor surname")
    public String getSurname()
    {
        return surname;
    }

    public void setSurname( String surname )
    {
        this.surname = surname;
    }

    @ApiModelProperty(name = "Tutor mail")
    public String getMail()
    {
        return mail;
    }

    public void setMail( String mail )
    {
        this.mail = mail;
    }

    @ApiModelProperty(name = "Tutor avatars")
    public List<Avatar> getAvatars()
    {
        return avatars;
    }

    public void setAvatars( List<Avatar> avatars )
    {
        this.avatars = avatars;
    }

    @ApiModelProperty(name = "Tutor tasks")
    public List<Task> getTasks()
    {
        return tasks;
    }

    public void setTasks( List<Task> tasks )
    {
        this.tasks = tasks;
    }
}

package com.allrokie.model;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import java.util.List;

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
    @NotBlank
    private String login;

    @Column
    @NotBlank
    String password; //TODO: change to byte array later

    @Column
    private String nickname;

    @Column
    @Email
    private String mail;

    @OneToMany
    private List<Avatar> avatars;

    public Child()
    {
    }

    @ApiModelProperty( value = "Child id", required = true )
    public long getId()
    {
        return id;
    }

    @ApiModelProperty( value = "Child nickname" )
    public String getNickname()
    {
        return nickname;
    }

    public void setNickname( String name )
    {
        this.nickname = name;
    }


    @ApiModelProperty( value = "Child login", required = true )
    public String getLogin()
    {
        return login;
    }

    public void setLogin( String login )
    {
        this.login = login;
    }

    @ApiModelProperty( value = "Child password", required = true )
    public String getPassword()
    {
        return password;
    }

    public void setPassword( String password )
    {
        this.password = password;
    }

    @ApiModelProperty( value = "Child mail", required = true )
    public String getMail()
    {
        return mail;
    }

    public void setMail( String mail )
    {
        this.mail = mail;
    }

    @ApiModelProperty( value = "Child avatars" )
    public List<Avatar> getAvatars()
    {
        return avatars;
    }

    public void setAvatars( List<Avatar> avatars )
    {
        this.avatars = avatars;
    }


}

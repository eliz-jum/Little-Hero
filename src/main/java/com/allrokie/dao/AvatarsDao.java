package com.allrokie.dao;

import com.allrokie.model.Avatar;

import javax.ejb.Stateless;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Stateless
public class AvatarsDao extends GenericDao<Avatar>
{
    public AvatarsDao()
    {
        super( Avatar.class );
    }
}

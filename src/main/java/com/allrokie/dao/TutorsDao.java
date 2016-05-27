package com.allrokie.dao;

import com.allrokie.model.Tutor;

import javax.ejb.Stateless;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Stateless
public class TutorsDao extends GenericDao<Tutor>
{
    public TutorsDao()
    {
        super( Tutor.class );
    }
}

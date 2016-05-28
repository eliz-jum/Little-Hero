package com.allrokie.dao;

import com.allrokie.model.Tutor;

import javax.ejb.Stateless;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Stateless
public class TutorDao extends GenericDao<Tutor>
{
    public TutorDao()
    {
        super( Tutor.class );
    }
}

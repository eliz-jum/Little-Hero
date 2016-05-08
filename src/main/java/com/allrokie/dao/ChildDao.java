package com.allrokie.dao;

import com.allrokie.model.Child;

import javax.ejb.Stateless;

/**
 * Created by siulkilulki on 07.05.16.
 */
@Stateless
public class ChildDao extends GenericDao<Child>
{
    public ChildDao()
    {
        super( Child.class );
    }
}

package com.allrokie.dao;

import com.allrokie.model.Task;

import javax.ejb.Stateless;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Stateless
public class TaskDao extends GenericDao<Task>
{
    public TaskDao()
    {
        super( Task.class );
    }

}

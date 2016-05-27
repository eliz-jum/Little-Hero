package com.allrokie.dao;

import com.allrokie.model.Task;

import javax.ejb.Stateless;

/**
 * Created by siulkilulki on 11.05.16.
 */
@Stateless
public class TasksDao extends GenericDao<Task>
{
    public TasksDao()
    {
        super( Task.class );
    }

}

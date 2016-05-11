package com.allrokie.dao;

import com.allrokie.model.Task;

/**
 * Created by siulkilulki on 11.05.16.
 */
public class TasksDao extends GenericDao<Task>
{
    public TasksDao()
    {
        super( Task.class );
    }

}

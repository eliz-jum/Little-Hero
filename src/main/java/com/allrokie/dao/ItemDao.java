package com.allrokie.dao;

import com.allrokie.model.Item;

/**
 * Created by siulkilulki on 28.05.16.
 */
public class ItemDao extends GenericDao<Item>
{
    public ItemDao()
    {
        super( Item.class );
    }

}

package com.allrokie.dao;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

/**
 * Created by mbocian on 2016-05-04.
 */
@Stateless
public abstract class GenericDao<T>
{
    @Inject
    private EntityManager entityManager;
    private Class<T> clazz;

    public GenericDao( Class<T> clazz )
    {
        this.clazz = clazz;
    }

    public void create( T entity )
    {
        entityManager.persist( entity );
    }

    public void remove( T entity )
    {
        entityManager.remove( entity );
    }

    public void update( T entity )
    {
        entityManager.merge( entity );
    }

    public List<T> findAll()
    {
        return (List<T>)entityManager.createQuery( "SELECT t FROM " + clazz.getSimpleName() +" t" ).getResultList();
    }

    public EntityManager getEntityManager()
    {
        return entityManager;
    }
}

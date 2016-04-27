package com.allrokie.database;

import com.allrokie.model.Child;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by siulkilulki on 27.04.16.
 */
public class MemoryDB
{
    private static Map<Integer, Child> childs = new HashMap<Integer, Child>()
    {{
        put( 0, new Child( 0, "Jaś", "Kowalski" ) );
        put( 1, new Child( 1, "Justynka", "Tomaszewska" ) );
        put( 2, new Child( 2, "Karolek", "Jurkiewicz" ) );
    }};

    public Child getChild( int id )
    {
        return childs.get( id );
    }

    public Child updateChild( int id, Child child )
    {
        Child existingChild = childs.get(id);
        if(existingChild != null)
        {
            existingChild.setName( child.getName() );
            existingChild.setSurname( child.getSurname() );
        }
        return null;
    }

    public Child createChild( Child child )
    {
        int id = childs.size();
        Child value = new Child( id, child.getName(), child.getSurname() );
        childs.put( id, value );
        return value;
    }

    public Collection<Child> getChilds()
    {
        return childs.values();
    }
}

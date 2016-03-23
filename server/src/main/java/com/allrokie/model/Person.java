package com.allrokie.server.model;

/**
 * Created by siulkilulki on 23.03.16.
 */
public class Person
{
    private String name;
    private String surname;
    private String age;

    public Person( String name, String surname, String age )
    {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    public String getName()
    {
        return name;
    }

    public String getSurname()
    {
        return surname;
    }

    public String getAge()
    {
        return age;
    }
}

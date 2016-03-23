package com.allrokie.server.model;

import java.util.List;

/**
 * Created by siulkilulki on 23.03.16.
 */
public class Teacher
{
    private List<Subject> subjects;
    private List<School> schools;

    public Teacher( List<Subject> subjects, List<School> schools )
    {
        this.subjects = subjects;
        this.schools = schools;
    }
}

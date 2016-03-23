package com.allrokie.server.model;

/**
 * Created by siulkilulki on 23.03.16.
 */
public class Student
{
    private Class clas;
    private int grade;
    private School school;

    public Student( Class clas, int grade, School school )
    {
        this.clas = clas;
        this.grade = grade;
        this.school = school;
    }

    public Class getClas()
    {
        return clas;
    }

    public int getGrade()
    {
        return grade;
    }

    public School getSchool()
    {
        return school;
    }
}

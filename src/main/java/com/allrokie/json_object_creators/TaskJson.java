package com.allrokie.json_object_creators;

import com.allrokie.model.Task;

import javax.json.*;
import java.util.List;

/**
 * Created by siulkilulki on 28.05.16.
 */
public final class TaskJson
{
    public static JsonObject createTutorTask( Task task )
    {
        return getTaskJsonBuilder( task )
                .add( "avatarId", task.getAvatar().getId() )
                .build();
    }

    public static JsonObject createAvatarTask( Task task )
    {
        return getTaskJsonBuilder( task )
                .add( "tutorId", task.getTutor().getId() )
                .build();
    }

    public static JsonArray createTutorTasksArray( List<Task> tasks )
    {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

        tasks.forEach( task -> {
            jsonArrayBuilder
                    .add(
                            getTaskJsonBuilder( task )
                                    .add( "avatarId", task.getAvatar().getId() )
                    );
        } );
        return jsonArrayBuilder.build();
    }

    public static JsonArray createAvatarTasksArray( List<Task> tasks )
    {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

        tasks.forEach( task -> {
            jsonArrayBuilder
                    .add(
                            getTaskJsonBuilder( task )
                                    .add( "tutorId", task.getTutor().getId() )
                    );
        } );
        return jsonArrayBuilder.build();
    }

    private static JsonObjectBuilder getTaskJsonBuilder( Task task )
    {
        return Json.createObjectBuilder()
                .add( "id", task.getId() )
                .add( "difficulty", task.getDifficulty() )
                .add( "experiencePoints", task.getExperiencePoints() )
                .add( "content", task.getContent() )
                .add( "completed", task.isCompleted() )
                .add( "archived", task.isArchived() )
                .add( "createdTimestamp", task.getCreatedTimestamp() )
                .add( "completedTimestamp", task.getCompletedTimestamp() )
                .add( "money", task.getMoney() );
    }


}

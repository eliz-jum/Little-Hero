package com.allrokie.json_object_creators;

import com.allrokie.model.Avatar;

import javax.json.*;
import java.util.List;

/**
 * Created by siulkilulki on 27.05.16.
 */
public final class AvatarJson
{
    public static JsonObject createChildAvatar( Avatar avatar )
    {
        return getAvatarJsonBuilder( avatar )
                .add( "tutorId", avatar.getTutor().getId() )
                .build();
    }

    public static JsonObject createTutorAvatar( Avatar avatar )
    {
        return getAvatarJsonBuilder( avatar )
                .add( "childId", avatar.getChild().getId() )
                .build();
    }

    public static JsonArray createChildAvatarsArray( List<Avatar> avatars )
    {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

        avatars.forEach( avatar -> {
            jsonArrayBuilder
                    .add(
                            getAvatarJsonBuilder( avatar )
                                    .add( "tutorId", avatar.getTutor().getId() )
                    );
        } );
        return jsonArrayBuilder.build();
    }

    public static JsonArray createChildTutorsArray( List<Avatar> avatars )
    {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

        avatars.forEach( avatar -> {
            jsonArrayBuilder
                    .add(
                            getAvatarJsonBuilder( avatar )
                                    .add( "childId", avatar.getChild().getId() )
                    );
        } );
        return jsonArrayBuilder.build();
    }

    private static JsonObjectBuilder getAvatarJsonBuilder( Avatar avatar )
    {
        return Json.createObjectBuilder()
            .add( "id", avatar.getId() )
            .add( "name", avatar.getName() )
            .add( "experience", avatar.getExperience() )
            .add( "level", avatar.getLevel() )
            .add( "money", avatar.getMoney() )
            .add( "health", avatar.getHealth() );
    }

}
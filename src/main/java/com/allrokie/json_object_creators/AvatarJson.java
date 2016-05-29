package com.allrokie.json_object_creators;

import com.allrokie.model.Avatar;
import com.allrokie.model.Item;

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


        List<Item> wornItems = avatar.getWornItems();
        List<Item> canBePutOnItems = avatar.getCanBePutOnItems();
        List<Item> canBePurchasedItems = avatar.getCanBePurchasedItems();

        JsonArrayBuilder wornItemsJsonArrayBuilder = getItemJsonArrayBuilder( wornItems );
        JsonArrayBuilder canBePutOnItemsJsonArrayBuilder = getItemJsonArrayBuilder( canBePutOnItems );
        JsonArrayBuilder canBePurchasedItemsJsonArrayBuilder = getItemJsonArrayBuilder( canBePurchasedItems );

        return Json.createObjectBuilder()
                .add( "id", avatar.getId() )
                .add( "name", avatar.getName() )
                .add( "experience", avatar.getExperience() )
                .add( "level", avatar.getLevel() )
                .add( "money", avatar.getMoney() )
                .add( "health", avatar.getHealth() )
                .add( "wornItems", wornItemsJsonArrayBuilder )
                .add( "canBePutOnItems", canBePutOnItemsJsonArrayBuilder )
                .add( "canBePurchasedItems", canBePurchasedItemsJsonArrayBuilder );

    }

    private static JsonArrayBuilder getItemJsonArrayBuilder( List<Item> items )
    {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        items.forEach( item -> {
            jsonArrayBuilder
                    .add(
                            getItemJsonBuilder( item )
                    );
        } );

        return jsonArrayBuilder;
    }

    private static JsonObjectBuilder getItemJsonBuilder( Item item )
    {
        return Json.createObjectBuilder()
                .add( "name", item.getName() )
                .add( "money", item.getMoney() )
                .add( "level", item.getLevel() )
                .add( "clazz", item.getClazz() )
                .add( "type", item.getType() );
    }
}
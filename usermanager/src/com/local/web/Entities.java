/*
 * Document   : ComponentEntity.java
 * Created on : 2013-7-16, 20:33:29 
 * Author     : sun
 */
package com.local.web;

import java.util.HashMap;

public class Entities {

    public static final HashMap<String, String> ENTITY;

    static {
        ENTITY = new HashMap<String, String>();
        ENTITY.put("user", "com.local.db.User");        
    }

    public static String getEntity(String name) {
        if (name == null) {
            return null;
        }
        return ENTITY.get(name);
    }
}

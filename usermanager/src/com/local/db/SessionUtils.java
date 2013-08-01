/*
 * Document   : SessionUtils.java
 * Created on : 2013-7-3, 21:11:20 
 * Author     : sun
 */
package com.local.db;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class SessionUtils {

    private final static String CFG_FILE_PATH = "/hibernate.cfg.xml";
    private static SessionFactory sessionFactory;

    static {
        sessionFactory = new Configuration()
                .configure(CFG_FILE_PATH).buildSessionFactory();        
    }
    
    public static Session getTransactionSession() {
        Session session = sessionFactory.getCurrentSession();
        session.beginTransaction();
        return session;
    }

    public static void commit(Session session) {
        session.getTransaction().commit();
    }

    public static void rollback(Session session) {
        session.getTransaction().rollback();
    }
}

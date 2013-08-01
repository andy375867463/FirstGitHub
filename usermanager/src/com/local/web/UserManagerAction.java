/*
 * Document   : UserManagerAction.java
 * Created on : 2013-7-19, 12:20:31 
 * Author     : sun
 */
package com.local.web;

import com.local.db.SessionUtils;
import com.local.db.User;
import com.local.db.UserMetaData;
import org.hibernate.Session;

public class UserManagerAction extends BasicAction {
    
    private String name;
    private String addr;
    private int id = 0;
    private int age;
    private int sex;
    
    public String saveOrUpdate() throws Exception {
        User user = new User();
        user.setAddr(this.addr);
        user.setAge(this.age);
        user.setId(this.id);
        user.setName(this.name);
        user.setSex(this.sex);
        
        if (!UserMetaData.validate(user)) {
            addFieldError("id", "参数错误");
            return SUCCESS;
        }
        
        Session session = SessionUtils.getTransactionSession();
        session.saveOrUpdate(user);
        session.getTransaction().commit();
        return SUCCESS;
    }
    
    public String delete() {
        Session session = SessionUtils.getTransactionSession();
        User user = new User();
        user.setId(this.id);
        session.delete(user);
        session.getTransaction().commit();
        return SUCCESS;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getAddr() {
        return addr;
    }
    
    public void setAddr(String addr) {
        this.addr = addr;
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    public int getSex() {
        return sex;
    }
    
    public void setSex(int sex) {
        this.sex = sex;
    }
}

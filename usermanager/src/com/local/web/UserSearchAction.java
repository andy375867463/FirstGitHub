/*
 * Document   : SearchAction.java
 * Created on : 2013-7-16, 19:05:21 
 * Author     : sun
 */
package com.local.web;

import com.local.db.UserMetaData;
import java.util.regex.Pattern;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

public class UserSearchAction extends PageListAction {

    private String name ;
    private int sex = -1;
    private int age = -1;
    private String addr;
    private final static String EMPTY_STRING_PATTERN = "[\\s]*";

    @Override
    protected void addFilter(Criteria criteria) {
        if (this.name != null
                && !Pattern.matches(EMPTY_STRING_PATTERN, this.name)) {
            criteria.add(Restrictions.like("name", "%" + this.name + "%"));
        }
        if (this.addr != null
                && !Pattern.matches(EMPTY_STRING_PATTERN, this.addr)) {
            criteria.add(Restrictions.like("addr", "%" + this.addr + "%"));
        }
        if (this.age > -1) {
            criteria.add(Restrictions.eq("age", this.age));
        }
        if (this.sex == UserMetaData.SEX_MALE
                || this.sex == UserMetaData.SEX_MALE) {
            criteria.add(Restrictions.eq("sex", this.sex));
        }
    }

    @Override
    protected String getEntityName() {
        return Entities.getEntity("user");
    }

    @Override
    public String execute() throws Exception {
        return super.execute();
    }

    @Override
    protected void addOrder(Criteria criteria) {
        criteria.addOrder(Order.desc("name"));
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }
    
    
}

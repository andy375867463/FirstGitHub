/*
 * Document   : BasicAction.java
 * Created on : 2013-7-14, 8:46:55 
 * Author     : sun 
 */
package com.local.web;

import com.opensymphony.xwork2.ActionSupport;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.interceptor.ServletRequestAware;

public class BasicAction extends ActionSupport implements ServletRequestAware {

    protected HttpServletRequest request;
    @Override
    public void setServletRequest(HttpServletRequest hsr) {
        this.request = hsr;
    }
}

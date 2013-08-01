/*
 * Document   : PageListAction.java
 * Created on : 2013-7-17, 8:47:43 
 * Author     : sun
 */
package com.local.web;

import com.local.db.SessionUtils;
import com.local.tools.PageManager;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;


public abstract class PageListAction extends BasicAction {

    private PageManager page;
    private List data;
    private int start;
    private int maxShow;

    protected String getCountProjectionColName() {
        return "id";
    }

    protected abstract String getEntityName();

    protected void addFilter(Criteria criteria) {
    }

    protected void addOrder(Criteria criteria) {
    }

    @Override
    public String execute() throws Exception {
        String entity = getEntityName();
        page = new PageManager();
        page.setItemStart(start);
        page.setShowMaxCount(maxShow);

        Session session = SessionUtils.getTransactionSession();

        Criteria criteria = session.createCriteria(entity);
        addFilter(criteria);

        criteria.setProjection(Projections.count(getCountProjectionColName()));
        page.setItemCount(Integer.parseInt(criteria.list().get(0).toString()));

        criteria.setProjection(null);
        criteria.setFirstResult(page.getItemStart());
        criteria.setMaxResults(page.getShowMaxCount());
        addOrder(criteria);
        data = criteria.list();

        session.getTransaction().commit();
        return SUCCESS;
    }

    public PageManager getPage() {
        return page;
    }

    public List getData() {
        return data;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getMaxShow() {
        return maxShow;
    }

    public void setMaxShow(int maxShow) {
        this.maxShow = maxShow;
    }
}

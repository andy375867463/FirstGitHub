
<%@page import="com.local.db.UserMetaData"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page  buffer="64kb" %>
<%@page  import="java.util.*" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@taglib  uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib  uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="keywords" content="" >      
        <title>List</title> 
        <%@include  file="/common/srcRefs.jsp" %>
        <script src="${initParam.webUrl}/js/listManager.js"></script>
        <link href="${initParam.webUrl}/css/console_context.css" rel="stylesheet" />
        <style type="text/css">

        </style>
    </head>
    <body>        
        <c:set var="sexMale" value="<%= UserMetaData.SEX_MALE%>"/>
        <script>
            var queryObject = {
                name: "${name==null?'':name}",
                addr: "${addr==null?'':addr}",
                age: "${age==null?'':age}",
                sex: "${sex==null?'':sex}"
            };
            var queryString = $.param(queryObject);
        </script>
        <div id="list_container">            
            <form style="display: none;" id="edit_form" action="userManager_saveOrUpdate.do"></form>
            <table class="data_table" width="100%" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <td width="70">NUMBER</td>
                        <td width="150">NAME</td>
                        <td width="70">GENDER</td>
                        <td width="70">AGE</td>
                        <td >ADDRESS</td>                       
                        <td width="130">OPERATION</td>
                    </tr>
                </thead>
                <tbody>
                    <c:if test="${page.itemCount==0}">
                        <tr>
                            <td colspan="6">no data</td>
                        </tr>
                    </c:if>
                    <c:forEach items="${data}" var="item" varStatus="status">                   
                        <tr class="edit_row" style="display: none;">                           
                            <td>${status.index+page.itemStart+1}</td>
                            <td>
                                <input type="hidden" name="id" value="${item.id}"/>  
                                <input type="text" name="name" class="ui-input-basic" value="${item.name}" />
                            </td>  
                            <td>
                                <select name="sex" selected_v="${item.sex}">
                                    <option value="1">male</option>
                                    <option value="2">female</option>
                                </select>
                            </td>
                            <td>
                                <select name="age" selected_v="${item.age}"></select>
                            </td>
                            <td><input type="text" name="addr" class="ui-input-basic" value="${item.addr}" /></td>
                            <td>
                                <button type="button" class="ui-button-narrowest edit_submit">Submit</button>
                                <button type="button" class="ui-button-narrowest edit_cancel">Cancel</button>
                            </td>
                        </tr>

                        <tr item_id="${item.id}" item_name="${item.name}">                           
                            <td>${status.index+page.itemStart+1}</td>
                            <td>${item.name}</td>
                            <td>
                                <c:choose>
                                    <c:when test="${item.sex==sexMale}">male</c:when>
                                    <c:otherwise>female</c:otherwise>
                                </c:choose>                                
                            </td>
                            <td>${item.age}</td>
                            <td>${item.addr}</td>                           
                            <td>
                                <button type="button" class="ui-button-narrowest edit_prepare">更新</button>
                                <button type="button" class="ui-button-narrowest edit_delete" 
                                        url="userManager_delete.do">削除</button>
                            </td>
                        </tr>
                    </c:forEach> 
                </tbody>
            </table>
        </div>
        <div id="page_cmds_container">          
            <div id="page_manager">
                Total<span>${page.pageCount}</span>Page
                <span>${page.itemCount}</span>items
                <select class="page_max_show" selected_v="${page.showMaxCount}"> 
                    <option value="2">per page2items</option>
                    <option value="10">per page10items</option>
                    <option value="20">per page20items</option>
                    <option value="50">per page50items</option>
                    <option value="100">per page100items</option>
                </select>
                &nbsp;<a href="?start=0&maxShow=${page.showMaxCount}" 
                         class="${page.prevPageStart!=-1?'':'a_disable'}">First</a>
                &nbsp;<a href="?start=${page.prevPageStart}&maxShow=${page.showMaxCount}"
                         class="${page.prevPageStart!=-1?'':'a_disable'}">Previous</a>
                &nbsp;<a href="?start=${page.nextPageStart}&maxShow=${page.showMaxCount}" 
                         class="${page.nextPageStart!=-1?'':'a_disable'}">Next</a>
                &nbsp;<a href="?start=${(page.pageCount-1)*page.showMaxCount}&maxShow=${page.showMaxCount}"
                         class="${page.nextPageStart!=-1?'':'a_disable'}">Last</a>
            </div>   
            <div class="clear"></div>
        </div>
        <script>
            $(document).ready(function() {
                /* 更改了每页显示的条数 */
                $('.page_max_show').change(function() {
                    go("?start=0&maxShow=" + $(this).find('option:selected').val());
                });
                $("#page_manager a").click(function(e) {
                    e.preventDefault();
                    go($(this).attr("href"));
                });
                function go(url) {
                    window.location = url + "&" + queryString;
                }
            });
        </script>
    </body>
</html>

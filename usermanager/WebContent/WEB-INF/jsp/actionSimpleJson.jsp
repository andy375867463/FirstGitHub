<%--
   Document   : actionSimpleJson.jsp
   Author     : sun
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page  import="java.util.*" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@taglib  uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@taglib  uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%
%>
<c:set var="success" value="true"/>
<c:set var="info" value=""/>
<c:choose>
   <c:when test="${FieldErrors!=null&&fn:length(FieldErrors)>0}">
      <c:forEach items="${FieldErrors}" var="fieldItem">
         <c:forEach items="${fieldItem.value}" var="errorItem">
            <c:set var="success" value="false"/>
            <c:choose>
               <c:when test="${fn:length(info)>0}">
                  <c:set var="info" value="${info},${errorItem}"/>
               </c:when>
               <c:otherwise>
                  <c:set var="info" value="${info}${errorItem}"/>
               </c:otherwise>
            </c:choose>
         </c:forEach>
      </c:forEach>
   </c:when>
   <c:otherwise>
   </c:otherwise>
</c:choose>
{
"success":${success},
"info":"${fn:replace(info,'"','\\"')}"
}

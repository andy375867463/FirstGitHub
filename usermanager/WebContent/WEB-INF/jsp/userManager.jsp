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
        <meta name="author" content="yuan,382184760@qq.com" >
        <title>mapManager</title> 
        <%@include  file="/common/srcRefs.jsp" %>
        <%@include  file="/common/srcRefs_jquery_ui.jsp" %>

        <script src="${initParam.webUrl}/js/userAddManager.js"></script>

        <link href="${initParam.webUrl}/css/console_context.css" rel="stylesheet" />
        <link href="${initParam.webUrl}/css/componentManager.css" rel="stylesheet" />

        <style type="text/css">

        </style>
    </head>
    <body>       
        <div id="main">            
            <div id="add" class="box box_1st">
                <h4 class="box_title">
                    <span>Add new User information</span>
                </h4> 
                <div class="context">
                    <button type="button"  onclick="callAddDialog();" class="ui-button-broad">Add</button>
                </div>
            </div>

            <div id="add_dialog" style="display:none;" title="Add">                
                <form   action="userManager_saveOrUpdate.do" id="the_form" method="post">
                    <div class="space space-1st">
                        <span class="title">Name：</span>                       
                        <input class="ui-input"  type="text" name="name" value="" />
                    </div>                  

                    <div class="space">
                        <span class="title">Gender：</span>
                        <select name="sex">
                            <option>Please select</option>
                            <option value="1">male</option>  
                            <option value="2">female</option>  
                        </select>
                    </div>
                    <div class="space">
                        <span class="title">Age：</span>
                        <select name="age">
                            <option>Please select</option>
                        </select>
                    </div>

                    <div class="space">
                        <span class="title">Address：</span>
                        <input class="ui-input" type="text" name="addr" value="" />
                    </div>    
                </form>

                <div class="dialog_cmds">
                    <button id="add_submit_btn" class="ui-button-broad" type="button">Add</button>
                    <button id="dialog_close_btn" class="ui-button-broad" type="button">Cancel</button>
                    <span id="hint"></span>
                </div>
            </div>                    

            <div class="box">
                <h4 class="box_title">
                    <span>Search</span>
                </h4> 
                <div class="context"> 
                    <form target="list_frame" action="userSearch.do?start=0&maxShow=20">
                        <table class="query_table" width="100%" cellspacing="0" cellpadding="0" >
                            <tr>
                                <td width="70" class="title_td">Name</td>
                                <td width="110" class="input_td">
                                    <input type="text" class="ui-input-basic" name="name" value="" />
                                </td>
                                <td width="70" class="title_td">Gender</td>
                                <td  width="70" class="input_td">
                                    <select name="sex">
                                        <option value="-1">No limit</option>
                                        <option value="1">male</option>  
                                        <option value="2">female</option>  
                                    </select>
                                </td> 
                                <td width="70" class="title_td">Age</td>
                                <td width="70"  class="input_td">
                                    <select name="age">
                                        <option value="-1">No limit</option>
                                    </select>
                                </td> 
                                <td width="70" class="title_td">Address</td>
                                <td  width="170" class="input_td">
                                    <input type="text" class="ui-input-basic" name="addr" value="" />
                                </td> 
                                <td></td>
                            </tr>
                            <tr>
                                <!-- 列数注意与上一行对应 -->
                                <td colspan="9" class="cmd_td">
                                    <button type="submit" class="ui-button-narrow query_submit">情報検索</button> 
                                    &nbsp;<button type="reset" class="ui-button-narrow" >Reset</button>
                                    &nbsp;<span class="hint"></span>
                                    &nbsp;<span class="tips">When no limit ,input nothing</span>
                                </td>
                            </tr>
                        </table>
                    </form>                    
                </div>
            </div>

            <div id="manager" class="box">
                <h4 class="box_title">
                    <span>User information Management</span>
                </h4>
                <div class="context">
                    <iframe id="list_frame" name="list_frame" src="userSearch.do?start=0&maxShow=20" 
                            width="100%" height="200"  scrolling="no" frameborder="0" marginwidth="0" marginheight="0">
                    </iframe>
                </div>
                <script>
                        $('#list_frame').frameHeight()
                                .frameBlockWidth(400);
                        function listFrameReload() {
                            window.frames["list_frame"].location.reload();
                        }
                        $('body').bind('addSuccess', listFrameReload);
                </script>
            </div>
        </div>
    </body>
</html>
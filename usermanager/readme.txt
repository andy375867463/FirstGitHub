How to config this web APP

1.create the Database by the db_user.sql in  SQL\db_user.sql
2.config datasource for hibernate in your PC. 
    hibernate.cfg.xml  file :
 <property name="connection.url">jdbc:mysql://localhost:3306/db_user?characterEncoding=utf8</property>
 
 
3.config web.xml in the WEB-INF\.
   <context-param>
        <param-name>webUrl</param-name>
        <param-value>http://localhost:8080/usermanager</param-value>
    </context-param>
	set the root path  ,Attention don't need the slash after "usermanager"


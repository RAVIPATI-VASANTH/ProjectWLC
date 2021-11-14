package com.dbAccess.hostels;
//import com.classes.LandMarkLoadInfo;
import java.sql.*;

public class hostelRead {
	static String url= "jdbc:mysql://localhost:3306/hostelsdb";
	static String user= "dbreader";
	static String pass="read@database99";
	
	public static void getLandmarksBasicInfo() throws ClassNotFoundException, SQLException {
	
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();  
		ResultSet rs=stmt.executeQuery("select * from landmarks");  
		while(rs.next())  
		System.out.println(rs.getInt(1)+"#"+rs.getString(2)+"#"+rs.getString(3));
		System.out.println("retrived");
		con.close();
	}
}

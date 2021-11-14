package com.dbAccess.hostels;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class hostelWrite {
	static String url= "jdbc:mysql://localhost:3306/hostelsdb";
	static String user= "dbwriter";
	static String pass="write@database99";
	
	public static int createNewLandmark(String id,String fullname,String minicode,String des) throws ClassNotFoundException, SQLException {
		int status=0;
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();  
		ResultSet rs=stmt.executeQuery("");
		while(rs.next())
			///
		con.close();
		return status;
	}
}

package com.dbAccess.hostels;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class hostelWrite {
	static String url= "jdbc:mysql://localhost:3306/hostelsdb";
	static String user= "dbwriter";
	static String pass="write@database99";
	
	public static int createNewLandmark(String id,String fullname,String minicode,String des) throws ClassNotFoundException, SQLException {
		int status=0;
//		System.out.println("Called");
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		
		String sql="insert into landmarks values(?,?,?,?,?,?,?)";
		PreparedStatement st= con.prepareStatement(sql);
		st.setString(1,id);
		st.setString(2,minicode);
		st.setString(3,fullname);
		st.setString(4,des);
		st.setString(5,"");
		st.setString(6,"");
		st.setString(7,"");
		
		status=st.executeUpdate();
		con.close();
		return status;
	}
}

package com.dbAccess.hostels;
//import com.classes.LandMarkLoadInfo;
import java.sql.*;
import java.util.ArrayList;

import org.json.simple.*;

public class hostelRead {
	static String url= "jdbc:mysql://localhost:3306/hostelsdb";
	static String user= "dbreader";
	static String pass="read@database99";
	
	public static ArrayList<JSONObject> getLandmarksBasicInfo() throws ClassNotFoundException, SQLException {
	
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<JSONObject> list = new ArrayList<JSONObject>();
		try {
		ResultSet rs=stmt.executeQuery("select id,mini_code,full_name,hostels_table from landmarks");
		while(rs.next()) {
			JSONObject ob = new JSONObject();
			ob.put("id", rs.getString(1));
			ob.put("minicode", rs.getString(2));
			ob.put("fullname", rs.getString(3));
			Statement st=con.createStatement();
			String s="select hostel_id from "+rs.getString(4)+"";
			ResultSet r=st.executeQuery(s);
			ArrayList<String> l=new ArrayList<String>();
			while(r.next()) {
				l.add(r.getString((1)));
			}
			ob.put("hostel_ids", l);
			list.add(ob);
		}
		con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return list;
	}
}

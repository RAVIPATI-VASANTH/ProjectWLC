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
		ResultSet rs=stmt.executeQuery("select id,mini_code,full_name,hostels_table,coordinates from landmarks");
		while(rs.next()) {
			JSONObject ob = new JSONObject();
			ob.put("id", rs.getString(1));
			ob.put("minicode", rs.getString(2));
			ob.put("fullname", rs.getString(3));
			ob.put("htablesname", rs.getString(4));
			ob.put("location",rs.getString(5));
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
	
	public static ArrayList<JSONObject> getHostelsMiniData(String tname)throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<JSONObject> list = new ArrayList<JSONObject>();
		try {
			String sql="select hostel_id,hostel_name,hostel_gender,hostel_type,hostel_community,owner_contact from "+tname;
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()) {
				JSONObject ob = new JSONObject();
				ob.put("hid", rs.getString(1));
				ob.put("hname", rs.getString(2));
				ob.put("hgender", rs.getString(3));
				ob.put("htype", rs.getString(4));
				ob.put("hcommunity", rs.getString(5));
				ob.put("hcontact",rs.getString(6));
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

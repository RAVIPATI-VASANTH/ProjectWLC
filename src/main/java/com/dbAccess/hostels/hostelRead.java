package com.dbAccess.hostels;
import java.sql.*;
import java.util.ArrayList;

import org.json.simple.*;
import org.json.simple.JSONObject;

public class hostelRead {
//	static String url= "jdbc:mysql://mysql3000.mochahost.com:3306/websitel_hostelsdb";
//	static String user= "websitel_dbreader";
//	static String pass="read@database99";

	static String url= "jdbc:mysql://localhost:3306/hostelsdb";
	static String user= "dbreader";
	static String pass="read@database99";

	
	public static ArrayList<JSONObject> getLandmarksBasicInfo() throws ClassNotFoundException, SQLException {
	
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<JSONObject> list = new ArrayList<JSONObject>();
		try {
		ResultSet rs=stmt.executeQuery("SELECT id,mini_code,full_name,hostels_table,coordinates FROM landmarks");
		while(rs.next()) {
			JSONObject ob = new JSONObject();
			ob.put("id", rs.getString(1));
			ob.put("minicode", rs.getString(2));
			ob.put("fullname", rs.getString(3));
			ob.put("htablesname", rs.getString(4));
			ob.put("location",rs.getString(5));
			Statement st=con.createStatement();
			String s="SELECT hostel_id FROM "+rs.getString(4)+"";
			ResultSet r=st.executeQuery(s);
			ArrayList<String> l=new ArrayList<String>();
			while(r.next()) {
				l.add(r.getString((1)));
			}
			ob.put("hostel_ids", l);
			list.add(ob);
		}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return list;
	}
	
	public static ArrayList<JSONObject> getHostelsMiniData(String tname)throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<JSONObject> list = new ArrayList<JSONObject>();
		try {
			String sql="SELECT hostel_id,hostel_name,hostel_gender,hostel_type,hostel_community,owner_contact,hostel_searchscore FROM "+tname;
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()) {
				JSONObject ob = new JSONObject();
				ob.put("hid", rs.getString(1));
				ob.put("hname", rs.getString(2));
				ob.put("hgender", rs.getString(3));
				ob.put("htype", rs.getString(4));
				ob.put("hcommunity", rs.getString(5));
				ob.put("hcontact",rs.getString(6));
				ob.put("hsearchscore", rs.getString(7));
				list.add(ob);
			}
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		con.close();
		return list;
		
	}

	public static JSONObject getCountOfHostels()throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		JSONObject ob = new JSONObject();
		try {
			String sql="SELECT COUNT(id) FROM landmarks;";
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()) {
				ob.put("landmarkcount", rs.getInt(1));
			}
			sql="SELECT COUNT(hostel_id) FROM all_hostels;";
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				ob.put("hostelscount", rs.getInt(1));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return ob;
	}
	
	public static JSONObject getHostelBasicInfo(String id,String lanmincode) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		JSONObject ob = new JSONObject();
		try {
			String sql="SELECT hostels_table,full_name FROM landmarks WHERE mini_code ='"+lanmincode+"';";
			ResultSet rs=stmt.executeQuery(sql);
			String tname="";
			String lfname="";
			while(rs.next()) {
				tname=rs.getString(1);
				lfname=rs.getString(2);
			}
			sql="SELECT hostel_id,hostel_name,owner_name,owner_contact,hostel_type,hostel_gender,hostel_location,hostel_landmark,hostel_community,hostel_strength,hostel_headline,hostel_searchscore FROM "+tname+" WHERE hostel_id='"+id+"';";
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				ob.put("hid",rs.getString(1));
				ob.put("hname",rs.getString(2));
				ob.put("honame",rs.getString(3));
				ob.put("hocontact",rs.getString(4));
				ob.put("htype",rs.getString(5));
				ob.put("hgender",rs.getString(6));
				ob.put("hlocation",rs.getString(7));
				ob.put("hlandmark",rs.getString(8));
				ob.put("hcommunity",rs.getString(9));
				ob.put("hstrength",rs.getString(10));
				ob.put("hheadline",rs.getString(11));
				ob.put("hsearchscore", rs.getObject(12));
				ob.put("hlfname",lfname);
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return ob;
	}
	
	public static JSONObject getHostelFoodInfo(String id) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		JSONObject ob = new JSONObject();
		try {
			String sql="SELECT breakfast,lunch,snacks,dinner,nonveg FROM food_table WHERE hostel_id='"+id+"';";
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				ob.put("breakfast",rs.getString(1));
				ob.put("lunch",rs.getString(2));
				ob.put("snacks",rs.getString(3));
				ob.put("dinner",rs.getString(4));
				ob.put("nonveg",rs.getString(5));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return ob;
	}
	
	public static ArrayList<String> getHostelRoomInfo(String hid) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="SELECT roomcard FROM rooms_table WHERE hostel_id='"+hid+"';";
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return list;
	}
	
	public static ArrayList<String> getHostelPolicyInfo(String hid) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="SELECT policy FROM policies_table WHERE hostel_id='"+hid+"';";
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return list;
	}
	
	public static ArrayList<String> getHostelHotspotsInfo(String hid) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="SELECT hotspot FROM hotspots_table WHERE hostel_id='"+hid+"';";
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return list;
	}
	
	public static ArrayList<String> getHostelRequirementsInfo(String hid) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="SELECT requirement FROM requirements_table WHERE hostel_id='"+hid+"';";
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return list;
	}
	
	public static ArrayList<String> getHostelSpecializationInfo(String hid) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="SELECT speacialization FROM specializations_table WHERE hostel_id='"+hid+"';";
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return list;
	}

	public static int checkCredentials(String id,String password) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		try {
			String rspassword="";
			String sql="SELECT hostel_password FROM all_hostels WHERE hostel_id = '"+id+"'";
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()) {
				rspassword=rs.getString(1);
			}
			if(rspassword.equals("")) {
				System.out.print("this 2");
				con.close();
				return 0;
			}
			else if(password.equals(rspassword)) {
				System.out.print("this");
				con.close();
				return 1;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		System.out.print("this 3");		
		con.close();
		return 0;
	}
}


package com.dbAccess.hostels;
//import com.classes.LandMarkLoadInfo;
import java.sql.*;
import java.util.ArrayList;

import org.json.simple.*;
import org.json.simple.JSONObject;

public class hostelRead {
//	static String url= "jdbc:mysql://mysql3000.mochahost.com/hostelsdb";
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
			String sql="select hostel_id,hostel_name,hostel_gender,hostel_type,hostel_community,owner_contact,hostel_searchscore from "+tname;
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
			con.close();
			}
			catch(Exception e) {
				System.out.println(e.getMessage());
			}
		return list;
		
	}

	public static JSONObject getCountOfHostels()throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		JSONObject ob = new JSONObject();
		try {
			String sql="select count(id) from landmarks;";
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()) {
				ob.put("landmarkcount", rs.getInt(1));
			}
			sql="select count(hostel_id) from all_hostels;";
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				ob.put("hostelscount", rs.getInt(1));
			}
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return ob;
	}
	
	public static JSONObject getHostelBasicInfo(String id,String lanmincode) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		JSONObject ob = new JSONObject();
		try {
			String sql="select hostels_table,full_name from landmarks where mini_code ='"+lanmincode+"';";
			ResultSet rs=stmt.executeQuery(sql);
			String tname="";
			String lfname="";
			while(rs.next()) {
				tname=rs.getString(1);
				lfname=rs.getString(2);
			}
			sql="select hostel_id,hostel_name,owner_name,owner_contact,hostel_type,hostel_gender,hostel_location,hostel_landmark,hostel_community,hostel_strength,hostel_headline,hostel_roomtable,hostel_hotspottable,hostel_speacializationtable,hostel_policytable,hostel_requirementtable,hostel_searchscore from "+tname+" where hostel_id='"+id+"';";
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
				ob.put("hrtable",rs.getString(12));
				ob.put("hhtable",rs.getString(13));
				ob.put("hstable",rs.getString(14));
				ob.put("hptable",rs.getString(15));
				ob.put("hreqtable",rs.getString(16));
				ob.put("hsearchscore", rs.getObject(17));
				ob.put("hlfname",lfname);
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return ob;
	}
	
	public static JSONObject getHostelFoodInfo(String id) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		JSONObject ob = new JSONObject();
		try {
			String sql="select breakfast,lunch,snacks,dinner,nonveg from food_table where hostel_id='"+id+"';";
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				ob.put("breakfast",rs.getString(1));
				ob.put("lunch",rs.getString(2));
				ob.put("snacks",rs.getString(3));
				ob.put("dinner",rs.getString(4));
				ob.put("nonveg",rs.getString(5));
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return ob;
	}
	
	public static ArrayList<String> getHostelRoomInfo(String tname) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="select roomcard from "+tname;
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return list;
	}
	
	public static ArrayList<String> getHostelPolicyInfo(String tname) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="select policy from "+tname;
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return list;
	}
	
	public static ArrayList<String> getHostelHotspotsInfo(String tname) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="select hotspot from "+tname;
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return list;
	}
	
	public static ArrayList<String> getHostelRequirementsInfo(String tname) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="select requirement from "+tname;
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return list;
	}
	
	public static ArrayList<String> getHostelSpecializationInfo(String tname) throws ClassNotFoundException, SQLException{
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		ArrayList<String> list = new ArrayList<String>();
		try {
			String sql="select speacialization from "+tname;
			ResultSet rs=stmt.executeQuery(sql);
			rs=stmt.executeQuery(sql);
			while(rs.next()) {
				list.add(rs.getString(1));
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return list;
	}

	public static int checkCredentials(String id,String password) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		Statement stmt=con.createStatement();
		System.out.println("call for DB");
		try {
			String rspassword="";
			String sql="select hostel_password from all_hostels where hostel_id = '"+id+"'";
			ResultSet rs=stmt.executeQuery(sql);
			while(rs.next()) {
				rspassword=rs.getString(1);
			}
			con.close();
			System.out.println(id+" "+password+" "+rspassword+"@");
			System.out.println(password.equals(rspassword));
			if(rspassword.equals("")) {
				System.out.print("this 2");
				return 0;
			}
			else if(password.equals(rspassword)) {
				System.out.print("this");
				return 1;
			}
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		System.out.print("this 3");		
		return 0;
	}
}


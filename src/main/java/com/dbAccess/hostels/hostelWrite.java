package com.dbAccess.hostels;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;

import com.classFiles.hostels.dataContainers.HostelRegisterContainer;
import com.dbAccess.hostels.hostelRead;
public class hostelWrite {
//	static String url= "jdbc:mysql://mysql3000.mochahost.com:3306/websitel_hostelsdb";
//	static String user= "websitel_dbwriter";
//	static String pass="write@database99";

	static String url= "jdbc:mysql://localhost:3306/hostelsdb";
	static String user= "dbwriter";
	static String pass="write@database99";

	
	public static int createNewLandmark(String id,String minicode,String fullname,String tabname) throws ClassNotFoundException, SQLException {
		int status=0;
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);

		try {
			
			
			String sql="INSERT INTO landmarks VALUES(?,?,?,?,?,?,?);";
			PreparedStatement st= con.prepareStatement(sql);
			st.setString(1,id);
			st.setString(2,minicode);
			st.setString(3,fullname);
			st.setString(4,"");
			st.setString(5,tabname);
			st.setString(6,"");
			st.setString(7,"");
			status=st.executeUpdate();
			
			String sql2="CREATE TABLE "+tabname+" (hostel_id VARCHAR(25) NOT NULL UNIQUE,hostel_name VARCHAR(55),owner_name VARCHAR(30),owner_contact VARCHAR(15),hostel_type VARCHAR(15),hostel_gender VARCHAR(10),hostel_location VARCHAR(500),hostel_landmark VARCHAR(15),hostel_password VARCHAR(45),hostel_community VARCHAR(15),hostel_strength VARCHAR(25),hostel_headline VARCHAR(60),hostel_roomtable VARCHAR(55),hostel_hotspottable VARCHAR(55),hostel_speacializationtable VARCHAR(55),hostel_policytable VARCHAR(55),hostel_requirementtable VARCHAR(55),hostel_searchscore VARCHAR(15) ,PRIMARY KEY(hostel_id));";
			PreparedStatement smt= con.prepareStatement(sql2);
			status=smt.executeUpdate();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return status;
	}	

	public static int createNewHostel(HostelRegisterContainer h) throws ClassNotFoundException, SQLException {
		int status=0;
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			String sql="INSERT INTO "+h.htablename+" VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
			PreparedStatement smt=con.prepareStatement(sql);
			smt.setString(1,h.hid);
			smt.setString(2,h.hname);
			smt.setString(3,h.oname);
			smt.setString(4,h.ocontact);
			smt.setString(5,h.htype);
			smt.setString(6,h.hgender);
			smt.setString(7,h.hlocation);
			smt.setString(8,h.hlandmark);
			smt.setString(9,h.hpassword);
			smt.setString(10,h.hcommunityname);
			smt.setString(11,"0");
			smt.setString(12,"");
			h.hid=h.hid.toLowerCase();
			smt.setString(13,h.hid+"_roomtable");
			smt.setString(14,h.hid+"_hotspottable");
			smt.setString(15,h.hid+"_speacializationtable");
			smt.setString(16,h.hid+"_policytable");
			smt.setString(17,h.hid+"_requirementtable");
			smt.setString(18, "0");
			status=smt.executeUpdate();
			
			String rt=h.hid+"_roomtable";
			String ht=h.hid+"_hotspottable";
			String st=h.hid+"_speacializationtable";
			String pt=h.hid+"_policytable";
			String reqt=h.hid+"_requirementtable";
			
			sql="CREATE TABLE "+rt+" (roomcard VARCHAR(300));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="CREATE TABLE "+ht+" (hotspot VARCHAR(100));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="CREATE TABLE "+st+" (speacialization VARCHAR(150));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="CREATE TABLE "+pt+" (policy VARCHAR(150));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="CREATE TABLE "+reqt+" (requirement VARCHAR(100));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			h.hid=h.hid.toUpperCase();
			sql="INSERT INTO food_table VALUES(?,?,?,?,?,?);";
			smt=con.prepareStatement(sql);
			smt.setString(1,h.hid);
			smt.setString(2,"|||");
			smt.setString(3,"|||");
			smt.setString(4,"|||");
			smt.setString(5,"|||");
			smt.setString(6,"||");
			status=smt.executeUpdate();
			
			sql="INSERT INTO all_hostels VALUES(?,?);";
			smt=con.prepareStatement(sql);
			smt.setString(1, h.hid);
			smt.setString(2, h.hpassword);
			status=smt.executeUpdate();
			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return status;
	}

	public static boolean commitBasicInfo(JSONObject binfo) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			String minicode=binfo.get("hid").toString();
			
			String words[]=minicode.split("_");
			minicode=words[0];
			
			Statement stmt=con.createStatement();
			String sql="SELECT hostels_table FROM landmarks WHERE mini_code ='"+minicode+"';";
			ResultSet rs=stmt.executeQuery(sql);
			String tname="";
			while(rs.next()) {
				tname=rs.getString(1);
			}
			
			String hid=binfo.get("hid").toString();
			String hname=binfo.get("hname").toString();
			String hheadline=binfo.get("hheadline").toString();
			String honame=binfo.get("honame").toString();
			String hocontact=binfo.get("hocontact").toString();
			String hstrength=binfo.get("hstrength").toString();
			String htype=binfo.get("htype").toString();
			String hcommunity=binfo.get("hcommunity").toString();
			String hgender=binfo.get("hgender").toString();
			String hsscore=binfo.get("hsearchscore").toString();
			String hlocation=binfo.get("hlocation").toString();

			sql="UPDATE "+tname+" SET hostel_name=?,owner_name=?,owner_contact=?,hostel_type=?,hostel_gender=?,hostel_strength=?,hostel_headline=?,hostel_community=?,hostel_searchscore=?,hostel_location=? WHERE hostel_id=? ;";
			PreparedStatement smt=con.prepareStatement(sql);
			smt.setString(1,hname);
			smt.setString(2,honame);
			smt.setString(3,hocontact);
			smt.setString(4,htype);
			smt.setString(5,hgender);
			smt.setString(6,hstrength);
			smt.setString(7,hheadline);
			smt.setString(8,hcommunity);
			smt.setString(9,hsscore);
			smt.setString(10,hlocation);
			smt.setString(11, hid);
			smt.executeUpdate();
			con.close();
			return true;			
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return false;
	}
	
	public static boolean commitFoodInfo(JSONObject finfo,String id) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			String bf=finfo.get("breakfast").toString();
			String lun=finfo.get("lunch").toString();
			String sn=finfo.get("snacks").toString();
			String din=finfo.get("dinner").toString();
			String non=finfo.get("nonveg").toString();
			
			String sql="UPDATE food_table SET breakfast=?,lunch=?,snacks=?,dinner=?,nonveg=? WHERE hostel_id=? ;";
			PreparedStatement smt=con.prepareStatement(sql);
			smt.setString(1,bf);
			smt.setString(2,lun);
			smt.setString(3,sn);
			smt.setString(4,din);
			smt.setString(5,non);
			smt.setString(6,id);
			smt.executeUpdate();
			con.close();
			return true;
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return false;
	}
	
	public static boolean commitRoomInfo(List<String> roomlist,String tname) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			Statement stmt=con.createStatement();
			
			stmt.execute("TRUNCATE TABLE "+tname+";");
			if(!roomlist.isEmpty()) {
				for(String s: roomlist) {
					if(s=="") {
						continue;
					}
					s=s.substring(1, s.length()-1);
					
					String sql="INSERT INTO "+tname+" VALUES(?);";
					PreparedStatement smt=con.prepareStatement(sql);
					smt.setString(1,s);
					smt.executeUpdate();
				}
				con.close();
				return true;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return false;
	}
	
	public static boolean commitPolicyInfo(List<String> policylist,String tname) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			Statement stmt=con.createStatement();
			
			stmt.execute("TRUNCATE TABLE "+tname+";");
			if(!policylist.isEmpty()) {				
				for(String s: policylist) {
					if(s=="") {
						continue;
					}
					s=s.substring(1, s.length()-1);
					String sql="INSERT INTO "+tname+" VALUES(?);";
					PreparedStatement smt=con.prepareStatement(sql);
					smt.setString(1,s);
					smt.executeUpdate();
				}
				con.close();
				return true;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return false;
	}

	public static boolean commitHotspotInfo(List<String> hotspotslist,String tname) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			Statement stmt=con.createStatement();
			
			stmt.execute("TRUNCATE TABLE "+tname+";");
			if(!hotspotslist.isEmpty()) {				
				for(String s: hotspotslist) {
					if(s=="") {
						continue;
					}
					s=s.substring(1, s.length()-1);
					String sql="INSERT INTO "+tname+" VALUES(?);";
					PreparedStatement smt=con.prepareStatement(sql);
					smt.setString(1,s);
					smt.executeUpdate();
				}
				con.close();
				return true;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return false;
	}

	public static boolean commitReqInfo(List<String> requirementslist,String tname) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			Statement stmt=con.createStatement();
			
			stmt.execute("TRUNCATE TABLE "+tname+";");
			if(!requirementslist.isEmpty()) {				
				for(String s: requirementslist) {
					if(s=="") {
						continue;
					}
					s=s.substring(1, s.length()-1);
					String sql="INSERT INTO "+tname+" VALUES(?);";
					PreparedStatement smt=con.prepareStatement(sql);
					smt.setString(1,s);
					smt.executeUpdate();
				}
				con.close();
				return true;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return false;
	}

	public static boolean commitSpecInfo(List<String> specslist,String tname) throws ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			Statement stmt=con.createStatement();
			
			stmt.execute("TRUNCATE TABLE "+tname+";");
			if(!specslist.isEmpty()) {				
				for(String s: specslist) {
					if(s=="") {
						continue;
					}
					s=s.substring(1, s.length()-1);
					String sql="INSERT INTO "+tname+" VALUES(?);";
					PreparedStatement smt=con.prepareStatement(sql);
					smt.setString(1,s);
					smt.executeUpdate();
				}
				con.close();
				return true;
			}
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		con.close();
		return false;
	}
}

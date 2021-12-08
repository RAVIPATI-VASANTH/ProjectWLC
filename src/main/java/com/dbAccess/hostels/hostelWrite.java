package com.dbAccess.hostels;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import com.classes.hostels.dataContainers.HostelRegisterContainer;
import com.dbAccess.hostels.hostelRead;
public class hostelWrite {
	static String url= "jdbc:mysql://localhost:3306/hostelsdb";
	static String user= "dbwriter";
	static String pass="write@database99";
	
	public static int createNewLandmark(String id,String minicode,String fullname,String tabname) throws ClassNotFoundException, SQLException {
		int status=0;
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);

		String sql="insert into landmarks values(?,?,?,?,?,?,?)";
		PreparedStatement st= con.prepareStatement(sql);
		st.setString(1,id);
		st.setString(2,minicode);
		st.setString(3,fullname);
		st.setString(4,"");
		st.setString(5,tabname);
		st.setString(6,"");
		st.setString(7,"");
		status=st.executeUpdate();

		String sql2="create table "+tabname+" (hostel_id VARCHAR(15) NOT NULL unique,hostel_name VARCHAR(45),owner_name VARCHAR(20),owner_contact VARCHAR(15),hostel_type VARCHAR(10),hostel_gender VARCHAR(10),hostel_location VARCHAR(30),hostel_landmark VARCHAR(15),hostel_password VARCHAR(45),hostel_community VARCHAR(15),hostel_strength VARCHAR(5),hostel_headline VARCHAR(45),hostel_roomtable VARCHAR(45),hostel_hotspottable VARCHAR(45),hostel_speacializationtable VARCHAR(45),hostel_policytable VARCHAR(45),hostel_requirementtable VARCHAR(45) ,PRIMARY KEY(hostel_id))";
		PreparedStatement smt= con.prepareStatement(sql2);
		status=smt.executeUpdate();
		con.close();
		return status;
	}

	public static int createNewHostel(HostelRegisterContainer h) throws ClassNotFoundException, SQLException {
		int status=0;
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
//			System.out.println("called");
			String sql="insert into "+h.htablename+" values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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
			status=smt.executeUpdate();
			
			String rt=h.hid+"_roomtable";
			String ht=h.hid+"_hotspottable";
			String st=h.hid+"_speacializationtable";
			String pt=h.hid+"_policytable";
			String reqt=h.hid+"_requirementtable";
			
			sql="create table "+rt+" (roomcard VARCHAR(300));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="create table "+ht+" (hotspot VARCHAR(50));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="create table "+st+" (speacialization VARCHAR(100));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="create table "+pt+" (policy VARCHAR(150));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			sql="create table "+reqt+" (requirement VARCHAR(100));";
			smt=con.prepareStatement(sql);
			smt.executeUpdate();
			
			h.hid=h.hid.toUpperCase();
			sql="insert into food_table values(?,?,?,?,?,?)";
			smt=con.prepareStatement(sql);
			smt.setString(1,h.hid);
			smt.setString(2,"");
			smt.setString(3,"");
			smt.setString(4,"");
			smt.setString(5,"");
			smt.setString(6,"");
			status=smt.executeUpdate();

			con.close();
		}
		catch(Exception e) {
			System.out.println("here 2"+e.getMessage());
		}
		return status;
	}
}

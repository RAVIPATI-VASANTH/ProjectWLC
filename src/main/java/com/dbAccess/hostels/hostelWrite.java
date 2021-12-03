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
//		System.out.println("Called");
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

		String sql2="create table "+tabname+" (hostel_id VARCHAR(15) NOT NULL unique,hostel_name VARCHAR(45),owner_name VARCHAR(20),owner_contact VARCHAR(15),hostel_type VARCHAR(10),hostel_gender VARCHAR(10),hostel_location VARCHAR(30),hostel_landmark VARCHAR(15),hostel_password VARCHAR(45),hostel_community VARCHAR(15) ,PRIMARY KEY(hostel_id))";
		PreparedStatement smt= con.prepareStatement(sql2);
		status=smt.executeUpdate();
//		con.commit();
		con.close();
		Connection con1=DriverManager.getConnection(url,user,pass);
		con1.close();
//		return 1;
		return status;
	}
	
	public static int createNewHostel(HostelRegisterContainer h) throws ClassNotFoundException, SQLException {
		int status=0;
		Class.forName("com.mysql.jdbc.Driver");
		Connection con=DriverManager.getConnection(url,user,pass);
		try {
			if(h.htablename=="other_lan") {
				String sql="insert into other_lan values(?,?,?,?,?,?,?,?,?,?,?)";
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
				smt.setString(11, h.hlfname);
				status=smt.executeUpdate();
			}
			else {
				System.out.println("called");
				String sql="insert into "+h.htablename+" values(?,?,?,?,?,?,?,?,?,?)";
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
				status=smt.executeUpdate();	
			}
			con.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return status;
	}
}

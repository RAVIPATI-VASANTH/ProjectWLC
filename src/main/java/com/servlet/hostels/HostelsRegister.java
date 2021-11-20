package com.servlet.hostels;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.dbAccess.hostels.*;

@WebServlet("/hostelRegister")
public class HostelsRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==1) {
////			System.out.println("Called");
//			String id= (String)request.getParameter("id");
//			String name=(String)request.getParameter("name");
//			String des=(String)request.getParameter("des");
//			String minicode =(String)request.getParameter("mcode");
			System.out.println(request.getParameter("hname"));
			System.out.println(request.getParameter("hid"));
			System.out.println(request.getParameter("hlocation"));
			System.out.println(request.getParameter("htype"));
			System.out.println(request.getParameter("oname"));
			PrintWriter out=response.getWriter();
			out.println("hello world");
//			try {
//				int resultSignal=hostelWrite.createNewLandmark(id, name, minicode, des);
//				PrintWriter out=response.getWriter();
//				if (resultSignal==0) {
//					out.println("error");	
//				}
//				else {
//					out.println("success");
//				}
//			} catch (ClassNotFoundException | SQLException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//				PrintWriter out=response.getWriter();
//				out.println("error");
//			}
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==1) {
			try {
				ArrayList<JSONObject> list= hostelRead.getLandmarksBasicInfo();
				PrintWriter out = response.getWriter();
				out.println(list.toString());
//				System.out.println(list.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				System.out.println("hello"+e.getMessage());
			}
		}
	}
}

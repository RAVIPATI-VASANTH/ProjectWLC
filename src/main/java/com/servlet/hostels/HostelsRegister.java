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
import com.classes.hostels.dataContainers.HostelRegisterContainer;
@WebServlet("/hostelRegister")
public class HostelsRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==1) {
			HostelRegisterContainer h=new HostelRegisterContainer();

			h.hname=(String)request.getParameter("hname");
			h.hid=(String)request.getParameter("hid");
			h.hlocation=(String)request.getParameter("hlocation");
			h.htype=(String)request.getParameter("htype");
			h.oname=(String)request.getParameter("oname");
			h.ocontact=(String)request.getParameter("ocontact");
			h.hgender=(String)request.getParameter("hgender");
			h.hcommunityname=(String)request.getParameter("hcommunityname");
			h.hlandmark=(String)request.getParameter("hlandmark");
			h.hpassword=(String)request.getParameter("hpassword");

			PrintWriter out=response.getWriter();
			try {
				int resultSignal=hostelWrite.createNewHostel(h);
				if (resultSignal==0) {
					out.println("error");
				}
				else {
					out.println("success");
					//Create here a Session Object
					
					response.sendRedirect("hostelWorkSpace.jsp");
				}
			} catch (ClassNotFoundException | SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				out.println("error");
			}
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==1) {
			try {
				ArrayList<JSONObject> list= hostelRead.getLandmarksBasicInfo();
				PrintWriter out = response.getWriter();
				System.out.println(list);
				out.println(list.toString());
//				System.out.println(list.toString());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				System.out.println("hello"+e.getMessage());
			}
		}
	}
}

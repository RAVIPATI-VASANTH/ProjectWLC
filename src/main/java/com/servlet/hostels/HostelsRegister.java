package com.servlet.hostels;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

import com.dbAccess.hostels.*;
import com.classFiles.hostels.dataContainers.HostelRegisterContainer;
//@WebServlet("/hostelRegister")
public class HostelsRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==0) {
			String lanid=(String)request.getParameter("id");
			String mcode=(String)request.getParameter("minicode");
			String fname=(String)request.getParameter("fullname");
			String tabname=(String)request.getParameter("tablename");
			PrintWriter out=response.getWriter();
			try {
				int resultSignal=hostelWrite.createNewLandmark(lanid,mcode,fname,tabname);
				HttpSession session =request.getSession();
				session.setAttribute("landmark", mcode);
			} catch (ClassNotFoundException | SQLException e) {
				e.printStackTrace();
				out.println("error");
			}
		}
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
			h.htablename=(String)request.getParameter("htablename");

			PrintWriter out=response.getWriter();
			try {
				int resultSignal=hostelWrite.createNewHostel(h);
				if (resultSignal==0) {
					out.println("error");
				}
				else {
					HttpSession session =request.getSession();
					session.setAttribute("hid", h.hid);
					out.println("success");
				}
			} catch (ClassNotFoundException | SQLException e) {
				e.printStackTrace();
				out.println("error");
			}
		}
		if(i==2) {
			String landmark=request.getParameter("landmark").toString();
			HttpSession session =request.getSession();
			session.setAttribute("landmark", landmark);
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==1) {
			try {
				ArrayList<JSONObject> list= hostelRead.getLandmarksBasicInfo();
				PrintWriter out = response.getWriter();
				out.println(list.toString());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}

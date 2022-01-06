package com.servlet.hostels;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import com.dbAccess.hostels.hostelWrite;

@WebServlet("/HostelWorkspaceCommit")
public class HostelWorkspaceCommit extends HttpServlet {
	private static final long serialVersionUID = 1L;

//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		response.getWriter().append("Served at: ").append(request.getContextPath());
//	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		boolean signal=false;
		Object obj=JSONValue.parse(request.getParameter("basicInfo"));  
		JSONObject binfo = (JSONObject) obj;
		
		obj=JSONValue.parse(request.getParameter("foodInfo"));  
		JSONObject finfo = (JSONObject) obj;
		
		String r=request.getParameter("roomInfo").toString();
		r=r.substring(1,r.length()-1);
		List<String> roomlist = Arrays.asList(r.split(","));
		
		r=request.getParameter("policyInfo");
		r=r.substring(1,r.length()-1);
		List<String> policylist = Arrays.asList(r.split(","));
		
		r=request.getParameter("hotspotInfo");
		r=r.substring(1,r.length()-1);
		List<String> hotspotslist = Arrays.asList(r.split(","));
		
		r=request.getParameter("requirementInfo");
		r=r.substring(1,r.length()-1);
		List<String> requirementslist = Arrays.asList(r.split(","));
		
		r=request.getParameter("specializationInfo");
		r=r.substring(1,r.length()-1);
		List<String> specslist =Arrays.asList(r.split(","));
		
		try {
			signal=hostelWrite.commitBasicInfo(binfo);
			if(signal) {
				signal=hostelWrite.commitFoodInfo(finfo,binfo.get("hid").toString());
			}
			if(signal) {
				signal=hostelWrite.commitRoomInfo(roomlist,binfo.get("hid").toString());
			}
			if(signal) {
				signal=hostelWrite.commitPolicyInfo(policylist,binfo.get("hid").toString());
			}
			if(signal) {
				signal=hostelWrite.commitHotspotInfo(hotspotslist,binfo.get("hid").toString());
			}
			if(signal) {
				signal=hostelWrite.commitReqInfo(requirementslist,binfo.get("hid").toString());
			}
			if(signal) {
				signal=hostelWrite.commitSpecInfo(specslist,binfo.get("hid").toString());
			}
		
			if(signal) {
				response.getWriter().print("Completed");
			}
			else {
				response.getWriter().print("Not-Completed");
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

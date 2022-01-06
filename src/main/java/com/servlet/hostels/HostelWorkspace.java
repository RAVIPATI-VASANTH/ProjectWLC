package com.servlet.hostels;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;

import com.dbAccess.hostels.hostelRead;

@WebServlet("/HostelWorkspace")
public class HostelWorkspace extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int signal=Integer.parseInt(request.getParameter("signal"));
		JSONObject finalobj= new JSONObject();
		if(signal==0) {
			try {
				String id=request.getParameter("id").toString();
				String minicode=request.getParameter("lanmincode").toString();
				JSONObject basicInfoObj= hostelRead.getHostelBasicInfo(id,minicode);
				finalobj.put("basicInfo", basicInfoObj);
				JSONObject foodObj= hostelRead.getHostelFoodInfo(id);
				finalobj.put("foodInfo", foodObj);
				ArrayList<String> roomlist= hostelRead.getHostelRoomInfo(id);
				finalobj.put("roomInfo", roomlist);
				ArrayList<String> policylist= hostelRead.getHostelPolicyInfo(id);
				finalobj.put("policyInfo", policylist);
				ArrayList<String> hotspotslist= hostelRead.getHostelHotspotsInfo(id);
				finalobj.put("hotspotInfo", hotspotslist);
				ArrayList<String> reqlist= hostelRead.getHostelRequirementsInfo(id);
				finalobj.put("requirementInfo", reqlist);
				ArrayList<String> speclist= hostelRead.getHostelSpecializationInfo(id);
				finalobj.put("specializationInfo", speclist);
				PrintWriter out = response.getWriter();
				out.println(finalobj.toString());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		if(signal==1) {
			HttpSession session= request.getSession();
			session.removeAttribute("hid");
		}
	}
}

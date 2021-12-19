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
				String rtable=(String) basicInfoObj.get("hrtable");
				ArrayList<String> roomlist= hostelRead.getHostelRoomInfo(rtable);
				finalobj.put("roomInfo", roomlist);
				String ptable=(String) basicInfoObj.get("hptable");
				ArrayList<String> policylist= hostelRead.getHostelPolicyInfo(ptable);
				finalobj.put("policyInfo", policylist);
				String hstable=(String) basicInfoObj.get("hhtable");
				ArrayList<String> hotspotslist= hostelRead.getHostelHotspotsInfo(hstable);
				finalobj.put("hotspotInfo", hotspotslist);
				String reqtable=(String) basicInfoObj.get("hreqtable");
				ArrayList<String> reqlist= hostelRead.getHostelRequirementsInfo(reqtable);
				finalobj.put("requirementInfo", reqlist);
				String spectable=(String) basicInfoObj.get("hstable");
				ArrayList<String> speclist= hostelRead.getHostelSpecializationInfo(spectable);
				finalobj.put("specializationInfo", speclist);
				System.out.println(finalobj);
				PrintWriter out = response.getWriter();
				out.println(finalobj.toString());
			} catch (Exception e) {
				System.out.println("hello1"+e.getMessage());
			}
		}
		if(signal==1) {
			System.out.println("called here vro");
			HttpSession session= request.getSession();
			session.removeAttribute("hid");
		}
	}
}

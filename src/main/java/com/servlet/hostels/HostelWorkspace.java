package com.servlet.hostels;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;

import com.dbAccess.hostels.hostelRead;

@WebServlet("/HostelWorkspace")
public class HostelWorkspace extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int signal=Integer.parseInt(request.getParameter("signal"));
		if(signal==0) {
			try {
				String id=request.getParameter("id").toString();
				String minicode=request.getParameter("lanmincode").toString();
				JSONObject obj= hostelRead.getHostelBasicInfo(id,minicode);
				PrintWriter out = response.getWriter();
				out.println(obj.toString());
			} catch (Exception e) {
				System.out.println("hello1"+e.getMessage());
			}
		}
		else if(signal==1) {
			try {
				String id=request.getParameter("id").toString();
				JSONObject obj= hostelRead.getHostelFoodInfo(id);
				PrintWriter out = response.getWriter();
				out.println(obj.toString());
			} catch (Exception e) {
				System.out.println("hello2"+e.getMessage());
			}
		}
	}
}

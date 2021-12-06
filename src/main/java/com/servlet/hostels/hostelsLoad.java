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

@WebServlet("/hostelsLoad")
public class hostelsLoad extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	int i= Integer.parseInt(request.getParameter("signal"));
    	if(i==0) {
			try {
				ArrayList<JSONObject> list= hostelRead.getLandmarksBasicInfo();
				PrintWriter out = response.getWriter();
				out.println(list.toString());
			} catch (Exception e) {
				System.out.println("hello"+e.getMessage());
			}
		}
    	else if(i==1) {
    		String tname = request.getParameter("tablename");
    		try {
				ArrayList<JSONObject> list= hostelRead.getHostelsMiniData(tname);
				PrintWriter out = response.getWriter();
				out.println(list.toString());
			} catch (Exception e) {
				System.out.println("hello"+e.getMessage());
			}
    	}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//
	}

}

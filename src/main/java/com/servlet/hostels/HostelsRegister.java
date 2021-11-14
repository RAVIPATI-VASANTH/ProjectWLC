package com.servlet.hostels;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.dbAccess.hostels.*;

@WebServlet("/hostelRegister")
public class HostelsRegister extends HttpServlet {
	private static final long serialVersionUID = 1L;
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==2) {
			System.out.println("namo");
		}
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i= Integer.parseInt(request.getParameter("signal"));
		if(i==1) {
			try {
				hostelRead.getLandmarksBasicInfo();
			} catch (ClassNotFoundException | SQLException e) {
				// TODO Auto-generated catch block
				System.out.println(e.getMessage());
			}
		}
	}
}

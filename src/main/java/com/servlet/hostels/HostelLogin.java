package com.servlet.hostels;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.dbAccess.hostels.hostelRead;


@WebServlet("/hostelLogin")
public class HostelLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int i=Integer.parseInt(request.getParameter("signal"));
		if(i==0) {
			System.out.println("call for authentication");
			String id=request.getParameter("hid").toString();
			String pass=request.getParameter("password").toString();
			int status=0;
			try {
				status = hostelRead.checkCredentials(id,pass);
			} catch (ClassNotFoundException | SQLException e) {
				e.printStackTrace();
			}
			if(status==1) {
				System.out.println("call for session");
				HttpSession session=request.getSession();
				session.setAttribute("hid",id);				
			}
			response.getWriter().println(status);
		}
	}

}

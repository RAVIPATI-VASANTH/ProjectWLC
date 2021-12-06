<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="hostelworkspace.css" />
    <title>Workspace-Hostel</title>
  </head>
  <body>
    <section class="head-section">
      <div class="website-name"><strong>WebsiteLoChudu</strong></div>
      <nav class="nav">
        <a class="hostel-id"><strong>Hostel-Id <% out.println(request.getParameter("id"));%>></strong></a>
        <button
          class="switch-button"
          id="switch-button"
          onclick="switchMode(1)"
        >
          View Mode
        </button>
        <a class="sign-out"><strong>sign out</strong></a>
      </nav>
    </section>
  </body>
</html>

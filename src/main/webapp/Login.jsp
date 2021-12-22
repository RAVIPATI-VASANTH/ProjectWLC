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
    <link rel="stylesheet" href="css/Login.css" />
    <link rel="stylesheet" href="css/Hostels/LoginMediaQueries.css">
    <title>WebsiteLoChudu-Login</title>
  </head>
  <body>
    <% response.setHeader("Cache-Control", "no-cache,no-store,must-revalidate");
    %>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChudu</strong>
      </a>
      <nav class="nav">
        <a href="hostelRegistrationS1.jsp" class="Register"
          ><strong>Register</strong></a
        >
      </nav>
    </section>

    <div class="">
      <section class="credentials-section"  style="padding: 1rem;">
        <div class="illustration">
          <img
            class="illustration-img"
            src="images/Secure login-bro.svg"
            alt="colaboration"
          />
        </div>

        <div class="credentials">
          <div class="form-element pad">
            <label for="hostel-id" class="label">ID</label>
            <input
              type="text"
              id="hostel-id"
              class="text-input"
              placeholder="enter ID"
            />
          </div>
          <div class="form-element pad">
            <label for="login-password" class="label">Password</label>
            <input
              id="login-password"
              type="password"
              class="text-input pad"
              placeholder="enter password"
            />
          </div>
          <div style="display: flex; justify-content: end; align-items: center">
            <button class="login-button" onclick="validateLoginDetails()">
              Login
            </button>
          </div>
        </div>
      </section>
    </div>

    <footer class="color">
      <div class="footer-section">
        <div class="production header"><p><strong>a <span class="word-color">Vasanth Ravipati</span> production</strong></p></div>
        <div class="grid-3-div">
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Note from us</strong></p>
            </div>
            <div class="items">
              <p class="footer-info" style="margin: 0rem; padding: 0rem;"><strong>Illustrations from</strong></p>
              <p style="margin: 0rem; padding: 0rem;">
                <a href="https://www.storyset.com/" class="word-color link"
                  ><strong>Storyset</strong></a
                >
              </p>
              <p class="footer-info" style="margin: 0rem; padding: 0rem;"><strong>Icons from</strong></p>
              <p style="margin: 0rem; padding: 0rem;">
                <a href="https://iconscout.com/" class="word-color link"
                  ><strong>iconscout</strong></a
                ><br>
                <a href="https://www.flaticon.com/" class="word-color link"
                  ><strong>flaticons</strong></a
                >
              </p>
            </div>
          </div>
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Social Media</strong></p>
            </div>
            <div class="items">
              <p class="footer-info" style="margin: 0rem; padding: 0rem;">
                <strong>Gmail</strong>
              </p>
              <p class="word-color footer-info" style="margin: 0rem; padding: 0rem;">
                <strong>websitelochudu@gmail.com</strong>
              </p>
              <p class="footer-info">
                <strong>Instagram</strong>
              </p>
              <p class="word-color footer-info">
                <strong>@websitelochudu</strong>
              </p>
            </div>
          </div>
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Developer's Contact</strong></p>
            </div>
            <div class="items">
              <p class="footer-info">
                <strong>Gmail</strong>
              </p>
              <p class="word-color footer-info" >
                <strong>vasanthravipati99@gmail.com</strong>
              </p>
              <p class="footer-info">
                <strong>GitHub</strong>
              </p>
              <p class="word-color footer-info">
                <strong>@RAVIPATI-VASANTH</strong>
              </p>
              <p class="footer-info">
                <strong>LinkedIn</strong>
              </p>
              <p class="word-color footer-info">
                <strong>Vasanth Ravipati</strong>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/Login.js"></script>
  </body>
</html>

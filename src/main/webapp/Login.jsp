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
    <title>WebsiteLoChudu-Login</title>
  </head>
  <body>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChudu</strong>
      </a>
      <nav class="nav">
        <a href="Registration.jsp" class="Register"
          ><strong>Register</strong></a
        >
      </nav>
    </section>

    <section>
      <!-- Message module -->
    </section>

    <div>
      <nav class="modules-nav">
        <a class="module">Hostels</a>
      </nav>
    </div>

    <div class="color">
      <section class="credentials-section">
        <div class="illustration">
          <img
            class="illustration-img"
            src="images/Secure login-bro.svg"
            alt="colaboration"
          />
        </div>

        <div class="credentials">
          <div class="form-element pad">
            <label for="login-id" class="label">ID</label>
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

    <script src="js/Login.js"></script>
  </body>
</html>

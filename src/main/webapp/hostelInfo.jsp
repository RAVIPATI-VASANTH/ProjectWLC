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
    <link rel="stylesheet" href="css/Hostels/hostelInfo.css" />
    <title id="title-name">Hostel ID</title>
  </head>
  <body>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChudu</strong>
      </a>
      <nav class="nav">
        <p class="phrase1" style="margin: 1rem">Hostel-ID</p>
        <p class="phrase2" style="margin: 1rem">
          #<span id="hostel-id"
            ><% out.println(request.getParameter("id").toString()); %></span
          >
        </p>
      </nav>
    </section>

    <div class="hero-section view-section">
      <div class="intro">
        <p class="hostel-name" id="view-hostel-name"></p>
        <p class="head-line" id="view-head-line"></p>
        <p class="by">
          by <span class="owner-name" id="view-owner-name"></span>
        </p>
        <div class="info-section">
          <div class="info-element">
            <img class="mini-icon" src="images/type.svg" alt="" />
            <div class="info" id="view-type"></div>
          </div>
          <div class="info-element">
            <img class="mini-icon" id="gender" src="images/male.svg" alt="" />
            <div class="info" id="view-gender"></div>
          </div>
          <div class="info-element">
            <img class="mini-icon" src="images/strength.svg" alt="" />
            <div class="info" id="view-strength"></div>
          </div>
          <div class="info-element">
            <img class="mini-icon" src="images/call.svg" alt="" />
            <div class="info" id="view-owner-contact"></div>
          </div>
          <div class="info-element">
            <img class="mini-icon" src="images/landmark.png" alt="" />
            <div class="info" id="view-landmark"></div>
          </div>
          <div class="info-element">
            <img class="mini-icon" src="images/location-point.svg" alt="" />
            <a class="location info" id="location" href="#">Location..</a>
          </div>
        </div>
      </div>
      <div class="illustration">
        <img
          class="illustration-img"
          src="images/Sleep-analysis-amico.svg"
          alt="sleeping-on-bed"
        />
      </div>
    </div>

    <div class="color">
      <div class="view-section" style="padding: 2rem 0rem">
        <p class="view-tag">Room Details</p>
        <div class="room-cards-section" id="room-cards-section"></div>
      </div>
    </div>

    <div class="">
      <div class="view-section" style="padding: 2rem 0rem">
        <p class="view-tag">Food Details</p>
        <div class="food-cards-section" id="food-cards-section"></div>
      </div>
    </div>

    <div class="color">
      <div class="view-section grid-for-2" style="padding: 2rem 0rem">
        <div>
          <p class="view-tag">Specializations</p>
          <div class="spec-view-tags-section" id="spec-view-tags-section"></div>
        </div>
        <div>
          <p class="view-tag">Hostel Policies</p>
          <div class="hp-view-tags-section" id="hp-view-tags-section"></div>
        </div>
      </div>
    </div>

    <div>
      <div class="view-section grid-for-2" style="padding: 2rem 0rem">
        <div>
          <p class="view-tag">Requirements Around</p>
          <div class="req-view-tags-section" id="req-view-tags-section"></div>
        </div>
        <div>
          <p class="view-tag">Hotspots</p>
          <div class="hs-view-tags-section" id="hs-view-tags-section"></div>
        </div>
      </div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/Hostels/hostelInfo.js"></script>
  </body>
</html>

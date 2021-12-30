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
    <link rel="stylesheet" href="css/Hostels/hostelInfoMediaQueries.css">
    <title id="title-name">Hostel ID</title>
  </head>
  <body>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChoodu</strong>
      </a>
      <nav class="nav">
        <p class="phrase1" style="margin: 1rem">Hostel-ID</p>
        <p class="word-color phrase1" style="margin: 1rem">
          <span id="hostel-id"
            ><% out.println(request.getParameter("id").toString()); %></span
          >
        </p>
      </nav>
    </section>

    <div class="hero-section view-section">
      <div class="intro">
        <p class="hostel-name" id="view-hostel-name"></p>
        <p class="head-line" id="view-head-line"></p>
        <p class="info">
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
        <p class="view-tag" id="view-tag-0" onclick="Toggle.toggleSection(0)">Room Details</p>
        <section id="section-0">
          <div class="room-cards-section" id="room-cards-section"></div>
        </section>
      </div>
    </div>

    <div class="">
      <div class="view-section" style="padding: 2rem 0rem">
        <p class="view-tag" onclick="Toggle.toggleSection(1)">Food Details</p>
        <section id="section-1">
        <div class="food-cards-section" id="food-cards-section"></div>
        </section>
      </div>
    </div>

    <div class="color">
      <div class="view-section grid-for-2" style="padding: 2rem 0rem">
        <div>
          <p class="view-tag" onclick="Toggle.toggleSection(2)">Specializations</p>
          <section id="section-2">
            <div class="spec-view-tags-section" id="spec-view-tags-section"></div>
          </section>
        </div>
        <div>
          <p class="view-tag extra" onclick="Toggle.toggleSection(3)">Hostel Policies</p>
          <section id="section-3">
            <div class="hp-view-tags-section" id="hp-view-tags-section"></div>
          </section>
        </div>
      </div>
    </div>

    <div>
      <div class="view-section grid-for-2" style="padding: 2rem 0rem">
        <div>
          <p class="view-tag" onclick="Toggle.toggleSection(4)">Requirements Around</p>
          <section id="section-4">
            <div class="req-view-tags-section" id="req-view-tags-section"></div>
          </section>
        </div>
        <div>
          <p class="view-tag extra" onclick="Toggle.toggleSection(5)">Hotspots</p>
          <section id="section-5">
            <div class="hs-view-tags-section" id="hs-view-tags-section"></div>
          </section>
        </div>
      </div>
    </div>

    <footer class="color">
      <div class="footer-section">
        <div class="production header"><p><strong>a <span class="word-color">Vasanth Ravipati</span> production</strong></p></div>
        <div class="grid-3-div">
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Resources</strong></p>
            </div>
            <div class="items">
              <p class="footer-info"><strong>Illustrations from</strong></p>
              <p style="margin: 0rem; padding:0rem ;">
                <a href="https://www.storyset.com/" class="word-color link"
                  ><strong>Storyset</strong></a
                >
              </p>
              <p class="footer-info"><strong>Icons from</strong></p>
              <p style="margin: 0rem; padding:0rem ;">
                <a href="https://iconscout.com/" class="word-color link"
                  ><strong>iconscout</strong></a
                >
              </p>
              <p style="margin: 0rem; padding:0rem ;">
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
              <p class="footer-info" style="margin: 0rem; padding:0rem ;">
                <strong>Gmail</strong>
              </p>
              <p class="word-color link" style="margin: 0rem; padding:0rem ;">
                <strong>websitelochoodu@gmail.com</strong>
              </p>
              <p class="footer-info" style="margin: 0rem; padding:0rem ;">
                <strong>Instagram</strong>
              </p>
              <p class="word-color link" style="margin: 0rem; padding:0rem ;">
                <strong>@websitelochoodu</strong>
              </p>
            </div>
          </div>
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Developer's Contact</strong></p>
            </div>
            <div class="items">
              <p class="footer-info" style="margin: 0rem; padding:0rem ;">
                <strong>Gmail</strong>
              </p>
              <p class="word-color link" style="margin: 0rem; padding:0rem ;">
                <strong>vasanthravipati99@gmail.com</strong>
              </p>
              <p class="footer-info" style="margin: 0rem; padding:0rem ;">
                <strong>GitHub</strong>
              </p>
              <p class="word-color link" style="margin: 0rem; padding:0rem ;">
                <strong>@RAVIPATI-VASANTH</strong>
              </p>
              <p class="footer-info" style="margin: 0rem; padding:0rem ;">
                <strong>LinkedIn</strong>
              </p>
              <p class="word-color link" style="margin: 0rem; padding:0rem ;">
                <strong>Vasanth Ravipati</strong>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/Hostels/hostelInfo.js"></script>
  </body>
</html>

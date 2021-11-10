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
    <title>Hostel ID</title>
  </head>
  <body>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChudu</strong>
      </a>
      <nav class="nav">
        <p class="phrase1" style="margin: 1rem">Hostel-ID</p>
        <p class="phrase2" style="margin: 1rem">#VFS-M-101</p>
      </nav>
    </section>

    <div class="hero-section view-section">
      <div class="intro"></div>
      <div class="illustration">
        <img
          class="illustration-img"
          src="images/Sleep-analysis-amico.svg"
          alt="sleeping-on-bed"
        />
      </div>
    </div>

    <div class="color">
      <div class="view-section">
        <p class="view-tag">Room Details</p>
        <div class="room-cards-section" id="room-cards-section"></div>
      </div>
    </div>

    <div class="">
      <div class="view-section">
        <p class="view-tag">Food Details</p>
        <div class="food-cards-section" id="food-cards-section"></div>
      </div>
    </div>

    <div class="color">
      <div class="view-section grid-for-2">
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
      <div class="view-section grid-for-2">
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
    <script src="js/Hostels/hostelInfo.js"></script>
  </body>
</html>

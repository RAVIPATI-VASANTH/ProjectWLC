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
    <link rel="stylesheet" href="css/Hostels/hostelsLoad.css" />
    <title>WebsiteLoChudu-Hostels</title>
  </head>
  <body>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChudu</strong>
      </a>
      <nav class="nav">
        <p class="count-info">
          <strong>
            <span class="word-color count">00</span> Hostels around
            <span class="word-color count">00</span> Locations
          </strong>
        </p>
      </nav>
    </section>

    <section class="about-section">
      <div class="description">
        <p class="phrase"><strong>Explore</strong></p>
        <li class="phrase2 notes">
          We provide information about Hostels around popular landmarks like
          <span class="word-color"> Collages</span>,
          <span class="word-color"> IT-Hubs</span>,<span class="word-color">
            Training Centers</span
          >
          and more..
        </li>
        <li class="phrase2 notes">
          This helps you to save your time and energy in knowing about them.
        </li>
        <li class="phrase2 notes">
          Click on Landmark and know about hostels around it.
        </li>
      </div>
      <div class="illustration">
        <img
          class="illustration-img"
          src="images\Sleep-analysis-amico.svg"
          alt="illustrating how the WebsiteLoChudu work"
        />
      </div>
    </section>

    <div class="color">
      <section class="landmarks-section">
        <div class="landmarks-bar">
          <p class="phrase1">Landmarks</p>
        </div>
        <div class="landmarks-list"></div>
      </section>
    </div>

    <div>
      <section class="hostels-display">
        <div class="landmark-info"></div>
        <div class="hostels-list"></div>
      </section>
    </div>

    <script src="js/Hostels/hostelsLoad.js"></script>
  </body>
</html>

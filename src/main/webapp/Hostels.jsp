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
    <link rel="stylesheet" href="css/Hostels/hostelsLoadMediaQueries.css" />
    <title>WebsiteLoChoodu-Hostels</title>
  </head>
  <body>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChuoodu</strong>
      </a>
      <nav class="nav">
        <p class="count-info">
          <strong>
            <span class="word-color count" id="hostel-count">00</span> Hostels
            around
            <span class="word-color count" id="landmark-count">00</span>
            Locations
          </strong>
        </p>
      </nav>
    </section>

    <div>
      <section class="about-section">
        <div class="description">
          <p class="phrase"><strong>Explore</strong></p>
          <ul>
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
              We categorized hostel's Information for you as
              <span class="word-color">Rooms</span>,
              <span class="word-color">Food</span>,
              <span class="word-color">Specializations</span>,
              <span class="word-color">Requirements-Around</span>,
              <span class="word-color">Hotspots</span>,
              <span class="word-color">Policies</span>.
            </li>
            <li class="phrase2 notes">
              <a class="word-color" href="#hostels-division">Click here</a>
              to explore Hostels.
            </li>
          </ul>
        </div>
        <div class="illustration">
          <img
            class="illustration-img"
            src="images/Search-amico.svg"
            alt="illustrating how the WebsiteLoChudu work"
          />
        </div>
      </section>
    </div>

    <div class="color">
      <section class="more-info-section">
        <ul>
          <li class="phrase3 notes">
            <span class="word-color "  onclick="toggleMoreInfo(0)">Rooms</span><span id="word-0"> - gives information about room
              types like Ac/Non-Ac, fare to pay,room structure.</span>
          </li>
          <li class="phrase3 notes ">
            <span class="word-color toggle"  onclick="toggleMoreInfo(1)">Food</span><span id="word-1"> - gives information about food
              they offer for Breakfast, Lunch, Snacks, Dinner and Non-veg details.</span>
          </li>
          <li class="phrase3 notes ">
            <span class="word-color toggle"  onclick="toggleMoreInfo(2)">Specializations</span><span id="word-2"> - gives information
              about Wifi, Lockers, Gym, Transport, Washing Machine and more..</span>
          </li>
          <li class="phrase3 notes ">
            <span class="word-color toggle"  onclick="toggleMoreInfo(3)">Requirements-Around</span><span id="word-3"> - gives
              information about basic required locations around that a hostler
              needs like ATMs, Medical Emergencies, Saloon/Spa, Busstops,
              Stationery shops, Xerox Shops and more..</span>
          </li>
          <li class="phrase3 notes " onclick="toggleMoreInfo(4)">
            <span class="word-color toggle">Hotspots</span><span id="word-4"> - gives information about
              famous and popular locations to spend some time like Restaurents,
              Holy Places, parks etc.,</span>
          </li>
          <li class="phrase3 notes "onclick="toggleMoreInfo(5)">
            <span class="word-color toggle">Policies</span><span id="word-5"> - these are some Rules and
              Regulations from Hostel Owner that to be followed in Hostel.</span>
          </li>
        </ul>
      </section>
    </div>

    <div>
      <section class="landmarks-section">
        <label for="landmarks" class="label">Select Landmark</label>
        <select
          name="landmarks"
          id="landmarks"
          class="landmark"
          oninput="changeLandmark()"
        ></select>
      </section>
    </div>

    <div>
      <div class="landmark-info">
        <p class="phrase2" style="font-weight: bold">
          <span class="word-color">Landmark : </span
          ><span id="landmark-name"></span>
        </p>
        <div>
          <a
            id="landmark-link"
            href=""
            class="word-color location phrase2"
            style="font-weight: bold"
            >Location...</a
          >
        </div>
      </div>
    </div>

    <div class="color">
      <section class="hostels-display" id="hostels-division">
        <div class="hostels-list" id="hostels-list"></div>
      </section>
    </div>

    <footer class="">
      <div class="footer-section">
        <div class="production header"><p><strong>a <span class="word-color">Vasanth Ravipati</span> production</strong></p></div>
        <div class="grid-3-div">
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Resources</strong></p>
            </div>
            <div class="items">
              <p class="footer-info" style="margin: 0rem; padding: 0rem;"><strong>Illustrations</strong></p>
              <p style="margin: 0rem; padding: 0rem;">
                <a href="https://www.storyset.com/" class="word-color link"
                  ><strong>Storyset</strong></a
                >
              </p>
              <p class="footer-info" style="margin: 0rem; padding: 0rem;"><strong>Icons</strong></p>
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
              <p class="word-color " style="margin: 0rem; padding: 0rem;">
                <strong>websitelochudu@gmail.com</strong>
              </p>
              <p class="footer-info">
                <strong>Instagram</strong>
              </p>
              <p class="word-color ">
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
              <p class="word-color" >
                <strong>vasanthravipati99@gmail.com</strong>
              </p>
              <p class="footer-info">
                <strong>GitHub</strong>
              </p>
              <p class="word-color ">
                <strong>@RAVIPATI-VASANTH</strong>
              </p>
              <p class="footer-info">
                <strong>LinkedIn</strong>
              </p>
              <p class="word-color ">
                <strong>Vasanth Ravipati</strong>
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/Hostels/hostelsLoad.js"></script>
  </body>
</html>

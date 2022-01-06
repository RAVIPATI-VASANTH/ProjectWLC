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
    <link rel="stylesheet" href="css/Hostels/hostelRegistrationS1.css" />
    <link
      rel="stylesheet"
      href="css/Hostels/hostelRegistrationS1MediaQueries.css"
    />
    <title>Hostel Registration-Step 1</title>
  </head>
  <body>
    <% response.setHeader("Cache-Control", "no-cache,no-store,must-revalidate");
    %>
    <section class="head-section">
      <a class="website-name" href="index.html"
        ><strong>WebsiteLoChoodu</strong></a
      >
      <nav class="nav">
        <a href="Login.jsp" class="Workspace extra"
          ><strong>Workspace</strong></a
        >
      </nav>
    </section>

    <section class="about-section">
      <div class="description">
        <p class="phrase"><strong>Welcome</strong></p>
        <p class="phrase1 notes">Make your first move to work with us.</p>
        <p class="phrase1 notes">
          Register your Thing and move it on to the Internet.
        </p>
        <p class="phrase"><strong>Step 1</strong></p>
      </div>
      <div class="illustration">
        <img
          class="illustration-img"
          src="images\Secure login-bro.svg"
          alt="illustrating how the WebsiteLoChudu work"
        />
      </div>
    </section>

    <section class="color">
      <div class="info-section">
        <ul>
          <li class="phrase1">
            Select your Landmark below and click on "Next".
          </li>
          <li class="phrase1">
            If you can't find your Landmark, don't worry, Scroll down and create
            a New one.
          </li>
        </ul>
      </div>
    </section>

    <section>
      <div class="landmark-input">
        <div class="container">
          <div class="form-element lan">
            <label for="" class="label">Landmark</label>
            <input
              type="text"
              list="landmarks"
              id="landmark"
              class="text-input"
              oninput="checkChange(0)"
            />
            <datalist name="landmark" id="landmarks"> </datalist>
            <p id="landmark-message" class="notes message hide"></p>
          </div>
          <div>
            <button class="next-button" onclick="callForStep2()">
              <strong>Next..</strong>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="color">
      <section class="landmark-setup">
        <div class="phrase2"><strong>Create Landmark</strong></div>
      </section>

      <section class="landmark-section">
        <div class="landmark-credentials">
          <div class="form-element pad">
            <label for="landmark-full-name" class="label"
              >Landmark Full Name</label
            >
            <input
              type="text"
              id="landmark-full-name"
              class="text-input"
              oninput="checkChange(1)"
            />
            <p id="landmark-full-name-message" class="notes message">
              60 charecters remaining
            </p>
          </div>
          <div class="form-element pad">
            <label for="landmark-description" class="label">Description</label>
            <input
              type="text"
              id="landmark-description"
              class="text-input"
              oninput="checkChange(2)"
            />
            <p id="landmark-description-message" class="notes message">
              150 charecters remaining
            </p>
          </div>
          <div style="display: flex; justify-content: end; align-items: center">
            <button
              id="ajaxcall"
              class="submit-button pad"
              onclick="createLandmark()"
            >
              Create
            </button>
          </div>
        </div>

        <div class="description">
          <ul>
            <li class="phrase1 notes">
              Create the landmark which is recognized by more people. Example
              like Collage, IT Hub, Traning Centers etc.,
            </li>
            <br />
            <li class="phrase1 notes">
              Give details about landmark in 'Description' field like it's
              city-name, area or any other information about it.
            </li>
            <br />
            <li class="phrase1 notes">
              This help our Team get Identified it as Landmark faster.
            </li>
            <br />
            <li class="phrase1 notes">
              The Landmarks Create by you are noted and inspected by our team
              later.
            </li>
            <br />
            <li class="phrase1 notes">
              If the landmark doesn't reach our requirements, Don't worry, We
              will contact you and clear the issue.
            </li>
            <br />
          </ul>
        </div>
      </section>
    </section>

    <footer class="">
      <div class="footer-section">
        <div class="production header">
          <p>
            <strong
              >a
              <span class="word-color">Vasanth Ravipati</span>
              production</strong
            >
          </p>
        </div>
        <div class="grid-3-div">
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Resources</strong></p>
            </div>
            <div class="items">
              <p class="footer-info"><strong>Illustrations from</strong></p>
              <p style="margin: 0rem; padding: 0rem">
                <a href="https://www.storyset.com/" class="word-color link"
                  ><strong>Storyset</strong></a
                >
              </p>
              <p class="footer-info"><strong>Icons from</strong></p>
              <p style="margin: 0rem; padding: 0rem">
                <a href="https://iconscout.com/" class="word-color link"
                  ><strong>iconscout</strong></a
                >
              </p>
              <p style="margin: 0rem; padding: 0rem">
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
              <p class="footer-info" style="margin: 0rem; padding: 0rem">
                <strong>Gmail</strong>
              </p>
              <a
                href="mailto: websitelochoodu@gmail.com"
                class="word-color link"
                style="margin: 0rem; padding: 0rem"
              >
                <strong>websitelochoodu@gmail.com</strong>
              </a>
              <p class="footer-info" style="margin: 0rem; padding: 0rem">
                <strong>Instagram</strong>
              </p>
              <a
                href="https://instagram.com/websitelochoodu"
                class="word-color link"
                style="margin: 0rem; padding: 0rem"
              >
                <strong>@websitelochoodu</strong>
              </a>
            </div>
          </div>
          <div class="flex-div-column">
            <div class="header word-color">
              <p><strong>Developer's Contact</strong></p>
            </div>
            <div class="items">
              <p class="footer-info" style="margin: 0rem; padding: 0rem">
                <strong>Gmail</strong>
              </p>
              <a
                href="mailto: vasanthravipati99@gmail.com"
                class="word-color link"
                style="margin: 0rem; padding: 0rem"
              >
                <strong>vasanthravipati99@gmail.com</strong>
              </a>
              <p class="footer-info" style="margin: 0rem; padding: 0rem">
                <strong>GitHub</strong>
              </p>
              <a
                href="https://github.com/RAVIPATI-VASANTH"
                class="word-color link"
                style="margin: 0rem; padding: 0rem"
              >
                <strong>@RAVIPATI-VASANTH</strong>
              </a>
              <p class="footer-info" style="margin: 0rem; padding: 0rem">
                <strong>LinkedIn</strong>
              </p>
              <a
                href="https://www.linkedin.com/in/vasanth-ravipati-4662a3208/"
                class="word-color link"
                style="margin: 0rem; padding: 0rem"
              >
                <strong>Vasanth Ravipati</strong>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/validations.js"></script>
    <script src="js/Hostels/hostelRegistrationS1.js"></script>
  </body>
</html>

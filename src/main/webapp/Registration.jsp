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
    <link rel="stylesheet" href="css/Registration.css" />
    <title>WebsiteLoChudu-Registration</title>
  </head>

  <body>
    <section class="head-section">
      <a class="website-name" href="index.html"
        ><strong>WebsiteLoChudu</strong></a
      >
      <nav class="nav">
        <a href="Login.jsp" class="Workspace"><strong>Workspace</strong></a>
      </nav>
    </section>

    <section class="about-section">
      <div class="description">
        <p class="phrase"><strong>Welcome</strong></p>
        <p class="phrase1 notes">Make your first move to work with us.</p>
        <p class="phrase1 notes">
          Register your Thing and move it on to the Internet.
        </p>
      </div>
      <div class="illustration">
        <img
          class="illustration-img"
          src="images\Secure login-bro.svg"
          alt="illustrating how the WebsiteLoChudu work"
        />
        <!-- <img
          class="illustration1-img"
          src="images\workspace.jpeg"
          alt="working"
          /> -->
      </div>
    </section>

    <div class="color">
      <nav class="modules-nav">
        <a class="module">Hostels</a>
      </nav>
    </div>

    <div class="">
      <section class="hostel-registration">
        <div class="phrase2"><strong>Hostel-Registration</strong></div>
      </section>

      <div class="form">
        <div class="form-element">
          <label for="hostel-name" class="label">Hostel Name</label>
          <input
            type="text"
            id="hostel-name"
            class="text-input"
            oninput="checkChange(0)"
          />
          <p id="hostel-name-message" class="notes message">
            35 charecters remaining
          </p>
        </div>

        <div class="form-element">
          <label for="hostel-owner-name" class="label">Owner's Name</label>
          <input
            type="text"
            id="hostel-owner-name"
            class="text-input"
            oninput="checkChange(1)"
          />
          <p id="owner-name-message" class="notes message">
            15 charecters remaining
          </p>
        </div>

        <div class="form-element">
          <label for="hostel-owner-contact" class="label"
            >Owner's Contact</label
          >
          <input
            type="text"
            id="hostel-owner-contact"
            class="text-input"
            oninput="checkChange(2)"
          />
          <p id="contact-message" class="notes message">
            10 charecters remaining
          </p>
        </div>

        <div class="form-element">
          <label for="" class="label">Hostel Type</label>
          <div>
            <input
              type="radio"
              id="hostel-type-public"
              value="Public"
              name="type"
              class="radio-button"
              checked
              onclick="checkChange(3)"
            />
            <label
              for="hostel-type-public"
              class="label1"
              onclick="checkChange(3)"
              >Public</label
            >
          </div>

          <div>
            <input
              type="radio"
              id="hostel-type-community"
              value="Community"
              name="type"
              class="radio-button"
              onclick="checkChange(3)"
            />
            <label
              for="hostel-type-community"
              class="label1"
              onclick="checkChange(3)"
              >Community</label
            >
          </div>
          <input
            type="text"
            name="community-name"
            id="community-name"
            class="text-input hide"
            oninput="checkChange(4)"
            placeholder="Enter Community name.."
          />
          <p id="community-message" class="notes message hide">
            10 charecters remaining
          </p>
        </div>

        <div class="form-element">
          <label for="" class="label">Select Gender</label>
          <div>
            <input
              type="radio"
              id="hostel-gender-male"
              value="male"
              name="gender"
              class="radio-button"
              checked
            />
            <label for="hostel-gender-male" class="label1">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="hostel-gender-female"
              value="female"
              name="gender"
              class="radio-button"
            />
            <label for="hostel-gender-female" class="label1">Female</label>
          </div>
        </div>

        <div class="form-element">
          <label for="" class="label">Location</label>
          <button id="location-button" class="label1" onclick="addLocation()">
            Add Location
          </button>
          <p class="label1" id="location-status">Not Recorded</p>
        </div>

        <div class="form-element">
          <label for="" class="label">Landmark</label>
          <input
            type="text"
            list="landmarks"
            id="landmark"
            class="text-input"
            oninput="checkChange(5)"
          />
          <datalist name="landmark" id="landmarks"> </datalist>
          <p id="landmark-message" class="notes message hide">
            The Landmark you entered is not recognized by us. Continue the
            Registration process with this Landmark. Later we consult you for
            recognization.
            <!-- Not Found landmark.<br />
            Scroll Down to create a New One -->
          </p>
        </div>

        <div class="form-element">
          <button
            id="location-button"
            class="label1"
            onclick="generateHostelId()"
          >
            Generate Hostel ID
          </button>
          <p id="generate-id-message" class="notes message hide">
            LandMark Required
          </p>
        </div>
      </div>
    </div>

    <div class="color">
      <section class="credential-setup">
        <div class="phrase2"><strong>Credential-Setup</strong></div>
      </section>

      <section class="credentials-section">
        <div class="illustration">
          <img
            class="illustration-img"
            src="images/collaboration.svg"
            alt="colaboration"
          />
        </div>

        <div class="credentials">
          <div class="form-element pad">
            <label for="hostel-id" class="label">Hostel-ID</label>
            <input type="text" id="hostel-id" readonly class="text-input" />
          </div>
          <div class="form-element pad">
            <label for="" class="label">Password</label>
            <input
              id="password"
              type="password"
              class="text-input pad"
              placeholder="enter password"
            />
            <input
              id="re-password"
              type="password"
              class="text-input pad"
              oninput="checkPassword()"
              placeholder="re-enter password"
            />
            <p id="password-message" class="notes message hide">Not Macthed</p>
          </div>
          <div style="display: flex; justify-content: end; align-items: center">
            <button class="submit-button pad" onclick="checkDataValidation()">
              Submit
            </button>
          </div>
        </div>
      </section>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/Registration.js"></script>
    <script src="js/RegistrationAjaxCalls.js"></script>
  </body>
</html>

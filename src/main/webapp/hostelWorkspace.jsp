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
    <link rel="stylesheet" href="css/Hostels/hostelWorkspace.css" />
    <link rel="stylesheet" href="css/Hostels/hostelWorkspace2.css" />
    <title>Workspace-Hostel</title>
  </head>
  <body>
    <section class="head-section">
      <a class="website-name" href="index.html">
        <strong>WebsiteLoChudu</strong>
      </a>
      <nav class="nav">
        <a class="hostel-id"
          ><strong
            >Hostel-Id
            <span id="hostel-id"
              ><% out.println(request.getParameter("id"));%></span
            ></strong
          ></a
        >
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

    <!-- view section -->
    <section id="view" class="hide">
      <div class="hero-section view-section">
        <div class="intro">
          <p class="hostel-name" id="view-hostel-name">
            Feel Home Mess and Hostel
          </p>
          <p class="head-line" id="view-head-line">
            Best Food Across the Location
          </p>
          <p class="by">
            by <span class="owner-name" id="view-owner-name">Babai garu</span>
          </p>
          <div class="info-section">
            <div class="info-element">
              <img class="mini-icon" src="images/type.svg" alt="" />
              <div class="info" id="view-type">Public - Anyone can join</div>
            </div>
            <div class="info-element">
              <img class="mini-icon" id="gender" src="images/male.svg" alt="" />
              <div class="info" id="view-gender">Gents</div>
            </div>
            <div class="info-element">
              <img class="mini-icon" src="images/strength.svg" alt="" />
              <div class="info" id="view-strength">110</div>
            </div>
            <div class="info-element">
              <img class="mini-icon" src="images/call.svg" alt="" />
              <div class="info" id="view-owner-contact">8919847090</div>
            </div>
            <div class="info-element">
              <img class="mini-icon" src="images/landmark.png" alt="" />
              <div class="info" id="view-landmark">
                Vignan's Foundation for Sciences, Technology and Research
              </div>
            </div>
            <div class="info-element">
              <img class="mini-icon" src="images/location-point.svg" alt="" />
              <a class="location info" id="location" href="#">Location..</a>
            </div>
          </div>
        </div>
        <div class="illustration">
          <img src="images/Sleep-analysis-amico.svg" alt="sleeping-on-bed" />
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
            <div
              class="spec-view-tags-section"
              id="spec-view-tags-section"
            ></div>
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
    </section>

    <!-- EDIT SECTION -->
    <section id="edit">
      <div class="color">
        <div class="description edit-section">
          <div class="info-guide">
            <ul>
              <li>Each field that you enter is Very Important.</li>
              <li>
                Giving data that is required, helps to increase Search-Score.
              </li>
              <li>
                The more Search-Score, helps more to your Hostel visible on top
                of List of Your Landmark.
              </li>
              <li>
                This helps your Hostel get recognize by more people among other
                Hostels.
              </li>
            </ul>
          </div>

          <div class="search-score">
            <p class="score">000</p>
            <p class="info-guide">Search Score</p>
          </div>
        </div>
      </div>

      <div class="color">
        <p class="note edit-section">
          The changes you made here can check by click on view. The changes get
          save only clicking Commit button.
        </p>
      </div>
      <!-- Basic -->
      <div class="color">
        <p class="edit-tag edit-section">Basic Information</p>
        <div class="basic-info edit-section">
          <div class="form-element">
            <label for="edit-hostel-name" class="label">Hostel Name</label>
            <input type="text" id="edit-hostel-name" class="text-input" />
          </div>
          <div class="form-element">
            <label for="edit-head-line" class="label">Headline</label>
            <input type="text" id="edit-head-line" class="text-input" />
          </div>
          <div class="form-element">
            <label for="edit-owner-name" class="label">Owner's Name</label>
            <input type="text" id="edit-owner-name" class="text-input" />
          </div>
          <div class="form-element">
            <label for="edit-owner-contact" class="label"
              >Owner's Contact</label
            >
            <input type="text" id="edit-owner-contact" class="text-input" />
          </div>
          <div class="form-element">
            <label for="edit-strength" class="label">Current Strength</label>
            <input type="text" id="edit-strength" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Hostel Type</label>
            <div>
              <input
                type="radio"
                id="edit-type-public"
                value="Public"
                name="type"
                class="radio-button"
              />
              <label for="edit-type-public" class="label1">Public</label>
            </div>

            <div>
              <input
                type="radio"
                id="edit-type-community"
                value="Community"
                name="type"
                class="radio-button"
              />
              <label for="edit-type-community" class="label1">Community</label>
            </div>
            <input
              type="text"
              name="community-name"
              id="community-name"
              class="text-input"
              placeholder="Enter Community name.."
            />
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
              />
              <label for="hostel-gender-male" class="label1">Gents</label>
            </div>
            <div>
              <input
                type="radio"
                id="hostel-gender-female"
                value="female"
                name="gender"
                class="radio-button"
              />
              <label for="hostel-gender-female" class="label1">Ladies</label>
            </div>
          </div>
          <div class="form-element">
            <label for="location" class="label">Location</label>
            <button id="location" class="label1" onclick="addLocation()">
              Update Location
            </button>
            <label for="" id="location-status"></label>
          </div>
          <div class="form-element">
            <button class="label1" onclick="BasicInfo.updateChanges()">
              Update Changes to View
            </button>
          </div>
        </div>
      </div>
      <!-- Rooms -->
      <div class="color">
        <p class="edit-tag edit-section">Room Details</p>
        <div class="room-tags-section edit-section color" id="room-tags"></div>
        <div class="room-info edit-section">
          <div class="form-element">
            <label for="plan-name" class="label">Plan Name</label>
            <input type="plan" id="plan-name" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">AC/N-AC</label>
            <div>
              <input
                type="radio"
                id="ac"
                value="AC"
                name="gender"
                class="radio-button"
              />
              <label for="ac" class="label1">AC</label>
            </div>
            <div>
              <input
                type="radio"
                id="nac"
                value="N-AC"
                name="gender"
                class="radio-button"
                checked
              />
              <label for="nac" class="label1">N-AC</label>
            </div>
          </div>
          <div class="form-element">
            <label for="" class="label">Bathrooms</label>
            <div>
              <input
                type="checkbox"
                id="common"
                value="Common"
                name="gender"
                class="radio-button"
              />
              <label for="common" class="label1">Common</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="attached"
                value="Attached"
                name="gender"
                class="radio-button"
                checked
              />
              <label for="attached" class="label1">Attached</label>
            </div>
          </div>
          <div class="form-element">
            <label for="bed-count" class="label">Beds per Room</label>
            <input
              type="text"
              id="bed-count"
              class="text-input"
              placeholder="Eg.. 2-3-4"
            />
          </div>
          <div class="form-element">
            <label for="" class="label">Stay + Food</label>
            <div>
              <p class="label1" style="margin: 0rem">Monthly</p>
              <input type="text" class="text-input" id="sf-monthly" />
              <p class="label1" style="margin: 0rem">Semester</p>
              <input type="text" class="text-input" id="sf-semester" />
              <p class="label1" style="margin: 0rem">Annum</p>
              <input type="text" class="text-input" id="sf-annum" />
            </div>
          </div>
          <div class="form-element">
            <label for="" class="label">Stay Only</label>
            <div>
              <p class="label1" style="margin: 0rem">Monthly</p>
              <input type="text" class="text-input" id="s-monthly" />
              <p class="label1" style="margin: 0rem">Semester</p>
              <input type="text" class="text-input" id="s-semester" />
              <p class="label1" style="margin: 0rem">Annum</p>
              <input type="text" class="text-input" id="s-annum" />
            </div>
          </div>
          <div class="form-element">
            <button
              id="add-room-card"
              class="label1"
              onclick="RoomInfo.addRoomCard()"
            >
              ADD
            </button>
            <button
              id="update-room-card"
              class="label1 hide"
              onclick="RoomInfo.updateRoomCard()"
            >
              Update Card
            </button>
          </div>
        </div>
      </div>
      <!-- Food  -->
      <div class="color">
        <p class="edit-tag edit-section">Food Details</p>
        <div class="food-info edit-section">
          <div class="form-element">
            <label for="" class="label">Breakfast</label>
            <div>
              <label for="breakfast-time" class="label1">Time</label>
              <input id="breakfast-time" type="time" class="text-input" />
            </div>
            <label for="breakfast-period" class="label1">Select Type</label>
            <select name="" id="breakfast-period" class="text-input">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            <label for="items" class="label1">Items</label>
            <input
              id="breakfast-items"
              type="text"
              class="text-input"
              placeholder="Eg. Idly-Dosa-Chapati.."
            />
            <label for="notes" class="label1">Notes</label>
            <input id="breakfast-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Lunch</label>
            <div>
              <label for="lunch-time" class="label1">Time</label>
              <input id="lunch-time" type="time" class="text-input" />
            </div>
            <label for="lunch-period" class="label1">Select Type</label>
            <select name="" id="lunch-period" class="text-input">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            <label for="lunch-items" class="label1">Items</label>
            <input
              id="lunch-items"
              type="text"
              class="text-input"
              placeholder="Eg. 2 curries-2 pickles..."
            />
            <label for="lunch-notes" class="label1">Notes</label>
            <input id="lunch-notes" type="text" class="text-input" />
          </div>

          <div class="form-element">
            <label for="" class="label">Snacks</label>
            <div>
              <label for="snacks-time" class="label1">Time</label>
              <input id="snacks-time" type="time" class="text-input" />
            </div>
            <label for="snacks-period" class="label1">Select Type</label>
            <select name="" id="snacks-period" class="text-input">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            <label for="snacks-items" class="label1">Items</label>
            <input
              id="snacks-items"
              type="text"
              class="text-input"
              placeholder="Eg. tea-biscuits.."
            />
            <label for="snacks-notes" class="label1">Notes</label>
            <input id="snacks-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Dinner</label>
            <div>
              <label for="dinner-time" class="label1">Time</label>
              <input id="dinner-time" type="time" class="text-input" />
            </div>
            <label for="dinner-period" class="label1">Select Type</label>
            <select name="" id="dinner-period" class="text-input">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            <label for="dinner-items" class="label1">Items</label>
            <input
              id="dinner-items"
              type="text"
              class="text-input"
              placeholder="Eg. 1curry-1pickle-rasam.."
            />
            <label for="dinner-notes" class="label1">Notes</label>
            <input id="dinner-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Non-Veg</label>
            <label for="noof-times" class="label1">Noof times per Week</label>
            <input id="noof-times" type="number" class="text-input" />

            <label for="limit" class="label1">Select Type</label>
            <select name="" id="limit" class="text-input">
              <option value="Un-Limited" class="text-input">Un-Limited</option>
              <option value="Limited" class="text-input">Limited</option>
            </select>
            <label for="nonveg-notes" class="label1">Notes</label>
            <input id="nonveg-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <button
              id="update-food-cards"
              class="label1"
              onclick="FoodInfo.updateFoodInfo()"
            >
              Update Changes to View
            </button>
          </div>
        </div>
      </div>

      <div class="color">
        <p class="edit-tag edit-section">Specializations</p>
        <div class="specializations-info edit-section">
          <div class="form-element">
            <label for="" class="label">WIFI</label>
            <label for="wifi-method" class="label1">Select Type</label>
            <select name="" id="wifi-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="wifi-plan" class="label1">Select Plan</label>
            <select name="" id="wifi-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="wifi-amount" class="label1">Amount</label>
            <input id="wifi-amount" type="text" class="text-input" />
            <label for="wifi-notes" class="label1">Notes</label>
            <input id="wifi-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Washing Machine</label>
            <label for="washing-machine-method" class="label1"
              >Select Type</label
            >
            <select name="" id="washing-machine-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="washing-machine-plan" class="label1">Select Plan</label>
            <select name="" id="washing-machine-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="washing-machine-amount" class="label1">Amount</label>
            <input id="washing-machine-amount" type="text" class="text-input" />
            <label for="washing-machine-notes" class="label1">Notes</label>
            <input id="washing-machine-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Lockers</label>
            <label for="lockers-method" class="label1">Select Type</label>
            <select name="" id="lockers-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="lockers-plan" class="label1">Select Plan</label>
            <select name="" id="lockers-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="lockers-amount" class="label1">Amount</label>
            <input id="lockers-amount" type="text" class="text-input" />
            <label for="lockers-notes" class="label1">Notes</label>
            <input id="lockers-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Hot Water</label>
            <label for="hot-water-method" class="label1">Select Type</label>
            <select name="" id="hot-water-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="hot-water-plan" class="label1">Select Plan</label>
            <select name="" id="hot-water-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="hot-water-amount" class="label1">Amount</label>
            <input id="hot-water-amount" type="text" class="text-input" />
            <label for="hot-water-notes" class="label1">Notes</label>
            <input id="hot-water-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Gym</label>
            <label for="gym-method" class="label1">Select Type</label>
            <select name="" id="gym-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="gym-plan" class="label1">Select Plan</label>
            <select name="" id="gym-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="gym-amount" class="label1">Amount</label>
            <input id="gym-amount" type="text" class="text-input" />
            <label for="gym-notes" class="label1">Notes</label>
            <input id="gym-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Generator</label>
            <label for="generator-method" class="label1">Select Type</label>
            <select name="" id="generator-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="generator-plan" class="label1">Select Plan</label>
            <select name="" id="generator-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="generator-amount" class="label1">Amount</label>
            <input id="generator-amount" type="text" class="text-input" />
            <label for="generator-notes" class="label1">Notes</label>
            <input id="generator-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Vehicle Parking</label>
            <label for="vehicle-parking-method" class="label1"
              >Select Type</label
            >
            <select name="" id="vehicle-parking-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="vehicle-parking-plan" class="label1">Select Plan</label>
            <select name="" id="vehicle-parking-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="vehicle-parking-amount" class="label1">Amount</label>
            <input id="vehicle-parking-amount" type="text" class="text-input" />
            <label for="vehicle-parking-notes" class="label1">Notes</label>
            <input id="vehicle-parking-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Transport</label>
            <label for="transport-method" class="label1">Select Type</label>
            <select name="" id="transport-method" class="text-input">
              <option value="Paid">Pay and Use</option>
              <option value="Free">Free</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="transport-plan" class="label1">Select Plan</label>
            <select name="" id="transport-plan" class="text-input">
              <option value="Monthly">Monthly</option>
              <option value="Semester">Semester</option>
              <option value="Annum">Annum</option>
            </select>
            <label for="transport-amount" class="label1">Amount</label>
            <input id="transport-amount" type="text" class="text-input" />
            <label for="transport-notes" class="label1">Notes</label>
            <input id="transport-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Room Service</label>
            <label for="room-service-method" class="label1">Select Type</label>
            <select name="" id="room-service-method" class="text-input">
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="room-service-nooftimes" class="label1"
              >Enter noof Times</label
            >
            <input
              type="number"
              id="room-service-nooftimes"
              class="text-input"
            />
            <label for="room-service-notes" class="label1">Notes</label>
            <input type="text" id="room-service-notes" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Sports Environment</label>
            <label for="sports-environment-method" class="label1"
              >Select Type</label
            >
            <select name="" id="sports-environment-method" class="text-input">
              <option value="Available">Available</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="sports-environment-notes" class="label1">Notes</label>
            <input
              id="sports-environment-notes"
              type="text"
              class="text-input"
            />
          </div>
          <div class="form-element">
            <label for="" class="label">CC-TV Survilance</label>
            <label for="cctv-method" class="label1">Select Type</label>
            <select name="" id="cctv-method" class="text-input">
              <option value="Available">Available</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="cctv-notes" class="label1">Notes</label>
            <input id="cctv-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Security</label>
            <label for="security-method" class="label1">Select Type</label>
            <select name="" id="security-method" class="text-input">
              <option value="Available">Available</option>
              <option value="un-available">Un Available</option>
            </select>
            <label for="security-notes" class="label1">Notes</label>
            <input id="security-notes" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <label for="" class="label">Others Specializations</label>
            <div class="" id="specializations-tags-section"></div>
            <input id="new-specialization" type="text" class="text-input" />
            <button
              id=""
              class="label1"
              style="margin: 1rem"
              onclick="Specializations.addSpecialization()"
            >
              Add
            </button>
          </div>
          <div class="form-element">
            <button
              id="update-specializations"
              class="label1"
              onclick="checkChange(3,0)"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div class="color">
        <p class="edit-tag edit-section">Hostel Policies</p>
        <div class="policy-info edit-section">
          <div class="form-element">
            <label for="" class="label">Enter Policy</label>
            <div class="policies-tags-section" id="hp-edit-tags-section"></div>
            <input type="text" class="text-input" id="new-policy" />
          </div>
          <div class="form-element">
            <button
              class="label1 hide"
              id="update-policy"
              onclick="PolicyInfo.updatePolicy()"
            >
              Update
            </button>
            <button
              id="add-policy"
              class="label1"
              onclick="PolicyInfo.addPolicy()"
            >
              ADD Policy
            </button>
          </div>
        </div>
      </div>

      <div class="color">
        <p class="edit-tag edit-section">Requirements Around</p>
        <div class="policy-info edit-section">
          <div class="form-element">
            <label for="" class="label">Requirement</label>
            <div
              class="requirements-tags-section"
              id="req-edit-tags-section"
            ></div>
            <label for="" class="label1">Select Type</label>
            <select name="" id="req-category" class="text-input">
              <option value="Atm">ATM</option>
              <option value="Medical Emergency">Medical Emergency</option>
              <option value="Bus Stop">Bus Stop</option>
              <option value="Theatre">Theatre</option>
              <option value="Stationery">Stationery</option>
              <option value="Saloon/Spa">Saloon/Spa</option>
              <option value="Xerox">Xerox</option>
              <option value="Others">Others</option>
            </select>
            <label for="add-requirement" class="label1">Enter Name</label>
            <input id="new-requirement" type="text" class="text-input" />
          </div>

          <div class="form-element">
            <button
              class="label1 hide"
              id="update-requirement"
              onclick="RequirementInfo.updateRequirement()"
            >
              Update
            </button>
            <button
              id="add-requirement"
              class="label1"
              onclick="RequirementInfo.addRequirement()"
            >
              ADD Hotspot
            </button>
          </div>
        </div>
      </div>

      <div class="color">
        <p class="edit-tag edit-section">Hotspots</p>
        <div class="policy-info edit-section">
          <div class="form-element">
            <label for="" class="label">Hotspot</label>
            <div class="hotspots-tags-section" id="hs-edit-tags-section"></div>
            <label for="" class="label1">Select Type</label>
            <select name="" id="hs-category" class="text-input">
              <option value="Restaurent">Restaurent</option>
              <option value="Drinks/Ice-creams">Drinks/Ice-creams</option>
              <option value="Holy Places">Holy Places</option>
              <option value="Parks">Parks</option>
              <option value="Others">Others</option>
            </select>
            <label for="add-hotspot" class="label1">Enter Name</label>
            <input id="new-hotspot" type="text" class="text-input" />
          </div>
          <div class="form-element">
            <button
              class="label1 hide"
              id="update-hotspot"
              onclick="HotspotInfo.updateHotspot()"
            >
              Update
            </button>
            <button
              id="add-hotspot"
              class="label1"
              onclick="HotspotInfo.addHotspot()"
            >
              ADD Hotspot
            </button>
          </div>
        </div>
      </div>
    </section>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/Hostels/hostelWorkspace.js"></script>
    <!-- <script src="js/Hostels/hostelWorkspaceAjaxCalls.js"></script> -->
  </body>
</html>

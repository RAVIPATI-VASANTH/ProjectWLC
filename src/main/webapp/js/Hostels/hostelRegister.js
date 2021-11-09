$("#ajaxcall").click(function () {
  $.post(
    "hostelRegister",
    {
      name: "Donald Duck",
      city: "Duckburg",
    },
    function (data, status) {
      if (status == "success") {
        window.location.assign("hostelWorkspace.jsp");
      }
    }
  );
});

// let obj={
//   hname="",
//   oname="",
//   ocontact="",
//   hgender="",
//   htype="",
//   hcommunityname="",
//   hlandmark="",
//   hlocation="",
//   hid="",
//   hpassword=""
// }

// let objsignal={
//   hname=false,
//   oname=false,
//   ocontact=false,
//   hgender=false,
//   htype=false,
//   hcommunityname=false,
//   hlandmark=false,
//   hlocation=false,
//   hid=false,
//   hpassword=false
// }

function checkChange(value) {
  switch (value) {
    case 0:
      var s = document.getElementById("hostel-name").value;
      var n = 35;
      document.getElementById("hostel-name-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 35) {
        document.getElementById("hostel-name-message").innerHTML = "Invalid";
        objsignal.hname = false;
      } else if (s.length !== 0) {
        objsignal.hname = true;
        obj.hname = s;
      }
      break;
    case 1:
      var s = document.getElementById("hostel-owner-name").value;
      var n = 15;
      document.getElementById("owner-name-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 15) {
        document.getElementById("hostel-name-message").innerHTML = "Invalid";
      }
      obj.oname = s;
      break;
    case 2:
      var n = 10;
      var s = document.getElementById("hostel-owner-contact").value;
      document.getElementById("contact-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 10) {
        document.getElementById("contact-message").innerHTML = "Invalid";
      }
      obj.ocontact = s;
      break;
    case 3:
      if (document.getElementById("hostel-type-community").checked) {
        document
          .getElementById("community-name")
          .setAttribute("class", "text-input");
        document
          .getElementById("community-message")
          .setAttribute("class", "notes message");
      } else {
        document
          .getElementById("community-name")
          .setAttribute("class", "text-input hide");
        document
          .getElementById("community-message")
          .setAttribute("class", "notes message hide");
      }
      break;
    case 4:
      var n = 10;
      var s = document.getElementById("community-name").value;
      document.getElementById("community-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 10) {
        document.getElementById("community-message").innerHTML = "Invalid";
      }
      break;
    case 5:
      if (document.getElementById("landmark").value !== "VFSTR") {
        document
          .getElementById("landmark-message")
          .setAttribute("class", "notes message");
      } else {
        document
          .getElementById("landmark-message")
          .setAttribute("class", "notes message hide");
      }
      break;
    case 6:
      var n = 30;
      var s = document.getElementById("landmark-full-name").value;
      document.getElementById("landmark-full-name-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 10) {
        document.getElementById("landmark-full-name-message").innerHTML =
          "Invalid";
      }
      break;
    case 7:
      var n = 50;
      var s = document.getElementById("landmark-description").value;
      document.getElementById("landmark-description-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 10) {
        document.getElementById("landmark-description-message").innerHTML =
          "Invalid";
      }
      break;
  }
}

//Credential Set-Up
function getRandNumber() {
  var s = "";
  for (var i = 0; i < 3; i++) {
    s += String(Math.floor(Math.random() * 10));
  }
  return s;
}

function getLandmarkSub() {
  var s = document.getElementById("landmark").value;
  return s.substring(0, 3);
}

function generateHostelId() {
  if (document.getElementById("landmark").value === "") {
    document
      .getElementById("generate-id-message")
      .setAttribute("class", "notes message");
    document.getElementById("hostel-id").value = "";
  } else {
    document
      .getElementById("generate-id-message")
      .setAttribute("class", "notes message hide");
    var num = getRandNumber();
    var lan = getLandmarkSub();
    if (document.getElementById("hostel-gender-male").checked) {
      var g = "M";
    } else {
      var g = "F";
    }
    // var g = ? "M" : "F";

    document.getElementById("hostel-id").value =
      "#" + lan + "-" + g + "-" + num;
  }
}

function checkPassword() {
  var i = document.getElementById("password").value;
  var j = document.getElementById("re-password").value;
  if (i === j) {
    document
      .getElementById("password-message")
      .setAttribute("class", "notes message hide");
  } else {
    document
      .getElementById("password-message")
      .setAttribute("class", "notes message");
  }
}

//Hostel  registration
function checkDataValidation() {}

//LandMark Creation
function createLandmark() {}

// Location related
function addLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, showError);
  } else {
    document.getElementById("location-status").innerText =
      "Geolocation is<br>not supported<br>by this browser.";
  }
}

function success(position) {
  // x.innerHTML =
  //   "Latitude: " +
  //   position.coords.latitude +
  //   "<br>Longitude: " +
  //   position.coords.longitude;
  document.getElementById("location-button").style.display = "none";
  document.getElementById("location-status").style.backgroundColor = "#63c28d";
  document.getElementById("location-status").innerText = "Added";
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("location-status").innerText =
        "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("location-status").innerText =
        "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById("location-status").innerText =
        "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("location-status").innerText =
        "An unknown error occurred.";
      break;
  }
}

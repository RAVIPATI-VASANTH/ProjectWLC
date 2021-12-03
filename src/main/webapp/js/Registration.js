"use strict";
var currentLandmarks = [];
var obj = {
  hname: "",
  oname: "",
  ocontact: "",
  hgender: "male",
  htype: "public",
  hcommunityname: "",
  hlandmark: "",
  hlfname: "",
  hlocation: "",
  htablesname: "",
  hid: "",
  hpassword: "",
};

var objsignal = {
  hname: false,
  oname: false,
  ocontact: false,
  hgender: true,
  htype: true,
  hcommunityname: false,
  hlandmark: false,
  hlfname: false,
  hlocation: false,
  htablesname: true,
  hid: false,
  hpassword: false,
};

function checkChange(value) {
  var obj = window.obj;
  var objsignal = window.objsignal;
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
      objsignal.oname = true;
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
      objsignal.ocontact = true;
      break;
    case 3:
      if (document.getElementById("hostel-type-community").checked) {
        document
          .getElementById("community-name")
          .setAttribute("class", "text-input");
        document
          .getElementById("community-message")
          .setAttribute("class", "notes message");
        obj.htype = "community";
      } else {
        document
          .getElementById("community-name")
          .setAttribute("class", "text-input hide");
        document
          .getElementById("community-message")
          .setAttribute("class", "notes message hide");
        obj.htype = "public";
      }
      break;
    case 4:
      var n = 10;
      var s = document.getElementById("community-name").value;
      document.getElementById("community-message").innerHTML =
        n - s.length + " charecters remaining";
      obj.hcommunityname = s;
      objsignal.hcommunityname = true;
      if (s.length > 10) {
        obj.hcommunityname = "";
        objsignal.hcommunityname = false;
        document.getElementById("community-message").innerHTML = "Invalid";
      }
      break;
    case 5:
      if (document.getElementById("landmark").value === "") {
        obj.hlandmark = "";
        obj.hlfname = "";
        objsignal.hlfname = false;
        obj.htablesname = "";
        document.getElementById("landmark-message").innerHTML = "Invalid";
      } else {
        obj.hlandmark = generateMinicode(
          document.getElementById("landmark").value
        );
        obj.hlfname = document.getElementById("landmark").value;
        objsignal.hlfname = true;
        objsignal.hlandmark = true;
        var signal = isAvailable(document.getElementById("landmark").value);
        if (signal) {
          document
            .getElementById("landmark-message")
            .setAttribute("class", "notes message");
          document.getElementById("landmark-message").innerHTML =
            "The Landmark you entered is not recognized by us. Continue the Registration process with this Landmark. Later we consult you forrecognization.";
        } else {
          document
            .getElementById("landmark-message")
            .setAttribute("class", "notes message hide");
        }
      }
      generateHostelId();
      break;
    case 6:
      var n = 60;
      var s = document.getElementById("landmark-full-name").value;
      document.getElementById("landmark-full-name-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 60) {
        document.getElementById("landmark-full-name-message").innerHTML =
          "Invalid";
      }
      break;
    case 7:
      var n = 150;
      var s = document.getElementById("landmark-description").value;
      document.getElementById("landmark-description-message").innerHTML =
        n - s.length + " charecters remaining";
      if (s.length > 150) {
        document.getElementById("landmark-description-message").innerHTML =
          "Invalid";
      }
      break;
  }
  window.obj = obj;
  window.objsignal = objsignal;
  // console.log(obj);
}

function updateLandmarksDatalist(data) {
  // console.log(data);
  var list = JSON.parse(data);
  currentLandmarks = list;
  console.log(currentLandmarks);
  var element = document.getElementById("landmarks");
  list.forEach((item, index) => {
    var tag = document.createElement("option");
    tag.setAttribute("value", item.minicode);
    tag.innerHTML = item.fullname;
    element.appendChild(tag);
  });
}

function generateMinicode(hstr) {
  var str = hstr.toUpperCase();
  if (str.length > 7) {
    str = str.slice(0, 7);
  }
  return str;
}

function createLandmarkCode() {
  var list = [];
  currentLandmarks.forEach((element) => {
    list.push(element.id);
  });
  list.sort();
  var num = Number(list[list.length - 1].split("_")[1]);
  num += 1;
  var str = "lan_" + String(num);
  return str;
}

function isAvailable(value) {
  var signal = true;
  currentLandmarks.forEach((element) => {
    if (element.minicode === value) {
      window.obj.htablesname = element.htablesname;
      signal = false;
    }
  });
  return signal;
}

//Credential Set-Up
function generateHostelId() {
  if (document.getElementById("landmark").value === "") {
    document.getElementById("hostel-id").value = "";
    obj.hid = "";
    objsignal.hid = false;
  } else {
    var lan = "";
    currentLandmarks.forEach((element) => {
      if (element.minicode === obj.hlandmark) {
        lan = element.minicode;
      } else {
        lan = obj.hlandmark;
        if (lan.length > 7) {
          lan = lan.slice(0, 7);
        }
      }
    });

    var num = 1;
    currentLandmarks.forEach((element) => {
      if (element.minicode === lan) {
        if (element.hostel_ids.length !== 0) {
          var l = element.hostel_ids.sort();
          l = l[l.length - 1].split("_");
          num = Number(l[l.length - 1]) + 1;
        }
      }
    });

    if (document.getElementById("hostel-gender-male").checked) {
      var g = "M";
    } else {
      var g = "F";
    }

    document.getElementById("hostel-id").value = lan + "_" + g + "_" + num;
    obj.hid = document.getElementById("hostel-id").value;
    objsignal.hid = true;
  }
}

function checkPassword() {
  var i = document.getElementById("password").value;
  var j = document.getElementById("re-password").value;
  if (i === j) {
    document
      .getElementById("password-message")
      .setAttribute("class", "notes message hide");
    obj.hpassword = j;
    objsignal.hpassword = true;
  } else {
    document
      .getElementById("password-message")
      .setAttribute("class", "notes message");
    obj.hpassword = "";
    objsignal.hpassword = true;
  }
}

//Hostel  registration
function checkDataValidation() {
  // console.log(obj);
  // console.log(objsignal);
  var signal = true;
  if (!objsignal.hname) {
    alert("Enter a valid Hostel Name");
    signal = false;
  } else if (!objsignal.oname) {
    alert("Enter a valid Owner Name");
    signal = false;
  } else if (!objsignal.ocontact) {
    alert("Enter a valid Contact");
    signal = false;
  } else if (obj.htype === "community") {
    if (!objsignal.hcommunityname) {
      alert("Enter Community Name");
      signal = false;
    }
  } else if (!objsignal.hlocation) {
    alert("Add Loaction");
    signal = false;
  } else if (!objsignal.hlandmark) {
    alert("Enetr a valid Landmark");
    signal = false;
  } else if (!objsignal.hid) {
    alert("Generate Hostel Id");
    signal = false;
  } else if (!objsignal.hpassword) {
    alert("Check the Password");
    signal = false;
  }
  if (signal) {
    sendNewHostelData();
  }
}

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
  obj.hlocation = position.coords.latitude + "&" + position.coords.longitude;
  objsignal.hlocation = true;
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
  obj.hlocation = "";
  objsignal.hlocation = false;
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

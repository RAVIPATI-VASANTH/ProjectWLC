"use strict";
var currentLandmarks = [];

let obj = {
  hname: "",
  oname: "",
  ocontact: "",
  hgender: "male",
  htype: "public",
  hcommunityname: "",
  hlandmark: "",
  hlocation: "",
  hid: "",
  hpassword: "",
};

let objsignal = {
  hname: false,
  oname: false,
  ocontact: false,
  hgender: true,
  htype: true,
  hcommunityname: false,
  hlandmark: false,
  hlocation: false,
  hid: false,
  hpassword: false,
};

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
      // console.log("called");
      if (!isAvailable(document.getElementById("landmark").value)) {
        document
          .getElementById("landmark-message")
          .setAttribute("class", "notes message");
      } else {
        document
          .getElementById("landmark-message")
          .setAttribute("class", "notes message hide");
      }
      if (document.getElementById("landmark").value === "") {
        obj.hlandmark = "";
        objsignal.hlandmark = false;
        document.getElementById("landmark-message").innerHTML = "Invalid";
      } else {
        obj.hlandmark = document.getElementById("landmark").value;
        objsignal.hlandmark = true;
        document.getElementById("landmark-message").innerHTML =
          "The Landmark you entered is not recognized by us. Continue the Registration process with this Landmark. Later we consult you for recognization.";
      }
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
}

function updateLandmarksDatalist(data) {
  console.log(data);
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

function createLandmarkCode() {
  var list = [];
  currentLandmarks.forEach((element) => {
    list.push(element.id);
  });
  list.sort();
  var num = Number(list[list.length - 1].split("-")[1]);
  num += 1;
  var str = "#lan-" + String(num);
  return str;
}

function isAvailable(value) {
  currentLandmarks.forEach((element) => {
    console.log(element.minicode + " " + value);
    if (element.minicode === value) {
      return false;
    }
    return true;
  });
}
//Credential Set-Up
function getRandNumber() {
  var s = "";
  if (currentLandmarks.hostel_ids.length === 0) {
    s = "1";
  } else {
    var list = [];
    var g = "";
    if (document.getElementById("hostel-gender-male").checked) {
      g = "M";
    } else {
      g = "F";
    }
    currentLandmarks.forEach((element) => {
      var k = element.split("-");
      if (k[1] === g) {
        list.push(element);
      }
    });
    list.sort();
    var e = list[list.length - 1].split("-");
    s = String(Number(e[2]) + 1);
  }
  return s;
}

function getLandmarkSub() {
  var s = document.getElementById("landmark").value;
  return s.substring(0, 3);
}

function generateHostelId() {
  // console.log(obj);
  // console.log(objsignal);

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
    var lan = minicodeGenerator(obj.hlandmark); //getLandmarkSub();
    if (document.getElementById("hostel-gender-male").checked) {
      var g = "M";
    } else {
      var g = "F";
    }

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
class StringProcessVar {
  constructor(word) {
    this.value = word;
    this.cur = -1;
  }
}

function createLandmark() {
  var fname = String(document.getElementById("landmark-full-name").value);
  var text = String(document.getElementById("landmark-description").value);
  var signal = false;
  if (
    fname.length === "" ||
    fname.length > 60 ||
    fname.trim() === "" ||
    text.length === "" ||
    text.length > 150 ||
    text.trim() === ""
  ) {
    signal = true;
    alert("Please enter valid Data to create Landmark");
  }
  if (signal) {
    return false;
  } else {
    var code = minicodeGenerator(fname);
    var id1 = createLandmarkCode();
    console.log({ id: id1, name: fname, minicode: code, des: text });
    return { id: id1, name: fname, minicode: code, des: text };
  }
}

// function generateMinicode(objsList) {
//   var str = "";
//   objsList.forEach((element) => {
//     str += element[0].value.toUpperCase();
//   });
//   if (str.length < 7) {
//     var diff = 7 - str.length;
//   }
//   return str;
// }

function minicodeGenerator(fname) {
  var str = fname;
  if (str.length > 7) {
    str = str.slice(0, 8);
  } else if (str.length < 7) {
    var diff = 7 - str.length;
    for (var i = 0; i < diff; i++) {
      str += "A";
    }
  }
  return str;
  /*
  //Splitting full name to Words
  var words = fname.split(" ");
  words.forEach((element, index) => {
    if (element === "") {
      words.splice(index, 1);
    }
  });
  //Creating a  processing variables
  var objsList = [];
  words.forEach((elements) => {
    objsList.push(new StringProcessVar(element));
  });

  //genrating actual code
  var minicode = generateMinicode(objsList);*/
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

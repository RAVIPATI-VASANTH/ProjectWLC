"use strict";
var currentLandmarks = [];

var obj = {
  landmark: "",
  newLandmarkfname: "",
  newLandmarkdes: "",
};

var objsignal = {
  landmark: false,
  newLandmarkfname: false,
  newLandmarkdes: false,
};

function processString(s) {
  console.log(s);
  s = s.replaceAll("\r", "");
  s = s.replaceAll("\n", "");
  return s;
}

function checkChange(value) {
  var obj = window.obj;
  var objsignal = window.objsignal;
  switch (value) {
    case 0:
      if (document.getElementById("landmark").value === "") {
        obj.landmark = "";
        objsignal.landmark = false;
        document.getElementById("landmark-message").innerHTML = "Invalid";
      } else {
        obj.landmark = document.getElementById("landmark").value;
        objsignal.landmark = true;
        var signal = isAvailable(document.getElementById("landmark").value);
        if (signal) {
          document
            .getElementById("landmark-message")
            .setAttribute("class", "notes message");
          document.getElementById("landmark-message").innerHTML =
            "Sorry we didn't find this Landmark. Please create new one.";
        } else {
          document
            .getElementById("landmark-message")
            .setAttribute("class", "notes message hide");
        }
      }
      break;
    case 1:
      var n = 60;
      var s = document.getElementById("landmark-full-name").value;
      document.getElementById("landmark-full-name-message").innerHTML =
        n - s.length + " charecters remaining";
      obj.newLandmarkfname = s;
      objsignal.newLandmarkfname = true;
      if (s.length > n) {
        obj.newLandmarkfname = "";
        objsignal.newLandmarkfname = false;
        document.getElementById("landmark-full-name-message").innerHTML =
          "Invalid";
      }
      break;

    case 2:
      var n = 150;
      var s = document.getElementById("landmark-description").value;
      document.getElementById("landmark-description-message").innerHTML =
        n - s.length + " charecters remaining";
      obj.newLandmarkdes = s;
      objsignal.newLandmarkdes = true;
      if (s.length > n) {
        obj.newLandmarkdes = "";
        objsignal.newLandmarkdes = false;
        document.getElementById("landmark-description-message").innerHTML =
          "Invalid";
      }
      break;
  }
  window.obj = obj;
  window.objsignal = objsignal;
}

function updateLandmarksDatalist(data) {
  var list = JSON.parse(data);
  window.currentLandmarks = list;
  var element = document.getElementById("landmarks");
  list.forEach((item, index) => {
    var tag = document.createElement("option");
    tag.setAttribute("value", item.minicode);
    tag.innerHTML = item.fullname;
    element.appendChild(tag);
  });
}

function callForStep2() {
  if (window.objsignal.landmark) {
    if (isAvailable(window.obj.landmark)) {
      alert("Sorry we didn't find this Landmark. Please create new one.");
    } else {
      var obj = {
        signal: 2,
        landmark: window.obj.landmark,
      };
      $.post("hostelRegister", obj, function (data, status) {
        if (status === "success") {
        } else {
          alert("Something Went Wrong..!!");
        }
      });
      window.location.assign("hostelRegistrationS2.jsp");
    }
  } else {
    alert("Select Landmark");
  }
}

function isAvailable(value) {
  var signal = true;
  window.currentLandmarks.forEach((element) => {
    if (element.minicode === value) {
      signal = false;
    }
  });
  return signal;
}

//Landmark Creation
function sortOrder(list) {
  for (var i = 0; i < list.length; i++) {
    for (var j = 0; j < list.length - 1; j++) {
      if (list[j] > list[j + 1]) {
        var temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
}

function createLandmarkCode() {
  var list = [];
  var num = 0;
  if (currentLandmarks.length !== 0) {
    currentLandmarks.forEach((element) => {
      list.push(Number(element.id.split("_")[1]));
    });
    list = sortOrder(list);
    var num = list[list.length - 1];
  }
  num += 1;
  var str = "lan_" + String(num);
  return str;
}

function generateMinicode(hstr) {
  var date = new Date();
  var str = "";
  var dumb = "";
  var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < hstr.length; i++) {
    if (alpha.includes(hstr[i]) || hstr[i] === " ") {
      dumb += hstr[i];
    }
  }
  hstr = dumb;
  var words = hstr.split(" ");
  words.forEach((element) => {
    str += element[0];
  });
  if (str.length < 6) {
    var d = "";
    var diff = 6 - str.length;
    for (var i = 0; i < diff; i++) {
      var rnum = Math.floor(Math.random() * alpha.length);
      d += alpha.substring(rnum, rnum + 1);
    }
    str += d;
    str +=
      String(date.getDate()) +
      String(date.getMonth()) +
      String(date.getYear()).substring(1, 4);
  } else {
    if (str.length > 6) {
      str = str.substring(0, 7);
    }
    str +=
      String(date.getDate()) +
      String(date.getMonth()) +
      String(date.getYear()).substring(1, 4);
  }
  return str.toUpperCase();
}

function createLandmarkObject() {
  var obj = window.obj;
  var mini = generateMinicode(obj.newLandmarkfname);
  var lanid = createLandmarkCode();
  var fname = obj.newLandmarkfname;
  var htablename = lanid + "_hostels";

  obj = {
    signal: 0,
    id: processString(lanid),
    minicode: processString(mini),
    fullname: processString(fname),
    tablename: processString(htablename),
  };
  return obj;
}

function checkLanid(obj) {
  for (var i = 0; i < window.currentLandmarks.length; i++) {
    var element = window.currentLandmarks[i];
    if (obj.minicode === element.minicode) {
      return false;
    }
  }
  return true;
}

function createLandmark() {
  if (!window.objsignal.newLandmarkfname) {
    alert("Enter a valid Landmark Name");
  } else if (!window.objsignal.newLandmarkfname) {
    alert("Enter a valid Description");
  } else {
    var data = createLandmarkObject();
    var signal = checkLanid(data);
    if (signal) {
      $.post("hostelRegister", data, function (data, status) {
        if (status === "success") {
          document.getElementById("landmark-full-name").value = "";
          document.getElementById("landmark-description").value = "";
          window.location.assign("hostelRegistrationS2.jsp");
        } else {
          alert("Something Went Wrong..!!");
        }
      });
    } else {
      alert("landmark already exists.");
    }
  }
}

//initial Loading
function getLandmarks() {
  $.get(
    "hostelRegister",
    {
      signal: 1,
    },
    function (data, status) {
      if (status == "success") {
        updateLandmarksDatalist(data);
      }
    }
  );
}

window.onload = function () {
  getLandmarks();
};

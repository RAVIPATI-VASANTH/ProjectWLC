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
  console.log(currentLandmarks);
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
  currentLandmarks.forEach((element) => {
    list.push(Number(element.id.split("_")[1]));
  });
  list = sortOrder(list);
  console.log(list);
  var num = list[list.length - 1];
  num += 1;
  var str = "lan_" + String(num);
  return str;
}

function generateMinicode(hstr) {
  var str = hstr.toUpperCase();
  if (str.length > 7) {
    str = str.slice(0, 7);
  }
  return str;
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

function createLandmark() {
  if (!window.objsignal.newLandmarkfname) {
    alert("Enter a valid Landmark Name");
  } else if (!window.objsignal.newLandmarkfname) {
    alert("Enter a valid Description");
  } else {
    var obj = createLandmarkObject();

    $.post("hostelRegister", obj, function (data, status) {
      if (status === "success") {
        window.location.assign("hostelRegistrationS2.jsp?l=" + obj.minicode);
      } else {
        alert("Something Went Wrong..!!");
      }
    });
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

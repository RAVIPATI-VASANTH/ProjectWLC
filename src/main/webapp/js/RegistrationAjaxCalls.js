"use strict";

function sendNewHostelData() {
  var obj = window.obj;
  var result = checkLandmark();
  if (!result) {
    $.post(
      "hostelRegister",
      {
        signal: 1,
        hname: obj.hname,
        oname: obj.oname,
        ocontact: obj.ocontact,
        hgender: obj.hgender,
        htype: obj.htype,
        hcommunityname: obj.hcommunityname,
        hlandmark: obj.hlandmark,
        hlocation: obj.hlocation,
        hid: obj.hid,
        htablename: obj.htablesname,
        hpassword: obj.hpassword,
        hlfname: obj.hlfname,
      },
      function (data, status) {
        if (status === "success") {
          console.log("created hostel");
          // window.location.assign("Registration.jsp");
        } else {
          alert("Something Went Wrong..!!");
        }
      }
    );
  }
}

function checkLandmark() {
  var l = [];
  var obj = window.obj;
  currentLandmarks.forEach((element) => {
    l.push(element.minicode);
  });
  for (var i = 0; i < l.length; i++) {
    var element = l[i];
    if (obj.hlandmark === element) {
      $.post(
        "hostelRegister",
        {
          signal: 2,
          hname: obj.hname,
          oname: obj.oname,
          ocontact: obj.ocontact,
          hgender: obj.hgender,
          htype: obj.htype,
          hcommunityname: obj.hcommunityname,
          hlandmark: obj.hlandmark,
          hlocation: obj.hlocation,
          hid: obj.hid,
          htablename: "other_lan",
          hpassword: obj.hpassword,
          hlfname: obj.hlfname,
        },
        function (data, status) {
          if (status === "success") {
            console.log("created hostel");
            // window.location.assign("Registration.jsp");
          } else {
            alert("Something Went Wrong..!!");
          }
        }
      );
      return true;
    }
  }
  return false;
}

// VFSTR
// Vignan Foundation of Sciences of Technology and Research

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

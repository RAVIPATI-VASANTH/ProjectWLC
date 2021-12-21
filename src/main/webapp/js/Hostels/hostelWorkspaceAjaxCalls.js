function getHostelBasicInfo(hid) {
  var ltable = hid.split("_")[0];
  var obj = {
    signal: 0,
    id: hid,
    lanmincode: ltable,
  };

  $.post("HostelWorkspace", obj, function (data, status) {
    if (status === "success") {
      dataConversion(data, 0);
    } else {
      alert("Something Went Wrong..!!");
    }
  });
}

function getHostelFoodInfo(hid) {
  var obj = {
    signal: 1,
    id: hid,
  };
  $.post("HostelWorkspace", obj, function (data, status) {
    if (status === "success") {
      dataConversion(data, 1);
    } else {
      alert("Something Went Wrong..!!");
    }
  });
}

function getHostelRoomInfo(hostel) {
  var rt = processString(hostel.basicInfo.hrtable);
  var obj = {
    signal: 2,
    rtablename: rt,
  };
  $.post("HostelWorkspace", obj, function (data, status) {
    if (status === "success") {
      dataConversion(data, 2);
    } else {
      alert("Something Went Wrong..!!");
    }
  });
}

window.onload = function () {
  var hid = String(document.getElementById("hostel-id").innerHTML).replace(
    /[\r\n]+/gm,
    ""
  );
  getHostelBasicInfo(hid);
  getHostelFoodInfo(hid);
  // getHostelRoomInfo(); calling after path getHostelFoodInfo
};

// Data Holding classes
class BasicInfo1 {
  constructor(obj) {
    // this.
  }

  static basicInfoChange(value) {
    switch (value) {
      case 0:
        document.getElementById("view-hostel-name").innerText =
          document.getElementById("edit-hostel-name").value;
        editHostel.basicInfo.hostelName =
          document.getElementById("edit-hostel-name").value;
        break;
      case 1:
        document.getElementById("view-head-line").innerText =
          document.getElementById("edit-head-line").value;
        editHostel.basicInfo.headLine =
          document.getElementById("edit-head-line").value;
        break;
      case 2:
        document.getElementById("view-owner-name").innerText =
          document.getElementById("edit-owner-name").value;
        editHostel.basicInfo.ownerName =
          document.getElementById("edit-owner-name").value;
        break;
      case 3:
        document.getElementById("view-owner-contact").innerText =
          document.getElementById("edit-owner-contact").value;
        editHostel.basicInfo.contactNumber =
          document.getElementById("edit-owner-contact").value;
        break;
      case 4:
        document.getElementById("view-strength").innerText =
          document.getElementById("edit-strength").value;
        editHostel.basicInfo.strength =
          document.getElementById("edit-strength").value;
        break;
      case 5:
        let typeString = new String();
        if (document.getElementById("edit-type-public").checked) {
          typeString = "Public - Any one can join.";
        }
        if (document.getElementById("edit-type-community").checked) {
          typeString = "Community - ";
          typeString += document.getElementById("community-name").value;
        }
        document.getElementById("view-type").innerText = typeString;
        editHostel.basicInfo.type = typeString;
        break;
      case 6:
        if (document.getElementById("hostel-gender-male").checked) {
          document.getElementById("view-gender").innerText = "Gents";
          document.getElementById("gender").src = "images/male.svg";
          editHostel.basicInfo.gender = "Gents";
        }
        if (document.getElementById("hostel-gender-female").checked) {
          document.getElementById("view-gender").innerText = "Ladies";
          document.getElementById("gender").src = "images/female.svg";
          editHostel.basicInfo.gender = "Ladies";
        }
        break;
      case 7:
        break;
      case 8:
        document.getElementById("view-landmark").innerText =
          document.getElementById("landmark").value;
        // LANDMARK here we need ajax call to get all LANDMARKS.
        break;
    }
  }
}

class hostelPlans {
  constructor(name) {
    this.planName = name;
    this.isActive = true;
    this.monthly = "";
    this.semester = "";
    this.annum = "";
  }
}

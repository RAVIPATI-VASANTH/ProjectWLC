"use strict;";
var signalsList = [false, true, true, true, true, true];
var currentLandmarks = [];
var hostelIds = [];
//UI interacting functions
function changeLandmark() {
  var lfname = document.getElementById("landmarks").value;
  changeLandmarkInfoSection(lfname);
  currentLandmarks.forEach((element) => {
    if (element.fullname === lfname) {
      document
        .getElementById("landmark-link")
        .setAttribute("href", element.location);
    }
  });
  callForHostelsMinidata(lfname);
}

function sort(list) {
  for (var i = 0; i < list.length - 1; i++) {
    for (var j = 0; j < list.length - i - 1; j++) {
      if (Number(list[j].hsearchscore) < Number(list[j + 1].hsearchscore)) {
        var temp = list[j];
        list[j] = list[j + 1];
        list[j + 1] = temp;
      }
    }
  }
  return list;
}

function createHostelitems(list) {
  // removing all previous items
  var maindiv = document.getElementById("hostels-list");
  while (maindiv.hasChildNodes()) {
    maindiv.removeChild(maindiv.firstChild);
  }
  if (list.length === 0) {
    var p = document.createElement("P");
    p.setAttribute("class", "no-data");
    p.innerText = "No Data";
    maindiv.append(p);
  } else {
    window.hostelIds = [];
    index = 0;
    list = sort(list);
    list.forEach((element) => {
      //creating item div
      var hItemDiv = document.createElement("div");
      hItemDiv.setAttribute("class", "hostel-item");
      hItemDiv.setAttribute("onclick", "redirect(" + index + ")");
      window.hostelIds.push(element.hid);
      //creating himage
      var himage = document.createElement("img");
      himage.setAttribute("src", "images/bed.PNG");
      himage.setAttribute("class", "hostel-img");
      hItemDiv.append(himage);

      //creating infoDiv
      var infoDiv = document.createElement("div");
      infoDiv.setAttribute("class", "info");
      //creating hNameP
      var hNameP = document.createElement("P");
      hNameP.setAttribute("class", "hostelname");
      hNameP.innerHTML = element.hname;
      infoDiv.appendChild(hNameP);
      //***************creating gDiv
      var gDiv = document.createElement("div");
      gDiv.setAttribute("class", "field");
      //creating giconImg
      var giconImg = document.createElement("IMG");
      giconImg.setAttribute("class", "icon");
      if (element.hgender === "male") {
        giconImg.setAttribute("src", "images/male.svg");
      } else {
        giconImg.setAttribute("src", "images/female.svg");
      }
      gDiv.appendChild(giconImg);
      //creating gPFname
      var gPFname = document.createElement("P");
      gPFname.setAttribute("class", "field-name");
      if (element.hgender === "male") {
        gPFname.innerHTML = "Gents";
      } else {
        gPFname.innerHTML = "Ladies";
      }
      gDiv.appendChild(gPFname);
      infoDiv.appendChild(gDiv);
      //***************creating htypeDiv
      var htypeDiv = document.createElement("div");
      htypeDiv.setAttribute("class", "field");
      //creating ticonImg
      var ticonImg = document.createElement("IMG");
      ticonImg.setAttribute("class", "icon");
      ticonImg.setAttribute("src", "images/type.svg");
      htypeDiv.appendChild(ticonImg);
      //creating tPFname
      var tPFname = document.createElement("P");
      tPFname.setAttribute("class", "field-name");
      if (element.htype === "public") {
        tPFname.innerHTML = "Public";
      } else {
        tPFname.innerHTML = "Comminity-" + element.hcommunity;
      }
      htypeDiv.appendChild(tPFname);
      infoDiv.appendChild(htypeDiv);
      //***************creating hconDiv
      var hconDiv = document.createElement("div");
      hconDiv.setAttribute("class", "field");
      //creating ciconImg
      var ciconImg = document.createElement("IMG");
      ciconImg.setAttribute("class", "icon");
      ciconImg.setAttribute("src", "images/call.svg");
      hconDiv.appendChild(ciconImg);
      //creating cPFname
      var cPFname = document.createElement("P");
      cPFname.setAttribute("class", "field-name");
      cPFname.innerHTML = element.hcontact;
      hconDiv.appendChild(cPFname);
      infoDiv.appendChild(hconDiv);

      hItemDiv.append(infoDiv);
      maindiv.appendChild(hItemDiv);
      index++;
    });
  }
}

function redirect(index) {
  window.location.assign("HostelInfo.jsp?id=" + window.hostelIds[index]);
}

function toggleMoreInfo(index) {
  var div = document.getElementById("word-" + index);
  if (signalsList[index]) {
    div.setAttribute("class", "hide");
    signalsList[index] = false;
  } else {
    div.setAttribute("class", "");
    signalsList[index] = true;
  }
}
//Processing
function updateLandmarksDatalist(data) {
  var obj = JSON.parse(data);
  var list = obj.list;
  var countobj = obj.count;
  updateViewCountElements(countobj);
  window.currentLandmarks = list;
  var element = document.getElementById("landmarks");
  list.forEach((item, index) => {
    var tag = document.createElement("option");
    tag.setAttribute("value", item.fullname);
    tag.innerHTML = item.fullname;
    tag.setAttribute("class", "landmark-option");
    element.appendChild(tag);
  });
  changeLandmark();
}

function updateViewCountElements(obj) {
  var hcount = String(obj.hostelscount);
  var lancount = String(obj.landmarkcount);
  if (hcount.length < 2) hcount = "0" + hcount;
  if (lancount.length < 2) lancount = "0" + lancount;
  document.getElementById("hostel-count").innerText = hcount;
  document.getElementById("landmark-count").innerText = lancount;
}

function changeLandmarkInfoSection(lname, location) {
  document.getElementById("landmark-name").innerHTML = lname;
  // document.getElementById("").setAttribute("href");
}

function callForHostelsMinidata(lfname) {
  window.currentLandmarks.forEach((element) => {
    if (element.fullname === lfname) {
      getHostelsMiniData(element.htablesname);
    }
  });
}

// initial Load and Ajax Calls
function getLandmarks() {
  $.get(
    "hostelsLoad",
    {
      signal: 0,
    },
    function (data, status) {
      if (status == "success") {
        updateLandmarksDatalist(data);
      }
    }
  );
}

function getHostelsMiniData(tname) {
  var obj = {
    signal: 1,
    tablename: tname,
  };
  $.get("hostelsLoad", obj, function (data, status) {
    if (status == "success") {
      var list = JSON.parse(data);
      createHostelitems(list);
    }
  });
}

window.onload = function () {
  getLandmarks();
  if (window.innerWidth < 750) {
    for (var i = 0; i < signalsList.length; i++) {
      toggleMoreInfo(i);
    }
  }
};

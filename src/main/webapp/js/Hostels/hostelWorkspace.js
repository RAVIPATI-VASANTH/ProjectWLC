"use strict";
class Hostel {
  constructor() {
    this.basicInfo;
    this.foodInfo;
    this.roomInfo;
    this.specializationInfo;
    this.hotspotInfo;
    this.policyInfo;
    this.searchScore = 0;
    this.basicInfoScore = 0;
    this.foodInfoScore = 0;
    this.roomInfoScore = 0;
    this.specializationInfoScore = 0;
    this.hotspotInfoScore = 0;
    this.requirementInfoScore = 0;
  }
}

var originalData = new Hostel();
var modifiedData = new Hostel();

//String Processing
function processString(s) {
  s = s.replaceAll("\r", "");
  s = s.replaceAll("\n", "");
  return s;
}

//Switch Mode
function switchMode(mode) {
  var button = document.getElementById("switch-button");
  if (mode === 0) {
    button.setAttribute("onclick", "switchMode(" + 1 + ")");
    button.innerHTML = "Edit Mode";
    document.getElementById("view").setAttribute("class", "");
    document.getElementById("edit").setAttribute("class", "hide");
  } else {
    button.setAttribute("onclick", "switchMode(" + 0 + ")");
    button.innerHTML = "View Mode";
    document.getElementById("view").setAttribute("class", "hide");
    document.getElementById("edit").setAttribute("class", "");
  }
}

//Location Related functions
function addLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, showError);
  } else {
    document.getElementById("location-status").innerText =
      "Geolocation is<br>not supported<br>by this browser.";
  }
}

function success(position) {
  window.modifiedData.basicInfo.hlocation =
    position.coords.latitude + "&" + position.coords.longitude;
  document.getElementById("location").innerText = "Updated";
  document.getElementById("location").style.backgroundColor = "lightgreen";
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

class BasicInfo {
  static updateBasicInfoUi() {
    var hostel = window.modifiedData;
    //Title Tag
    document.getElementById("title-name").innerText =
      "Workspace-" + hostel.basicInfo.hname;
    //hostelname
    document.getElementById("edit-hostel-name").value = hostel.basicInfo.hname;
    document.getElementById("view-hostel-name").innerHTML =
      hostel.basicInfo.hname;
    //headline
    document.getElementById("edit-head-line").value =
      hostel.basicInfo.hheadline;
    document.getElementById("view-head-line").innerHTML =
      hostel.basicInfo.hheadline;
    //ownername
    document.getElementById("edit-owner-name").value = hostel.basicInfo.honame;
    document.getElementById("view-owner-name").innerHTML =
      hostel.basicInfo.honame;
    //ownercontact
    document.getElementById("edit-owner-contact").value =
      hostel.basicInfo.hocontact;
    document.getElementById("view-owner-contact").innerHTML =
      hostel.basicInfo.hocontact;
    //strength
    document.getElementById("edit-strength").value = hostel.basicInfo.hstrength;
    document.getElementById("view-strength").innerHTML =
      hostel.basicInfo.hstrength;
    //hostel type
    if (hostel.basicInfo.htype === "public") {
      document.getElementById("edit-type-public").checked = true;
      document
        .getElementById("community-name")
        .setAttribute("class", "text-input hide");
      document.getElementById("view-type").innerHTML =
        "Public - Anyone can join";
    } else {
      document.getElementById("edit-type-community").checked = true;
      document
        .getElementById("community-name")
        .setAttribute("class", "text-input");
      document.getElementById("community-name").value =
        hostel.basicInfo.hcommunity;
      document.getElementById("view-type").innerHTML =
        "Community - " + hostel.basicInfo.hcommunity;
    }
    //hostel gender
    if (hostel.basicInfo.hgender === "male") {
      document.getElementById("hostel-gender-male").checked = true;
      document.getElementById("view-gender").innerHTML = "Gents";
      document.getElementById("gender").setAttribute("src", "images/male.svg");
    } else {
      document.getElementById("hostel-gender-female").checked = true;
      document.getElementById("view-gender").innerHTML = "Ladies";
      document
        .getElementById("gender")
        .setAttribute("src", "images/female.svg");
    }
    //landmark
    document.getElementById("view-landmark").innerHTML =
      hostel.basicInfo.hlfname;
    //location
    document.getElementById("location").href = hostel.basicInfo.hlocation;

    window.modifiedData = hostel;

    window.modifiedData.searchScore -= window.modifiedData.basicInfoScore;
    window.modifiedData.basicInfoScore = SearchScore.updateBasicInfoScore(
      window.modifiedData.basicInfo
    );
    window.modifiedData.searchScore += window.modifiedData.basicInfoScore;
    document.getElementById("score").innerText =
      window.modifiedData.searchScore;
  }

  static updateChanges() {
    var hostel = window.modifiedData;
    //hostelname
    hostel.basicInfo.hname = document.getElementById("edit-hostel-name").value;
    //headline
    hostel.basicInfo.hheadline =
      document.getElementById("edit-head-line").value;
    //ownername
    hostel.basicInfo.honame = document.getElementById("edit-owner-name").value;
    //ownercontact
    hostel.basicInfo.hocontact =
      document.getElementById("edit-owner-contact").value;
    //strength
    hostel.basicInfo.hstrength = document.getElementById("edit-strength").value;
    //hostel type
    if (document.getElementById("edit-type-public").checked) {
      hostel.basicInfo.htype = "public";
    } else {
      hostel.basicInfo.htype = "community";
      hostel.basicInfo.hcommunity =
        document.getElementById("community-name").value;
    }
    //hostel gender
    if (document.getElementById("hostel-gender-male").checked) {
      hostel.basicInfo.hgender = "male";
    }
    if (document.getElementById("hostel-gender-female").checked) {
      hostel.basicInfo.hgender = "female";
    }
    this.updateBasicInfoUi();
    window.modifiedData = hostel;
  }
}

class FoodInfo {
  static processFoodInfoData() {
    var obj = {
      breakfast: {
        time: "",
        items: "",
        type: "",
        notes: "",
      },
      lunch: {
        time: "",
        items: "",
        type: "",
        notes: "",
      },
      snacks: {
        time: "",
        items: "",
        type: "",
        notes: "",
      },
      dinner: {
        time: "",
        items: "",
        type: "",
        notes: "",
      },
      nonveg: {
        count: "",
        type: "",
        notes: "",
      },
    };

    var rawobj = window.modifiedData.foodInfo;
    var words = rawobj.breakfast.split("|");
    obj.breakfast.time = words[0].replace(/[\r\n]+/gm, "");
    obj.breakfast.type = words[1].replace(/[\r\n]+/gm, "");
    obj.breakfast.items = words[2].replace(/[\r\n]+/gm, "");
    obj.breakfast.notes = words[3].replace(/[\r\n]+/gm, "");

    words = rawobj.lunch.split("|");
    obj.lunch.time = words[0].replace(/[\r\n]+/gm, "");
    obj.lunch.type = words[1].replace(/[\r\n]+/gm, "");
    obj.lunch.items = words[2].replace(/[\r\n]+/gm, "");
    obj.lunch.notes = words[3].replace(/[\r\n]+/gm, "");

    words = rawobj.snacks.split("|");
    obj.snacks.time = words[0].replace(/[\r\n]+/gm, "");
    obj.snacks.type = words[1].replace(/[\r\n]+/gm, "");
    obj.snacks.items = words[2].replace(/[\r\n]+/gm, "");
    obj.snacks.notes = words[3].replace(/[\r\n]+/gm, "");

    words = rawobj.dinner.split("|");
    obj.dinner.time = words[0].replace(/[\r\n]+/gm, "");
    obj.dinner.type = words[1].replace(/[\r\n]+/gm, "");
    obj.dinner.items = words[2].replace(/[\r\n]+/gm, "");
    obj.dinner.notes = words[3].replace(/[\r\n]+/gm, "");

    words = rawobj.nonveg.split("|");
    obj.nonveg.count = words[0].replace(/[\r\n]+/gm, "");
    obj.nonveg.type = words[1].replace(/[\r\n]+/gm, "");
    obj.nonveg.notes = words[2].replace(/[\r\n]+/gm, "");

    window.modifiedData.foodInfo = obj;
    window.originalData.foodInfo = obj;

    this.updateFoodEditInfo();
    this.checkEmptyCondtion(rawobj);
  }

  static checkEmptyCondtion(obj) {
    if (
      obj.breakfast === "|||" &&
      obj.lunch === "|||" &&
      obj.snacks === "|||" &&
      obj.dinner === "|||" &&
      obj.nonveg === "||"
    ) {
      var maindiv = document.getElementById("food-cards-section");

      var p = document.createElement("P");
      p.setAttribute("class", "no-data");
      p.innerText = "No Data";
      maindiv.append(p);
      return true;
    } else return false;
  }

  static updateFoodEditInfo() {
    var obj = window.modifiedData.foodInfo;
    //Breakfast
    document.getElementById("breakfast-time").value = obj.breakfast.time;
    document.getElementById("breakfast-period").value = obj.breakfast.type;
    document.getElementById("breakfast-items").value = obj.breakfast.items;
    document.getElementById("breakfast-notes").value = obj.breakfast.notes;

    //Lunch
    document.getElementById("lunch-time").value = obj.lunch.time;
    document.getElementById("lunch-period").value = obj.lunch.type;
    document.getElementById("lunch-items").value = obj.lunch.items;
    document.getElementById("lunch-notes").value = obj.lunch.notes;

    //Snacks
    document.getElementById("snacks-time").value = obj.snacks.time;
    document.getElementById("snacks-period").value = obj.snacks.type;
    document.getElementById("snacks-items").value = obj.snacks.items;
    document.getElementById("snacks-notes").value = obj.snacks.notes;

    //Dinner
    document.getElementById("dinner-time").value = obj.dinner.time;
    document.getElementById("dinner-period").value = obj.dinner.type;
    document.getElementById("dinner-items").value = obj.dinner.items;
    document.getElementById("dinner-notes").value = obj.dinner.notes;

    //Non-Veg
    document.getElementById("noof-times").value = obj.nonveg.count;
    document.getElementById("limit").value = obj.nonveg.type;
    document.getElementById("nonveg-notes").value = obj.nonveg.notes;

    this.updateFoodViewInfo();
    window.modifiedData.searchScore -= window.modifiedData.foodInfoScore;
    window.modifiedData.foodInfoScore = SearchScore.updateFoodInfoScore(
      window.modifiedData.foodInfo
    );
    window.modifiedData.searchScore += window.modifiedData.foodInfoScore;
    document.getElementById("score").innerText =
      window.modifiedData.searchScore;
  }

  static createCard1(obj, title) {
    if (obj.time !== "") {
      //creating food card
      var carddiv = document.createElement("div");
      carddiv.setAttribute("class", "food-card");
      if (obj.type === "") {
        alert("Please Select the Type for " + title);
      } else {
        //creating Title
        var tit = document.createElement("P");
        tit.setAttribute("class", "label");
        tit.innerText = title + "(" + obj.type + ")";
        carddiv.appendChild(tit);
        //creating ul1 for ordering
        var ul1 = document.createElement("ul");
        //creating time div
        var tdiv = document.createElement("div");
        tdiv.setAttribute("class", "field-box");

        var arrow = document.createElement("IMG");
        arrow.setAttribute("src", "images/arrow-right.svg");
        arrow.setAttribute("class", "mini-icon");
        tdiv.appendChild(arrow);

        var tp = document.createElement("P");
        tp.setAttribute("class", "label2");
        tp.innerText = "Starts at " + obj.time;
        tdiv.appendChild(tp);
        ul1.appendChild(tdiv);
        //creating item div
        var itemdiv = document.createElement("div");
        itemdiv.setAttribute("class", "field-box");

        var arrow1 = document.createElement("IMG");
        arrow1.setAttribute("src", "images/arrow-right.svg");
        arrow1.setAttribute("class", "mini-icon");
        itemdiv.appendChild(arrow1);

        var tp1 = document.createElement("P");
        tp1.setAttribute("class", "label2 notes");
        tp1.innerText = "Items : ";
        var words = obj.items.split("-");
        for (var i = 0; i < words.length; i++) {
          if (i !== words.length - 1) {
            tp1.innerText += words[i] + ", ";
          } else {
            tp1.innerText += words[i];
          }
        }
        itemdiv.appendChild(tp1);
        ul1.appendChild(itemdiv);
        //creating notes div
        if (obj.notes.trim() !== "") {
          var ndiv = document.createElement("div");
          ndiv.setAttribute("class", "field-box");

          var arrow2 = document.createElement("IMG");
          arrow2.setAttribute("src", "images/arrow-right.svg");
          arrow2.setAttribute("class", "mini-icon");
          ndiv.appendChild(arrow2);

          var np = document.createElement("P");
          np.setAttribute("class", "label2 notes");
          np.innerText = obj.notes;
          ndiv.appendChild(np);

          ul1.appendChild(ndiv);
        }
        carddiv.appendChild(ul1);
        document.getElementById("food-cards-section").appendChild(carddiv);
      }
    }
  }

  static createCard2(obj, title) {
    if (obj.count !== "") {
      if (obj.type === "") {
        alert("Please Select Type for " + title);
      } else {
        //creating food card
        var carddiv = document.createElement("div");
        carddiv.setAttribute("class", "food-card");
        //creating Title
        var tit = document.createElement("P");
        tit.setAttribute("class", "label");
        tit.innerText = title;
        carddiv.appendChild(tit);
        //creating ul1 for ordering
        var ul1 = document.createElement("ul");
        //creating count div
        var cdiv = document.createElement("div");
        cdiv.setAttribute("class", "field-box");
        var arrow = document.createElement("IMG");
        arrow.setAttribute("src", "images/arrow-right.svg");
        arrow.setAttribute("class", "mini-icon");
        cdiv.appendChild(arrow);

        var cp = document.createElement("P");
        cp.setAttribute("class", "label2");
        cp.innerText = obj.count + " times per week - " + obj.type;
        cdiv.appendChild(cp);
        ul1.appendChild(cdiv);

        //creating notes div
        if (obj.notes.trim() !== "") {
          var ndiv = document.createElement("div");
          ndiv.setAttribute("class", "field-box");

          var arrow2 = document.createElement("IMG");
          arrow2.setAttribute("src", "images/arrow-right.svg");
          arrow2.setAttribute("class", "mini-icon");
          ndiv.appendChild(arrow2);

          var np = document.createElement("P");
          np.setAttribute("class", "label2 notes");
          np.innerText = obj.notes;
          ndiv.appendChild(np);

          ul1.appendChild(ndiv);
        }

        carddiv.appendChild(ul1);
        document.getElementById("food-cards-section").appendChild(carddiv);
      }
    }
  }

  static updateFoodViewInfo() {
    //Removing previous cards
    var maindiv = document.getElementById("food-cards-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }
    //Creating Food Cards
    this.createCard1(window.modifiedData.foodInfo.breakfast, "Breakfast");
    this.createCard1(window.modifiedData.foodInfo.lunch, "Lunch");
    this.createCard1(window.modifiedData.foodInfo.snacks, "Snacks");
    this.createCard1(window.modifiedData.foodInfo.dinner, "Dinner");
    this.createCard2(window.modifiedData.foodInfo.nonveg, "Non-Veg");
  }

  static updateFoodInfo() {
    // console.log("food info called");
    var obj = window.modifiedData.foodInfo;
    //Breakfast
    obj.breakfast.time = document.getElementById("breakfast-time").value;
    obj.breakfast.type = document.getElementById("breakfast-period").value;
    obj.breakfast.items = document.getElementById("breakfast-items").value;
    obj.breakfast.notes = document.getElementById("breakfast-notes").value;

    //Lunch
    obj.lunch.time = document.getElementById("lunch-time").value;
    obj.lunch.type = document.getElementById("lunch-period").value;
    obj.lunch.items = document.getElementById("lunch-items").value;
    obj.lunch.notes = document.getElementById("lunch-notes").value;

    //Snacks
    obj.snacks.time = document.getElementById("snacks-time").value;
    obj.snacks.type = document.getElementById("snacks-period").value;
    obj.snacks.items = document.getElementById("snacks-items").value;
    obj.snacks.notes = document.getElementById("snacks-notes").value;

    //Dinner
    obj.dinner.time = document.getElementById("dinner-time").value;
    obj.dinner.type = document.getElementById("dinner-period").value;
    obj.dinner.items = document.getElementById("dinner-items").value;
    obj.dinner.notes = document.getElementById("dinner-notes").value;

    //Non-Veg
    obj.nonveg.count = document.getElementById("noof-times").value;
    obj.nonveg.type = document.getElementById("limit").value;
    obj.nonveg.notes = document.getElementById("nonveg-notes").value;
    window.modifiedData.foodInfo = obj;
    this.updateFoodEditInfo();
  }
}

class RoomInfo {
  static processRoomInfoData() {
    var list = [];
    var rawlist = window.modifiedData.roomInfo;
    if (rawlist.length === 0) {
      this.emptyCondition();
    }
    var index = 0;
    rawlist.forEach((element) => {
      element = element.replace(/[\r\n]+/gm, "");
      var obj = {
        signal: false,
        index: 0,
        tag: "",
        card: "",
        planname: "",
        type: "",
        bathroom: "",
        beds: "",
        stayandfood: {
          monthly: "",
          semester: "",
          annum: "",
        },
        stayonly: {
          monthly: "",
          semester: "",
          annum: "",
        },
        notes: "",
      };

      var words = element.split("|");
      obj.planname = words[0];
      obj.type = words[1];
      obj.bathroom = words[2];
      obj.beds = words[3];
      var prices = words[4].split("-");
      obj.stayandfood.monthly = prices[0];
      obj.stayandfood.semester = prices[1];
      obj.stayandfood.annum = prices[2];
      prices = words[4].split("-");
      obj.stayonly.monthly = prices[0];
      obj.stayonly.semester = prices[1];
      obj.stayonly.annum = prices[2];
      obj.notes = words[5];
      obj.index = index;

      index++;

      list.push(obj);
    });
    document.getElementById("nac").checked = true;
    window.modifiedData.roomInfo = list;
    this.updateUi();
  }

  static emptyCondition() {
    var maindiv = document.getElementById("room-cards-section");

    var p = document.createElement("P");
    p.setAttribute("class", "no-data");
    p.innerText = "No Data";
    maindiv.append(p);
  }

  static updateUi() {
    var maindiv = document.getElementById("room-tags");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    maindiv = document.getElementById("room-cards-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    window.modifiedData.roomInfo.forEach((element) => {
      this.createRoomTags(element);
      this.createRoomCards(element);
    });

    window.modifiedData.searchScore -= window.modifiedData.roomInfoScore;
    window.modifiedData.roomInfoScore = SearchScore.updateRoomInfoScore(
      window.modifiedData.roomInfo
    );
    window.modifiedData.searchScore += window.modifiedData.roomInfoScore;
    document.getElementById("score").innerText =
      window.modifiedData.searchScore;
  }

  static createRoomTags(obj) {
    let division = document.getElementById("room-tags");

    let div = document.createElement("DIV");
    div.setAttribute("class", "room-tags");
    let p = document.createElement("P");
    p.setAttribute("class", "label1");
    p.setAttribute("onclick", "RoomInfo.editCard(" + obj.index + ")");
    p.innerHTML = obj.planname;
    let button = document.createElement("BUTTON");
    button.setAttribute("class", "cross-button");
    button.setAttribute("onclick", "RoomInfo.removeCard(" + obj.index + ")");
    button.innerHTML = "<strong>x</strong>";
    div.appendChild(p);
    div.appendChild(button);
    obj.tag = div;
    division.appendChild(div);
  }

  static createRoomCards(obj) {
    var maindiv = document.getElementById("room-cards-section");

    //creating room card
    var card = document.createElement("div");
    card.setAttribute("class", "room-card");
    //creating Plan name
    var planname = document.createElement("p");
    planname.setAttribute("class", "label");
    planname.innerText = obj.planname;
    card.appendChild(planname);
    //creating ul1 for ordering
    var ul1 = document.createElement("ul");
    //Room Type
    var tdiv = document.createElement("div");
    tdiv.setAttribute("class", "field-box");

    var arrow = document.createElement("IMG");
    arrow.setAttribute("src", "images/arrow-right.svg");
    arrow.setAttribute("class", "mini-icon");
    tdiv.appendChild(arrow);

    var tp = document.createElement("P");
    tp.setAttribute("class", "label2");
    tp.innerText = obj.type;
    tdiv.appendChild(tp);
    ul1.appendChild(tdiv);
    //beds per room
    var bdiv = document.createElement("div");
    bdiv.setAttribute("class", "field-box");

    var arrow1 = document.createElement("IMG");
    arrow1.setAttribute("src", "images/arrow-right.svg");
    arrow1.setAttribute("class", "mini-icon");
    bdiv.appendChild(arrow1);

    var ulb = document.createElement("ul");
    ulb.setAttribute("class", "filed-box-column");

    var bp = document.createElement("P");
    bp.setAttribute("class", "label2 word-color");
    bp.innerText = "Beds per Room ";
    ulb.appendChild(bp);
    var bv = document.createElement("p");
    bv.setAttribute("class", "label2");
    bv.innerText = obj.beds;
    ulb.appendChild(bv);
    bdiv.appendChild(ulb);
    ul1.appendChild(bdiv);
    //bathrooms
    var btdiv = document.createElement("div");
    btdiv.setAttribute("class", "field-box");

    var barrow = document.createElement("IMG");
    barrow.setAttribute("src", "images/arrow-right.svg");
    barrow.setAttribute("class", "mini-icon");
    btdiv.appendChild(barrow);
    var bul = document.createElement("ul");
    bul.setAttribute("class", "filed-box-column");
    var brh = document.createElement("P");
    brh.setAttribute("class", "label2 word-color");
    brh.innerText = "Bathrooms";
    bul.appendChild(brh);
    var brp = document.createElement("p");
    brp.setAttribute("class", "label2");
    brp.innerText = obj.bathroom;
    brp.setAttribute("class", "label2");
    bul.appendChild(brp);
    btdiv.appendChild(bul);
    ul1.appendChild(btdiv);
    //Stay and Food
    if (
      !(
        obj.stayandfood.monthly === "" &&
        obj.stayandfood.semester === "" &&
        obj.stayandfood.annum === ""
      )
    ) {
      //headinf stay and food
      var safdiv = document.createElement("div");
      safdiv.setAttribute("class", "field-box");
      var safarrow = document.createElement("IMG");
      safarrow.setAttribute("src", "images/arrow-right.svg");
      safarrow.setAttribute("class", "mini-icon");
      safdiv.appendChild(safarrow);

      var ul2 = document.createElement("ul");
      var safp = document.createElement("P");
      safp.setAttribute("class", "label2 word-color");
      safp.innerText = "Stay and Food";
      ul2.appendChild(safp);
      //actual list
      ul2.setAttribute("class", "filed-box-column");
      if (obj.stayandfood.monthly !== "") {
        var safmon = document.createElement("p");
        safmon.setAttribute("class", "label2");
        safmon.innerText = "Monthly : Rs." + obj.stayandfood.monthly;
        ul2.appendChild(safmon);
      }
      if (obj.stayandfood.semester !== "") {
        var safsem = document.createElement("p");
        safsem.setAttribute("class", "label2");
        safsem.innerText = "Semester : Rs." + obj.stayandfood.semester;
        ul2.appendChild(safsem);
      }
      if (obj.stayandfood.annum !== "") {
        var safann = document.createElement("p");
        safann.setAttribute("class", "label2");
        safann.innerText = "Annum : Rs." + obj.stayandfood.annum;
        ul2.appendChild(safann);
      }
      safdiv.append(ul2);
      ul1.appendChild(safdiv);
    }
    //Stay only
    if (
      !(
        obj.stayonly.monthly === "" &&
        obj.stayonly.semester === "" &&
        obj.stayonly.annum === ""
      )
    ) {
      //headinf stay only
      var sodiv = document.createElement("div");
      sodiv.setAttribute("class", "field-box");
      var soarrow = document.createElement("IMG");
      soarrow.setAttribute("src", "images/arrow-right.svg");
      soarrow.setAttribute("class", "mini-icon");
      sodiv.appendChild(soarrow);

      var ul3 = document.createElement("ul");
      var sop = document.createElement("P");
      sop.setAttribute("class", "label2 word-color");
      sop.innerText = "Stay Only";
      ul3.appendChild(sop);
      //actual list
      ul3.setAttribute("class", "filed-box-column");
      if (obj.stayonly.monthly !== "") {
        var somon = document.createElement("p");
        somon.setAttribute("class", "label2");
        somon.innerText = "Monthly : Rs." + obj.stayonly.monthly;
        ul3.appendChild(somon);
      }
      if (obj.stayonly.semester !== "") {
        var sosem = document.createElement("p");
        sosem.setAttribute("class", "label2");
        sosem.innerText = "Semester : Rs." + obj.stayonly.semester;
        ul3.appendChild(sosem);
      }
      if (obj.stayonly.annum !== "") {
        var soann = document.createElement("p");
        soann.setAttribute("class", "label2");
        soann.innerText = "Annum : Rs." + obj.stayonly.annum;
        ul3.appendChild(soann);
      }
      sodiv.appendChild(ul3);
      ul1.appendChild(sodiv);
    }
    //Notes
    if (obj.notes.trim() !== "") {
      var ndiv = document.createElement("div");
      ndiv.setAttribute("class", "field-box");

      var arrow2 = document.createElement("IMG");
      arrow2.setAttribute("src", "images/arrow-right.svg");
      arrow2.setAttribute("class", "mini-icon");
      ndiv.appendChild(arrow2);

      var uln = document.createElement("ul");
      uln.setAttribute("class", "filed-box-column");

      var np = document.createElement("P");
      np.setAttribute("class", "label2 word-color");
      np.innerText = "Note";
      uln.appendChild(np);
      var nv = document.createElement("p");
      nv.setAttribute("class", "label2");
      nv.innerText = obj.notes;
      uln.appendChild(nv);
      ndiv.appendChild(uln);
      ul1.appendChild(ndiv);
    }
    card.appendChild(ul1);
    obj.card = card;
    maindiv.appendChild(card);
  }

  static editCard(index) {
    var obj;
    for (var i = 0; i < window.modifiedData.roomInfo.length; i++) {
      if (window.modifiedData.roomInfo[i].index === index) {
        window.modifiedData.roomInfo[i].signal = true;
        obj = window.modifiedData.roomInfo[i];
        break;
      }
    }
    //plan name
    document.getElementById("plan-name").value = obj.planname;
    //room type
    if (obj.type === "AC") {
      document.getElementById("ac").checked = true;
      document.getElementById("nac").checked = false;
    } else {
      document.getElementById("nac").checked = true;
      document.getElementById("ac").checked = false;
    }
    //Bathrooms
    var words = obj.bathroom.split("-");
    if (words.length === 2) {
      document.getElementById("common").checked = true;
      document.getElementById("attached").checked = true;
    } else {
      if (words[0] == "Common") {
        document.getElementById("common").checked = true;
        document.getElementById("attached").checked = false;
      } else {
        document.getElementById("common").checked = false;
        document.getElementById("attached").checked = true;
      }
    }
    //beds per room
    document.getElementById("bed-count").value = obj.beds;
    //Stay and Food
    document.getElementById("sf-monthly").value = obj.stayandfood.monthly;
    document.getElementById("sf-semester").value = obj.stayandfood.semester;
    document.getElementById("sf-annum").value = obj.stayandfood.annum;
    //Stay Only
    document.getElementById("s-monthly").value = obj.stayonly.monthly;
    document.getElementById("s-semester").value = obj.stayonly.semester;
    document.getElementById("s-annum").value = obj.stayonly.annum;
    //Notes
    document.getElementById("room-notes").value = obj.notes;
    //updating buttons
    document
      .getElementById("add-room-card")
      .setAttribute("class", "label1 hide");
    document.getElementById("update-room-card").setAttribute("class", "label1");
  }

  static updateRoomCard() {
    var obj;
    var index = 0;
    for (var i = 0; i < window.modifiedData.roomInfo.length; i++) {
      if (window.modifiedData.roomInfo[i].signal) {
        obj = window.modifiedData.roomInfo[i];
        index = i;
        break;
      }
    }
    //plan name
    obj.planname = document.getElementById("plan-name").value;
    //type
    if (document.getElementById("ac").checked) {
      obj.type = "AC";
    } else {
      obj.type = "N-AC";
    }
    //bathroom
    if (
      document.getElementById("common").checked &&
      document.getElementById("attached").checked
    ) {
      obj.bathroom = "Common-Attached";
    } else if (document.getElementById("common").checked) {
      obj.bathroom = "Common";
    } else if (document.getElementById("attached").checked) {
      obj.bathroom = "Attached";
    } else {
      obj.bathroom = "";
    }
    //beds per room
    obj.beds = document.getElementById("bed-count").value;
    //Stay and Food
    obj.stayandfood.monthly = document.getElementById("sf-monthly").value;
    obj.stayandfood.semester = document.getElementById("sf-semester").value;
    obj.stayandfood.annum = document.getElementById("sf-annum").value;
    //Stay Only
    obj.stayonly.monthly = document.getElementById("s-monthly").value;
    obj.stayonly.semester = document.getElementById("s-semester").value;
    obj.stayonly.annum = document.getElementById("s-annum").value;
    //Notes
    obj.notes = document.getElementById("room-notes").value;

    window.modifiedData.roomInfo[index] = obj;
    window.modifiedData.roomInfo[index].signal = false;
    RoomInfo.makeDefault();
  }

  static makeDefault() {
    //plan name
    document.getElementById("plan-name").value = "";
    //room type
    document.getElementById("nac").checked = true;
    //Bathrooms
    document.getElementById("attached").checked = true;
    document.getElementById("common").checked = false;
    //beds per room
    document.getElementById("bed-count").value = "";
    //Stay and Food
    document.getElementById("sf-monthly").value = "";
    document.getElementById("sf-semester").value = "";
    document.getElementById("sf-annum").value = "";
    //Stay Only
    document.getElementById("s-monthly").value = "";
    document.getElementById("s-semester").value = "";
    document.getElementById("s-annum").value = "";
    //Notes
    document.getElementById("room-notes").value = "";
    //updating buttons
    document.getElementById("add-room-card").setAttribute("class", "label1");
    document
      .getElementById("update-room-card")
      .setAttribute("class", "label1 hide");
    this.updateUi();
  }

  static removeCard(index) {
    if (!window.modifiedData.roomInfo[index].signal) {
      if (window.modifiedData.roomInfo.length === 1) {
        window.modifiedData.roomInfo = [];
      } else {
        window.modifiedData.roomInfo.splice(index, 1);
        for (var i = index; i < window.modifiedData.roomInfo.length; i++) {
          window.modifiedData.roomInfo[i].index = i;
        }
      }
      this.updateUi();
    } else {
      alert("Can't remove the Card while Editing It.");
    }
  }

  static addRoomCard() {
    var obj = {
      signal: false,
      index: 0,
      tag: "",
      card: "",
      planname: "",
      type: "",
      bathroom: "",
      beds: "",
      stayandfood: {
        monthly: "",
        semester: "",
        annum: "",
      },
      stayonly: {
        monthly: "",
        semester: "",
        annum: "",
      },
    };
    //plan name
    obj.planname = document.getElementById("plan-name").value;
    if (obj.planname.trim() === "") {
      alert("Plan Name is Required");
    } else {
      //type

      if (document.getElementById("ac").checked) {
        obj.type = "AC";
      } else {
        obj.type = "N-AC";
      }
      //bathroom
      if (
        document.getElementById("common").checked &&
        document.getElementById("attached").checked
      ) {
        obj.bathroom = "Common-Attached";
      } else if (document.getElementById("common").checked) {
        obj.bathroom = "Common";
      } else if (document.getElementById("attached").checked) {
        obj.bathroom = "Attached";
      }
      //beds per room
      obj.beds = document.getElementById("bed-count").value;
      //Stay and Food
      obj.stayandfood.monthly = document.getElementById("sf-monthly").value;
      obj.stayandfood.semester = document.getElementById("sf-semester").value;
      obj.stayandfood.annum = document.getElementById("sf-annum").value;
      //Stay Only
      obj.stayonly.monthly = document.getElementById("s-monthly").value;
      obj.stayonly.semester = document.getElementById("s-semester").value;
      obj.stayonly.annum = document.getElementById("s-annum").value;
      //Notes
      obj.notes = document.getElementById("room-notes").value;

      obj.index = window.modifiedData.roomInfo.length;
      window.modifiedData.roomInfo.push(obj);
      this.makeDefault();
    }
  }
}

class SpecializationInfo {
  static processSpecializationInfoData() {
    var obj = {
      preList: [],
      postList: [],
    };
    var signal = false;
    var rawlist = window.modifiedData.specializationInfo;
    if (rawlist.length === 0) {
      signal = this.emptyCondition();
    }
    rawlist.forEach((element) => {
      var index = obj.postList.length;
      var result = this.classifyData(element, index);
      if (result.signal === 0) {
        obj.preList.push(result.obj);
      } else {
        obj.postList.push(result.obj);
      }
    });
    if (signal) obj = this.addPreprocessData(obj);
    window.modifiedData.specializationInfo = obj;
    this.updateUi();
  }

  static addPreprocessData(obj) {
    var WIFI = {
      specname: "WIFI",
      type: "Free",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Washing_Machine = {
      specname: "Washing Machine",
      type: "Free",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Lockers = {
      specname: "Lockers",
      type: "Free",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Hot_Water = {
      specname: "Hot Water",
      type: "Un Available",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Gym = {
      specname: "Gym",
      type: "Un Available",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Generator = {
      specname: "Generator",
      type: "Un Available",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Vehicle_Parking = {
      specname: "Vehicle Parking",
      type: "Un Available",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Transport = {
      specname: "Transport",
      type: "Un Available",
      plan: "Monthly",
      amount: "",
      notes: "",
    };
    var Room_Service = {
      specname: "Room Service",
      type: "Daily",
      plan: "",
      amount: "",
      notes: "",
    };
    var Sports_Environment = {
      specname: "Sports Environment",
      type: "Un Available",
      plan: "",
      amount: "",
      notes: "",
    };
    var CC_TV_Survilance = {
      specname: "CC TV Survilance",
      type: "Un Available",
      plan: "",
      amount: "",
      notes: "",
    };
    var Security = {
      specname: "Security",
      type: "Un Available",
      plan: "",
      amount: "",
      notes: "",
    };
    var list = [
      WIFI,
      Washing_Machine,
      Lockers,
      Hot_Water,
      Gym,
      Generator,
      Vehicle_Parking,
      Transport,
      Room_Service,
      Sports_Environment,
      CC_TV_Survilance,
      Security,
    ];

    obj.preList = list;
    return obj;
  }

  static emptyCondition() {
    var maindiv = document.getElementById("spec-view-tags-section");

    var p = document.createElement("P");
    p.setAttribute("class", "no-data");
    p.innerText = "No Data";
    maindiv.append(p);
    return true;
  }

  static classifyData(element, index) {
    console.log("Not to be called");
    var result = {
      signal: 0,
      obj: "",
    };
    var words = element.split("|");
    var specsList = [
      "WIFI",
      "Washing Machine",
      "Lockers",
      "Hot Water",
      "Gym",
      "Generator",
      "Vehicle Parking",
      "Transport",
      "Room Service",
      "Sports Environment",
      "CC TV Survilance",
      "Security",
    ];
    if (specsList.includes(words[0])) {
      for (var i = 0; i <= 4; i++) {
        if (words[i] === "undefined") {
          words[i] = "";
        }
      }
      var specdata = {
        specname: words[0],
        type: words[1],
        plan: words[2],
        amount: words[3],
        notes: words[4],
      };

      result.signal = 0;
      result.obj = specdata;
    } else {
      var spec = words[0];
      var specdata = {
        signal: false,
        index: 0,
        tagname: "",
        specname: "",
        tag: "",
        card: "",
      };
      if (spec.length > 10) specdata.tagname = spec.slice(0, 10);
      else specdata.tagname = spec;
      specdata.specname = spec;
      specdata.index = index;
      result.signal = 1;
      result.obj = specdata;
    }
    return result;
  }

  static updateUi() {
    var maindiv = document.getElementById("spec-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    maindiv = document.getElementById("spec-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    this.updateEditUiOfPreListTags();
    this.updateViewUiOfPreListCards();
    window.modifiedData.specializationInfo.postList.forEach((element) => {
      this.createSpecializationTags(element);
      this.createSpecializationCards(element);
    });

    window.modifiedData.specializationInfo.preList.forEach((element) => {
      if (element.specname === "CC TV Survilance") {
        document.getElementById("cctv-method").value = element.type;
      }
      if (element.specname === "Security") {
        document.getElementById("security-method").value = element.type;
      }
    });

    window.modifiedData.searchScore -=
      window.modifiedData.specializationInfoScore;
    window.modifiedData.specializationInfoScore =
      SearchScore.updateSpecializationInfoScore(
        window.modifiedData.specializationInfo
      );
    window.modifiedData.searchScore +=
      window.modifiedData.specializationInfoScore;
    document.getElementById("score").innerText =
      window.modifiedData.searchScore;
  }

  static createSpecializationTags(obj) {
    let division = document.getElementById("spec-tags-section");

    let div = document.createElement("DIV");
    div.setAttribute("class", "room-tags ");
    let p = document.createElement("P");
    p.setAttribute("class", "label1 ");
    p.setAttribute("onclick", "SpecializationInfo.editCard(" + obj.index + ")");
    p.innerText = obj.tagname;
    let button = document.createElement("BUTTON");
    button.setAttribute("class", "cross-button");
    button.setAttribute(
      "onclick",
      "SpecializationInfo.removeCard(" + obj.index + ")"
    );
    button.innerHTML = "<strong>x</strong>";
    div.appendChild(p);
    div.appendChild(button);
    obj.tag = div;
    division.appendChild(div);
  }

  static updateEditUiOfPreListTags() {
    window.modifiedData.specializationInfo.preList.forEach((element) => {
      switch (element.specname) {
        case "WIFI":
          document.getElementById("wifi-method").value = element.type;
          document.getElementById("wifi-plan").value = element.plan;
          document.getElementById("wifi-amount").value = element.amount;
          document.getElementById("wifi-notes").value = element.notes;
          break;
        case "Washing Machine":
          document.getElementById("washing-machine-method").value =
            element.type;
          document.getElementById("washing-machine-plan").value = element.plan;
          document.getElementById("washing-machine-amount").value =
            element.amount;
          document.getElementById("washing-machine-notes").value =
            element.notes;
          break;
        case "Lockers":
          document.getElementById("lockers-method").value = element.type;
          document.getElementById("lockers-plan").value = element.plan;
          document.getElementById("lockers-amount").value = element.amount;
          document.getElementById("lockers-notes").value = element.notes;
          break;
        case "Hot Water":
          document.getElementById("hot-water-method").value = element.type;
          document.getElementById("hot-water-plan").value = element.plan;
          document.getElementById("hot-water-amount").value = element.amount;
          document.getElementById("hot-water-notes").value = element.notes;
          break;
        case "Gym":
          document.getElementById("gym-method").value = element.type;
          document.getElementById("gym-plan").value = element.plan;
          document.getElementById("gym-amount").value = element.amount;
          document.getElementById("gym-notes").value = element.notes;
          break;
        case "Generator":
          document.getElementById("generator-method").value = element.type;
          document.getElementById("generator-plan").value = element.plan;
          document.getElementById("generator-amount").value = element.amount;
          document.getElementById("generator-notes").value = element.notes;
          break;
        case "Vehicle Parking":
          document.getElementById("vehicle-parking-method").value =
            element.type;
          document.getElementById("vehicle-parking-plan").value = element.plan;
          document.getElementById("vehicle-parking-amount").value =
            element.amount;
          document.getElementById("vehicle-parking-notes").value =
            element.notes;
          break;
        case "Transport":
          document.getElementById("transport-method").value = element.type;
          document.getElementById("transport-plan").value = element.plan;
          document.getElementById("transport-amount").value = element.amount;
          document.getElementById("transport-notes").value = element.notes;
          break;
        case "Room Service":
          document.getElementById("room-service-method").value = element.type;
          document.getElementById("room-service-nooftimes").value =
            element.amount;
          document.getElementById("room-service-notes").value = element.notes;
          break;
        case "Sports Environment":
          document.getElementById("sports-environment-method").value =
            element.type;
          document.getElementById("sports-environment-notes").value =
            element.notes;
          break;
        case "CC TV Survilance":
          document.getElementById("cctv-method").value = element.type;
          document.getElementById("cctv-notes").value = element.notes;
          break;
        case "Security":
          document.getElementById("security-method").value = element.type;
          document.getElementById("security-notes").value = element.notes;
          break;
      }
    });
  }

  static createSpecializationCards(obj) {
    var maindiv = document.getElementById("spec-view-tags-section");
    var pdiv = document.createElement("div");
    pdiv.setAttribute("class", "field-box");

    var arrow = document.createElement("IMG");
    arrow.setAttribute("src", "images/others.svg");
    arrow.setAttribute("class", "mini-icon");
    pdiv.appendChild(arrow);

    var pp = document.createElement("P");
    pp.setAttribute("class", "label2");
    pp.innerText = obj.specname;
    pdiv.appendChild(pp);
    maindiv.appendChild(pdiv);
  }

  static updateViewUiOfPreListCards() {
    window.modifiedData.specializationInfo.preList.forEach((element) => {
      var type1 = [
        "WIFI",
        "Washing Machine",
        "Lockers",
        "Hot Water",
        "Gym",
        "Generator",
        "Vehicle Parking",
        "Transport",
      ];
      var type2 = ["Room Service"];
      var type3 = ["Sports Environment", "CC TV Survilance", "Security"];
      var text = "";
      if (type1.includes(element.specname)) {
        text = element.specname + "-";
        text += element.type;
        if (element.type === "Pay And Use") {
          text += "-" + element.plan;
          if (element.amount.trim() !== "") text += "-" + element.amount;
        }
        if (element.notes.trim() !== "") text += "-" + element.notes;
      } else if (type2.includes(element.specname)) {
        text = element.specname + "-";
        text += element.type;
        if (element.type !== "Un Available") {
          if (element.amount.trim() !== "") text += "-" + element.amount;
        }
        if (element.notes.trim() !== "") text += "-" + element.notes;
      } else if (type3.includes(element.specname)) {
        text = element.specname + "-";
        text += element.type;
        if (element.notes.trim() !== "") text += "-" + element.notes;
      }
      var maindiv = document.getElementById("spec-view-tags-section");
      var pdiv = document.createElement("div");
      pdiv.setAttribute("class", "field-box");

      var arrow = document.createElement("IMG");
      switch (element.specname) {
        case "WIFI":
          arrow.setAttribute("src", "images/wifi.svg");
          break;
        case "Lockers":
          arrow.setAttribute("src", "images/lockers.svg");
          break;
        case "Generator":
          arrow.setAttribute("src", "images/generator.svg");
          break;
        case "Gym":
          arrow.setAttribute("src", "images/gym.svg");
          break;
        case "Vehicle Parking":
          arrow.setAttribute("src", "images/vehicle-parking.svg");
          break;
        case "Transport":
          arrow.setAttribute("src", "images/transport.svg");
          break;
        case "Sports Environment":
          arrow.setAttribute("src", "images/ground.svg");
          break;
        case "Hot Water":
          arrow.setAttribute("src", "images/hot-water.svg");
          break;
        case "CC TV Survilance":
          arrow.setAttribute("src", "images/survilence.svg");
          break;
        case "Security":
          arrow.setAttribute("src", "images/survilence.svg");
          break;
        default:
          arrow.setAttribute("src", "images/others.svg");
          break;
      }
      arrow.setAttribute("class", "mini-icon");
      pdiv.appendChild(arrow);

      var pp = document.createElement("P");
      pp.setAttribute("class", "label2");
      pp.innerText = text;
      pdiv.appendChild(pp);
      maindiv.appendChild(pdiv);
    });
  }

  static editCard(index) {
    var obj;
    for (
      var i = 0;
      i < window.modifiedData.specializationInfo.postList.length;
      i++
    ) {
      if (window.modifiedData.specializationInfo.postList[i].index === index) {
        window.modifiedData.specializationInfo.postList[i].signal = true;
        obj = window.modifiedData.specializationInfo.postList[i];
        break;
      }
    }
    document.getElementById("new-specialization").value = obj.specname;

    document
      .getElementById("add-specialization")
      .setAttribute("class", "label1 hide");
    document
      .getElementById("update-specialization")
      .setAttribute("class", "label1");
  }

  static updateSpecialization() {
    var obj;
    var index = 0;
    for (
      var i = 0;
      i < window.modifiedData.specializationInfo.postList.length;
      i++
    ) {
      if (window.modifiedData.specializationInfo.postList[i].signal) {
        obj = window.modifiedData.specializationInfo.postList[i];
        index = i;
        break;
      }
    }
    window.modifiedData.specializationInfo.postList[index] = obj;
    obj.specname = document.getElementById("new-specialization").value;
    if (obj.specname.length > 10) obj.tagname = obj.specname.slice(0, 10);
    else obj.tagname = obj.specname;
    obj.signal = false;
    this.makeDefault();
  }

  static makeDefault() {
    document.getElementById("new-specialization").value = "";
    document
      .getElementById("add-specialization")
      .setAttribute("class", "label1");
    document
      .getElementById("update-specialization")
      .setAttribute("class", "label1 hide");
    this.updateUi();
  }

  static removeCard(index) {
    if (!window.modifiedData.specializationInfo.postList[index].signal) {
      if (window.modifiedData.specializationInfo.postList.length === 1) {
        window.modifiedData.specializationInfo.postList = [];
      } else {
        window.modifiedData.specializationInfo.postList.splice(index, 1);
        for (
          var i = index;
          i < window.modifiedData.specializationInfo.postList.length;
          i++
        ) {
          window.modifiedData.specializationInfo.postList[i].index = i;
        }
      }
      this.updateUi();
    } else {
      alert("Can't remove the Card while Editing It.");
    }
  }

  static updatePreListToView() {
    window.modifiedData.specializationInfo.preList.forEach((element) => {
      switch (element.specname) {
        case "WIFI":
          element.type = document.getElementById("wifi-method").value;
          element.plan = document.getElementById("wifi-plan").value;
          element.amount = document.getElementById("wifi-amount").value;
          element.notes = document.getElementById("wifi-notes").value;
          break;
        case "Washing Machine":
          element.type = document.getElementById(
            "washing-machine-method"
          ).value;
          element.plan = document.getElementById("washing-machine-plan").value;
          element.amount = document.getElementById(
            "washing-machine-amount"
          ).value;
          element.notes = document.getElementById(
            "washing-machine-notes"
          ).value;
          break;
        case "Lockers":
          element.type = document.getElementById("lockers-method").value;
          element.plan = document.getElementById("lockers-plan").value;
          element.amount = document.getElementById("lockers-amount").value;
          element.notes = document.getElementById("lockers-notes").value;
          break;
        case "Hot Water":
          element.type = document.getElementById("hot-water-method").value;
          element.plan = document.getElementById("hot-water-plan").value;
          element.amount = document.getElementById("hot-water-amount").value;
          element.notes = document.getElementById("hot-water-notes").value;
          break;
        case "Gym":
          element.type = document.getElementById("gym-method").value;
          element.plan = document.getElementById("gym-plan").value;
          element.amount = document.getElementById("gym-amount").value;
          element.notes = document.getElementById("gym-notes").value;
          break;
        case "Generator":
          element.type = document.getElementById("generator-method").value;
          element.plan = document.getElementById("generator-plan").value;
          element.amount = document.getElementById("generator-amount").value;
          element.notes = document.getElementById("generator-notes").value;
          break;
        case "Vehicle Parking":
          element.type = document.getElementById(
            "vehicle-parking-method"
          ).value;
          element.plan = document.getElementById("vehicle-parking-plan").value;
          element.amount = document.getElementById(
            "vehicle-parking-amount"
          ).value;
          element.notes = document.getElementById(
            "vehicle-parking-notes"
          ).value;
          break;
        case "Transport":
          element.type = document.getElementById("transport-method").value;
          element.plan = document.getElementById("transport-plan").value;
          element.amount = document.getElementById("transport-amount").value;
          element.notes = document.getElementById("transport-notes").value;
          break;
        case "Room Service":
          element.type = document.getElementById("room-service-method").value;
          element.amount = document.getElementById(
            "room-service-nooftimes"
          ).value;
          element.notes = document.getElementById("room-service-notes").value;
          break;
        case "Sports Environment":
          element.type = document.getElementById(
            "sports-environment-method"
          ).value;
          element.notes = document.getElementById(
            "sports-environment-notes"
          ).value;
          break;
        case "CC TV Survilance":
          element.type = document.getElementById("cctv-method").value;
          element.notes = document.getElementById("cctv-notes").value;
          break;
        case "Security":
          element.type = document.getElementById("security-method").value;
          element.notes = document.getElementById("security-notes").value;
          break;
      }
    });
    this.updateUi();
  }

  static addSpecialization() {
    var obj = {
      signal: false,
      index: 0,
      tagname: "",
      specname: "",
      tag: "",
      card: "",
    };
    obj.specname = document.getElementById("new-specialization").value;
    if (obj.specname.length === 0) {
      alert("Specialization name not to be empty.");
    } else {
      if (obj.specname.length > 10) obj.tagname = obj.specname.slice(0, 10);
      else obj.tagname = obj.specname;
      obj.index = window.modifiedData.specializationInfo.postList.length;
      window.modifiedData.specializationInfo.postList.push(obj);
      this.makeDefault();
    }
  }
}

class PolicyInfo {
  static processPolicyInfoData() {
    var list = [];
    var rawlist = window.modifiedData.policyInfo;
    if (rawlist.length === 0) {
      this.emptyCondition();
      return;
    }
    var index = 0;
    rawlist.forEach((element) => {
      var obj = {
        signal: false,
        index: 0,
        tagname: "",
        policy: "",
        tag: "",
        card: "",
      };
      if (element.length > 10) obj.tagname = element.slice(0, 10);
      else obj.tagname = element;
      obj.policy = element;
      obj.index = index;

      index++;

      list.push(obj);
    });
    window.modifiedData.policyInfo = list;
    this.updateUi();
  }

  static emptyCondition() {
    var maindiv = document.getElementById("hp-view-tags-section");

    var p = document.createElement("P");
    p.setAttribute("class", "no-data");
    p.innerText = "No Data";
    maindiv.append(p);
  }

  static updateUi() {
    var maindiv = document.getElementById("hp-edit-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    maindiv = document.getElementById("hp-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    window.modifiedData.policyInfo.forEach((element) => {
      this.createPolicyTags(element);
      this.createPolicyCards(element);
    });
  }

  static createPolicyTags(obj) {
    let division = document.getElementById("hp-edit-tags-section");

    let div = document.createElement("DIV");
    div.setAttribute("class", "room-tags ");
    let p = document.createElement("P");
    p.setAttribute("class", "label1 ");
    p.setAttribute("onclick", "PolicyInfo.editCard(" + obj.index + ")");
    p.innerText = obj.tagname;
    let button = document.createElement("BUTTON");
    button.setAttribute("class", "cross-button");
    button.setAttribute("onclick", "PolicyInfo.removeCard(" + obj.index + ")");
    button.innerHTML = "<strong>x</strong>";
    div.appendChild(p);
    div.appendChild(button);
    obj.tag = div;
    division.appendChild(div);
  }

  static createPolicyCards(obj) {
    var maindiv = document.getElementById("hp-view-tags-section");
    var pdiv = document.createElement("div");
    pdiv.setAttribute("class", "field-box");

    var arrow = document.createElement("IMG");
    arrow.setAttribute("src", "images/arrow-right.svg");
    arrow.setAttribute("class", "mini-icon");
    pdiv.appendChild(arrow);

    var pp = document.createElement("P");
    pp.setAttribute("class", "label2");
    pp.innerText = obj.policy;
    pdiv.appendChild(pp);
    maindiv.appendChild(pdiv);
  }

  static editCard(index) {
    var obj;
    for (var i = 0; i < window.modifiedData.policyInfo.length; i++) {
      if (window.modifiedData.policyInfo[i].index === index) {
        window.modifiedData.policyInfo[i].signal = true;
        obj = window.modifiedData.policyInfo[i];
        break;
      }
    }
    document.getElementById("new-policy").value = obj.policy;

    document.getElementById("add-policy").setAttribute("class", "label1 hide");
    document.getElementById("update-policy").setAttribute("class", "label1");
  }

  static updatePolicy() {
    var obj;
    var index = 0;
    for (var i = 0; i < window.modifiedData.policyInfo.length; i++) {
      if (window.modifiedData.policyInfo[i].signal) {
        obj = window.modifiedData.policyInfo[i];
        index = i;
        break;
      }
    }
    window.modifiedData.policyInfo[index] = obj;
    obj.policy = document.getElementById("new-policy").value;
    if (obj.policy.length > 10) obj.tagname = obj.policy.slice(0, 10);
    else obj.tagname = obj.policy;
    obj.signal = false;
    this.makeDefault();
  }

  static makeDefault() {
    document.getElementById("new-policy").value = "";
    document.getElementById("add-policy").setAttribute("class", "label1");
    document
      .getElementById("update-policy")
      .setAttribute("class", "label1 hide");
    this.updateUi();
  }

  static removeCard(index) {
    if (!window.modifiedData.policyInfo[index].signal) {
      if (window.modifiedData.policyInfo.length === 1) {
        window.modifiedData.policyInfo = [];
      } else {
        window.modifiedData.policyInfo.splice(index, 1);
        for (var i = index; i < window.modifiedData.policyInfo.length; i++) {
          window.modifiedData.policyInfo[i].index = i;
        }
      }
      this.updateUi();
    } else {
      alert("Can't remove the Card while Editing It.");
    }
  }

  static addPolicy() {
    var obj = {
      signal: false,
      index: 0,
      tagname: "",
      policy: "",
      tag: "",
      card: "",
    };
    obj.policy = document.getElementById("new-policy").value;
    if (obj.policy.length === 0) {
      alert("Policy is not to be empty.");
    } else {
      if (obj.policy.length > 10) obj.tagname = obj.policy.slice(0, 10);
      else obj.tagname = obj.policy;
      obj.index = window.modifiedData.policyInfo.length;
      window.modifiedData.policyInfo.push(obj);
      this.makeDefault();
    }
  }
}

class RequirementInfo {
  static processRequirementInfoData() {
    var list = [];
    var rawlist = window.modifiedData.requirementInfo;
    if (rawlist.length === 0) {
      this.emptyCondition();
      return;
    }
    var index = 0;
    rawlist.forEach((element) => {
      var obj = {
        signal: false,
        index: 0,
        requirement: "",
        type: "",
        tagname: "",
        tag: "",
        card: "",
      };
      var words = element.split("|");
      obj.type = words[0];
      obj.requirement = words[1];
      if (obj.requirement.length > 10)
        obj.tagname = obj.requirement.slice(0, 10);
      else obj.tagname = obj.requirement;
      obj.index = index;

      index++;

      list.push(obj);
    });
    window.modifiedData.requirementInfo = list;
    this.updateUi();
  }

  static emptyCondition() {
    var maindiv = document.getElementById("req-view-tags-section");

    var p = document.createElement("P");
    p.setAttribute("class", "no-data");
    p.innerText = "No Data";
    maindiv.append(p);
  }

  static updateUi() {
    var maindiv = document.getElementById("req-edit-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    maindiv = document.getElementById("req-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    window.modifiedData.requirementInfo.forEach((element) => {
      this.createRequirementTags(element);
      this.createRequirementCards(element);
    });

    window.modifiedData.searchScore -= window.modifiedData.requirementInfoScore;
    window.modifiedData.requirementInfoScore =
      SearchScore.updateRequirementInfoScore(
        window.modifiedData.requirementInfo
      );
    window.modifiedData.searchScore += window.modifiedData.requirementInfoScore;
    document.getElementById("score").innerText =
      window.modifiedData.searchScore;
  }

  static createRequirementTags(obj) {
    let division = document.getElementById("req-edit-tags-section");

    let div = document.createElement("DIV");
    div.setAttribute("class", "room-tags ");
    let p = document.createElement("P");
    p.setAttribute("class", "label1 ");
    p.setAttribute("onclick", "RequirementInfo.editCard(" + obj.index + ")");
    p.innerText = obj.tagname;
    let button = document.createElement("BUTTON");
    button.setAttribute("class", "cross-button");
    button.setAttribute(
      "onclick",
      "RequirementInfo.removeCard(" + obj.index + ")"
    );
    button.innerHTML = "<strong>x</strong>";
    div.appendChild(p);
    div.appendChild(button);
    obj.tag = div;
    division.appendChild(div);
  }

  static createRequirementCards(obj) {
    var maindiv = document.getElementById("req-view-tags-section");
    var pdiv = document.createElement("div");
    pdiv.setAttribute("class", "field-box");

    var minicon = document.createElement("IMG");
    switch (obj.type) {
      case "ATM":
        minicon.setAttribute("src", "images/atm.svg");
        break;
      case "Medical Emergency":
        minicon.setAttribute("src", "images/medkit.svg");
        break;
      case "Bus Stop":
        minicon.setAttribute("src", "images/transport.svg");
        break;
      case "Theatre":
        minicon.setAttribute("src", "images/theatre.svg");
        break;
      case "Stationery":
        minicon.setAttribute("src", "images/stationery.svg");
        break;
      case "Saloon/Spa":
        minicon.setAttribute("src", "images/location-point.svg");
        break;
      case "Xerox":
        minicon.setAttribute("src", "images/location-point.svg");
        break;
      default:
        minicon.setAttribute("src", "images/location-point.svg");
        break;
    }
    minicon.setAttribute("class", "mini-icon");
    pdiv.appendChild(minicon);

    var hp = document.createElement("P");
    hp.setAttribute("class", "label2");
    hp.innerText = obj.type + "-" + obj.requirement;
    if (obj.type === "Others") {
      hp.innerText = obj.requirement;
    }
    pdiv.appendChild(hp);
    maindiv.appendChild(pdiv);
  }

  static editCard(index) {
    var obj;
    for (var i = 0; i < window.modifiedData.requirementInfo.length; i++) {
      if (window.modifiedData.requirementInfo[i].index === index) {
        window.modifiedData.requirementInfo[i].signal = true;
        obj = window.modifiedData.requirementInfo[i];
        break;
      }
    }
    document.getElementById("req-category").value = obj.type;
    document.getElementById("new-requirement").value = obj.requirement;

    document
      .getElementById("add-requirement")
      .setAttribute("class", "label1 hide");
    document
      .getElementById("update-requirement")
      .setAttribute("class", "label1");
  }

  static updateRequirement() {
    var obj;
    var index = 0;
    for (var i = 0; i < window.modifiedData.requirementInfo.length; i++) {
      if (window.modifiedData.requirementInfo[i].signal) {
        obj = window.modifiedData.requirementInfo[i];
        index = i;
        break;
      }
    }
    window.modifiedData.requirementInfo[index] = obj;
    obj.type = document.getElementById("req-category").value;
    obj.requirement = document.getElementById("new-requirement").value;
    if (obj.requirement.length > 10) obj.tagname = obj.requirement.slice(0, 10);
    else obj.tagname = obj.requirement;
    obj.signal = false;
    this.makeDefault();
  }

  static makeDefault() {
    document.getElementById("req-category").value = "ATM";
    document.getElementById("new-requirement").value = "";
    document.getElementById("add-requirement").setAttribute("class", "label1");
    document
      .getElementById("update-requirement")
      .setAttribute("class", "label1 hide");
    this.updateUi();
  }

  static removeCard(index) {
    if (!window.modifiedData.requirementInfo[index].signal) {
      if (window.modifiedData.requirementInfo.length === 1) {
        window.modifiedData.requirementInfo = [];
      } else {
        window.modifiedData.requirementInfo.splice(index, 1);
        for (
          var i = index;
          i < window.modifiedData.requirementInfo.length;
          i++
        ) {
          window.modifiedData.requirementInfo[i].index = i;
        }
      }
      this.updateUi();
    } else {
      alert("Can't remove the Card while Editing It.");
    }
  }

  static addRequirement() {
    var obj = {
      signal: false,
      index: 0,
      requirement: "",
      type: "",
      tagname: "",
      tag: "",
      card: "",
    };
    obj.type = document.getElementById("req-category").value;
    obj.requirement = document.getElementById("new-requirement").value;
    if (obj.requirement.length === 0) {
      alert("Requirement name is not to be empty.");
    } else {
      if (obj.requirement.length > 10)
        obj.tagname = obj.requirement.slice(0, 10);
      else obj.tagname = obj.requirement;
      obj.index = window.modifiedData.requirementInfo.length;
      window.modifiedData.requirementInfo.push(obj);
      this.makeDefault();
    }
  }
}

class HotspotInfo {
  static processHotspotInfoData() {
    var list = [];
    var rawlist = window.modifiedData.hotspotInfo;
    if (rawlist.length === 0) {
      this.emptyCondition();
      return;
    }
    var index = 0;
    rawlist.forEach((element) => {
      var obj = {
        signal: false,
        index: 0,
        hotspot: "",
        type: "",
        tagname: "",
        tag: "",
        card: "",
      };
      var words = element.split("|");
      obj.type = words[0];
      obj.hotspot = words[1];
      if (obj.hotspot.length > 10) obj.tagname = obj.hotspot.slice(0, 10);
      else obj.tagname = obj.hotspot;
      obj.index = index;

      index++;

      list.push(obj);
    });
    window.modifiedData.hotspotInfo = list;
    this.updateUi();
  }

  static emptyCondition() {
    var maindiv = document.getElementById("hs-view-tags-section");

    var p = document.createElement("P");
    p.setAttribute("class", "no-data");
    p.innerText = "No Data";
    maindiv.append(p);
  }

  static updateUi() {
    var maindiv = document.getElementById("hs-edit-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    maindiv = document.getElementById("hs-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    window.modifiedData.hotspotInfo.forEach((element) => {
      this.createHotspotTags(element);
      this.createHotspotCards(element);
    });
    window.modifiedData.searchScore -= window.modifiedData.hotspotInfoScore;
    window.modifiedData.hotspotInfoScore = SearchScore.updateHotspotInfoScore(
      window.modifiedData.hotspotInfo
    );
    window.modifiedData.searchScore += window.modifiedData.hotspotInfoScore;
    document.getElementById("score").innerText =
      window.modifiedData.searchScore;
  }

  static createHotspotTags(obj) {
    let division = document.getElementById("hs-edit-tags-section");

    let div = document.createElement("DIV");
    div.setAttribute("class", "room-tags ");
    let p = document.createElement("P");
    p.setAttribute("class", "label1 ");
    p.setAttribute("onclick", "HotspotInfo.editCard(" + obj.index + ")");
    p.innerText = obj.tagname;
    let button = document.createElement("BUTTON");
    button.setAttribute("class", "cross-button");
    button.setAttribute("onclick", "HotspotInfo.removeCard(" + obj.index + ")");
    button.innerHTML = "<strong>x</strong>";
    div.appendChild(p);
    div.appendChild(button);
    obj.tag = div;
    division.appendChild(div);

    window.modifiedData.searchScore -= window.modifiedData.requirementInfoScore;
    window.modifiedData.requirementInfoScore =
      SearchScore.updateRequirementInfoScore(
        window.modifiedData.requirementInfo
      );
    window.modifiedData.searchScore += window.modifiedData.requirementInfoScore;
    document.getElementById("score").innerText =
      window.modifiedData.searchScore;
  }

  static createHotspotCards(obj) {
    var maindiv = document.getElementById("hs-view-tags-section");
    var pdiv = document.createElement("div");
    pdiv.setAttribute("class", "field-box");

    var minicon = document.createElement("IMG");
    switch (obj.type) {
      case "Restaurent":
        minicon.setAttribute("src", "images/restaurents.svg");
        break;
      case "Drinks/Ice-creams":
        minicon.setAttribute("src", "images/drinks.svg");
        break;
      case "Holy Places":
        minicon.setAttribute("src", "images/location-point.svg");
        break;
      case "Parks":
        minicon.setAttribute("src", "images/park.svg");
        break;
      default:
        minicon.setAttribute("src", "images/location-point.svg");
        break;
    }
    minicon.setAttribute("class", "mini-icon");
    pdiv.appendChild(minicon);

    var hp = document.createElement("P");
    hp.setAttribute("class", "label2");
    hp.innerText = obj.type + "-" + obj.hotspot;
    if (obj.type === "Others") hp.innerText = obj.hotspot;
    pdiv.appendChild(hp);
    maindiv.appendChild(pdiv);
  }

  static editCard(index) {
    var obj;
    for (var i = 0; i < window.modifiedData.hotspotInfo.length; i++) {
      if (window.modifiedData.hotspotInfo[i].index === index) {
        window.modifiedData.hotspotInfo[i].signal = true;
        obj = window.modifiedData.hotspotInfo[i];
        break;
      }
    }
    document.getElementById("hs-category").value = obj.type;
    document.getElementById("new-hotspot").value = obj.hotspot;

    document.getElementById("add-hotspot").setAttribute("class", "label1 hide");
    document.getElementById("update-hotspot").setAttribute("class", "label1");
  }

  static updateHotspot() {
    var obj;
    var index = 0;
    for (var i = 0; i < window.modifiedData.hotspotInfo.length; i++) {
      if (window.modifiedData.hotspotInfo[i].signal) {
        obj = window.modifiedData.hotspotInfo[i];
        index = i;
        break;
      }
    }
    window.modifiedData.hotspotInfo[index] = obj;
    obj.type = document.getElementById("hs-category").value;
    obj.hotspot = document.getElementById("new-hotspot").value;
    if (obj.hotspot.length > 10) obj.tagname = obj.hotspot.slice(0, 10);
    else obj.tagname = obj.hotspot;
    obj.signal = false;
    this.makeDefault();
  }

  static makeDefault() {
    document.getElementById("hs-category").value = "Restaurent";
    document.getElementById("new-hotspot").value = "";
    document.getElementById("add-hotspot").setAttribute("class", "label1");
    document
      .getElementById("update-hotspot")
      .setAttribute("class", "label1 hide");
    this.updateUi();
  }

  static removeCard(index) {
    if (!window.modifiedData.hotspotInfo[index].signal) {
      if (window.modifiedData.hotspotInfo.length === 1) {
        window.modifiedData.hotspotInfo = [];
      } else {
        window.modifiedData.hotspotInfo.splice(index, 1);
        for (var i = index; i < window.modifiedData.hotspotInfo.length; i++) {
          window.modifiedData.hotspotInfo[i].index = i;
        }
      }
      this.updateUi();
    } else {
      alert("Can't remove the Card while Editing It.");
    }
  }

  static addHotspot() {
    var obj = {
      signal: false,
      index: 0,
      hotspot: "",
      type: "",
      tagname: "",
      tag: "",
      card: "",
    };
    obj.type = document.getElementById("hs-category").value;
    obj.hotspot = document.getElementById("new-hotspot").value;
    if (obj.hotspot.length === 0) {
      alert("Hotspot name not to be empty.");
    } else {
      if (obj.hotspot.length > 10) obj.tagname = obj.hotspot.slice(0, 10);
      else obj.tagname = obj.hotspot;
      obj.index = window.modifiedData.hotspotInfo.length;
      window.modifiedData.hotspotInfo.push(obj);
      this.makeDefault();
    }
  }
}

function dataConversion(obj, value) {
  switch (value) {
    case 0:
      obj = JSON.parse(obj);
      console.log(obj);
      window.originalData.basicInfo = obj.basicInfo;
      window.modifiedData.basicInfo = obj.basicInfo;
      window.originalData.foodInfo = obj.foodInfo;
      window.modifiedData.foodInfo = obj.foodInfo;
      window.originalData.roomInfo = obj.roomInfo;
      window.modifiedData.roomInfo = obj.roomInfo;
      window.originalData.policyInfo = obj.policyInfo;
      window.modifiedData.policyInfo = obj.policyInfo;
      window.originalData.hotspotInfo = obj.hotspotInfo;
      window.modifiedData.hotspotInfo = obj.hotspotInfo;
      window.originalData.requirementInfo = obj.requirementInfo;
      window.modifiedData.requirementInfo = obj.requirementInfo;
      window.originalData.specializationInfo = obj.specializationInfo;
      window.modifiedData.specializationInfo = obj.specializationInfo;

      BasicInfo.updateBasicInfoUi();
      RoomInfo.processRoomInfoData();
      FoodInfo.processFoodInfoData();
      SpecializationInfo.processSpecializationInfoData();
      PolicyInfo.processPolicyInfoData();
      HotspotInfo.processHotspotInfoData();
      RequirementInfo.processRequirementInfoData();
      break;
  }
}

function getHostelInfo(hid) {
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

function logout() {
  $.post("HostelWorkspace", { signal: 1 }, function (data, status) {
    if (status === "success") {
    } else {
      alert("Something Went Wrong..!!");
    }
  });
  window.location.assign("Login.jsp");
}

window.onload = function () {
  var hid = processString(document.getElementById("hostel-id").innerHTML);
  if (hid === "null") {
    window.location.assign("Login.jsp");
  } else {
    window.getHostelInfo(hid);
  }
};

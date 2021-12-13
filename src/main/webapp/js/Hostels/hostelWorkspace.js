"use strict";
class Hostel {
  constructor() {
    this.basicInfo;
    this.foodInfo;
    this.roomInfo;
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
  window.basicInfo.hlocation =
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
    } else {
      hostel.basicInfo.hgender = "female";
    }
    BasicInfo.updateBasicInfoUi();
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

    FoodInfo.updateFoodEditInfo();
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

    FoodInfo.updateFoodViewInfo();
  }

  static createCard1(obj, title) {
    if (obj.time !== "") {
      //creating food card
      var carddiv = document.createElement("div");
      carddiv.setAttribute("class", "food-card");
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
      carddiv.appendChild(ul1);
      document.getElementById("food-cards-section").appendChild(carddiv);
    }
  }

  static createCard2(obj, title) {
    if (obj.time !== "") {
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

      carddiv.appendChild(ul1);
      document.getElementById("food-cards-section").appendChild(carddiv);
    }
  }

  static updateFoodViewInfo() {
    //Removing previous cards
    var maindiv = document.getElementById("food-cards-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }
    //Creating Food Cards
    FoodInfo.createCard1(window.modifiedData.foodInfo.breakfast, "Breakfast");
    FoodInfo.createCard1(window.modifiedData.foodInfo.lunch, "Lunch");
    FoodInfo.createCard1(window.modifiedData.foodInfo.snacks, "Snacks");
    FoodInfo.createCard1(window.modifiedData.foodInfo.dinner, "Dinner");
    FoodInfo.createCard2(window.modifiedData.foodInfo.nonveg, "Non-Veg");
  }

  static updateFoodInfo() {
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
    FoodInfo.updateFoodViewInfo;
  }
}

class RoomInfo {
  static processRoomInfoData() {
    var list = [];
    var rawlist = window.modifiedData.roomInfo;
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
      obj.index = index;

      index++;

      list.push(obj);
    });
    window.modifiedData.roomInfo = list;
    this.updateUi();
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

    obj.index = window.modifiedData.roomInfo.length;
    window.modifiedData.roomInfo.push(obj);
    // console.log(window.modifiedData.roomInfo);
    this.makeDefault();
  }
}

class SpecializationInfo {
  static processSpecializationInfoData() {
    var obj = {
      preList: [],
      postList: [],
    };
    var rawlist = window.modifiedData.specializationInfo;
    rawlist.forEach((element) => {
      var index = obj.postList.length;
      var result = this.classifyData(element, index);
      if (result.signal === 0) {
        obj.preList.push(result.obj);
      } else {
        obj.postList.push(result.obj);
      }
    });
    window.modifiedData.specializationInfo = obj;
    this.updateUi();
  }

  static classifyData(element, index) {
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
      "CC-TV Survilance",
      "Security",
    ];
    if (specsList.includes(words[0])) {
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
}

class PolicyInfo {
  static processPolicyInfoData() {
    var list = [];
    var rawlist = window.modifiedData.policyInfo;
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
    if (obj.policy.length > 10) obj.tagname = obj.policy.slice(0, 10);
    else obj.tagname = obj.policy;
    obj.index = window.modifiedData.policyInfo.length;
    window.modifiedData.policyInfo.push(obj);
    this.makeDefault();
  }
}

class RequirementInfo {
  static processRequirementInfoData() {
    var list = [];
    var rawlist = window.modifiedData.requirementInfo;
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
        obj.requirement = obj.requirement.slice(0, 10);
      else obj.tagname = obj.requirement;
      obj.index = index;

      index++;

      list.push(obj);
    });
    window.modifiedData.requirementInfo = list;
    this.updateUi();
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
    hp.innerText = obj.requirement;
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

  static updateHotspot() {
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
    if (obj.requirement.length > 10) obj.tagname = obj.requirement.slice(0, 10);
    else obj.tagname = obj.requirement;
    obj.index = window.modifiedData.requirementInfo.length;
    window.modifiedData.requirementInfo.push(obj);
    this.makeDefault();
  }
}

class HotspotInfo {
  static processHotspotInfoData() {
    var list = [];
    var rawlist = window.modifiedData.hotspotInfo;
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
    hp.innerText = obj.hotspot;
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
    if (obj.hotspot.length > 10) obj.tagname = obj.hotspot.slice(0, 10);
    else obj.tagname = obj.hotspot;
    obj.index = window.modifiedData.hotspotInfo.length;
    window.modifiedData.hotspotInfo.push(obj);
    this.makeDefault();
  }
}

class SpecializationsType1 {
  constructor() {
    this.type = 1;
    this.isActive = false;
    this.method;
    this.plan;
    this.amount;
    this.notes;
    this.iconsAddress;
  }
}

class SpecializationsType2 {
  constructor() {
    this.type = 2;
    this.isActive = false;
    this.method;
    this.notes;
    this.iconsAddress;
  }
}

class SpecializationsType3 {
  constructor() {
    this.type = 3;
    this.isActive = false;
    this.plan;
    this.count;
    this.notes;
    this.iconsAddress;
  }
}

class SpecializationsType4 {
  constructor() {
    this.type = 4;
    this.isActive = false;
    this.method;
    this.notes;
    this.iconsAddress;
  }
}
class Specializations {
  constructor() {
    this.wifi = new SpecializationsType1();
    this.wifi.iconsAddress = "images/wifi.svg";

    this.washingMachine = new SpecializationsType1();
    this.washingMachine.iconsAddress = "images/others.svg";

    this.lockers = new SpecializationsType1();
    this.lockers.iconsAddress = "images/lockers.svg";

    this.hotWater = new SpecializationsType1();
    this.hotWater.iconsAddress = "images/hot-water.svg";

    this.gym = new SpecializationsType1();
    this.gym.iconsAddress = "images/gym.svg";

    this.generator = new SpecializationsType1();
    this.generator.iconsAddress = "images/generator.svg";

    this.vehicleParking = new SpecializationsType1();
    this.vehicleParking.iconsAddress = "images/vehicle-parking.svg";

    this.transport = new SpecializationsType1();
    this.transport.iconsAddress = "images/transport.svg";

    this.sportsEnvironment = new SpecializationsType2();
    this.sportsEnvironment.iconsAddress = "images/ground.svg";

    this.roomService = new SpecializationsType3();
    this.roomService.iconsAddress = "images/others.svg";

    this.ccTv = new SpecializationsType4();
    this.ccTv.iconsAddress = "images/survilence.svg";

    this.security = new SpecializationsType4();
    this.security.iconsAddress = "images/security.svg";

    this.additionalSpecializations = [];
  }

  updateSpecializationsDetails() {
    //Wifi
    if (document.getElementById("wifi-method").value !== "un-available") {
      this.wifi.isActive = true;
      this.wifi.method = document.getElementById("wifi-method").value;
      this.wifi.plan = document.getElementById("wifi-plan").value;
      this.wifi.amount = document.getElementById("wifi-amount").value;
      this.wifi.notes = document.getElementById("wifi-notes").value;
    }

    //Washing Machine
    if (
      document.getElementById("washing-machine-method").value !== "un-available"
    ) {
      this.washingMachine.isActive = true;
      this.washingMachine.method = document.getElementById(
        "washing-machine-method"
      ).value;
      this.washingMachine.plan = document.getElementById(
        "washing-machine-plan"
      ).value;
      this.washingMachine.amount = document.getElementById(
        "washing-machine-amount"
      ).value;
      this.washingMachine.notes = document.getElementById(
        "washing-machine-notes"
      ).value;
    }

    //Lockers
    if (document.getElementById("lockers-method").value !== "un-available") {
      this.lockers.isActive = true;
      this.lockers.method = document.getElementById("lockers-method").value;
      this.lockers.plan = document.getElementById("lockers-plan").value;
      this.lockers.amount = document.getElementById("lockers-amount").value;
      this.lockers.notes = document.getElementById("lockers-notes").value;
    }

    //Hotwater
    if (document.getElementById("hot-water-method").value !== "un-available") {
      this.hotWater.isActive = true;
      this.hotWater.method = document.getElementById("hot-water-method").value;
      this.hotWater.plan = document.getElementById("hot-water-plan").value;
      this.hotWater.amount = document.getElementById("hot-water-amount").value;
      this.hotWater.notes = document.getElementById("hot-water-notes").value;
    }

    //Gym
    if (document.getElementById("gym-method").value !== "un-available") {
      this.gym.isActive = true;
      this.gym.method = document.getElementById("gym-method").value;
      this.gym.plan = document.getElementById("gym-plan").value;
      this.gym.amount = document.getElementById("gym-amount").value;
      this.gym.notes = document.getElementById("gym-notes").value;
    }

    //Generator
    if (document.getElementById("generator-method").value !== "un-available") {
      this.generator.isActive = true;
      this.generator.method = document.getElementById("generator-method").value;
      this.generator.plan = document.getElementById("generator-plan").value;
      this.generator.amount = document.getElementById("generator-amount").value;
      this.generator.notes = document.getElementById("generator-notes").value;
    }

    //Vehicle-Parking
    if (
      document.getElementById("vehicle-parking-method").value !== "un-available"
    ) {
      this.vehicleParking.isActive = true;
      this.vehicleParking.method = document.getElementById(
        "vehicle-parking-method"
      ).value;
      this.vehicleParking.plan = document.getElementById(
        "vehicle-parking-plan"
      ).value;
      this.vehicleParking.amount = document.getElementById(
        "vehicle-parking-amount"
      ).value;
      this.vehicleParking.notes = document.getElementById(
        "vehicle-parking-notes"
      ).value;
    }

    //Transport
    if (document.getElementById("transport-method").value !== "un-available") {
      this.transport.isActive = true;
      this.transport.method = document.getElementById("transport-method").value;
      this.transport.plan = document.getElementById("transport-plan").value;
      this.transport.amount = document.getElementById("transport-amount").value;
      this.transport.notes = document.getElementById("transport-notes").value;
    }

    //Sports Environment
    if (
      document.getElementById("sports-environment-method").value !==
      "un-available"
    ) {
      this.sportsEnvironment.isActive = true;
      this.sportsEnvironment.method = document.getElementById(
        "sports-environment-method"
      ).value;
      this.sportsEnvironment.notes = document.getElementById(
        "sports-environment-notes"
      ).value;
    }

    //Room Service
    if (
      document.getElementById("sports-environment-method").value !==
      "un-available"
    ) {
      this.roomService.isActive = true;
      this.roomService.method =
        document.getElementById("room-service-notes").value;
      this.roomService.count = document.getElementById(
        "room-service-nooftimes"
      ).value;
      this.roomService.notes =
        document.getElementById("room-service-notes").value;
    }

    //Cc-Tv
    if (document.getElementById("cctv-method").value !== "un-available") {
      this.ccTv.isActive = true;
      this.ccTv.method = document.getElementById("cctv-method").value;
      console.log(this.ccTv);
      this.ccTv.notes = document.getElementById("cctv-notes").value;
    }

    //Security
    if (document.getElementById("security-method").value !== "un-available") {
      this.security.isActive = true;
      this.security.method = document.getElementById("security-method").value;
      this.security.notes = document.getElementById("security-notes").value;
    }

    this.createSpecializationsViewTags();
  }

  static addSpecialization() {
    if (document.getElementById("new-specialization").value !== "") {
      editHostel.specializations.additionalSpecializations.push(
        document.getElementById("new-specialization").value
      );
      Specializations.createSpecializationsEditTags(
        editHostel.specializations.additionalSpecializations.length - 1
      );
      document.getElementById("new-specialization").value = "";
    }
  }

  static createSpecializationsEditTags(index) {
    var division = document.getElementById("specializations-tags-section");

    var specDiv = document.createElement("DIV");
    specDiv.setAttribute("class", "specializationDivCard");
    specDiv.setAttribute("id", "specializationDivCard-" + index);

    var specP = document.createElement("P");
    specP.setAttribute("class", "notes label2");
    specP.innerHTML =
      editHostel.specializations.additionalSpecializations[index];
    specDiv.appendChild(specP);

    var specCross = document.createElement("BUTTON");
    specCross.setAttribute("class", "cross-button");
    specCross.setAttribute("id", "spec-cross-button-" + index);
    specCross.setAttribute(
      "onclick",
      "Specializations.removeSpecCard(" + index + ")"
    );
    specCross.innerHTML = "<strong>X</strong>";
    specDiv.appendChild(specCross);

    division.appendChild(specDiv);
  }

  static removeSpecCard(index) {
    document.getElementById("specializationDivCard-" + index).remove();
    editHostel.specializations.additionalSpecializations.splice(index, 1);
    Specializations.updateSpecCardsIds(index);
  }

  static updateSpecCardsIds(index) {
    for (
      var i = index;
      i < editHostel.specializations.additionalSpecializations.length;
      i++
    ) {
      var element = document.getElementById("specializationDivCard-" + (i + 1));
      element.setAttribute("id", "specializationDivCard-" + i);
      var button = document.getElementById("spec-cross-button-" + (i + 1));
      button.setAttribute("id", "spec-cross-button-" + i);
      button.setAttribute(
        "onclick",
        "Specializations.removeSpecCard(" + i + ")"
      );
    }
  }

  createSpecializationsViewTags() {
    var division = document.getElementById("spec-view-tags-section");
    try {
      // removing previous spec cards
      while (division.hasChildNodes()) {
        division.removeChild(division.firstChild);
      }
    } catch (err) {}

    //Wifi
    if (this.wifi.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.wifi.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.wifi.method === "Free") {
        specP.innerHTML = "Wifi-Free\n";
      } else {
        var str = "Wifi-";
        str += this.wifi.method + "-";
        str += this.wifi.plan + "-";
        str += this.wifi.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.wifi.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Washing Machine
    if (this.washingMachine.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.washingMachine.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.washingMachine.method === "Free") {
        specP.innerHTML = "Washing Machine-Free";
      } else {
        var str = "Washing Machine-";
        str += this.washingMachine.method + "-";
        str += this.washingMachine.plan + "-";
        str += this.washingMachine.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.washingMachine.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Lockers
    if (this.lockers.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.lockers.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.lockers.method === "Free") {
        specP.innerHTML = "Lockers-Free";
      } else {
        var str = "Lockers-";
        str += this.lockers.method + "-";
        str += this.lockers.plan + "-";
        str += this.lockers.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.lockers.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Hot Water
    if (this.hotWater.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.hotWater.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.hotWater.method === "Free") {
        specP.innerHTML = "Hot Water-Free";
      } else {
        var str = "Hot Water-";
        str += this.hotWater.method + "-";
        str += this.hotWater.plan + "-";
        str += this.hotWater.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.hotWater.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Gym
    if (this.gym.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.gym.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.gym.method === "Free") {
        specP.innerHTML = "Gym-Free";
      } else {
        var str = "Gym-";
        str += this.gym.method + "-";
        str += this.gym.plan + "-";
        str += this.gym.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.gym.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Geneartor
    if (this.generator.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.generator.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.generator.method === "Free") {
        specP.innerHTML = "Geneartor-Free";
      } else {
        var str = "Geneartor-";
        str += this.generator.method + "-";
        str += this.generator.plan + "-";
        str += this.generator.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.generator.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Vehicle Parking
    if (this.vehicleParking.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.vehicleParking.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.vehicleParking.method === "Free") {
        specP.innerHTML = "Vehicle Parking-Free";
      } else {
        var str = "Vehicle Parking-";
        str += this.vehicleParking.method + "-";
        str += this.vehicleParking.plan + "-";
        str += this.vehicleParking.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.vehicleParking.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Transport
    if (this.transport.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.transport.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.transport.method === "Free") {
        specP.innerHTML = "Transport-Free";
      } else {
        var str = "Transport-";
        str += this.transport.method + "-";
        str += this.transport.plan + "-";
        str += this.transport.amount + "\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.transport.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Room Service
    if (this.roomService.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.roomService.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      if (this.roomService.method === "Daily") {
        specP.innerHTML = "Room Service-Daily\n";
      } else {
        var str = "Room Service-Weekly " + this.roomService.count + " times\n";
        specP.innerHTML = str;
      }
      specP.innerHTML += this.roomService.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Sports Environment
    if (this.sportsEnvironment.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.sportsEnvironment.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      specP.innerHTML = "Sports Environment-Available\n";
      specP.innerHTML += this.sportsEnvironment.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //cc-tv
    if (this.ccTv.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.ccTv.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      specP.innerHTML = "CCTV Survailance-Available\n";
      specP.innerHTML += this.ccTv.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Security
    if (this.security.isActive) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", this.security.iconsAddress);
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      specP.innerHTML = "Security-Available\n";
      specP.innerHTML += this.security.notes;
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }

    //Additional Specializations
    for (var i = 0; i < this.additionalSpecializations.length; i++) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "spec-view-tags");

      var specImg = document.createElement("IMG");
      specImg.setAttribute("src", "images/others.svg");
      specImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(specImg);

      var specP = document.createElement("P");
      specP.setAttribute("class", "label2 notes");
      specP.setAttribute("style", "margin:1rem");
      specP.innerHTML = this.additionalSpecializations[i];
      subdiv.appendChild(specP);
      division.appendChild(subdiv);
    }
  }
}

class HostelPolicies {
  constructor() {
    this.hostelPoliciesList = new Array();
  }

  static addPolicy() {
    var element = document.getElementById("new-policy");
    if (element.value !== "") {
      editHostel.hostelPolicies.hostelPoliciesList.push(element.value);
      element.value = "";
      HostelPolicies.createPolicyEditTags(
        editHostel.hostelPolicies.hostelPoliciesList.length - 1
      );
    }
  }

  static createPolicyEditTags(index) {
    var division = document.getElementById("hp-edit-tags-section");
    var hpDiv = document.createElement("DIV");
    hpDiv.setAttribute("class", "policyDivCard");
    hpDiv.setAttribute("id", "policyDivCard-" + index);

    var hPP = document.createElement("P");
    hPP.setAttribute("class", "notes label2");
    hPP.innerHTML = editHostel.hostelPolicies.hostelPoliciesList[index];
    hpDiv.appendChild(hPP);

    var hPCross = document.createElement("BUTTON");
    hPCross.setAttribute("class", "cross-button");
    hPCross.setAttribute("id", "cross-button-" + index);
    hPCross.setAttribute(
      "onclick",
      "HostelPolicies.removeHpCard(" + index + ")"
    );
    hPCross.innerHTML = "<strong>X</strong>";
    hpDiv.appendChild(hPCross);

    division.appendChild(hpDiv);
  }

  static removeHpCard(index) {
    document.getElementById("policyDivCard-" + index).remove();
    // console.log(editHostel.hostelPolicies.hostelPoliciesList);
    //removing hp from class list
    editHostel.hostelPolicies.hostelPoliciesList.splice(index, 1);
    HostelPolicies.updateHpCardsIds(index);
    // console.log(editHostel.hostelPolicies.hostelPoliciesList);
  }

  static updateHpCardsIds(index) {
    for (
      var i = index;
      i < editHostel.hostelPolicies.hostelPoliciesList.length;
      i++
    ) {
      var element = document.getElementById("policyDivCard-" + (i + 1));
      element.setAttribute("id", "policyDivCard-" + i);

      var button = document.getElementById("cross-button-" + (i + 1));
      button.setAttribute("id", "cross-button-" + i);
      button.setAttribute("onclick", "HostelPolicies.removeHpCard(" + i + ")");
    }
  }

  static createPolicyViewTags() {
    var division = document.getElementById("hp-view-tags-section");
    try {
      // removing previous HP cards
      while (division.hasChildNodes()) {
        division.removeChild(division.firstChild);
      }
    } catch (err) {}
    for (
      var i = 0;
      i < editHostel.hostelPolicies.hostelPoliciesList.length;
      i++
    ) {
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "hp-view-tags");

      var hpImg = document.createElement("IMG");
      hpImg.setAttribute("src", "images/arrow-right.svg");
      hpImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(hpImg);

      var hpP = document.createElement("P");
      hpP.setAttribute("class", "label2 notes");
      hpP.setAttribute("style", "margin:1rem");
      hpP.innerHTML = editHostel.hostelPolicies.hostelPoliciesList[i];
      subdiv.appendChild(hpP);
      division.appendChild(subdiv);
    }
  }
}

function dataConversion(obj, value) {
  switch (value) {
    case 0:
      obj = JSON.parse(obj);
      // console.log(obj);
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

window.onload = function () {
  var hid = processString(document.getElementById("hostel-id").innerHTML);
  window.getHostelInfo(hid);
};

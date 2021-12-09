"use strict";

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
//Classes
class Hostel {
  constructor() {
    this.basicInfo;
    this.foodInfo;
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
    var words = hostel.basicInfo.hlocation.split("&");
    var loc = words[0] + "," + words[1];
    document.getElementById("location").href =
      "https://maps.googleapis.com/maps/api/staticmap?center=" +
      loc +
      "&zoom=14&size=400x300&sensor=false&key=AIzaSyAlkEMZd1nxIILagBicKu_w1i5n0Xix_2s";
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

var originalData = new Hostel();
var modifiedData = new Hostel();

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

class RoomCard {
  constructor(cname) {
    this.cardName = cname;
    this.stayOnly = new hostelPlans("Stay Only");
    this.stayAndFood = new hostelPlans("Stay and Food");
    this.isAcActive = false;
    this.bathroomtype = 0;
    this.bedsperRoom = "";
  }
}

class RoomDetails {
  constructor() {
    this.roomCards = new Array();
  }

  createRoomObject() {
    if (document.getElementById("plan-name").value === "") {
      alert("Plan not to be empty!!");
    } else {
      //Room card Object creation
      let currentRoomCard = new RoomCard(
        document.getElementById("plan-name").value
      );

      //Checking and adding Stay + Food
      let sFMonthly = document.getElementById("sf-monthly");
      let sFSemester = document.getElementById("sf-semester");
      let sFAnnum = document.getElementById("sf-annum");
      currentRoomCard.stayAndFood.planName = "Stay + Food";
      if (
        sFAnnum.value === "" &&
        sFMonthly.value === "" &&
        sFSemester.value === ""
      ) {
        currentRoomCard.stayAndFood.isActive = false;
      } else {
        currentRoomCard.stayAndFood.isActive = true;
        currentRoomCard.stayAndFood.monthly = sFMonthly.value;
        currentRoomCard.stayAndFood.semester = sFSemester.value;
        currentRoomCard.stayAndFood.annum = sFAnnum.value;
      }

      //Checking and Add Stay Only
      let sMonthly = document.getElementById("s-monthly");
      let sSemester = document.getElementById("s-semester");
      let sAnnum = document.getElementById("s-annum");
      currentRoomCard.stayOnly.planName = "Stay Only";
      if (
        sAnnum.value === "" &&
        sMonthly.value === "" &&
        sSemester.value === ""
      ) {
        currentRoomCard.stayOnly.isActive = false;
      } else {
        currentRoomCard.stayOnly.isActive = true;
        currentRoomCard.stayOnly.monthly = sMonthly.value;
        currentRoomCard.stayOnly.semester = sSemester.value;
        currentRoomCard.stayOnly.annum = sAnnum.value;
      }
      // AC/NAC
      if (document.getElementById("ac").checked) {
        currentRoomCard.isAcActive = true;
      }
      if (document.getElementById("nac").checked) {
        currentRoomCard.isAcActive = false;
      }

      // Beds Per Room
      currentRoomCard.bedsperRoom = document.getElementById("bed-count").value;

      // Bathrooms
      if (document.getElementById("common").checked) {
        currentRoomCard.bathroomtype = 0;
      }
      if (document.getElementById("attached").checked) {
        currentRoomCard.bathroomtype = 1;
      }
      if (
        document.getElementById("common").checked &&
        document.getElementById("attached").checked
      ) {
        currentRoomCard.bathroomtype = 2;
      }

      this.roomCards.push(currentRoomCard);
      console.log(currentRoomCard);
      // console.log(this.roomCards);
      this.createRoomTags(this.roomCards.length - 1);
      this.createRoomCards(this.roomCards.length - 1);
    }
  }

  createRoomTags(index) {
    let division = document.getElementById("room-tags");
    let div = document.createElement("DIV");
    div.setAttribute("class", "room-tags");
    div.setAttribute("id", "room-tag-" + index);
    let p = document.createElement("P");
    p.setAttribute("class", "label1");
    p.setAttribute("id", "room-tag-" + index + "-p");
    p.setAttribute("onclick", "RoomDetails.editCard(" + index + ")");
    p.innerHTML = this.roomCards[index].cardName;
    let button = document.createElement("BUTTON");
    button.setAttribute("class", "cross-button");
    button.setAttribute("id", "cross-button-" + index);
    button.setAttribute("onclick", "FoodDetails.removeCard(" + index + ")");
    button.innerHTML = "<strong>x</strong>";
    div.appendChild(p);
    div.appendChild(button);
    division.appendChild(div);
  }

  createRoomCards(index) {
    let division = document.getElementById("room-cards-section");
    let roomCard = document.createElement("DIV");
    roomCard.setAttribute("class", "room-card");
    roomCard.setAttribute("id", "room-card-" + index);
    let currentRoomCard = editHostel.roomDetails.roomCards[index];
    var rtn = document.createElement("P");
    rtn.setAttribute("class", "label notes");
    rtn.innerHTML = currentRoomCard.cardName;
    rtn.style.padding = "0rem";
    rtn.style.margin = "0rem";
    roomCard.appendChild(rtn);
    //STAY AND FOOD
    if (currentRoomCard.stayAndFood.isActive) {
      var saf = document.createElement("DIV");
      saf.setAttribute("class", "card-element");
      roomCard.appendChild(saf);
      var safDiv = document.createElement("DIV");
      safDiv.setAttribute("class", "room-card-div");
      var safimgarrow = document.createElement("IMG");
      safimgarrow.setAttribute("src", "images/arrow-right.svg");
      safimgarrow.setAttribute("class", "mini-icon");
      safDiv.appendChild(safimgarrow);
      var safinfoP = document.createElement("P");
      safinfoP.setAttribute("class", "label2 notes");
      safinfoP.innerHTML = currentRoomCard.stayAndFood.planName;
      safDiv.appendChild(safinfoP);
      saf.appendChild(safDiv);
      if (!(currentRoomCard.stayAndFood.monthly === "")) {
        var safLi1 = document.createElement("LI");
        safLi1.setAttribute("class", "label2 notes");
        safLi1.innerHTML =
          "Monthly Rs" + currentRoomCard.stayAndFood.monthly + "/-";
        saf.appendChild(safLi1);
      }
      if (!(currentRoomCard.stayAndFood.semester === "")) {
        var safLi2 = document.createElement("LI");
        safLi2.setAttribute("class", "label2 notes");
        safLi2.innerHTML =
          "Semester Rs" + currentRoomCard.stayAndFood.semester + "/-";
        saf.appendChild(safLi2);
      }
      if (!(currentRoomCard.stayAndFood.annum === "")) {
        var safLi3 = document.createElement("LI");
        safLi3.setAttribute("class", "label2 notes");
        safLi3.innerHTML =
          "Annum Rs" + currentRoomCard.stayAndFood.annum + "/-";
        saf.appendChild(safLi3);
      }
    }

    //STAY ONLY
    if (currentRoomCard.stayOnly.isActive) {
      var so = document.createElement("DIV");
      so.setAttribute("class", "card-element");
      var soDiv = document.createElement("DIV");
      soDiv.setAttribute("class", "room-card-div");
      var soimgarrow = document.createElement("IMG");
      soimgarrow.setAttribute("src", "images/arrow-right.svg");
      soimgarrow.setAttribute("class", "mini-icon");
      soDiv.appendChild(soimgarrow);
      var soinfoP = document.createElement("P");
      soinfoP.setAttribute("class", "label2 notes");
      soinfoP.innerHTML = currentRoomCard.stayOnly.planName;
      soDiv.appendChild(soinfoP);
      so.appendChild(soDiv);
      if (!(currentRoomCard.stayOnly.monthly === "")) {
        var safLi1 = document.createElement("LI");
        safLi1.setAttribute("class", "label2 notes");
        safLi1.innerHTML =
          "Monthly Rs" + currentRoomCard.stayOnly.monthly + "/-";
        so.appendChild(safLi1);
      }
      if (!(currentRoomCard.stayOnly.semester === "")) {
        var safLi2 = document.createElement("LI");
        safLi2.setAttribute("class", "label2 notes");
        safLi2.innerHTML =
          "Semester Rs" + currentRoomCard.stayOnly.semester + "/-";
        so.appendChild(safLi2);
      }
      if (!(currentRoomCard.stayOnly.annum === "")) {
        var soLi3 = document.createElement("LI");
        soLi3.setAttribute("class", "label2 notes");
        soLi3.innerHTML = "Annum Rs" + currentRoomCard.stayOnly.annum + "/-";
        so.appendChild(soLi3);
      }
      roomCard.appendChild(so);
    }

    //AC/N-AC
    var ac = document.createElement("DIV");
    ac.setAttribute("class", "card-element");
    var acDiv = document.createElement("DIV");
    acDiv.setAttribute("class", "room-card-div");
    var acimgarrow = document.createElement("IMG");
    acimgarrow.setAttribute("src", "images/arrow-right.svg");
    acimgarrow.setAttribute("class", "mini-icon");
    acDiv.appendChild(acimgarrow);
    var acinfoP = document.createElement("P");
    acinfoP.setAttribute("class", "label2 notes");
    if (currentRoomCard.isAcActive) {
      acinfoP.innerHTML = "AC";
    } else {
      acinfoP.innerHTML = "N-AC";
    }
    acDiv.appendChild(acinfoP);
    ac.appendChild(acDiv);
    roomCard.appendChild(ac);

    //Beds per Room
    var bpr = document.createElement("DIV");
    bpr.setAttribute("class", "card-element");
    var bprDiv = document.createElement("DIV");
    bprDiv.setAttribute("class", "room-card-div");
    var bprimgarrow = document.createElement("IMG");
    bprimgarrow.setAttribute("src", "images/arrow-right.svg");
    bprimgarrow.setAttribute("class", "mini-icon");
    bprDiv.appendChild(bprimgarrow);
    var bprinfoP = document.createElement("P");
    bprinfoP.setAttribute("class", "label2");
    bprinfoP.innerHTML = "Beds per Room";
    bprDiv.appendChild(bprinfoP);
    bpr.appendChild(bprDiv);
    var bprLi = document.createElement("LI");
    bprLi.setAttribute("class", "label2 notes");
    bprLi.innerHTML = currentRoomCard.bedsperRoom;
    bpr.appendChild(bprLi);
    roomCard.appendChild(bpr);

    //BathRooms
    var br = document.createElement("DIV");
    br.setAttribute("class", "card-element");
    var brDiv = document.createElement("DIV");
    brDiv.setAttribute("class", "room-card-div");
    var brimgarrow = document.createElement("IMG");
    brimgarrow.setAttribute("src", "images/arrow-right.svg");
    brimgarrow.setAttribute("class", "mini-icon");
    brDiv.appendChild(brimgarrow);
    var brinfoP = document.createElement("P");
    brinfoP.setAttribute("class", "label2");
    brinfoP.innerHTML = "Bath Rooms";
    brDiv.appendChild(brinfoP);
    br.appendChild(brDiv);
    if (currentRoomCard.bathroomtype === 0) {
      var brLi1 = document.createElement("LI");
      brLi1.setAttribute("class", "label2");
      brLi1.innerHTML = "Common";
      br.appendChild(brLi1);
    }
    if (currentRoomCard.bathroomtype === 1) {
      var brLi2 = document.createElement("LI");
      brLi2.setAttribute("class", "label2");
      brLi2.innerHTML = "Attached";
      br.appendChild(brLi2);
    }
    if (currentRoomCard.bathroomtype === 2) {
      var brLi3 = document.createElement("LI");
      brLi3.setAttribute("class", "label2");
      brLi3.innerHTML = "Common";
      br.appendChild(brLi3);
      var brLi4 = document.createElement("LI");
      brLi4.setAttribute("class", "label2");
      brLi4.innerHTML = "Attached";
      br.appendChild(brLi4);
    }
    roomCard.appendChild(br);
    division.appendChild(roomCard);
  }

  static updateIdsOfElements(index) {
    for (var i = index; i < editHostel.roomDetails.roomCards.length; i++) {
      var element = document.getElementById("room-tag-" + (index + 1));
      element.setAttribute("id", "room-tag-" + index);
      var element1 = document.getElementById("room-card-" + (index + 1));
      element1.setAttribute("id", "room-card-" + index);
      var element2 = document.getElementById("room-tag-" + (index + 1) + "-p");
      element2.setAttribute("id", "room-tag-" + index + "-p");
      element2.setAttribute("onclick", "RoomDetails.editCard(" + index + ")");
      var button = document.getElementById("cross-button-" + (i + 1));
      button.setAttribute("id", "cross-button-" + i);
      button.setAttribute("onclick", "FoodDetails.removeCard(" + i + ")");
    }
  }

  static removeCard(index) {
    document.getElementById("room-tag-" + index).remove();
    editHostel.roomDetails.roomCards.splice(index, 1);

    document.getElementById("plan-name").value = "";
    document.getElementById("bed-count").value = "";

    document.getElementById("sf-monthly").value = "";
    document.getElementById("sf-semester").value = "";
    document.getElementById("sf-annum").value = "";

    document.getElementById("s-monthly").value = "";
    document.getElementById("s-semester").value = "";
    document.getElementById("s-annum").value = "";

    document.getElementById("room-card-" + index).remove();
    RoomDetails.updateIdsOfElements(index);
  }

  static editCard(index) {
    let currentRoomCard = editHostel.roomDetails.roomCards[index];
    console.log(index);
    console.log(editHostel.roomDetails.roomCards);

    let button = document.getElementById("add-room-card");
    button.innerHTML = "Update Card";
    button.setAttribute("onclick", "RoomDetails.updateCard(" + index + ")");

    document.getElementById("plan-name").value = currentRoomCard.cardName;
    document.getElementById("bed-count").value = currentRoomCard.bedsperRoom;

    document.getElementById("sf-monthly").value =
      currentRoomCard.stayAndFood.monthly;
    document.getElementById("sf-semester").value =
      currentRoomCard.stayAndFood.semester;
    document.getElementById("sf-annum").value =
      currentRoomCard.stayAndFood.annum;

    document.getElementById("s-monthly").value =
      currentRoomCard.stayOnly.monthly;
    document.getElementById("s-semester").value =
      currentRoomCard.stayOnly.semester;
    document.getElementById("s-annum").value = currentRoomCard.stayOnly.annum;

    if (currentRoomCard.isAcActive) {
      document.getElementById("ac").checked = true;
    }
    if (!currentRoomCard.isAcActive) {
      document.getElementById("nac").checked = true;
    }

    if (currentRoomCard.bathroomtype === 0) {
      document.getElementById("common").checked = true;
      document.getElementById("attached").checked = false;
    }
    if (currentRoomCard.bathroomtype === 1) {
      document.getElementById("common").checked = false;
      document.getElementById("attached").checked = true;
    }
    if (currentRoomCard.bathroomtype === 2) {
      document.getElementById("common").checked = true;
      document.getElementById("attached").checked = true;
    }
  }

  static updateCard(index) {
    if (document.getElementById("plan-name").value === "") {
      alert("Plan not to be empty!!");
    } else {
      //Room card Object creation
      let currentRoomCard = editHostel.roomDetails.roomCards[index];
      currentRoomCard.cardName = document.getElementById("plan-name").value;
      document.getElementById("room-tag-" + index + "-p").innerHTML =
        document.getElementById("plan-name").value;
      //Checking and adding Stay + Food
      let sFMonthly = document.getElementById("sf-monthly");
      let sFSemester = document.getElementById("sf-semester");
      let sFAnnum = document.getElementById("sf-annum");
      currentRoomCard.stayAndFood.planName = "Stay + Food";
      if (
        sFAnnum.value === "" &&
        sFMonthly.value === "" &&
        sFSemester.value === ""
      ) {
        currentRoomCard.stayAndFood.isActive = false;
      } else {
        currentRoomCard.stayAndFood.isActive = true;
        currentRoomCard.stayAndFood.monthly = sFMonthly.value;
        currentRoomCard.stayAndFood.semester = sFSemester.value;
        currentRoomCard.stayAndFood.annum = sFAnnum.value;
      }

      //Checking and Add Stay Only
      let sMonthly = document.getElementById("s-monthly");
      let sSemester = document.getElementById("s-semester");
      let sAnnum = document.getElementById("s-annum");
      currentRoomCard.stayOnly.planName = "Stay Only";
      if (
        sAnnum.value === "" &&
        sMonthly.value === "" &&
        sSemester.value === ""
      ) {
        currentRoomCard.stayAndFood.isActive = false;
      } else {
        currentRoomCard.stayOnly.isActive = true;
        currentRoomCard.stayOnly.monthly = sMonthly.value;
        currentRoomCard.stayOnly.semester = sSemester.value;
        currentRoomCard.stayOnly.annum = sAnnum.value;
      }

      // AC/NAC
      if (document.getElementById("ac").checked) {
        currentRoomCard.isAcActive = true;
      }
      if (document.getElementById("nac").checked) {
        currentRoomCard.isAcActive = false;
      }

      // Beds Per Room
      currentRoomCard.bedsperRoom = document.getElementById("bed-count").value;

      // Bathrooms
      if (document.getElementById("common").checked) {
        currentRoomCard.bathroomtype = 0;
      }
      if (document.getElementById("attached").checked) {
        currentRoomCard.bathroomtype = 1;
      }
      if (
        document.getElementById("common").checked &&
        document.getElementById("attached").checked
      ) {
        currentRoomCard.bathroomtype = 2;
      }
      let button = document.getElementById("add-room-card");
      button.innerHTML = "ADD";
      button.setAttribute("onclick", "checkChange(1,0)");
    }
    document.getElementById("room-card-" + index).remove();
    editHostel.roomDetails.createRoomCards(index);
  }
}

class FoodPack {
  constructor() {
    this.time = "";
    this.period = "";
    this.itemList = [];
    this.notes = "";
  }
}

class NonVeg {
  constructor() {
    this.noofTimes;
    this.isUnLimited = false;
    this.notes = "";
  }
}

class FoodDetails {
  constructor() {
    this.breakFast = new FoodPack();
    this.lunch = new FoodPack();
    this.snacks = new FoodPack();
    this.dinner = new FoodPack();
    this.nonVeg = new NonVeg();
  }

  updateFoodDetails() {
    //BreakFast
    this.breakFast.time = document.getElementById("breakfast-time").value;
    this.breakFast.period = document.getElementById("breakfast-period").value;
    this.breakFast.itemList = String(
      document.getElementById("breakfast-items").value
    ).split("-");
    this.breakFast.notes = document.getElementById("breakfast-notes").value;
    // console.log(this.breakFast);
    //Lunch
    this.lunch.time = document.getElementById("lunch-time").value;
    this.lunch.period = document.getElementById("lunch-period").value;
    this.lunch.itemList = String(
      document.getElementById("lunch-items").value
    ).split("-");
    this.lunch.notes = document.getElementById("lunch-notes").value;
    // console.log(this.lunch);
    //Snacks
    this.snacks.time = document.getElementById("snacks-time").value;
    this.snacks.period = document.getElementById("snacks-period").value;
    this.snacks.itemList = String(
      document.getElementById("snacks-items").value
    ).split("-");
    this.snacks.notes = document.getElementById("snacks-notes").value;
    // console.log(this.snacks);
    //Dinner
    this.dinner.time = document.getElementById("dinner-time").value;
    this.dinner.period = document.getElementById("dinner-period").value;
    this.dinner.itemList = String(
      document.getElementById("dinner-items").value
    ).split("-");
    this.dinner.notes = document.getElementById("dinner-notes").value;
    // console.log(this.dinner);
    //Non-Veg
    this.nonVeg.noofTimes = document.getElementById("noof-times").value;
    this.nonVeg.isUnLimited = Boolean(document.getElementById("limit").value);
    this.nonVeg.notes = document.getElementById("nonveg-notes").value;
    // console.log(this.nonVeg);

    this.createFoodCards();
  }

  createFoodCards() {
    try {
      document.getElementById("breakfast-card").remove();
      document.getElementById("lunch-card").remove();
      document.getElementById("snacks-card").remove();
      document.getElementById("dinner-card").remove();
      document.getElementById("nonveg-card").remove();
    } catch (err) {}
    let division = document.getElementById("food-cards-section");

    //BreakFast
    var bf = document.createElement("DIV");
    bf.setAttribute("class", "food-card");
    bf.setAttribute("id", "breakfast-card");

    var bfn = document.createElement("P");
    bfn.setAttribute("class", "label");
    bfn.innerHTML = "Breakfast(" + this.breakFast.period + ")";
    bf.appendChild(bfn);

    var bftimediv = document.createElement("DIV");
    bftimediv.setAttribute("class", "food-card-div");

    var bftimeimgarrow = document.createElement("IMG");
    bftimeimgarrow.setAttribute("src", "images/arrow-right.svg");
    bftimeimgarrow.setAttribute("class", "mini-icon");
    bftimediv.appendChild(bftimeimgarrow);

    var bftimeP = document.createElement("P");
    bftimeP.setAttribute("class", "label2");
    bftimeP.innerHTML = "Time : " + this.breakFast.time;
    bftimediv.appendChild(bftimeP);
    bf.appendChild(bftimediv);

    var bfitemdiv = document.createElement("DIV");
    bfitemdiv.setAttribute("class", "food-card-div");

    var bfitemimgarrow = document.createElement("IMG");
    bfitemimgarrow.setAttribute("src", "images/arrow-right.svg");
    bfitemimgarrow.setAttribute("class", "mini-icon");
    bfitemdiv.appendChild(bfitemimgarrow);

    var bfitemP = document.createElement("P");
    bfitemP.setAttribute("class", "label2");
    bfitemP.innerHTML = "Items";
    bfitemdiv.appendChild(bfitemP);

    bf.appendChild(bfitemdiv);
    var bfitemlidiv = document.createElement("DIV");
    bfitemlidiv.setAttribute("class", "food-card-div");
    for (var i = 0; i < this.breakFast.itemList.length; i++) {
      var bfitemli = document.createElement("LI");
      bfitemli.setAttribute("class", "label2 notes");
      bfitemli.innerHTML = this.breakFast.itemList[i];
      bfitemlidiv.appendChild(bfitemli);
    }
    bf.appendChild(bfitemlidiv);

    var bfnotediv = document.createElement("DIV");
    bfnotediv.setAttribute("class", "food-card-div");

    var bfnoteimgarrow = document.createElement("IMG");
    bfnoteimgarrow.setAttribute("src", "images/arrow-right.svg");
    bfnoteimgarrow.setAttribute("class", "mini-icon");
    bfnotediv.appendChild(bfnoteimgarrow);

    var bfnoteP = document.createElement("P");
    bfnoteP.setAttribute("class", "label2");
    bfnoteP.innerHTML = "Notes";
    bfnotediv.appendChild(bfnoteP);
    bf.appendChild(bfnotediv);

    var bfnote = document.createElement("P");
    bfnote.setAttribute("class", "label2 notes");
    bfnote.innerHTML = this.breakFast.notes;
    bf.appendChild(bfnote);

    division.appendChild(bf);

    //LUNCH
    var lun = document.createElement("DIV");
    lun.setAttribute("class", "food-card");
    lun.setAttribute("id", "lunch-card");

    var lunn = document.createElement("P");
    lunn.setAttribute("class", "label");
    lunn.innerHTML = "Lunch(" + this.lunch.period + ")";
    lun.appendChild(lunn);

    var luntimediv = document.createElement("DIV");
    luntimediv.setAttribute("class", "food-card-div");

    var luntimeimgarrow = document.createElement("IMG");
    luntimeimgarrow.setAttribute("src", "images/arrow-right.svg");
    luntimeimgarrow.setAttribute("class", "mini-icon");
    luntimediv.appendChild(luntimeimgarrow);

    var luntimeP = document.createElement("P");
    luntimeP.setAttribute("class", "label2");
    luntimeP.innerHTML = "Time : " + this.lunch.time;
    luntimediv.appendChild(luntimeP);
    lun.appendChild(luntimediv);

    var lunitemdiv = document.createElement("DIV");
    lunitemdiv.setAttribute("class", "food-card-div");

    var lunitemimgarrow = document.createElement("IMG");
    lunitemimgarrow.setAttribute("src", "images/arrow-right.svg");
    lunitemimgarrow.setAttribute("class", "mini-icon");
    lunitemdiv.appendChild(lunitemimgarrow);

    var lunitemP = document.createElement("P");
    lunitemP.setAttribute("class", "label2");
    lunitemP.innerHTML = "Items";
    lunitemdiv.appendChild(lunitemP);

    lun.appendChild(lunitemdiv);
    var lunitemlidiv = document.createElement("DIV");
    lunitemlidiv.setAttribute("class", "food-card-div");
    for (var i = 0; i < this.lunch.itemList.length; i++) {
      var lunitemli = document.createElement("LI");
      lunitemli.setAttribute("class", "label2 notes");
      lunitemli.innerHTML = this.lunch.itemList[i];
      lunitemlidiv.appendChild(lunitemli);
    }
    lun.appendChild(lunitemlidiv);

    var lunnotediv = document.createElement("DIV");
    lunnotediv.setAttribute("class", "food-card-div");

    var lunnoteimgarrow = document.createElement("IMG");
    lunnoteimgarrow.setAttribute("src", "images/arrow-right.svg");
    lunnoteimgarrow.setAttribute("class", "mini-icon");
    lunnotediv.appendChild(lunnoteimgarrow);

    var lunnoteP = document.createElement("P");
    lunnoteP.setAttribute("class", "label2");
    lunnoteP.innerHTML = "Notes";
    lunnotediv.appendChild(lunnoteP);
    lun.appendChild(lunnotediv);

    var lunnote = document.createElement("P");
    lunnote.setAttribute("class", "label2 notes");
    lunnote.innerHTML = this.lunch.notes;
    lun.appendChild(lunnote);

    division.appendChild(lun);

    //Snacks
    var sn = document.createElement("DIV");
    sn.setAttribute("class", "food-card");
    sn.setAttribute("id", "snacks-card");

    var snn = document.createElement("P");
    snn.setAttribute("class", "label");
    snn.innerHTML = "Snacks(" + this.snacks.period + ")";
    sn.appendChild(snn);

    var sntimediv = document.createElement("DIV");
    sntimediv.setAttribute("class", "food-card-div");

    var sntimeimgarrow = document.createElement("IMG");
    sntimeimgarrow.setAttribute("src", "images/arrow-right.svg");
    sntimeimgarrow.setAttribute("class", "mini-icon");
    sntimediv.appendChild(sntimeimgarrow);

    var sntimeP = document.createElement("P");
    sntimeP.setAttribute("class", "label2");
    sntimeP.innerHTML = "Time : " + this.snacks.time;
    sntimediv.appendChild(sntimeP);
    sn.appendChild(sntimediv);

    var snitemdiv = document.createElement("DIV");
    snitemdiv.setAttribute("class", "food-card-div");

    var snitemimgarrow = document.createElement("IMG");
    snitemimgarrow.setAttribute("src", "images/arrow-right.svg");
    snitemimgarrow.setAttribute("class", "mini-icon");
    snitemdiv.appendChild(snitemimgarrow);

    var snitemP = document.createElement("P");
    snitemP.setAttribute("class", "label2");
    snitemP.innerHTML = "Items";
    snitemdiv.appendChild(snitemP);

    sn.appendChild(snitemdiv);
    var snitemlidiv = document.createElement("DIV");
    snitemlidiv.setAttribute("class", "food-card-div");
    for (var i = 0; i < this.snacks.itemList.length; i++) {
      var snitemli = document.createElement("LI");
      snitemli.setAttribute("class", "label2 notes");
      snitemli.innerHTML = this.snacks.itemList[i];
      snitemlidiv.appendChild(snitemli);
    }
    sn.appendChild(snitemlidiv);

    var snnnotediv = document.createElement("DIV");
    snnnotediv.setAttribute("class", "food-card-div");

    var snnoteimgarrow = document.createElement("IMG");
    snnoteimgarrow.setAttribute("src", "images/arrow-right.svg");
    snnoteimgarrow.setAttribute("class", "mini-icon");
    snnnotediv.appendChild(snnoteimgarrow);

    var snnoteP = document.createElement("P");
    snnoteP.setAttribute("class", "label2");
    snnoteP.innerHTML = "Notes";
    snnnotediv.appendChild(snnoteP);
    sn.appendChild(snnnotediv);

    var snnote = document.createElement("P");
    snnote.setAttribute("class", "label2 notes");
    snnote.innerHTML = this.snacks.notes;
    sn.appendChild(snnote);

    division.appendChild(sn);

    //Dinner
    var din = document.createElement("DIV");
    din.setAttribute("class", "food-card");
    din.setAttribute("id", "dinner-card");

    var dinn = document.createElement("P");
    dinn.setAttribute("class", "label");
    dinn.innerHTML = "Dinner(" + this.dinner.period + ")";
    din.appendChild(dinn);

    var dintimediv = document.createElement("DIV");
    dintimediv.setAttribute("class", "food-card-div");

    var dintimeimgarrow = document.createElement("IMG");
    dintimeimgarrow.setAttribute("src", "images/arrow-right.svg");
    dintimeimgarrow.setAttribute("class", "mini-icon");
    dintimediv.appendChild(dintimeimgarrow);

    var dintimeP = document.createElement("P");
    dintimeP.setAttribute("class", "label2");
    dintimeP.innerHTML = "Time : " + this.dinner.time;
    dintimediv.appendChild(dintimeP);
    din.appendChild(dintimediv);

    var dinitemdiv = document.createElement("DIV");
    dinitemdiv.setAttribute("class", "food-card-div");

    var dinitemimgarrow = document.createElement("IMG");
    dinitemimgarrow.setAttribute("src", "images/arrow-right.svg");
    dinitemimgarrow.setAttribute("class", "mini-icon");
    dinitemdiv.appendChild(dinitemimgarrow);

    var dinitemP = document.createElement("P");
    dinitemP.setAttribute("class", "label2");
    dinitemP.innerHTML = "Items";
    dinitemdiv.appendChild(dinitemP);

    din.appendChild(dinitemdiv);
    var dinitemlidiv = document.createElement("DIV");
    dinitemlidiv.setAttribute("class", "food-card-div");
    for (var i = 0; i < this.dinner.itemList.length; i++) {
      var dinitemli = document.createElement("LI");
      dinitemli.setAttribute("class", "label2 notes");
      dinitemli.innerHTML = this.dinner.itemList[i];
      dinitemlidiv.appendChild(dinitemli);
    }
    din.appendChild(dinitemlidiv);

    var dinnotediv = document.createElement("DIV");
    dinnotediv.setAttribute("class", "food-card-div");

    var dinnoteimgarrow = document.createElement("IMG");
    dinnoteimgarrow.setAttribute("src", "images/arrow-right.svg");
    dinnoteimgarrow.setAttribute("class", "mini-icon");
    dinnotediv.appendChild(dinnoteimgarrow);

    var dinnoteP = document.createElement("P");
    dinnoteP.setAttribute("class", "label2");
    dinnoteP.innerHTML = "Notes";
    dinnotediv.appendChild(dinnoteP);
    din.appendChild(dinnotediv);

    var dinnote = document.createElement("P");
    dinnote.setAttribute("class", "label2 notes");
    dinnote.innerHTML = this.dinner.notes;
    din.appendChild(dinnote);

    division.appendChild(din);

    //Non-Veg
    var nonv = document.createElement("DIV");
    nonv.setAttribute("class", "food-card");
    nonv.setAttribute("id", "nonveg-card");

    var nonvn = document.createElement("P");
    nonvn.setAttribute("class", "label");
    nonvn.innerHTML = "Non-Veg";
    nonv.appendChild(nonvn);

    var nonvtimesdiv = document.createElement("DIV");
    nonvtimesdiv.setAttribute("class", "food-card-div");

    var nonvtimesimgarrow = document.createElement("IMG");
    nonvtimesimgarrow.setAttribute("src", "images/arrow-right.svg");
    nonvtimesimgarrow.setAttribute("class", "mini-icon");
    nonvtimesdiv.appendChild(nonvtimesimgarrow);

    var nonvtimesP = document.createElement("P");
    nonvtimesP.setAttribute("class", "label2");
    nonvtimesP.innerHTML = this.nonVeg.noofTimes + "times per week.";
    nonvtimesdiv.appendChild(nonvtimesP);
    nonv.appendChild(nonvtimesdiv);

    var nonvlimiteddiv = document.createElement("DIV");
    nonvlimiteddiv.setAttribute("class", "food-card-div");

    var nonvlimitedimgarrow = document.createElement("IMG");
    nonvlimitedimgarrow.setAttribute("src", "images/arrow-right.svg");
    nonvlimitedimgarrow.setAttribute("class", "mini-icon");
    nonvlimiteddiv.appendChild(nonvlimitedimgarrow);

    var nonvlimitedP = document.createElement("P");
    nonvlimitedP.setAttribute("class", "label2");
    if (this.nonVeg.isUnLimited) {
      nonvlimitedP.innerHTML = "Unlimited";
    } else {
      nonvlimitedP.innerHTML = "Limited";
    }
    nonvlimiteddiv.appendChild(nonvlimitedP);
    nonv.appendChild(nonvlimiteddiv);

    var nonvnotediv = document.createElement("DIV");
    nonvnotediv.setAttribute("class", "food-card-div");

    var nonvnoteimgarrow = document.createElement("IMG");
    nonvnoteimgarrow.setAttribute("src", "images/arrow-right.svg");
    nonvnoteimgarrow.setAttribute("class", "mini-icon");
    nonvnotediv.appendChild(nonvnoteimgarrow);

    var nonvnoteP = document.createElement("P");
    nonvnoteP.setAttribute("class", "label2");
    nonvnoteP.innerHTML = "Notes";
    nonvnotediv.appendChild(nonvnoteP);
    nonv.appendChild(nonvnotediv);

    var nonvnote = document.createElement("P");
    nonvnote.setAttribute("class", "label2 notes");
    nonvnote.innerHTML = this.dinner.notes;
    nonv.appendChild(nonvnote);

    division.appendChild(nonv);
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

class RequirementType1 {
  constructor() {
    this.type = 0;
    this.category = "";
    this.name = "";
    this.iconsAddress = "";
  }
}

class Requirements {
  constructor() {
    this.requirementsList = [];
  }

  static addRequirement() {
    if (document.getElementById("add-requirement").value !== "") {
      var req = new RequirementType1();
      var category = document.getElementById("req-category").value;
      switch (category) {
        case "Atm":
          req.type = 0;
          req.category = category;
          req.iconsAddress = "images/atm.svg";
          req.name = document.getElementById("add-requirement").value;
          break;
        case "Medical Emergency":
          req.type = 1;
          req.category = category;
          req.iconsAddress = "images/medkit.svg";
          req.name = document.getElementById("add-requirement").value;
          break;
        case "Bus Stop":
          req.type = 2;
          req.category = category;
          req.iconsAddress = "images/transport.svg";
          req.name = document.getElementById("add-requirement").value;
          break;
        case "Theatre":
          req.type = 3;
          req.category = category;
          req.iconsAddress = "images/theatre.svg";
          req.name = document.getElementById("add-requirement").value;
          break;
        case "Stationery":
          req.type = 4;
          req.category = category;
          req.iconsAddress = "images/stationery.svg";
          req.name = document.getElementById("add-requirement").value;
          break;
        default:
          req.type = 5;
          req.category = category;
          req.iconsAddress = "images/location-point.svg";
          req.name = document.getElementById("add-requirement").value;
          break;
      }
      editHostel.requirements.requirementsList.push(req);
      Requirements.createReqEditTags(
        editHostel.requirements.requirementsList.length - 1
      );
      document.getElementById("add-requirement").value = "";
    }
  }

  static createReqEditTags(index) {
    var curReq = editHostel.requirements.requirementsList[index];
    var division = document.getElementById("req-edit-tags-section");
    var reqDiv = document.createElement("DIV");
    reqDiv.setAttribute("class", "requirementDivCard");
    reqDiv.setAttribute("id", "requirementDivCard-" + index);
    var reqP = document.createElement("P");
    reqP.setAttribute("class", "notes label2");
    if (curReq.category !== "Others")
      reqP.innerHTML = curReq.category + "-" + curReq.name;
    else reqP.innerHTML = curReq.name;
    reqDiv.appendChild(reqP);

    var hPCross = document.createElement("BUTTON");
    hPCross.setAttribute("class", "cross-button");
    hPCross.setAttribute("id", "req-cross-button-" + index);
    hPCross.setAttribute(
      "onclick",
      "Requirements.removeReqCard(" + index + ")"
    );
    hPCross.innerHTML = "<strong>X</strong>";
    reqDiv.appendChild(hPCross);

    division.appendChild(reqDiv);
  }

  static removeReqCard(index) {
    document.getElementById("requirementDivCard-" + index).remove();
    editHostel.requirements.requirementsList.splice(index, 1);
    Requirements.updateReqCardsIds(index);
  }

  static updateReqCardsIds(index) {
    for (
      var i = index;
      i < editHostel.requirements.requirementsList.length;
      i++
    ) {
      var element = document.getElementById("requirementDivCard-" + (i + 1));
      element.setAttribute("id", "requirementDivCard-" + i);

      var button = document.getElementById("req-cross-button-" + (i + 1));
      button.setAttribute("id", "req-cross-button-" + i);
      button.setAttribute("onclick", "Requirements.removeReqCard(" + i + ")");
    }
  }

  static createReqViewTags() {
    var division = document.getElementById("req-view-tags-section");
    try {
      // removing previous HP cards
      while (division.hasChildNodes()) {
        division.removeChild(division.firstChild);
      }
    } catch (err) {}
    for (var i = 0; i < editHostel.requirements.requirementsList.length; i++) {
      var curReq = editHostel.requirements.requirementsList[i];
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "req-view-tags");

      var reqImg = document.createElement("IMG");
      reqImg.setAttribute("src", curReq.iconsAddress);
      reqImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(reqImg);

      var reqP = document.createElement("P");
      reqP.setAttribute("class", "label2 notes");
      reqP.setAttribute("style", "margin:1rem");
      if (curReq.category !== "Others")
        reqP.innerHTML = curReq.category + "-" + curReq.name;
      else reqP.innerHTML = curReq.name;
      subdiv.appendChild(reqP);
      division.appendChild(subdiv);
    }
  }
}

class HotspotType1 {
  constructor() {
    this.type = 0;
    this.category = "";
    this.name = "";
    this.iconsAddress = "";
  }
}

class Hotspots {
  constructor() {
    this.hotspotsList = [];
  }

  static addHotspot() {
    var hs = new HotspotType1();
    var category = document.getElementById("hs-category").value;
    switch (category) {
      case "Restaurent":
        hs.type = 0;
        hs.category = category;
        hs.iconsAddress = "images/restaurents.svg";
        hs.name = document.getElementById("add-hotspot").value;
        break;
      case "Drinks/Ice-creams":
        hs.type = 1;
        hs.category = category;
        hs.iconsAddress = "images/drinks.svg";
        hs.name = document.getElementById("add-hotspot").value;
        break;
      case "Parks":
        hs.type = 2;
        hs.category = category;
        hs.iconsAddress = "images/park.svg";
        hs.name = document.getElementById("add-hotspot").value;
        break;
      default:
        hs.type = 3;
        hs.category = category;
        hs.iconsAddress = "images/location-point.svg";
        hs.name = document.getElementById("add-hotspot").value;
        break;
    }
    editHostel.hotspots.hotspotsList.push(hs);
    Hotspots.createHsEditTags(editHostel.hotspots.hotspotsList.length - 1);
    document.getElementById("add-hotspot").value = "";
  }

  static createHsEditTags(index) {
    var curHs = editHostel.hotspots.hotspotsList[index];
    var division = document.getElementById("hs-edit-tags-section");
    var hsDiv = document.createElement("DIV");
    hsDiv.setAttribute("class", "hotspotDivCard");
    hsDiv.setAttribute("id", "hotspotDivCard-" + index);
    var hsP = document.createElement("P");
    hsP.setAttribute("class", "notes label2");
    hsP.innerHTML = curHs.name;
    hsDiv.appendChild(hsP);

    var hPCross = document.createElement("BUTTON");
    hPCross.setAttribute("class", "cross-button");
    hPCross.setAttribute("id", "hs-cross-button-" + index);
    hPCross.setAttribute("onclick", "Hotspots.removeHsCard(" + index + ")");
    hPCross.innerHTML = "<strong>X</strong>";
    hsDiv.appendChild(hPCross);

    division.appendChild(hsDiv);
  }

  static removeHsCard(index) {
    document.getElementById("hotspotDivCard-" + index).remove();
    editHostel.hotspots.hotspotsList.splice(index, 1);
    Hotspots.updateHsCardsIds(index);
  }

  static updateHsCardsIds(index) {
    for (var i = index; i < editHostel.hotspots.hotspotsList.length; i++) {
      var element = document.getElementById("hotspotDivCard-" + (i + 1));
      element.setAttribute("id", "hotspotDivCard-" + i);

      var button = document.getElementById("hs-cross-button-" + (i + 1));
      button.setAttribute("id", "hs-cross-button-" + i);
      button.setAttribute("onclick", "Hotspots.removeHsCard(" + i + ")");
    }
  }

  static createHsViewTags() {
    var division = document.getElementById("hs-view-tags-section");
    try {
      // removing previous HP cards
      while (division.hasChildNodes()) {
        division.removeChild(division.firstChild);
      }
    } catch (err) {}
    for (var i = 0; i < editHostel.hotspots.hotspotsList.length; i++) {
      var curHs = editHostel.hotspots.hotspotsList[i];
      var subdiv = document.createElement("DIV");
      subdiv.setAttribute("class", "hs-view-tags");

      var hsImg = document.createElement("IMG");
      hsImg.setAttribute("src", curHs.iconsAddress);
      hsImg.setAttribute("class", "mini-icon");
      subdiv.appendChild(hsImg);

      var hsP = document.createElement("P");
      hsP.setAttribute("class", "label2 notes");
      hsP.setAttribute("style", "margin:1rem");
      hsP.innerHTML = curHs.name;

      subdiv.appendChild(hsP);
      division.appendChild(subdiv);
    }
  }
}

class Hostel1 {
  constructor() {
    this.basicInfo;
  }

  createBasicInfo(
    hname,
    hline,
    cnum,
    oname,
    gender,
    type,
    strength,
    landmark,
    location
  ) {
    this.basicInfo = new BasicInfo1(
      hname,
      hline,
      cnum,
      oname,
      gender,
      type,
      strength,
      landmark,
      location
    );
  }

  createRoomDetails() {
    this.roomDetails = new RoomDetails();
  }

  createFoodDetails() {
    this.foodDetails = new FoodDetails();
  }

  createSpecializationsDetails() {
    this.specializations = new Specializations();
  }

  createHostelPoliciesDetails() {
    this.hostelPolicies = new HostelPolicies();
  }

  createRequirementsDetails() {
    this.requirements = new Requirements();
  }

  createHotspotsDetails() {
    this.hotspots = new Hotspots();
  }
}

// Data Modification Functions

function checkChange(direction, value) {
  switch (direction) {
    case 0:
      basicInfoChange(value);
      break;
    case 1:
      editHostel.roomDetails.createRoomObject();
      break;
    case 2:
      editHostel.foodDetails.updateFoodDetails();
      break;
    case 3:
      editHostel.specializations.updateSpecializationsDetails();
      break;
  }
}

function resetData() {}

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

// Full Data Objects
let editHostel = new Hostel1();

editHostel.createBasicInfo(
  "Feel Home Mess and Hostel",
  "Best Food Across the Location",
  "+91 8919847090",
  "Babai garu",
  "Male",
  "Public",
  110,
  "Vignan’s Foundation for Sciences, Technology and Research",
  "location"
);

editHostel.createRoomDetails();
editHostel.createFoodDetails();
editHostel.createSpecializationsDetails();
editHostel.createHostelPoliciesDetails();
editHostel.createRequirementsDetails();
editHostel.createHotspotsDetails();

//New State

// class HostelBasicInfo {
//   constructor() {}
// }

function dataConversion(obj, value) {
  switch (value) {
    case 0:
      obj = JSON.parse(obj);
      window.originalData.basicInfo = obj;
      window.modifiedData.basicInfo = obj;
      BasicInfo.updateBasicInfoUi();
      break;
    case 1:
      obj = JSON.parse(obj);
      window.originalData.foodInfo = obj;
      window.modifiedData.foodInfo = obj;
      FoodInfo.processFoodInfoData();
      break;
  }
}

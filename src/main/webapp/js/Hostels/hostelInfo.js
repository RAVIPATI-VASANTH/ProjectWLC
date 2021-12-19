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

var modifiedData = new Hostel();

//String Processing
function processString(s) {
  s = s.replaceAll("\r", "");
  s = s.replaceAll("\n", "");
  return s;
}

//Classes
class BasicInfo {
  static updateBasicInfoUi() {
    var hostel = window.modifiedData;
    //Title Tag
    document.getElementById("title-name").innerText = hostel.basicInfo.hname;
    //hostelname
    document.getElementById("view-hostel-name").innerHTML =
      hostel.basicInfo.hname;
    //headline
    document.getElementById("view-head-line").innerHTML =
      hostel.basicInfo.hheadline;
    //ownername
    document.getElementById("view-owner-name").innerHTML =
      hostel.basicInfo.honame;
    //ownercontact
    document.getElementById("view-owner-contact").innerHTML =
      hostel.basicInfo.hocontact;
    //strength
    document.getElementById("view-strength").innerHTML =
      hostel.basicInfo.hstrength;
    //hostel type
    if (hostel.basicInfo.htype === "public") {
      document.getElementById("view-type").innerHTML =
        "Public - Anyone can join";
    } else {
      document.getElementById("view-type").innerHTML =
        "Community - " + hostel.basicInfo.hcommunity;
    }
    //hostel gender
    if (hostel.basicInfo.hgender === "male") {
      document.getElementById("view-gender").innerHTML = "Gents";
      document.getElementById("gender").setAttribute("src", "images/male.svg");
    } else {
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
    this.updateFoodViewInfo();
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
}

class RoomInfo {
  static processRoomInfoData() {
    var list = [];
    var signal = true;
    var rawlist = window.modifiedData.roomInfo;
    if (rawlist.length === 0) {
      // console.log(rawlist);
      signal = false;
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
    window.modifiedData.roomInfo = list;
    if (signal) this.updateUi();
  }

  static emptyCondition() {
    console.log("called");
    var maindiv = document.getElementById("room-cards-section");

    var p = document.createElement("P");
    p.setAttribute("class", "no-data");
    p.innerText = "No Data";
    maindiv.append(p);
  }

  static updateUi() {
    var maindiv = document.getElementById("room-cards-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    window.modifiedData.roomInfo.forEach((element) => {
      this.createRoomCards(element);
    });
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
    var maindiv = document.getElementById("spec-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    this.updateViewUiOfPreListCards();
    window.modifiedData.specializationInfo.postList.forEach((element) => {
      this.createSpecializationCards(element);
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
      if (element.type !== "Un Available") {
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
      }
    });
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
    var maindiv = document.getElementById("hp-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    window.modifiedData.policyInfo.forEach((element) => {
      this.createPolicyCards(element);
    });
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
    var maindiv = document.getElementById("req-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }

    window.modifiedData.requirementInfo.forEach((element) => {
      this.createRequirementCards(element);
    });
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
    var maindiv = document.getElementById("hs-view-tags-section");
    while (maindiv.hasChildNodes()) {
      maindiv.removeChild(maindiv.firstChild);
    }
    window.modifiedData.hotspotInfo.forEach((element) => {
      this.createHotspotCards(element);
    });
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
}

function dataConversion(obj, value) {
  switch (value) {
    case 0:
      obj = JSON.parse(obj);
      window.modifiedData.basicInfo = obj.basicInfo;
      window.modifiedData.foodInfo = obj.foodInfo;
      window.modifiedData.roomInfo = obj.roomInfo;
      window.modifiedData.policyInfo = obj.policyInfo;
      window.modifiedData.hotspotInfo = obj.hotspotInfo;
      window.modifiedData.requirementInfo = obj.requirementInfo;
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
  $.post("HostelInfo", obj, function (data, status) {
    if (status === "success") {
      dataConversion(data, 0);
    } else {
      alert("Something Went Wrong..!!");
    }
  });
}

window.onload = function () {
  var hid = processString(document.getElementById("hostel-id").innerHTML);
  if (hid === "null") {
    window.location.assign("Login.jsp");
  } else {
    window.getHostelInfo(hid);
  }
};

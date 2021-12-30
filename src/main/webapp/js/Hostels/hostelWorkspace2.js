"use strict";
class SearchScore {
  static updateBasicInfoScore(obj) {
    var score = 0;
    //HostelName
    if (obj.hname.trim() !== "") score += 10;
    //Head Line
    if (obj.hheadline.trim() !== "") score += 10;
    //Owner Contact
    if (obj.hocontact.trim() !== "") score += 10;
    //Owner Name
    if (obj.honame.trim() !== "") score += 10;
    //Strength
    if (obj.hstrength.trim() !== "") score += 10;
    //Type
    if (obj.htype === "community") {
      if (obj.hcommunity.trim() !== "") score += 10;
    } else score += 10;
    //location
    if (obj.hlocation.trim() !== "") score += 10;
    return score;
  }

  static updateFoodInfoScore(obj) {
    var score = 0;
    //breakfast
    if (obj.breakfast !== "|||") {
      if (obj.breakfast.time.trim() !== "") score += 10;
      if (obj.breakfast.type.trim() !== "") score += 5;
      if (obj.breakfast.items.trim() !== "") score += 10;
    }
    //lunch
    if (obj.lunch !== "|||") {
      if (obj.lunch.time.trim() !== "") score += 10;
      if (obj.lunch.type.trim() !== "") score += 5;
      if (obj.lunch.items.trim() !== "") score += 10;
    }
    //snacks
    if (obj.snacks !== "|||") {
      if (obj.snacks.time.trim() !== "") score += 10;
      if (obj.snacks.type.trim() !== "") score += 5;
      if (obj.snacks.items.trim() !== "") score += 10;
    }
    //dinner
    if (obj.dinner !== "|||") {
      if (obj.dinner.time.trim() !== "") score += 10;
      if (obj.dinner.type.trim() !== "") score += 5;
      if (obj.dinner.items.trim() !== "") score += 10;
    }
    //non-veg
    if (obj.nonveg !== "||") {
      if (obj.nonveg.count.trim() !== "") score += 10;
      if (obj.nonveg.type.trim() !== "") score += 5;
      if (obj.nonveg.notes.trim() !== "") score += 10;
    }
    return score;
  }

  static updateRoomInfoScore(obj) {
    var score = 0;
    if (obj.length === 0) {
      return score;
    } else {
      obj.forEach((element) => {
        //Plan Name
        if (element.planname.trim() !== "") score += 10;
        //Room type
        if (element.bathroom.trim() !== "") score += 10;
        //Beds
        if (element.beds.trim() !== "") score += 10;
        //Stay and Food
        if (
          element.stayandfood.monthly.trim() !== "" ||
          element.stayandfood.semester.trim() !== "" ||
          element.stayandfood.annum.trim() !== ""
        )
          score += 10;
        //Stay Only
        if (
          element.stayonly.monthly.trim() !== "" ||
          element.stayonly.semester.trim() !== "" ||
          element.stayonly.annum.trim() !== ""
        )
          score += 10;
      });
      return score;
    }
  }

  static updateSpecializationInfoScore(obj) {
    var score = 0;
    if (obj !== []) {
      score += obj.preList.length * 5;
      score += obj.postList.length * 5;
    }
    return score;
  }

  static updateRequirementInfoScore(obj) {
    var score = 0;
    if (obj.length !== 0) {
      score += obj.length * 5;
    }
    return score;
  }

  static updateHotspotInfoScore(obj) {
    var score = 0;
    if (obj.length !== 0) {
      score += obj.length * 5;
    }
    return score;
  }
}

function isdigits(s) {
  var l = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  for (var i = 0; i < s.length; i++) {
    if (!l.includes(i)) {
      return false;
    }
  }
  return true;
}

class CommitValidation {
  static startvalidation(obj) {
    var value = this.validateBasicInfo(obj.basicInfo);
    if (value) {
      value = this.validateRoomInfo(obj.roomInfo);
    }
    if (value) {
      value = this.validateFoodInfo(obj.foodInfo);
    }
    if (value) {
      value = this.validateSpecializationInfo(obj.specializationInfo);
    }
    if (value) {
      value = this.validatePolicyInfo(obj.policyInfo);
    }
    if (value) {
      value = this.validateRequirements(obj.requirementInfo);
    }
    if (value) {
      value = this.validateHotspots(obj.hotspotInfo);
    }
    obj.basicInfo.hsearchscore = String(obj.searchScore);
    if (value) {
      value = ForSeparator.start(obj);
    }
    if (value) ProcessData.start(obj);
  }

  static validateBasicInfo(obj) {
    var signal = false;
    //HostelName
    if (obj.hname.trim().length === 0) {
      alert("Hostel Name is not to be Empty");
      signal = true;
    }
    if (obj.hname.trim().length > 40) {
      alert("Hostel Name should not be exceed 40 charecters");
      signal = true;
    }
    //Type
    if (obj.htype === "community") {
      if (obj.hcommunity.trim().length > 12) {
        alert("Community Name should not be Exceed 12 charecters");
        signal = true;
      }
      if (obj.hcommunity.trim().length === 0) {
        alert("Community is not to be empty.");
        signal = true;
      }
    } else {
      obj.hcommunity = "";
    }
    //Headline
    if (obj.hheadline.trim().length > 55) {
      alert("Head Line should not be exceed 55 charecters");
      signal = true;
    }
    //Owner Name
    if (obj.honame.trim().length === 0) {
      alert("Owner Name is not to be Empty");
      signal = true;
    }
    if (obj.honame.trim().length > 20) {
      alert("Hostel Name should not be exceed 20 charecters");
      signal = true;
    }

    // let regex = new RegExp(/^[0-9]{10}$/);

    //Owner Contact
    if (obj.hocontact.trim().length === 0) {
      alert("Owner Contact is not to be Empty");
      signal = true;
    }
    if (obj.hocontact.trim().length !== 10) {
      alert("Owner Contact should be allowed 10 digits");
      signal = true;
    }

    //Strength
    if (obj.hstrength.trim().length === 0) {
      alert("Strength is not to be Empty");
      signal = true;
    }
    if (obj.hstrength.trim().length > 20) {
      alert("Strength should not be exceed 20 charecters");
      signal = true;
    }
    var words = obj.hstrength.trim().split("-");
    if (words.length !== 3) {
      alert("Please enter correct Format for CVQ field.");
      signal = true;
    }
    //Location
    if (!obj.hlocation.trim().includes("www.google.com/maps")) {
      alert("Location Link is not a valid link");
      signal = true;
    }
    if (signal) return false;
    else return true;
  }

  static validateRoomInfo(obj) {
    var signal = false;
    obj.forEach((element) => {
      //plan name
      if (element.planname.trim().length > 10) {
        alert(
          "Plan name for card " +
            element.planname +
            " should not be morethan 10 charecters"
        );
        signal = true;
      }

      if (element.planname.trim().includes(",")) {
        alert("Plan name shouldnot includes comma ',' for " + element.planname);
        signal = true;
      }
      //bathroom
      if (element.bathroom.trim().length === 0) {
        alert("Please select Bath room type in card " + element.planname);
        signal = true;
      }
      //beds
      if (element.beds.trim().length === 0) {
        alert("Please enter beds count for card " + element.planname);
        signal = true;
      }
      if (element.beds.trim().length > 10) {
        alert(
          "Plan name for card " +
            element.planname +
            " bed count should not be morethan 10 charecters"
        );
        signal = true;
      }
      if (element.beds.trim().includes(",")) {
        alert(
          "Plan name for card " +
            element.planname +
            " bed count shouldnot include comma ','"
        );
      }
      //Stay and Food
      if (
        element.stayandfood.monthly.trim() === "" &&
        element.stayandfood.semester.trim() === "" &&
        element.stayandfood.annum.trim() === "" &&
        element.stayonly.monthly.trim() === "" &&
        element.stayonly.semester.trim() === "" &&
        element.stayonly.annum.trim() === ""
      ) {
        alert(
          "Please Enter atleast one Payment Method Information for card " +
            element.planname
        );
        signal = true;
      }
      if (
        element.stayandfood.monthly.trim().length > 10 ||
        element.stayandfood.semester.trim().length > 10 ||
        element.stayandfood.annum.trim().length > 10 ||
        element.stayonly.monthly.trim().length > 10 ||
        element.stayonly.semester.trim().length > 10 ||
        element.stayonly.annum.trim().length > 10
      ) {
        alert(
          "Payment Methods digits are should be less than 10 for card " +
            element.planname
        );
        signal = true;
      }
      if (
        element.stayandfood.monthly.trim().includes(",") ||
        element.stayandfood.semester.trim().includes(",") ||
        element.stayandfood.annum.trim().includes(",") ||
        element.stayonly.monthly.trim().includes(",") ||
        element.stayonly.semester.trim().includes(",") ||
        element.stayonly.annum.trim().includes(",")
      ) {
        alert(
          "Payment Methods shouldnot contains comma ','" + element.planname
        );
        signal = true;
      }
      //Notes
      if (element.notes.trim().length > 150) {
        alert(
          "Plan name for card " +
            element.planname +
            " Notes should not be morethan 150 charecters"
        );
        signal = true;
      }
      if (element.notes.trim().includes(",")) {
        alert(
          "Plan name for card " +
            element.planname +
            " Notes shouldnot contain comma ','"
        );
        signal = true;
      }
    });
    if (signal) return false;
    else return true;
  }

  static validateFoodInfo(obj) {
    var signal = false;
    //breakfast
    if (obj.breakfast.items.trim().length > 150) {
      alert("Items List In Break Fast should not exceed 150 charecters.");
      signal = true;
    }
    if (obj.breakfast.notes.trim().length > 300) {
      alert("Notes In Break Fast should not exceed 300 charecters.");
      signal = true;
    }
    //Lunch
    if (obj.lunch.items.trim().length > 150) {
      alert("Items List In Lunch should not exceed 150 charecters.");
      signal = true;
    }
    if (obj.lunch.notes.trim().length > 300) {
      alert("Notes In Lunch should not exceed 300 charecters.");
      signal = true;
    }
    //Snacks
    if (obj.snacks.items.trim().length > 150) {
      alert("Items List In Snacks should not exceed 150 charecters.");
      signal = true;
    }
    if (obj.snacks.notes.trim().length > 300) {
      alert("Notes In Snacks should not exceed 300 charecters.");
      signal = true;
    }
    //Dinner
    if (obj.dinner.items.trim().length > 150) {
      alert("Items List In Dinner should not exceed 150 charecters.");
      signal = true;
    }
    if (obj.dinner.notes.trim().length > 300) {
      alert("Notes In Dinner should not exceed 300 charecters.");
      signal = true;
    }
    //Non-veg
    if (obj.nonveg.count.trim().length > 10) {
      alert("Non Veg Count should not be exceed 10");
      signal = true;
    }
    if (obj.nonveg.notes.trim().length > 450) {
      alert("Notes In Dinner should not exceed 450 charecters.");
      signal = true;
    }
    if (signal) return false;
    else return true;
  }

  static validateSpecializationInfo(obj) {
    var signal = false;
    obj.preList.forEach((element) => {
      if (element.type === "Pay And Use") {
        if (element.amount === "") {
          alert(
            "For Specialization " + element.specname + " Amount is required."
          );
          signal = true;
        } else if (element.amount.length > 10) {
          alert(
            "For Specialization " +
              element.specname +
              " Amount is not to be exceed 10 digits."
          );
          signal = true;
        } else if (element.amount.includes(",")) {
          alert(
            "For Specialization " +
              element.specname +
              " Amount shouldnot contain comma ','."
          );
          signal = true;
        }
      }
      if (element.notes.length > 80) {
        alert(
          "For Specialization " +
            element.specname +
            " Notes is not to be exceed 80 charecters"
        );
        signal = true;
      }
      if (element.notes.includes(",")) {
        alert(
          "For Specialization " +
            element.specname +
            " Notes shouldnot contain comma','"
        );
        signal = true;
      }
    });
    obj.postList.forEach((element) => {
      if (element.specname.length > 145) {
        alert(
          "For Specialization " +
            element.specname +
            " is not be exceed 145 charecters"
        );
        signal = true;
      }
      if (element.specname.includes(",")) {
        alert(
          "For Specialization " +
            element.specname +
            " shouldnot contain comma ','"
        );
        signal = true;
      }
    });
    if (signal) return false;
    else return true;
  }

  static validatePolicyInfo(obj) {
    var signal = false;
    obj.forEach((element) => {
      if (element.policy.length > 145) {
        alert(
          "Policy is not to be exceed 145 charecters for " + element.tagname
        );
        signal = true;
      }
      if (element.policy.includes(",")) {
        alert("Policy is shouldnot contain comma ',' for " + element.policy);
        signal = true;
      }
    });
    if (signal) return false;
    else return true;
  }

  static validateRequirements(obj) {
    var signal = false;
    obj.forEach((element) => {
      if (element.requirement.length > 70) {
        alert(
          "Requirement name is not to be exceed 70 charecters for " +
            element.tagname
        );
        signal = true;
      }
      if (element.requirement.includes(",")) {
        alert(
          "Requirement name shouldnot contain ',' for " + element.requirement
        );
        signal = true;
      }
    });
    if (signal) return false;
    else return true;
  }

  static validateHotspots(obj) {
    var signal = false;
    obj.forEach((element) => {
      if (element.hotspot.length > 70) {
        alert(
          "Hotspot name is not to be exceed 70 charecters for " +
            element.tagname
        );
        signal = true;
      }
      if (element.hotspot.includes(",")) {
        alert("Hotspot name shouldnot contain comma',' for " + element.hotspot);
        signal = true;
      }
    });
    if (signal) return false;
    else return true;
  }
}

function sendCommitData(obj) {
  // console.log(obj.specializationInfo);
  // console.log(obj.requirementInfo);
  console.log(obj);
  $.post(
    "HostelWorkspaceCommit",
    {
      basicInfo: JSON.stringify(obj.basicInfo),
      foodInfo: JSON.stringify(obj.foodInfo),
      roomInfo: JSON.stringify(obj.roomInfo),
      policyInfo: JSON.stringify(obj.policyInfo),
      hotspotInfo: JSON.stringify(obj.hotspotInfo),
      requirementInfo: JSON.stringify(obj.requirementInfo),
      specializationInfo: JSON.stringify(obj.specializationInfo),
    },
    function (data, status) {
      if (status === "success") {
        alert("Data Committed Successfully.");
      } else {
        alert("Something Went Wrong..!!");
      }
    }
  );
  alert("Please wait for response dont close the window or tab.");
}

class ForSeparator {
  static start(obj) {
    var value = false;
    value = this.checkFoodInfo(obj.foodInfo);
    if (value) {
      value = this.checkRoomInfo(obj.roomInfo);
    }
    if (value) {
      value = this.checkSpecInfo(obj.specializationInfo);
    }
    if (value) {
      value = this.checkReqInfo(obj.requirementInfo);
    }
    if (value) {
      value = this.checkHotspotInfo(obj.hotspotInfo);
    }
    return value;
  }

  static checkFoodInfo(obj) {
    var value = false;
    // breakfast
    if (obj.breakfast.items.includes("|")) {
      alert("In Breakfast items You are not Allowed to use Charecter '|'");
      value = true;
    }
    if (obj.breakfast.notes.includes("|")) {
      alert("In Breakfast Notes You are not Allowed to use Charecter '|'");
      value = true;
    }
    // Lunch
    if (obj.lunch.items.includes("|")) {
      alert("In Lunch items You are not Allowed to use Charecter '|'");
      value = true;
    }
    if (obj.lunch.notes.includes("|")) {
      alert("In Lunch Notes You are not Allowed to use Charecter '|'");
      value = true;
    }
    // snacks
    if (obj.snacks.items.includes("|")) {
      alert("In Snacks items You are not Allowed to use Charecter '|'");
      value = true;
    }
    if (obj.breakfast.notes.includes("|")) {
      alert("In Snacks Notes You are not Allowed to use Charecter '|'");
      value = true;
    }
    // Dinner
    if (obj.dinner.items.includes("|")) {
      alert("In Dinner items You are not Allowed to use Charecter '|'");
      value = true;
    }
    if (obj.dinner.notes.includes("|")) {
      alert("In Dinner Notes You are not Allowed to use Charecter '|'");
      value = true;
    }
    // nonveg
    if (obj.nonveg.count.includes("|")) {
      alert("In Nonveg Count You are not Allowed to use Charecter '|'");
      value = true;
    }
    if (obj.nonveg.notes.includes("|")) {
      alert("In Nonveg Notes You are not Allowed to use Charecter '|'");
      value = true;
    }
    if (value) return false;
    else return true;
  }

  static checkRoomInfo(obj) {
    var value = false;
    obj.forEach((element) => {
      //plan Name
      if (element.planname.includes("|")) {
        alert(
          "For Room Card " +
            element.planname +
            " planname should not contain'|'"
        );
        value = true;
      }
      //beds
      if (element.beds.includes("|")) {
        alert(
          "For Room Card " + element.planname + " beds should not contain'|'"
        );
        value = true;
      }
      //room plans
      if (
        element.stayandfood.monthly.includes("|") ||
        element.stayandfood.semester.includes("|") ||
        element.stayandfood.annum.includes("|") ||
        element.stayonly.monthly.includes("|") ||
        element.stayonly.semester.includes("|") ||
        element.stayonly.annum.includes("|") ||
        element.stayandfood.monthly.includes("-") ||
        element.stayandfood.semester.includes("-") ||
        element.stayandfood.annum.includes("-") ||
        element.stayonly.monthly.includes("-") ||
        element.stayonly.semester.includes("-") ||
        element.stayonly.annum.includes("-")
      ) {
        alert(
          "Payment Methods for " +
            element.planname +
            " should not allowed to use '|' or '-' charecters"
        );
        value = true;
      }
      //notes
      if (element.notes.includes("|")) {
        alert(
          "For Room Card " + element.planname + " notes should not contain'|'"
        );
        value = true;
      }
    });
    if (value) return false;
    else return true;
  }

  static checkSpecInfo(obj) {
    var value = false;

    obj.preList.forEach((element) => {
      //amount
      if (element.amount.includes("|")) {
        alert(
          "For " +
            element.specname +
            " amount should not contains '|' charecter."
        );
        value = true;
      }
      //notes
      if (element.notes.includes("|")) {
        alert(
          "For " +
            element.specname +
            " Notes should not contains '|' charecter."
        );
        value = true;
      }
    });
    obj.postList.forEach((element) => {
      //specname
      if (element.specname.includes("|")) {
        alert(
          "For " +
            element.specname +
            " Notes should not contains '|' charecter."
        );
        value = true;
      }
    });
    if (value) return false;
    else return true;
  }

  static checkReqInfo(obj) {
    var value = false;
    obj.forEach((element) => {
      if (element.requirement.includes("|")) {
        alert(
          "For " +
            element.requirement +
            " should not allowed to use '|' charecter"
        );
        value = true;
      }
    });
    if (value) return false;
    else return true;
  }

  static checkHotspotInfo(obj) {
    var value = false;
    obj.forEach((element) => {
      if (element.hotspot.includes("|")) {
        alert(
          "For " + element.hotspot + " should not allowed to use '|' charecter"
        );
        value = true;
      }
    });
    if (value) return false;
    else return true;
  }
}

class ProcessData {
  static start(obj) {
    var basicObj = this.processBasicInfo(obj.basicInfo);
    var foodObj = this.processFoodInfo(obj.foodInfo);
    var roomObj = this.processRoomInfo(obj.roomInfo);
    var specObj = this.processSpecInfo(obj.specializationInfo);
    var policyObj = this.processPolicyInfo(obj.policyInfo);
    var reqObj = this.processReqInfo(obj.requirementInfo);
    var hotspotObj = this.processHotspotInfo(obj.hotspotInfo);
    var processedData = {
      basicInfo: basicObj,
      foodInfo: foodObj,
      roomInfo: roomObj,
      policyInfo: policyObj,
      hotspotInfo: hotspotObj,
      requirementInfo: reqObj,
      specializationInfo: specObj,
    };
    sendCommitData(processedData);
  }

  static processBasicInfo(obj) {
    return obj;
  }

  static processFoodInfo(obj) {
    var food = {
      breakfast: "",
      lunch: "",
      snacks: "",
      dinner: "",
      nonveg: "",
    };
    var bftext =
      obj.breakfast.time +
      "|" +
      obj.breakfast.type +
      "|" +
      obj.breakfast.items +
      "|" +
      obj.breakfast.notes;
    var ltext =
      obj.lunch.time +
      "|" +
      obj.lunch.type +
      "|" +
      obj.lunch.items +
      "|" +
      obj.lunch.notes;
    var stext =
      obj.snacks.time +
      "|" +
      obj.snacks.type +
      "|" +
      obj.snacks.items +
      "|" +
      obj.snacks.notes;
    var dtext =
      obj.dinner.time +
      "|" +
      obj.dinner.type +
      "|" +
      obj.dinner.items +
      "|" +
      obj.dinner.notes;
    var ntext =
      obj.nonveg.count + "|" + obj.nonveg.type + "|" + obj.nonveg.notes;

    food.breakfast = bftext;
    food.lunch = ltext;
    food.snacks = stext;
    food.dinner = dtext;
    food.nonveg = ntext;

    return food;
  }

  static processRoomInfo(obj) {
    var list = [];
    obj.forEach((element) => {
      var text =
        element.planname +
        "|" +
        element.type +
        "|" +
        element.bathroom +
        "|" +
        element.beds +
        "|" +
        element.stayandfood.monthly +
        "-" +
        element.stayandfood.semester +
        "-" +
        element.stayandfood.annum +
        "|" +
        element.stayonly.monthly +
        "-" +
        element.stayonly.semester +
        "-" +
        element.stayonly.annum +
        "|" +
        element.notes;
      list.push(text);
    });
    return list;
  }

  static processSpecInfo(obj) {
    var list = [];
    obj.preList.forEach((element) => {
      var text =
        element.specname +
        "|" +
        element.type +
        "|" +
        element.planname +
        "|" +
        element.amount +
        "|" +
        element.notes;
      list.push(text);
    });
    obj.postList.forEach((element) => {
      var text = element.specname;
      list.push(text);
    });
    return list;
  }

  static processPolicyInfo(obj) {
    var list = [];
    obj.forEach((element) => {
      list.push(element.policy);
    });
    return list;
  }

  static processReqInfo(obj) {
    var list = [];
    obj.forEach((element) => {
      var text = element.type + "|" + element.requirement;
      list.push(text);
    });
    return list;
  }

  static processHotspotInfo(obj) {
    var list = [];
    obj.forEach((element) => {
      var text = element.type + "|" + element.hotspot;
      list.push(text);
    });
    return list;
  }
}

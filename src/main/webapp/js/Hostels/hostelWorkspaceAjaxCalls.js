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
window.onload = function () {
  var hid = String(document.getElementById("hostel-id").innerHTML).replace(
    /[\r\n]+/gm,
    ""
  );
  getHostelBasicInfo(hid);
  getHostelFoodInfo(hid);
};

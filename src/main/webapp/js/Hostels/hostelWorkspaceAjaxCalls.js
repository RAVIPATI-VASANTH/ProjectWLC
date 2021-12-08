function getHostelBasicInfo(hid) {
  var hid = String(document.getElementById("hostel-id").innerHTML).replace(
    /[\r\n]+/gm,
    ""
  );
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
  var hid = String(document.getElementById("hostel-id").innerHTML);
  getHostelBasicInfo(hid);
};

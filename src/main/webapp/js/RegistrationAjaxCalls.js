function sendNewHostelData() {
  console.log(obj.oname);
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
      hpassword: obj.hpassword,
    },
    function (data, status) {
      if (status === "success") {
          //window.location.assign("Registration.jsp");
    // console.log(data);
      }
    }
  );
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

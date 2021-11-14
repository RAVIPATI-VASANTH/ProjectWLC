$("#ajaxcall").click(function () {
  var obj = createLandmark();
  if (obj !== false) {
    $.post(
      "hostelRegister",
      {
        signal: 1,
        name: obj.name,
        des: obj.des,
      },
      function (data, status) {
        if (status == "success") {
          // window.location.assign("hostelWorkspace.jsp");
        }
      }
    );
  }
});

// let obj={
//   hname="",
//   oname="",
//   ocontact="",
//   hgender="",
//   htype="",
//   hcommunityname="",
//   hlandmark="",
//   hlocation="",
//   hid="",
//   hpassword=""
// }

// let objsignal={
//   hname=false,
//   oname=false,
//   ocontact=false,
//   hgender=false,
//   htype=false,
//   hcommunityname=false,
//   hlandmark=false,
//   hlocation=false,
//   hid=false,
//   hpassword=false
// }

// VFSTR
// Vignan Foundation of Sciences of Technology and Research

function getLandmarks() {
  $.get("hostelRegister", {
    signal: 1,
  });
}

window.onload = function () {
  getLandmarks();
};

/*$("#ajaxcall").click(function () {
  var obj = createLandmark();
  if (obj !== false) {
    $.post(
      "hostelRegister",
      {
        signal: 1,
		id:obj.id,
        name: obj.name,
        des: obj.des,
        mcode: obj.minicode,
      },
      function (data, status) {
        if (status === "success") {
            //window.location.assign("Registration.jsp");
			consol.log(data);
        }
      }
    );
  }
});
*/
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

function validateLoginDetails() {
  var signal = true;
  var id = document.getElementById("hostel-id").value.trim();
  var pass = document.getElementById("login-password").value.trim();
  if (id.length === 0) {
    alert("Hostel-Id Required.");
    signal = false;
  }
  if (pass.length === 0) {
    alert("Password Required.");
    signal = false;
  }
  if (signal) {
    var signal = false;
    var obj = {
      signal: 0,
      hid: id,
      password: pass,
    };
    console.log(obj);
    $.post("hostelLogin", obj, function (data, status) {
      if (status === "success") {
        console.log(data);
        console.log(Number(data));
        if (Number(data) == 0) {
          alert("The entered Hostel-Id or Password is Inavlid.");
        } else {
          window.location.assign("hostelWorkspace.jsp");
        }
      } else {
        alert("Something Went Wrong..!!");
      }
    });
  }
}

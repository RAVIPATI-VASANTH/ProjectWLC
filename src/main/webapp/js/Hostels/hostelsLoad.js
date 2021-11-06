function loadDoc() {
  const xhttp = new XMLHttpRequest();
  console.log("called");
  xhttp.onload = function () {
    document.getElementById("demo").innerHTML = this.responseText;
  };
  xhttp.open("GET", "allHostels", true);
  xhttp.send();
}

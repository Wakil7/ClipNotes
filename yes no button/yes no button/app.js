window.onload = function () {
  var modal = document.getElementById("myModal");
  var yesBtn = document.getElementById("yesBtn");
  var noBtn = document.getElementById("noBtn");

  modal.style.display = "block";

  yesBtn.onclick = function () {
    modal.style.display = "none";
    console.log("User confirmed!");
  };

  noBtn.onclick = function () {
    modal.style.display = "none";
    console.log("User canceled!");
  };
};

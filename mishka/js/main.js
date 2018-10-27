;(function(){
  var button = document.querySelector(".toggle-button");
  var mobileMenu = document.querySelectorAll(".page-header__list");
  var header = document.querySelector(".page-header");

  header.classList.remove("no-js");

  var onToggleButtonCloseClick = function() {
    mobileMenu.forEach(function (it) {
      it.style = "";
    });
    button.classList.toggle("toggle-button--open");
    button.removeEventListener('click', onToggleButtonCloseClick);
    button.addEventListener('click', onToggleButtonOpenClick);
  };
  var onToggleButtonOpenClick =  function() {
    mobileMenu.forEach(function (it) {
      it.style.display = "flex";
    });
    button.classList.toggle("toggle-button--open");
    button.removeEventListener('click', onToggleButtonOpenClick);
    button.addEventListener('click', onToggleButtonCloseClick);
  };
  button.addEventListener('click', onToggleButtonOpenClick);
})();

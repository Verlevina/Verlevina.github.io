;(function(){
  var ESC_KEYCODE = 27;
  var button = document.querySelectorAll(".js-open-modal");
  var modal = document.querySelector(".js-modal");

  var onEscKeycodePress = function (evnt) {
    if (evnt.keyCode === ESC_KEYCODE) {
      evnt.preventDefault();
      document.removeEventListener('keydown', onEscKeycodePress);
      modal.style = '';
    }
  };


  var openModal = function() {
    modal.style.display = 'block';
    document.addEventListener('keydown', onEscKeycodePress);
  };

  button.forEach(function(it) {
    it.addEventListener('click', function(evnt) {
      evnt.preventDefault();
      openModal(evnt);
    })
  })
})();

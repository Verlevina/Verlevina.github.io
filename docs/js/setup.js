'use strict';
(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupUserName = setup.querySelector('.setup-user-name');
  var userWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var userWizardEyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = setup.querySelector('.setup-fireball-wrap');
  var userCoatColorInput = setup.querySelector('[name="coat-color"]');
  var userEyesColorInput = setup.querySelector('[name="eyes-color"]');
  var userFireballColorInput = setup.querySelector('[name="fireball-color"]');
  // var NAMES = [
  //   'Иван',
  //   'Хуан Себастьян',
  //   'Мария',
  //   'Кристоф',
  //   'Виктор',
  //   'Юлия',
  //   'Люпита',
  //   'Вашингтон'];
  // var LAST_NAMES = [
  //   'да Марья',
  //   'Верон',
  //   'Мирабелла',
  //   'Вальц',
  //   'Онопко',
  //   'Топольницкая',
  //   'Нионго',
  //   'Ирвинг'
  // ];
  var COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var setupDialogElement = document.querySelector('.setup');

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  // рандомное число

  var getRandomNumbers = function (quantity) {
    return Math.floor(Math.random() * quantity);
  };

  // var getWizardName = function () {
  //   var wizardName;
  //   if (getRandomNumbers(2)) {
  //     wizardName = NAMES[getRandomNumbers(NAMES.length)] + ' ' + LAST_NAMES[getRandomNumbers(LAST_NAMES.length)];
  //   } else {
  //     wizardName = LAST_NAMES[getRandomNumbers(LAST_NAMES.length)] + ' ' + NAMES[getRandomNumbers(NAMES.length)];
  //   }
  //   return wizardName;
  // };
  // функция, котторая выдает рандомное значение из данного массивы
  var getRandomValueFromArray = function (array) {
    return array[getRandomNumbers(array.length)];
  };
  // создание объекта данных

  var getWizards = function () {
  //  var formWisard = document.querySelector('.setup-wizard-form');
    var onLoadLoad = function (response) {


      drawWizards(response);

    };
    var onErrorLoad = function (error) {
      window.backend.renderErrorMessage(error);
    };
    window.backend.load(/* new FormData(formWisard),*/11, onLoadLoad, onErrorLoad);
    // for (var i = 0; i < 4; i++) {
    //   wizards[i] = {};
    //   wizards[i].name = getWizardName();
    //   wizards[i].coatColor = getRandomValueFromArray(COLORS);
    //   wizards[i].eyesColor = getRandomValueFromArray(EYES_COLORS);
    // }
  };
  getWizards();

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');


  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };
  var drawWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[getRandomNumbers(wizards.length - 1)]));
    }
    similarListElement.appendChild(fragment);
  };
  // показываем блок SETUP

  var showSetup = function () {

    setup.classList.remove('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var hideSetup = function () {
    setupDialogElement.style = '';
    setup.classList.add('hidden');
  };
  setup.querySelector('.setup-similar').classList.remove('hidden');

  // Открытие/закрытие окна настройки персонажа:
  // обработчик нажатия на esc
  var onPopupEscPress = function (evnt) {
    if (evnt.keyCode === ESC_KEYCODE) {
      hideSetup();
    }
  };
  // при фокусе на вводе имени волшебника
  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onPopupEscPress);
  });
  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onPopupEscPress);
  });

  var openPopup = function () {
    showSetup();
    document.addEventListener('keydown', onPopupEscPress);
    // Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно приводить к
    // закрытию диалога
    setupClose.addEventListener('keydown', function (evnt) {
      if (evnt.keyCode === ENTER_KEYCODE) {
        hideSetup();
      }
    });
    // Если диалог открыт, нажатие на кнопку «Сохранить» приводит к отправке формы

  };

  setupOpen.addEventListener('click', function () {
    openPopup();

    var formWizard = document.querySelector('.setup-wizard-form');
    // отправка формы


    formWizard.addEventListener('submit', function (evt) {
      var onLoad = function () {
        hideSetup();
      };
      var onError = function (error) {
        window.backend.renderErrorMessage(error);
      };


      window.backend.save(new FormData(formWizard), onLoad, onError);
      evt.preventDefault();
    });

  });
  // при клике на аватар открывает попап и обрабатываем события нажатия на esc
  setupClose.addEventListener('click', function () {
    hideSetup();
  });

  setupOpenIcon.addEventListener('keydown', function (evnt) {
    if (evnt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  // Изменение цвета мантии персонажа по нажатию.
  // переписывает цвет и значение инпута передаваемых элементов
  var writeColorOfElementUserWizard = function (arrayOfColors, element, input) {
    var color = getRandomValueFromArray(arrayOfColors);
    if (element.tagName === 'use') {
      element.style.fill = color;
    } else {
      element.style.backgroundColor = color;
    }
    input.value = color;
  };
  userWizardCoat.addEventListener('click', function () {
    writeColorOfElementUserWizard(COLORS, userWizardCoat, userCoatColorInput);
  });
  userWizardEyesColor.addEventListener('click', function () {
    writeColorOfElementUserWizard(EYES_COLORS, userWizardEyesColor, userEyesColorInput);
  });
  setupFireball.addEventListener('click', function () {
    writeColorOfElementUserWizard(FIREBALL_COLORS, setupFireball, userFireballColorInput);
  });
})();

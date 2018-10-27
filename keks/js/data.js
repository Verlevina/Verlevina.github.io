'use strict';
(function () {
  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];
  // Создайте массив, состоящий из 25 сгенерированных JS объектов, которые будут описывать фотографии, размещённые другими пользователями:
  var getRandomNumber = function (max, min, isFor) {
    if (typeof (min) === 'undefined') {
      min = 0;
    }
    if (typeof (min) === 'boolean') {
      isFor = min;
      min = 0;
    }

    return !isFor ? Math.floor(Math.random() * (max - min) + min) : Math.ceil(Math.random() * (max - min) + min);
  };

  window.data = {
    getDescription: function () {
      return DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)];
    },
    // url avatar
    getAvatarUrl: function () {
      return 'img/avatar-' + getRandomNumber(6, true) + '.svg';
    },
  };
})();


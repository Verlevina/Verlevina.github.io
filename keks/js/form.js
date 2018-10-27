'use strict';
(function () {
// максимальное значение input, хранящего текущую глубину эффекта
  var EFFECT_DEEP_CONTROL_MAX = 100;
  var EFFECT_DEEP_CONTROL_MIN = 0;
  //  объект со шкалой глубин эффектов фотто
  var DEEP_EFFECTS = [
    {
      name: 'chrome',
      value: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },
    {
      name: 'sepia',
      value: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },
    {
      name: 'marvin',
      value: 'invert',
      min: 1,
      max: 100,
      unit: '%'
    },
    {
      name: 'phobos',
      value: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },
    {
      name: 'heat',
      value: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    }
  ];
  var MAX_HASHTAGS_QUANTITY = 5;
  var MAX_HASTAG_LENGTH = 20;
  var MIN_HASHTAGS_LENGTH = 1;
  var PX = 'px';
  var PERCENT = '%';
  var HASHTAG = '#';
  var SCALE_STEP = 25;
  var MIN_SCALE_CONTROL_VALUE = 25;
  var MAX_SCALE_CONTROL_VALUE = 100;
  // поле редактирования изображения
  window.form = {imgUploadOverlay: document.querySelector('.img-upload__overlay')};
  var fileUploadControl = document.querySelector('#upload-file');
  // кнопка закрытия редактирования изображения
  var imgUploadCancel = document.querySelector('.img-upload__cancel');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevel = window.form.imgUploadOverlay.querySelector('.img-upload__effect-level');
  // форма загрузки фото
  window.form.imgUploadForm = document.querySelector('.img-upload__form');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectsRadio = window.form.imgUploadOverlay.querySelectorAll('.effects__radio');
  // инпут со значением глубины эффекта
  var effectLevelValue = window.form.imgUploadOverlay.querySelector('.effect-level__value');
  // 1.3. Выбор изображения для загрузки осуществляется с помощью стандартного контрола загрузки файла #upload-file,
  // который стилизован под букву «О» в логотипе. После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения.
  // начальные условия
  effectsRadio[0].checked = true;
  window.util.hideElements(imgUploadEffectLevel);
  // функция, обрезающая проценты и писксели
  var deleteDimension = function (value) {
    if (value.slice(-PX.length) === PX) {
      return value.slice(0, -2);
    }
    if (value.slice(-PERCENT.length) === PERCENT) {
      return value.slice(0, -1);
    }
    return false;
  };
  // закрываем форму
  var onDocumentPressESC = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeFileUpload();
    }
  };
  fileUploadControl.addEventListener('change', function (evt) {
    document.removeEventListener('keydown', window.gallery.onDocumentEnterPress);
    window.util.showElements(window.form.imgUploadOverlay);
    document.addEventListener('keydown', onDocumentPressESC);
    // загружаем наше изображение в превью
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', function (readerEvt) {
      imgUploadPreview.src = readerEvt.target.result;
    });
  });


  window.form.clearStyleAndClass = function () {
    imgUploadPreview.style = '';
    imgUploadPreview.className = '';
    effectsRadio[0].checked = true;
    window.util.hideElements(imgUploadEffectLevel);
  };
  // закрытие формы редактировония изображения
  var closeFileUpload = function () {
    document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
    window.form.clearStyleAndClass();
    window.util.hideElements(window.form.imgUploadOverlay);
    window.form.imgUploadForm.reset();
    document.removeEventListener('keydown', onDocumentPressESC);
  };

  imgUploadCancel.addEventListener('click', closeFileUpload);
  // 2. Редактирование изображения и ограничения, накладываемые на поля
  // 2.1. Масштаб:
  // При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля
  // .scale__control--value.
  var scaleControlSmaller = window.form.imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleControlBigger = window.form.imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleControlValue = window.form.imgUploadOverlay.querySelector('.scale__control--value');

  var getScaleControlValue = function () {
    var value = scaleControlValue.value;
    var quantity = value.slice(0, value.length - 1);
    return +quantity;
  };
  // добавляем эффект масштаба
  var addScaleImgUploadPreview = function () {
    imgUploadPreview.style.transform = 'scale(' + getScaleControlValue() / 100 + ')';
  };
  //  При изменении значения поля .scale__control--value изображению .img-upload__preview должен добавляться
  // соответствующий стиль CSS, который с помощью трансформации
  // задаёт масштаб. Например, если в поле
  // стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75)
  scaleControlSmaller.addEventListener('click', function () {
    scaleControlValue.value = (getScaleControlValue() - SCALE_STEP) + PERCENT;
    if (getScaleControlValue() <= MIN_SCALE_CONTROL_VALUE) {
      scaleControlValue.value = MIN_SCALE_CONTROL_VALUE + PERCENT;
    }
    addScaleImgUploadPreview();
  });

  scaleControlBigger.addEventListener('click', function () {
    scaleControlValue.value = (getScaleControlValue() + SCALE_STEP) + PERCENT;
    if (getScaleControlValue() >= MAX_SCALE_CONTROL_VALUE) {
      scaleControlValue.value = MAX_SCALE_CONTROL_VALUE + PERCENT;
    }
    addScaleImgUploadPreview();
  });

  // 2.2. Наложение эффекта на изображение:
  // список радио
  // поиск выбранного radiobutton и выбор эффекта
  var findSelectedEffect = function () {
    var selectedEffectsRadio = window.form.imgUploadOverlay.querySelector('.effects__radio:checked');
    return (selectedEffectsRadio.id).slice(7);
  };
  // Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .scale__value
  // поиск реального значения глубины эффекта относительно input
  var calculateCurrentDeepEffect = function (effectObject) {
    var deepEffect = ((+effectLevelValue.value) * (effectObject.max - effectObject.min) / EFFECT_DEEP_CONTROL_MAX) + effectObject.min;
    return deepEffect;
  };

  // 2.2. Наложение эффекта на изображение:
  var effectLevelPin = window.form.imgUploadOverlay.querySelector('.effect-level__pin');
  var selectedEffect = findSelectedEffect();


  var changeDeepOfEffect = function () {
    // effectLevelValue.addEventListener('change', function () {
    // document.querySelector('.img-upload__effect-level').addEventListener('click', function () {
    var effect = findSelectedEffect();
    for (var i = 0; i < DEEP_EFFECTS.length; i++) {
      if (DEEP_EFFECTS[i].name === effect) {
        var filterValue = DEEP_EFFECTS[i].value + '(' + calculateCurrentDeepEffect(DEEP_EFFECTS[i]) + DEEP_EFFECTS[i].unit + ')';
        imgUploadPreview.style.filter = filterValue;
      }
    }
  };

  // drag and drop

  var effectLevelDepth = window.form.imgUploadOverlay.querySelector('.effect-level__depth');
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoorinateX = evt.clientX;
    var effectiveLevelLineWidth = getComputedStyle(effectLevelLine).width;
    var effectiveLevelLineWidthNumber = +deleteDimension(effectiveLevelLineWidth);
    var coeff = effectiveLevelLineWidthNumber / 100;
    var minCoordinateX = startCoorinateX - +deleteDimension(getComputedStyle(effectLevelPin).left);
    var maxCoordinateX = minCoordinateX + effectiveLevelLineWidthNumber;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var coordinateX = moveEvt.clientX;
      if (coordinateX <= minCoordinateX) {
        coordinateX = minCoordinateX;
      }
      if (coordinateX >= maxCoordinateX) {
        coordinateX = maxCoordinateX;
      }
      effectLevelPin.style.left = (coordinateX - minCoordinateX) / coeff + PERCENT;
      effectLevelDepth.style.width = effectLevelPin.style.left;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      effectLevelValue.value = Math.ceil(+deleteDimension(effectLevelPin.style.left));
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      changeDeepOfEffect();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // клик по радио

  var onEffectsRadioClick = function () {
    for (var i = 1; i < effectsRadio.length; i++) {
      effectsRadio[i].addEventListener('click', function () {
        window.util.showElements(imgUploadEffectLevel);
        selectedEffect = findSelectedEffect();
        imgUploadPreview.className = '';
        imgUploadPreview.classList.add('effects__preview--' + selectedEffect);
        effectLevelValue.value = EFFECT_DEEP_CONTROL_MAX;
        effectLevelPin.style.left = EFFECT_DEEP_CONTROL_MAX + PERCENT;
        effectLevelDepth.style.width = effectLevelPin.style.left;
        changeDeepOfEffect();
      });
    }
  };
  onEffectsRadioClick();

  // При выборе эффекта «Оригинал» слайдер скрывается.


  effectsRadio[0].addEventListener('click', function () {
    window.util.hideElements(imgUploadEffectLevel);
    imgUploadPreview.classList.add('effects__preview--' + selectedEffect);
    effectLevelValue.value = EFFECT_DEEP_CONTROL_MIN;
    imgUploadPreview.style.filter = 'none';
  });

  // Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта
  // записывается в поле .scale__value.


  effectLevelPin.addEventListener('mouseup', function () {
    effectLevelLine.value = (getComputedStyle(effectLevelPin).left).slice(0, -1);
  });
  // красная рамка у элемента с неверно введенным значением
  var drawRedBorder = function (element) {
    element.style = 'border-color:red;';
  };
  var deleteStyle = function (element) {
    element.style = '';
  };

  // Хэштеги
  var textHashtags = window.form.imgUploadOverlay.querySelector('.text__hashtags');
  var imgUploadSubmit = window.form.imgUploadOverlay.querySelector('.img-upload__submit');
  var textDescription = window.form.imgUploadOverlay.querySelector('.text__description');

  textHashtags.addEventListener('blur', function () {
    // чтоб предвыдущая ошибка не высвечивалась
    textHashtags.setCustomValidity('');
    // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования
    // изображения.
    document.addEventListener('keydown', onDocumentPressESC);
  });
  // если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования
  // изображения.
  textHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentPressESC);
  });
  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onDocumentPressESC);
  });
  // если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования
  // изображения.
  textDescription.addEventListener('focus', function () {
    document.removeEventListener('keydown', onDocumentPressESC);
  });
  textDescription.addEventListener('blur', function () {
    document.addEventListener('keydown', onDocumentPressESC);
  });

  imgUploadSubmit.addEventListener('click', function () {
    if (textHashtags.value) {
      // сброс ошибок
      textHashtags.setCustomValidity('');
      textDescription.setCustomValidity('');
      // Установка специального сообщения об ошибке
      var error = getInvalidMessage();
      if (error) {
        textHashtags.setCustomValidity(error);
        drawRedBorder(textHashtags);
      } else {
        deleteStyle(textHashtags);
      }
    }

    if (textDescription.value.length > 140) {
      textDescription.setCustomValidity('длина сообщения не может быть больше 140 символов');
      drawRedBorder(textDescription);
    } else {
      deleteStyle(textDescription);
    }
  });
  textDescription.addEventListener('keydown', function () {
    textDescription.setCustomValidity('');
  });
  textHashtags.addEventListener('keydown', function () {
    textHashtags.setCustomValidity('');
  });
  // деление строки на хэштеги
  var getHashtags = function (hashtags) {
    return hashtags.split(' ');
  };
  // хэштег в lowerCase
  var getStringInLowerCase = function (string) {
    return string.toLowerCase();
  };

  // проверяем валидность хэштегов
  var getInvalidMessage = function () {
    var stringOfHashtags = getStringInLowerCase(textHashtags.value);
    var isWhiteSpace = false;
    var quantity = 0;

    for (var i = 0; i < stringOfHashtags.length; i++) {
      if (!isWhiteSpace) {
        if (stringOfHashtags[i] !== HASHTAG) {
          return 'каждый хэштег должен начинаться с # и быть разделен пробелом';
        } else {

          isWhiteSpace = true;
        }
      } else {
        if (stringOfHashtags[i] === HASHTAG) {
          return 'хэштег не может быть посередине слова';
        }
      }
      quantity++;
      if (stringOfHashtags[i] === ' ') {
        if (quantity > MAX_HASTAG_LENGTH - 1 || quantity <= MIN_HASHTAGS_LENGTH) {
          return 'длина хештега должна быть больше ' + MIN_HASHTAGS_LENGTH + ' и меньше ' + MAX_HASTAG_LENGTH;
        }
        quantity = 0;
        isWhiteSpace = false;
      }
    }
    var hashtags = getHashtags(stringOfHashtags);

    if (hashtags.length >= MAX_HASHTAGS_QUANTITY) {
      return 'количество хэштегов не может быть больше ' + MAX_HASHTAGS_QUANTITY;
    }
    if (quantity > MAX_HASTAG_LENGTH - 1 || quantity <= MIN_HASHTAGS_LENGTH) {
      return 'длина хештега должна быть больше ' + MIN_HASHTAGS_LENGTH + ' и меньше ' + MAX_HASTAG_LENGTH;
    }

    // одинаковые ли хэштеги
    for (var j = 0; j < hashtags.length; j++) {
      for (var k = hashtags.length - 1; k > j; k--) {
        if (j === k) {
          continue;
        }
        if (hashtags[j] === hashtags[k]) {
          return 'хэштеги не могут быть одинаковыми';
        }
      }
    }
    textHashtags.value = hashtags.join(' ');
    return false;
  };


  // ajax оправка формы
  window.form.imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var onLoad = function () {
      document.removeEventListener('keydown', onDocumentPressESC);
      window.loadMessages.deleteOnLoadMessage();
      window.util.hideElements(window.form.imgUploadOverlay);
      window.loadMessages.onLoadSuccessMessage();
      window.form.clearStyleAndClass();
      window.form.imgUploadForm.reset();
    };

    var onError = function () {
      document.removeEventListener('keydown', onDocumentPressESC);
      window.loadMessages.deleteOnLoadMessage();
      window.util.hideElements(window.form.imgUploadOverlay);
      window.loadMessages.onLoadErrorMessage();

    };
    var form = new FormData(window.form.imgUploadForm);
    window.upload(form, onLoad, onError);

  });
})();

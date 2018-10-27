'use strict';
(function () {
  var AJAX_REQUEST_INFO = {
    load: {
      URL: 'https://js.dump.academy/kekstagram/data',
      type: 'GET',
      typeResponse: 'json'
    },
    upload: {
      URL: 'https://js.dump.academy/kekstagram',
      type: 'POST',
      typeResponse: 'json'
    }
  };
  var request = function (ajaxInfo, onLoad, onError, data) {
    var URL = ajaxInfo.URL;
    var xhr = new XMLHttpRequest();
    xhr.responseType = ajaxInfo.typeResponse;

    xhr.open(ajaxInfo.type, URL);
    xhr.timeout = 10000;
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    if (data) {
      xhr.send(data);
      return;
    }
    xhr.send();
  };


  window.load = function (onLoad, onError) {
    request(AJAX_REQUEST_INFO.load, onLoad, onError);
  };

  window.upload = function (data, onLoad, onError) {
    window.loadMessages.onLoadMessage(true);
    request(AJAX_REQUEST_INFO.upload, onLoad, onError, data);
  };
})();

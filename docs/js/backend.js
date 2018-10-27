'use strict';

(function () {
  window.backend = {
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.open('POST', URL);
      xhr.send(data);
    },
    load: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);
      xhr.onerror = window.backend.renderErrorMessage;
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.send();
    },
    renderErrorMessage: function (error) {
      if (typeof (error) !== 'string') {
        error = 'ошибка оправки формы';
      }
      var div = document.createElement('div');
      div.setAttribute('style', 'position:absolute; top:0; left:50%; padding: 20px; border-radius:20px;' +
        ' background-color: red;' +
        ' min-height:50px; color: black; margin-left:-250px; width: 500px; text-align:center; font-size:20px;' +
        ' line-height:50px;');
      div.textContent = error;
      document.body.appendChild(div);

      setTimeout(function () {
        document.body.removeChild(div);
      }, 10000);
    }

  };


})();


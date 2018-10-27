'use strict';
(function () {
// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photo) {
    var currentPicture = pictureTemplate.cloneNode(true);
    currentPicture.querySelector('.picture__img').setAttribute('src', photo.url);
    currentPicture.querySelector('.picture__likes').textContent = photo.likes;
    currentPicture.querySelector('.picture__comments').textContent = photo.comments.length;
    return currentPicture;
  };
  // Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
  window.pictures = {
    images: document.querySelector('.pictures'),
    drawPictures: function (photos) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photos.length; i++) {
        fragment.appendChild(renderPhoto(photos[i]));
      }
      this.images.appendChild(fragment);
    }
  };

})();

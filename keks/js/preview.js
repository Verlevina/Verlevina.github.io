'use strict';
(function () {
  var COMMENTS_LENGTH = 5;
  var socialCommentCount = document.querySelector('.social__comment-count');

  // Покажите элемент .big-picture, удалив у него класс .hidden и заполните его данными из первого элемента сгенерированного вами массива:

  window.createBigPicture = function (CURRENT_PHOTO, photos) {
    var n = 1;
    var socialComments = window.util.bigPicture.querySelector('.social__comments');
    var commentFragment = document.createDocumentFragment();
    var socialComment = socialComments.querySelector('.social__comment');
    var sliceComments = photos[CURRENT_PHOTO].comments.slice(0, COMMENTS_LENGTH);
    var appendComments = function (comments) {
      for (var j = 0; j < comments.length; j++) {
        commentFragment.appendChild(addCommentFragment(j));
        socialCommentCount.childNodes[0].textContent = comments.length + ' из ';
        if (j + 1 >= photos[CURRENT_PHOTO].comments.length) {
          socialCommentsLoader.classList.add('hidden');
        }
      }
      socialComments.appendChild(commentFragment);
    };
    // // клик по кнопке загрузки комментариев
    var onSocialCommentLoaderClick = function () {
      socialCommentsLoader.classList.remove('hidden');
      n++;
      window.util.deleteChildren(socialComments, false);
      sliceComments = photos[CURRENT_PHOTO].comments.slice(0, COMMENTS_LENGTH * n);
      appendComments(sliceComments);
    };
    // удаление шаблонных элементов
    window.util.deleteChildren(socialComments, false);
    var socialCommentsLoader = window.util.bigPicture.querySelector('.social__comments-loader');
    socialCommentsLoader.classList.remove('hidden');
    socialCommentsLoader.addEventListener('click', onSocialCommentLoaderClick);
    window.util.bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', photos[CURRENT_PHOTO].url);
    window.util.bigPicture.querySelector('.likes-count').textContent = photos[CURRENT_PHOTO].likes;
    window.util.bigPicture.querySelector('.comments-count').textContent = photos[CURRENT_PHOTO].comments.length;
    window.util.bigPicture.querySelector('.social__caption').textContent = window.data.getDescription();
    window.util.bigPicture.querySelector('.big-picture__cancel').addEventListener('click', function () {
      window.util.hideElements(window.util.bigPicture);
      document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
      document.removeEventListener('keydown', window.util.onBigPictureEsc);
    });
    document.removeEventListener('keydown', window.gallery.onDocumentEnterPress);

    var addCommentFragment = function (numberOfComment) {
      var commentTemplate = socialComment.cloneNode(true);
      commentTemplate.querySelector('p').textContent = photos[CURRENT_PHOTO].comments[numberOfComment];
      commentTemplate.querySelector('img').setAttribute('src', window.data.getAvatarUrl());
      return commentTemplate;
    };

    appendComments(sliceComments);
  };

})();

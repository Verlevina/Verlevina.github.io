'use strict';
(function () {
  var main = document.querySelector('main');
  // сообщение о загрузке
  var loadMessageTemplate = document.querySelector('#messages')
    .content
    .querySelector('div');
  var message = loadMessageTemplate.cloneNode(true);

  window.loadMessages = {
    onLoadMessage: function (noNewMessage, newMessage) {
      if (noNewMessage) {
        window.loadMessages.addMessage(message);
      } else {
        message.textContent = newMessage;
      }
    },
    addLoadMessage: function () {
      main.appendChild(message);
    },
    deleteOnLoadMessage: function () {
      this.deleteMessage(message);
    },
    onLoadSuccessMessage: function () {
      var loadSuccessMessageTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
      var successMessage = loadSuccessMessageTemplate.cloneNode(true);
      window.loadMessages.addMessage(successMessage);
      var button = successMessage.querySelector('button');
      var successInner = document.querySelector('.success__inner');
      var onSuccessMessageClick = function (evt) {
        if (evt.target !== successInner && evt.target !== button) {
          evt.preventDefault();
          document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
          successMessage.removeEventListener('click', onSuccessMessageClick);
          document.removeEventListener('keyup', onDocumentPressEsc);
          window.form.imgUploadForm.reset();
          window.loadMessages.deleteSuccessMessage(successMessage);
        }
        if (evt.target === button) {
          evt.preventDefault();
          document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
          successMessage.removeEventListener('click', onSuccessMessageClick);
          window.form.imgUploadForm.reset();
          document.removeEventListener('keyup', onDocumentPressEsc);
          window.loadMessages.deleteSuccessMessage(successMessage);
        }
      };
      var onDocumentPressEsc = function (evt) {

        if (evt.keyCode === window.util.ESC_KEYCODE) {
          evt.preventDefault();
          document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
          window.form.imgUploadForm.reset();
          document.removeEventListener('keyup', onDocumentPressEsc);
          window.loadMessages.deleteSuccessMessage(successMessage);
        }
      };
      document.addEventListener('keyup', onDocumentPressEsc);

      successMessage.addEventListener('click', onSuccessMessageClick);
    },
    deleteSuccessMessage: function (successMessage) {
      this.deleteMessage(successMessage);
    },
    onLoadErrorMessage: function () {
      var loadErrorMessageTemplate = document.querySelector('#error')
        .content
        .querySelector('.error');
      var errorMessage = loadErrorMessageTemplate.cloneNode(true);
      window.loadMessages.addMessage(errorMessage);
      var errorButtonTryAgain = errorMessage.querySelector('button:first-child');
      var errorButtonApplyAnotherFile = errorMessage.querySelector('button:last-child');
      var errorInner = document.querySelector('.error__inner');
      var onErrorMessageClick = function (evt) {
        if (evt.target !== errorInner && evt.target !== errorButtonTryAgain && evt.target !== errorButtonApplyAnotherFile) {
          evt.preventDefault();
          window.form.clearStyleAndClass();
          document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
          errorMessage.removeEventListener('click', onErrorMessageClick);
          document.removeEventListener('keyup', onDocumentPressEsc);
          window.form.imgUploadForm.reset();
          window.loadMessages.deleteErrorMessage(errorMessage);
        }
        if (evt.target === errorButtonTryAgain) {
          evt.preventDefault();
          errorMessage.removeEventListener('click', onErrorMessageClick);
          document.removeEventListener('keyup', onDocumentPressEsc);
          window.loadMessages.deleteErrorMessage(errorMessage);
          window.util.showElements(window.form.imgUploadOverlay);
        }
        if (evt.target === errorButtonApplyAnotherFile) {
          evt.preventDefault();
          document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
          window.form.clearStyleAndClass();
          errorMessage.removeEventListener('click', onErrorMessageClick);
          document.removeEventListener('keyup', onDocumentPressEsc);
          window.form.imgUploadForm.reset();
          window.loadMessages.deleteErrorMessage(errorMessage);
        }
      };
      errorMessage.addEventListener('click', onErrorMessageClick);
      var onDocumentPressEsc = function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          document.addEventListener('keydown', window.gallery.onDocumentEnterPress);
          document.removeEventListener('keyup', onDocumentPressEsc);
          window.form.clearStyleAndClass();
          window.form.imgUploadForm.reset();
          window.loadMessages.deleteErrorMessage(errorMessage);
        }
      };
      document.addEventListener('keyup', onDocumentPressEsc);
    },
    deleteErrorMessage: function (errorMessage) {
      this.deleteMessage(errorMessage);
    },
    deleteMessage: function (currentMessage) {
      main.removeChild(currentMessage);
    },
    addMessage: function (currentMessage) {
      main.appendChild(currentMessage);
    }
  };
}());

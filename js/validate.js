const CONFIG_FORM_VALIDATION = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
  }; 
// Валидация форм
const showError = (formElement, inputElement, config, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, config ) => {
  if (!inputElement.validity.valid) {
      showError(formElement, inputElement, config, inputElement.validationMessage, );
  } else {
      hideError(formElement, inputElement, config);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
});
}
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;

  } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled =false;
  }
};
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  
  inputList.forEach((inputElement) => {
      inputElement.addEventListener ('input', function () {
          checkInputValidity(formElement, inputElement, config);
          
          toggleButtonState(inputList, buttonElement, config);
      });
  });
};
const enableValidation = (config) => {
  const formList =Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit',(evt) => {
          evt.preventDefault();
        });
        setEventListeners(formElement, config);
  });
};
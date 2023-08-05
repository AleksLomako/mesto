class FormValidator {
    constructor(form, config){
        this._config = config;
        this._form = form;
    }

    _showError = (inputElement, errorMessage) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };

    _hideError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage, );
        } else {
            this._hideError(inputElement);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
    }

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.disabled =false;
        }
    };

    _setEventListeners(){
        const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement)
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement)
            });
        });
    }

    enableValidation(){
        this._setEventListeners();
    }
}
export default FormValidator;
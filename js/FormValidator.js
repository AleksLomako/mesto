class FormValidator {
    constructor(form, config){
        this._config = config;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
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
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        };
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
    }

    toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled =false;
        };
    };

    _setEventListeners(){
        this.toggleButtonState()
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState()
            });
        });
    };

    enableValidation(){
        this._setEventListeners();
    };
}
export default FormValidator;
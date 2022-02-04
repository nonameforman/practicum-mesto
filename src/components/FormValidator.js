class FormValidator {
    constructor(data, formSelector) {
        this._formSelector = formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._inputList = this._formSelector.querySelectorAll(this._inputSelector);
        this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
    }

    _showError = (input, errorMessageText) => {
        const errorMessage = this._formSelector.querySelector(`#${input.id}-error`);
        errorMessage.textContent = errorMessageText;
        errorMessage.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }
    
    _hideError = (input) => {
        const errorMessage = this._formSelector.querySelector(`#${input.id}-error`);
        errorMessage.textContent = "";
        errorMessage.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValid = (input) => {
        if (!input.validity.valid) {
          this._showError(input, input.validationMessage);
        } else {
          this._hideError(input);
        }
    }

    _hasInvalidInput = () => {
        return Array.from(this._inputList).some((el) => !el.validity.valid);
    }

    _toggleButtonError = () => {
        if (this._hasInvalidInput(this._inputList)) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.disabled = true;
        } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.disabled = false;
        }
    }

    _setInputListener = () => {
        this._toggleButtonError();
        this._inputList.forEach((input) => {
          input.addEventListener("input", () => {
            this._checkInputValid(input);
            this._toggleButtonError();
          })
        })
    }

    enableValidation = () => {
        this._formSelector.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        this._setInputListener();
    }

    resetValidation = () => {
      this._toggleButtonError();
      Array.from(this._inputList).forEach((input) => {
        this._hideError(input)
      });
    }
}

export default FormValidator;
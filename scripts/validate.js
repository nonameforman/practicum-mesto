const showError = (formElement, inputElement, errorMessageText, errorMessageClass, inputErrorClass) => {
    const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(inputErrorClass);
    inputElement.classList.add(errorMessageClass);
}

const hideError = (formElement, inputElement, errorMessageClass, inputErrorClass) => {
    const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(inputErrorClass);
    inputElement.classList.remove(errorMessageClass);
}

const checkInputValid = (formElement, inputElement, {
    inputErrorClass,
    errorClass
}) => {
    if (!inputElement.validity.valid) {
      showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      hideError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((el) => !el.validity.valid);
}

const toggleButtonError = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    }
}

const setInputListener = (formElement, {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    ...rest
}) => {
    const inputList = formElement.querySelectorAll(inputSelector);
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonError(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValid(formElement, inputElement, rest);
        toggleButtonError(inputList, buttonElement, inactiveButtonClass);
      })
    })
}

const enableValidation = ({
    formSelector,
    ...rest
}) => {
    const formList = document.querySelectorAll(formSelector);
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      })
    setInputListener(formElement, rest);
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 
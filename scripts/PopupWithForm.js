import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, formSubmit) {
        super(popupElement);
        this._formSubmit = formSubmit;
        this._form = this._popupElement.querySelector(".popup__form");
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
            console.log("метод сработал");
            this.closePopup;
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}
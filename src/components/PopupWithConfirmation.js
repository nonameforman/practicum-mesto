import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupElement, formSubmit) {
        super(popupElement);
        this._formSubmit = formSubmit;
        this._form = this._popupElement.querySelector(".popup__form");
    }

    openPopup(card) {
        super.openPopup();
        this._element = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._formSubmit(this._element);
        })
    }
}
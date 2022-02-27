import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    openPopup(data) {
        this._popupElement.querySelector(".popup__image").src = data.link;
        this._popupElement.querySelector(".popup__image").alt = data.name + ".";
        this._popupElement.querySelector(".popup__capture").textContent = data.name;
        super.openPopup();
    }
}
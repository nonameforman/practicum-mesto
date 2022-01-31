import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    openPopup(name, link) {
        this._popupElement.querySelector(".popup__image").src = link;
        this._popupElement.querySelector(".popup__image").alt = name + ".";
        this._popupElement.querySelector(".popup__capture").textContent = name;
        super.openPopup();
    }
}
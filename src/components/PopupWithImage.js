import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
    }

    openPopup(data) {
        this._popupImage = this._popupElement.querySelector(".popup__image")
        this._popupImage.src = data.link;
        this._popupImage.alt = data.name + ".";
        this._popupElement.querySelector(".popup__capture").textContent = data.name;
        super.openPopup();
    }
}